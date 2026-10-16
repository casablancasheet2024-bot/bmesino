import type { ReactNode } from "react";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappMessageFor, whatsappUrl } from "@/lib/contact-links";
import { CONTACT_FORM_PATH } from "@/data/request-types";

type QuoteCTAProps = {
  eyebrow?: string;
  title: ReactNode;
  text: ReactNode;
  href?: string;
  label?: string;
  /** Optional second internal action (replaces nothing: WhatsApp is still offered when configured). */
  secondary?: { href: string; label: string };
  whatsappSubject?: string;
};

/** Closing conversion band, deep navy with route lines. */
export function QuoteCTA({
  eyebrow = "Parlons de votre besoin",
  title,
  text,
  href = CONTACT_FORM_PATH,
  label = "Demander un devis",
  secondary,
  whatsappSubject = "un projet d'achat international",
}: QuoteCTAProps) {
  const whatsapp = whatsappUrl(whatsappMessageFor(whatsappSubject));

  return (
    <section className="bg-white px-0 py-6 sm:px-4 sm:py-10 lg:py-14">
      <div className="relative isolate mx-auto max-w-[1300px] overflow-hidden bg-navy-900 sm:rounded-[calc(var(--radius-card)*1.6)]">
        <RouteLines />
        <div aria-hidden className="absolute -bottom-48 -left-32 -z-10 size-[30rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <Container className="relative grid grid-cols-1 gap-8 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-20">
          <div>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <ButtonLink href={href} variant="light" size="lg" arrow className="sm:min-w-60">
              {label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline-light" size="lg" className="sm:min-w-60">
                {secondary.label}
              </ButtonLink>
            )}
            {whatsapp && (
              <ExternalButton href={whatsapp} variant="outline-light" size="lg" icon={<WhatsAppIcon className="size-4" />} className="sm:min-w-60">
                Écrire sur WhatsApp
              </ExternalButton>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}

function RouteLines() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full text-white/[0.09]"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path d="M1180 60C900 80 640 220 -20 330" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1180 60C960 140 760 320 360 420" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
      <path d="M1180 60C1000 20 700 30 380 -20" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1180 60C1100 200 1000 330 860 420" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" />
      <circle cx="1180" cy="60" r="5" fill="currentColor" />
    </svg>
  );
}
