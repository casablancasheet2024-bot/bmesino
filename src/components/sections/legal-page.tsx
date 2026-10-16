import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/layout";

/** Marks information the client still has to supply. */
export function ToComplete({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-amber-100 px-1 text-amber-900">[À compléter : {children}]</mark>;
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: title }]} />
        <h1 className="mt-8 text-[2rem] leading-tight font-semibold tracking-[-0.02em] text-navy-900 sm:text-[2.5rem]">{title}</h1>
        <p className="mt-6 flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          Document provisoire : les informations signalées doivent être complétées par BME SINO TRADE SARL et le texte
          validé par un conseil juridique avant publication.
        </p>
        <div className="mt-10 space-y-8 leading-relaxed text-ink-soft [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-900 [&_li]:mt-1.5 [&_section>*+*]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </div>
  );
}
