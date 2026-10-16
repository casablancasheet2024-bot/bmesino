import Image from "next/image";
import { Camera, CheckSquare, ClipboardList, Factory, Gauge, PackageCheck, Ruler } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { quoteHref } from "@/data/request-types";

const checkpoints = [
  { icon: Factory, label: "Inspection d'usine" },
  { icon: PackageCheck, label: "Inspection avant expédition (PSI)" },
  { icon: Ruler, label: "Contrôle des spécifications" },
  { icon: CheckSquare, label: "Contrôle des quantités et de l'emballage" },
  { icon: Gauge, label: "Tests de fonctionnement et de performance" },
  { icon: Camera, label: "Documentation photo et vidéo" },
  { icon: ClipboardList, label: "Rapports QC professionnels" },
];

const reportFields = ["Fournisseur", "Date d'inspection", "Réf. PI / PO", "Quantité contrôlée"];

/** One of the signature sections: framed like an inspection document. */
export function QualityControlHighlight() {
  return (
    <Section labelledBy="qc-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contrôle qualité"
            title={<span id="qc-title">Inspectez vos produits avant leur expédition.</span>}
            description={
              <p>
                Une fois la marchandise payée et expédiée, corriger un défaut devient long et coûteux. L&apos;inspection
                en usine et avant expédition vous permet de constater l&apos;état réel de votre commande pendant
                qu&apos;il est encore temps d&apos;agir avec le fournisseur.
              </p>
            }
          />
          <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {checkpoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-md border border-line bg-white px-3.5 py-3 text-[0.92rem] font-medium text-navy-900">
                <Icon aria-hidden className="size-[1.1rem] shrink-0 text-brand-600" />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref("controle-qualite")} size="lg" arrow>
              Demander une inspection
            </ButtonLink>
            <ButtonLink href="/controle-qualite" variant="outline" size="lg">
              Le contrôle qualité
            </ButtonLink>
          </div>
        </div>

        <figure className="relative lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/11] lg:ml-10">
            <Image
              src="/images/services/quality-inspection.webp"
              alt="Mesure d'une pièce au pied à coulisse numérique"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Illustrative report card — field labels only, never fabricated results. */}
          <div className="relative -mt-16 mx-3 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-lift sm:mx-8 sm:-mt-24 sm:max-w-md sm:p-6 lg:absolute lg:-bottom-10 lg:left-0 lg:m-0">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-line-strong pb-3">
              <p className="font-label text-[0.68rem] font-medium uppercase tracking-[0.16em] text-navy-900">Rapport d&apos;inspection</p>
              <span className="rounded bg-surface px-2 py-0.5 font-label text-[0.62rem] uppercase tracking-[0.12em] text-muted">Démonstration</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {reportFields.map((field) => (
                <div key={field}>
                  <dt className="font-label text-[0.62rem] uppercase tracking-[0.12em] text-subtle">{field}</dt>
                  <dd aria-hidden className="mt-1.5 h-2 w-4/5 rounded-full bg-surface-2" />
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
              {["Conforme", "Réserves", "Non conforme"].map((status) => (
                <span key={status} className="rounded border border-line px-2 py-1 text-[0.7rem] font-medium text-muted">
                  {status}
                </span>
              ))}
            </div>
          </div>
          <figcaption className="sr-only">
            Illustration d&apos;un rapport d&apos;inspection : son contenu dépend du périmètre convenu.
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
