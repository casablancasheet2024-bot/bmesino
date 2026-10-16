import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappMessageFor, whatsappUrl } from "@/lib/contact-links";

/**
 * Discreet mobile shortcut. Rendered only when a verified business number is
 * configured (NEXT_PUBLIC_WHATSAPP_NUMBER). Hidden from `lg` where the header CTA is always visible.
 */
export function WhatsAppContact() {
  const href = whatsappUrl(whatsappMessageFor("vos services de sourcing et de contrôle qualité"));
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter BME SINO TRADE sur WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 grid size-13 place-items-center rounded-full bg-[#1fa855] text-white shadow-lift ring-4 ring-white transition-transform hover:scale-105 lg:hidden"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
