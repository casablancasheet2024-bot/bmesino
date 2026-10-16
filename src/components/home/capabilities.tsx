import { ArrowUpRight, ClipboardCheck, FileText, Search, Ship } from "lucide-react";
import { Link } from "@/i18n/link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";

const capabilities = [
  {
    icon: Search,
    title: "Sourcing & Trading",
    text: "Recherche de produits et de fabricants, comparaison des offres, MOQ et conditions commerciales.",
    href: "/sourcing-trading",
    cta: "Le sourcing",
  },
  {
    icon: ClipboardCheck,
    title: "Contrôle Qualité",
    text: "Inspection d'usine et inspection avant expédition, selon le périmètre convenu.",
    href: "/controle-qualite",
    cta: "Les inspections",
  },
  {
    icon: FileText,
    title: "Rapports QC",
    text: "Constats structurés, photos à l'appui et non-conformités relevées, pour décider avant l'expédition.",
    href: "/controle-qualite#rapports-qc",
    cta: "Le contenu d'un rapport",
  },
  {
    icon: Ship,
    title: "Logistique Internationale",
    text: "Coordination du fret maritime, aérien et du transport intérieur, du fournisseur jusqu'à votre marché.",
    href: "/logistique",
    cta: "La logistique",
  },
];

export function Capabilities() {
  return (
    <Section id="services" labelledBy="services-title" className="scroll-mt-[var(--header-h)] bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Nos services"
          title={<span id="services-title">Un interlocuteur unique, du fournisseur à la livraison.</span>}
          description="Vous choisissez les services utiles à votre projet : une seule étape ou un accompagnement complet."
        />

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, text, href, cta }, index) => (
            <li key={title} className="reveal bg-white">
              <Link
                href={href}
                className="group relative flex h-full flex-col p-6 transition-colors duration-300 hover:bg-navy-900 sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-md bg-surface text-brand-600 transition-colors group-hover:bg-white/10 group-hover:text-cyan-400">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="font-label text-xs text-subtle group-hover:text-white/50">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-[1.1rem] leading-snug font-semibold text-navy-900 group-hover:text-white">{title}</h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted group-hover:text-white/70">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-cyan-400">
                  {cta}
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
