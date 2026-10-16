import type { Metadata } from "next";
import {
  ArrowLeftRight,
  BadgeCheck,
  Boxes,
  Building2,
  ClipboardCheck,
  FileSearch,
  Globe2,
  Handshake,
  PackageSearch,
  Scale,
  Search,
  Ship,
  Store,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CheckList, Faq, FeatureGrid, FeatureRows, InfoNote, SplitMedia } from "@/components/sections/content";
import { QuoteForm } from "@/components/forms/quote-form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Sourcing & Trading",
  description:
    "Identification de produits et de fabricants, recherche et vérification de fournisseurs, comparaison des offres, MOQ et conditions commerciales, contrôle qualité et expédition : le sourcing et le trading B2B avec BME SINO TRADE.",
  path: "/sourcing-trading",
  image: { src: "/images/services/sourcing-meeting.webp", alt: "Examen d'échantillons de matériaux" },
});

const support = [
  { icon: PackageSearch, title: "Produits et fabricants", text: "Identification des produits adaptés à votre usage et des fabricants capables de les produire." },
  { icon: Search, title: "Recherche de fournisseurs", text: "Recherche ciblée selon vos spécifications, vos quantités et votre marché de destination." },
  { icon: Scale, title: "Comparaison des offres", text: "Mise en regard des devis et des spécifications techniques proposées." },
  { icon: Boxes, title: "Quantités minimales (MOQ)", text: "Analyse des quantités minimales de commande et des possibilités d'échantillons." },
  { icon: Handshake, title: "Conditions commerciales", text: "Examen des conditions de paiement, incoterms, délais annoncés et conditionnement." },
  {
    id: "verification",
    icon: BadgeCheck,
    title: "Vérification des fournisseurs",
    text: "Vérification organisée selon le périmètre convenu pour votre projet.",
  },
  { icon: ClipboardCheck, title: "Contrôle qualité", text: "Coordination d'une inspection d'usine ou avant expédition, lorsque vous la demandez." },
  { icon: Ship, title: "Expédition", text: "Accompagnement de la coordination du transport vers votre destination." },
];

const workflow = [
  {
    icon: FileSearch,
    title: "Expression du besoin",
    text: "Vous nous transmettez le nom du produit, une image, des spécifications ou un catalogue.",
    points: ["Usage prévu et spécifications connues", "Quantités et fréquence des commandes", "Marché de destination et exigences de conformité"],
  },
  {
    icon: Search,
    title: "Recherche de fournisseurs",
    text: "Nous identifions des fabricants et fournisseurs potentiels, puis nous les consultons sur la base de votre demande.",
  },
  {
    icon: Scale,
    title: "Comparaison des offres",
    text: "Les prix, spécifications, MOQ et conditions commerciales des offres reçues sont comparés pour vous permettre de décider.",
  },
  {
    icon: BadgeCheck,
    title: "Vérification",
    text: "La vérification du fournisseur est envisagée selon le périmètre convenu pour votre projet, avant tout engagement de votre part.",
  },
  {
    icon: ClipboardCheck,
    title: "Contrôle qualité",
    text: "Une inspection peut être coordonnée lorsque vous la demandez, en usine ou avant expédition.",
  },
  {
    icon: Ship,
    title: "Logistique",
    text: "Les options d'expédition sont coordonnées selon la destination et les caractéristiques de l'envoi.",
  },
];

const trading = [
  {
    icon: Handshake,
    title: "Commerce B2B",
    text: "Nous intervenons entre professionnels : mise en relation avec des fabricants et fournisseurs, accompagnement des échanges commerciaux et suivi des commandes.",
  },
  {
    icon: ArrowLeftRight,
    title: "Import & Export",
    text: "Accompagnement des opérations d'importation depuis la Chine et l'Europe, et des projets d'échange entre la Chine, l'Europe, le Maroc et les marchés internationaux.",
  },
  {
    icon: Globe2,
    title: "Connexion des marchés",
    text: "Une société établie au Maroc, tournée vers l'Afrique, l'Europe, les États-Unis et le Canada.",
  },
];

const audiences = [
  { icon: Store, title: "Importateurs et distributeurs", text: "Qui souhaitent élargir leur gamme ou trouver de nouveaux fournisseurs." },
  { icon: Building2, title: "Entreprises industrielles", text: "Qui recherchent des machines, équipements ou composants pour leur activité." },
  { icon: Users, title: "Revendeurs et porteurs de projets", text: "Qui ont besoin d'un accompagnement pour leurs achats internationaux." },
];

const faq = [
  {
    question: "Quelles informations dois-je fournir pour une demande de sourcing ?",
    answer: "Le nom du produit, une photo ou une référence, les spécifications connues, la quantité estimée et le pays de destination. Un catalogue ou une fiche technique accélère la recherche.",
  },
  {
    question: "Puis-je demander des échantillons ?",
    answer: "Oui, lorsque le fournisseur le permet. Les conditions (coût, délai, expédition) varient selon le produit et sont précisées dans l'offre.",
  },
  {
    question: "Le contrôle qualité est-il obligatoire ?",
    answer: "Non. L'inspection est une option que vous choisissez. Elle est particulièrement utile pour une première commande ou un produit technique.",
  },
  {
    question: "Travaillez-vous uniquement avec des fournisseurs chinois ?",
    answer: "Non. Nous travaillons avec des fournisseurs en Chine et en Europe. Pour toute autre origine, décrivez-nous votre besoin et nous vous dirons si nous pouvons vous accompagner.",
  },
];

export default function SourcingTradingPage() {
  return (
    <>
      <PageHero
        eyebrow="Sourcing & Trading"
        title="Identifiez les bons fournisseurs. Achetez en toute confiance."
        lead="Nous recherchons pour vous des produits et des fabricants selon vos spécifications et vos quantités, comparons les offres et vous accompagnons jusqu'à l'expédition."
        breadcrumbs={[{ label: "Sourcing & Trading" }]}
        image={{ src: "/images/services/sourcing-meeting.webp", alt: "Examen d'échantillons de matériaux sur un bureau" }}
        actions={
          <>
            <ButtonLink href="#demande-sourcing" size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
              Envoyer une demande de sourcing
            </ButtonLink>
            <ButtonLink href="/produits" variant="outline-light" size="lg">
              Explorer les produits
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="support-title">
        <Container>
          <SectionHeading
            eyebrow="Notre accompagnement"
            title={<span id="support-title">Ce que nous faisons pour votre projet.</span>}
            description="Chaque mission est construite à partir de votre besoin. Vous décidez des suites à donner à chaque proposition."
          />
          <div className="mt-10 sm:mt-12">
            <FeatureGrid items={support} columns={4} />
          </div>
        </Container>
      </Section>

      <Section className="bg-surface" labelledBy="workflow-title">
        <Container>
          <SectionHeading
            eyebrow="Processus de sourcing"
            title={<span id="workflow-title">Six étapes, de votre besoin à l&apos;expédition.</span>}
          />
          <div className="mt-10 sm:mt-12">
            <FeatureRows items={workflow} />
          </div>
        </Container>
      </Section>

      <Section id="import-export" labelledBy="trading-title" className="scroll-mt-[var(--header-h)]">
        <Container>
          <SplitMedia image={{ src: "/images/services/warehouse.webp", alt: "Allée de rayonnages à palettes dans un entrepôt" }}>
            <SectionHeading
              eyebrow="Trading & Import-Export"
              title={<span id="trading-title">Un intermédiaire au service de vos achats.</span>}
              description="Notre rôle est de faciliter vos échanges commerciaux et de vous aider à prendre des décisions d'achat éclairées."
            />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {trading.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 py-5">
                  <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-semibold text-navy-900">{title}</h3>
                    <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SplitMedia>
          <div className="mt-14 sm:mt-16">
            <h3 className="font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-600">Pour qui</h3>
            <div className="mt-5">
              <FeatureGrid items={audiences} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface" labelledBy="faq-title">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions fréquentes" title={<span id="faq-title">Sourcing : vos questions.</span>} />
            <InfoNote className="mt-8 bg-white">
              Les informations sur un fournisseur reposent sur les éléments disponibles au moment de la vérification.
              Elles aident à décider, sans constituer une garantie sur ses performances futures ni sur le résultat
              d&apos;un achat.
            </InfoNote>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </Container>
      </Section>

      <Section id="demande-sourcing" labelledBy="sourcing-form-title" className="scroll-mt-[var(--header-h)]">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Demande de sourcing"
              title={<span id="sourcing-form-title">Décrivez le produit recherché.</span>}
              description="Plus votre demande est précise, plus les offres reçues seront comparables."
            />
            <CheckList
              className="mt-8"
              items={[
                "Une photo, un lien ou une référence du produit",
                "Les spécifications techniques ou un catalogue",
                "La quantité estimée et le conditionnement souhaité",
                "Le pays et la ville de destination",
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <QuoteForm prefill={{ service: "sourcing-trading" }} />
          </div>
        </Container>
      </Section>
    </>
  );
}
