"use client";

import { useRef, useState, type ReactNode, type RefObject } from "react";
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, Paperclip, Send, TriangleAlert, X } from "lucide-react";
import type { InquiryState } from "@/lib/inquiry-action";
import { ATTACHMENT_ACCEPT } from "@/lib/inquiry";
import { mailtoUrl, whatsappUrl } from "@/lib/contact-links";
import { Link } from "@/i18n/link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-7">
      <legend className="-ml-1 px-1 font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-600">{legend}</legend>
      {children}
    </fieldset>
  );
}

const controlClass =
  "mt-2 block w-full rounded-md border bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-subtle transition-[border-color,box-shadow] focus:outline-none focus:ring-3 [&:not(textarea)]:h-12 [&:is(textarea)]:py-3 [&:is(textarea)]:leading-relaxed";

export type ControlProps = {
  id: string;
  className: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

export function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="ml-0.5 text-brand-600">*</span>
        ) : (
          <span className="ml-1 font-normal text-muted">(facultatif)</span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
        className: cn(
          controlClass,
          error ? "border-red-500 focus:ring-red-500/15" : "border-line-strong focus:border-brand-600 focus:ring-brand-600/15",
        ),
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8rem] text-muted">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] font-medium text-red-700">
      <AlertCircle aria-hidden className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

export function RequiredNote({ id }: { id: string }) {
  return (
    <p id={id} className="text-sm text-muted">
      Les champs marqués <span className="font-semibold text-brand-600">*</span> sont obligatoires.
    </p>
  );
}

/** Hidden honeypot; the fill-time stamp is added on submit by useInquiryForm. */
export function SpamTrap() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Site web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function AttachmentField({
  id,
  error,
  onChange,
}: {
  id: string;
  error?: string;
  onChange: () => void;
}) {
  const [fileName, setFileName] = useState<string>();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        Pièce jointe <span className="font-normal text-muted">(facultatif)</span>
      </label>
      <div
        className={cn(
          "relative mt-2 flex min-h-14 items-center gap-3 rounded-md border border-dashed bg-surface px-4 py-3 transition-colors focus-within:border-brand-600 focus-within:ring-3 focus-within:ring-brand-600/15",
          error ? "border-red-500" : "border-line-strong hover:border-brand-600",
        )}
      >
        <Paperclip aria-hidden className="size-4 shrink-0 text-brand-600" />
        <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">
          {fileName ?? "Image, fiche technique ou catalogue — PDF, JPG, PNG, WEBP, Word, Excel (5 Mo max.)"}
        </span>
        <input
          ref={fileRef}
          id={id}
          name="attachment"
          type="file"
          accept={ATTACHMENT_ACCEPT}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name);
            onChange();
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        {fileName && (
          <button
            type="button"
            onClick={() => {
              if (fileRef.current) fileRef.current.value = "";
              setFileName(undefined);
              onChange();
            }}
            aria-label="Retirer la pièce jointe"
            className="relative z-10 grid size-8 place-items-center rounded text-subtle hover:bg-white hover:text-navy-900"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

export function ConsentField({ id, error, onChange }: { id: string; error?: string; onChange: () => void }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
          className="mt-1 size-4.5 shrink-0 rounded border-line-strong accent-brand-600"
        />
        <span>
          J&apos;accepte que les informations saisies soient utilisées par BME SINO TRADE SARL uniquement pour traiter ma
          demande et me répondre, conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="font-medium text-brand-600 underline underline-offset-2">
            politique de confidentialité
          </Link>
          . <span className="text-brand-600">*</span>
        </span>
      </label>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

/** Live region for the submission outcome (errors, or the honest "not sent" fallback). */
export function FormStatus({
  statusRef,
  state,
  hasClientErrors,
  summary,
  fallbackSubject,
}: {
  statusRef: RefObject<HTMLDivElement | null>;
  state: InquiryState;
  hasClientErrors: boolean;
  summary: string;
  fallbackSubject: string;
}) {
  return (
    <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
      {hasClientErrors && <ErrorNotice>Certains champs doivent être complétés ou corrigés.</ErrorNotice>}
      {state.status === "error" && <ErrorNotice>{state.message}</ErrorNotice>}
      {state.status === "not_configured" && <ManualFallback summary={summary} subject={fallbackSubject} />}
    </div>
  );
}

function ErrorNotice({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[0.92rem] text-red-800">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}>
      {pending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
      {pending ? "Envoi en cours…" : label}
    </button>
  );
}

/** Shown only after the e-mail service has confirmed delivery. */
export function SuccessPanel({ statusRef, text }: { statusRef: RefObject<HTMLDivElement | null>; text: string }) {
  return (
    <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-emerald-200 bg-emerald-50 p-6 outline-none sm:p-8">
      <CheckCircle2 aria-hidden className="size-8 text-emerald-600" />
      <h3 className="mt-4 text-xl font-semibold text-navy-900">Votre demande a bien été envoyée.</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
      <button type="button" onClick={() => window.location.reload()} className={buttonClasses({ variant: "outline", className: "mt-6" })}>
        Envoyer une autre demande
      </button>
    </div>
  );
}

function ManualFallback({ summary, subject }: { summary: string; subject: string }) {
  const [copied, setCopied] = useState(false);
  const whatsapp = whatsappUrl(`Bonjour BME SINO TRADE,\n\n${summary}`);
  const mail = mailtoUrl(subject, summary);

  return (
    <div className="rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
        <div>
          <p className="font-semibold text-navy-900">Votre demande n&apos;a pas été envoyée.</p>
          <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">
            La réception automatique des demandes n&apos;est pas encore activée sur ce site.
            {whatsapp || mail
              ? " Vous pouvez nous transmettre la même demande en un clic :"
              : " Copiez votre demande pour la conserver ; nos coordonnées seront publiées prochainement."}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClasses({ className: "bg-[#1fa855] hover:bg-[#178a45]" })}>
            <WhatsAppIcon className="size-4" />
            Envoyer via WhatsApp
          </a>
        )}
        {mail && (
          <a href={mail} className={buttonClasses({ variant: "secondary" })}>
            <Mail aria-hidden className="size-4" />
            Envoyer par e-mail
          </a>
        )}
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(summary);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className={buttonClasses({ variant: "outline" })}
        >
          <Copy aria-hidden className="size-4" />
          {copied ? "Demande copiée" : "Copier ma demande"}
        </button>
      </div>
    </div>
  );
}

