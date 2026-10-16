"use server";

import { headers } from "next/headers";
import {
  MIN_FILL_TIME_MS,
  inquirySubject,
  inquirySummary,
  readAttachment,
  readInquiry,
  validateInquiry,
  type FieldErrors,
} from "@/lib/inquiry";

export type InquiryState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: FieldErrors }
  | { status: "success" }
  /** No e-mail delivery configured: nothing was sent, the UI offers manual alternatives. */
  | { status: "not_configured" }
  | { status: "error"; message: string };

/*
 * Best-effort, per-instance rate limit. On serverless platforms each instance
 * keeps its own memory, so pair this with platform protection (e.g. Vercel
 * Firewall) or a shared store if abuse becomes a concern.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const submissions = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  submissions.set(key, recent);
  if (submissions.size > 5000) submissions.clear();
  return recent.length > RATE_MAX;
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  // Spam protection: honeypot field + minimum fill time.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  if ((typeof honeypot === "string" && honeypot.length > 0) || !startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { status: "error", message: "Votre demande n'a pas pu être validée. Merci de réessayer dans quelques secondes." };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Trop de demandes ont été envoyées depuis votre connexion. Merci de réessayer plus tard." };
  }

  const values = readInquiry(formData);
  // Only the main quotation form accepts a file.
  const attachment = values.kind === "quote" ? readAttachment(formData) : null;
  const fieldErrors = validateInquiry(values, attachment, formData.get("consent") === "on");
  if (Object.keys(fieldErrors).length > 0) return { status: "invalid", fieldErrors };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO;
  const from = process.env.CONTACT_FORM_FROM;
  if (!apiKey || !to || !from) return { status: "not_configured" };

  const subject = inquirySubject(values);

  const attachments = attachment
    ? [
        {
          filename: singleLine(attachment.name).replace(/[^\w.\- ()À-ÿ]/g, "_").slice(0, 120),
          content: Buffer.from(await attachment.arrayBuffer()).toString("base64"),
        },
      ]
    : undefined;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()).filter(Boolean),
        reply_to: values.email,
        subject,
        // Plain text only: user input is never interpreted as HTML.
        text: inquirySummary(values, attachment?.name),
        attachments,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("[contact] Resend error", response.status, await response.text().catch(() => ""));
      return { status: "error", message: "L'envoi a échoué. Votre demande n'a pas été transmise : merci de réessayer ou de nous contacter directement." };
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return { status: "error", message: "L'envoi a échoué. Votre demande n'a pas été transmise : merci de réessayer ou de nous contacter directement." };
  }

  return { status: "success" };
}
