import { contactConfig } from "@/config/site";

/** https://wa.me/<digits>?text=<encoded> — returns undefined when no number is configured. */
export function whatsappUrl(message?: string): string | undefined {
  return contactConfig.whatsapp ? whatsappUrlFor(contactConfig.whatsapp, message) : undefined;
}

export function mailtoUrl(subject?: string, body?: string): string | undefined {
  if (!contactConfig.email) return undefined;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contactConfig.email}${query ? `?${query}` : ""}`;
}

export function telUrl(phone: string | undefined = contactConfig.phone): string | undefined {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
}

/** wa.me link for any displayed number (e.g. an office line). */
export function whatsappUrlFor(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function whatsappMessageFor(subject: string): string {
  return `Bonjour BME SINO TRADE, je souhaite obtenir des informations concernant : ${subject}.`;
}
