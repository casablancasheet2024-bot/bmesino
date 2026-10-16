import type { Metadata } from "next";
import { Camera, CheckSquare, Factory, FileText, Gauge, PackageCheck, Ruler } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CheckList, FeatureRows, InfoNote } from "@/components/sections/content";
import { QcReportPreview } from "@/components/sections/qc-report-preview";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { quoteHref } from "@/data/request-types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contrôle qualité, inspection d'usine et rapports QC",
  description:
    "Inspection d'usine, inspection avant expédition (PSI), contrôle des spécifications, des quantités et de l'emballage, tests de fonctionnement, documentation photo et vidéo, rapports QC.",
  path: "/controle-qualite",
  image: { src: "/images/services/measurement.webp", alt: "Mesure d'une pièce au micromètre" },
});

const services = [
  {
    id: "inspection-usine",
    icon: Factory,
    title: "Inspection d'usine",
    text: "Examen de l'usine et de ses installations selon le périmètre d'inspection convenu : organisation, équipements, conditions de production et capacité à réaliser votre commande.",
  },
  {
    id: "psi",
    icon: PackageCheck,
    title: "Inspection avant expédition — PSI",
    text: "Inspection des marchandises avant leur expédition, lorsque la production est terminée et emballée, pendant qu'une action reste possible avec le fournisseur.",
  },
  {
    icon: Ruler,
    title: "Contrôle des spécifications",
    text: "Comparaison des produits inspectés avec les spécifications fournies par l'acheteur : dimensions, matériaux, couleurs, références, marquages et accessoires.",
  },
  {
    icon: CheckSquare,
    title: "Contrôle des quantités et de l'emballage",
    text: "Vérification des quantités, du conditionnement, de l'étiquetage et de la préparation à l'expédition, lorsque ces points sont inclus dans le périmètre d'inspection.",
  },
  {
    icon: Gauge,
    title: "Tests de fonctionnement et de performance",
    text: "Tests pertinents selon la nature du produit et vos exigences, lorsque les moyens disponibles sur place le permettent.",
  },
  {
    icon: Camera,
    title: "Documentation photo et vidéo",
    text: "Documentation visuelle des produits, des emballages, des tests et des constats, lorsqu'elle est demandée ou incluse dans le périmètre d'inspection.",
  },
  {
    icon: FileText,
    title: "Rapports QC professionnels",
    text: "Rapports structurés présentant les observations, les constats, les photos à l'appui et les non-conformités identifiées.",
  },
];

const flow = [
  { title: "Définition du périmètre", text: "Produit, quantité, spécifications de référence et points à contrôler." },
  { title: "Planification", text: "Date d'inspection fixée avec le fournisseur selon l'avancement de la production." },
  { title: "Inspection sur site", text: "Contrôles convenus, mesures, tests et prise de photos et de vidéos." },
  { title: "Rapport et décision", text: "Vous recevez les constats et décidez de la suite avec le fournisseur." },
];

const reportContents = [
  "Informations sur l'usine ou le fournisseur",
  "Date d'inspection, description du produit et référence PI / PO",
  "Quantités commandées et contrôlées",
  "Spécifications requises et points de contrôle convenus",
  "Résultats, observations et non-conformités identifiées",
  "Photos et, si nécessaire, vidéos à l'appui",
  "Remarques de l'inspecteur et statut final",
];

const statuses = [
  { label: "Conforme", text: "Aucun écart bloquant au regard des critères convenus." },
  { label: "Avec réserves", text: "Des écarts nécessitent votre décision." },
  { label: "Non conforme", text: "Des écarts significatifs ont été relevés." },
];

export default function QualityControlPage() {
  return (
    <>
      <PageHero
        eyebrow="Contrôle Qualité"
        title="Vérifiez vos produits avant leur expédition."
        lead="Des inspections documentées pour mieux comprendre la conformité de vos marchandises et prendre des décisions éclairées avant l'expédition."
        breadcrumbs={[{ label: "Contrôle Qualité" }]}
        image={{ src: "/images/services/measurement.webp", alt: "Mesure d'une bride en laiton au micromètre" }}
        actions={
          <>
            <ButtonLink href={quoteHref("controle-qualite")} size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
              Demander une inspection qualité
            </ButtonLink>
            <ButtonLink href={quoteHref("rapport-qc")} variant="outline-light" size="lg">
              Demander un rapport QC
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="services-title">
        <Container>
          <SectionHeading
            eyebrow="Nos contrôles"
            title={<span id="services-title">Inspection d&apos;usine, PSI et documentation.</span>}
            description="Chaque mission est définie selon votre produit et votre commande. Vous choisissez les contrôles à réaliser."
          />
          <div className="mt-10 sm:mt-12">
            <FeatureRows items={services} />
          </div>
        </Container>
      </Section>

      <Section className="bg-navy-950 text-white" labelledBy="flow-title">
        <Container>
          <SectionHeading tone="dark" eyebrow="Déroulement" title={<span id="flow-title">Un périmètre convenu avant chaque inspection.</span>} />
          <div className="mt-10 sm:mt-12">
            <ProcessSteps steps={flow} tone="dark" columns={2} />
          </div>
        </Container>
      </Section>

      <Section id="rapports-qc" labelledBy="reports-title" className="scroll-mt-[var(--header-h)] bg-surface">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading
              eyebrow="Rapports QC"
              title={<span id="reports-title">Des constats clairs pour décider avant l&apos;expédition.</span>}
              description="À l'issue de l'inspection, vous recevez un rapport structuré. Ses rubriques sont adaptées à chaque mission : un contrôle visuel simple ne donne pas lieu aux mêmes informations qu'une inspection avec tests."
            />
            <CheckList className="mt-8" items={reportContents} />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {statuses.map((status) => (
                <li key={status.label} className="rounded-md border border-line bg-white p-4">
                  <p className="font-semibold text-navy-900">{status.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{status.text}</p>
                </li>
              ))}
            </ul>
            <ButtonLink href={quoteHref("rapport-qc")} size="lg" arrow className="mt-8 w-full sm:w-auto">
              Demander un rapport QC
            </ButtonLink>
          </div>
          <QcReportPreview className="lg:col-span-6" />
        </Container>
      </Section>

      <section className="py-12 sm:py-16">
        <Container>
          <InfoNote title="Périmètre et limites d'une inspection">
            <p>
              Le périmètre d&apos;inspection, les contrôles applicables et le contenu du rapport sont convenus avec vous
              selon chaque projet. Une inspection rend compte de l&apos;état des produits contrôlés le jour de la visite,
              selon la méthode convenue : elle n&apos;est pas une certification et ne garantit pas l&apos;absence de
              défauts sur l&apos;ensemble d&apos;une production.
            </p>
          </InfoNote>
        </Container>
      </section>

      <QuoteCTA
        eyebrow="Contrôle Qualité"
        title="Une production à contrôler avant son départ ?"
        text="Indiquez le produit, la quantité, le lieu de production et la date prévue de fin de fabrication."
        href={quoteHref("controle-qualite")}
        label="Demander une inspection qualité"
        secondary={{ href: quoteHref("rapport-qc"), label: "Demander un rapport QC" }}
        whatsappSubject="une inspection qualité"
      />
    </>
  );
}
