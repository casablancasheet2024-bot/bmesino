import type { Metadata } from "next";
import Image from "next/image";
import { Container as ContainerIcon, Network, Plane, Ship, Truck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CheckList, FeatureRows, InfoNote } from "@/components/sections/content";
import { MarketRoutes } from "@/components/sections/market-routes";
import { LogisticsForm } from "@/components/forms/logistics-form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Logistique internationale",
  description:
    "Fret maritime, fret aérien, transport par conteneur, transport intérieur et coordination logistique internationale depuis la Chine et l'Europe vers le Maroc, l'Afrique, l'Europe, les États-Unis et le Canada.",
  path: "/logistique",
  image: { src: "/images/services/trucking.webp", alt: "Camion porte-conteneur près de conteneurs empilés" },
});

const services = [
  {
    icon: Ship,
    title: "Fret maritime",
    text: "Adapté aux volumes importants, aux machines et aux marchandises lourdes. Nous coordonnons la réservation, l'enlèvement et les documents avec les transitaires.",
  },
  {
    icon: Plane,
    title: "Fret aérien",
    text: "Pour les envois urgents, les échantillons, les pièces de rechange ou les marchandises à forte valeur, lorsque le délai prime sur le coût.",
  },
  {
    icon: ContainerIcon,
    title: "Transport par conteneur",
    text: "Conteneur complet (FCL) lorsque le volume le justifie, ou groupage (LCL) pour partager l'espace sur les petits volumes.",
    points: ["Conteneurs 20' et 40'", "Groupage pour volumes partiels", "Coordination du chargement à l'usine"],
  },
  {
    icon: Truck,
    title: "Transport intérieur",
    text: "Acheminement entre l'usine, l'entrepôt, le port ou l'aéroport de départ, et à l'arrivée lorsque la prestation le prévoit.",
  },
  {
    icon: Network,
    title: "Coordination logistique internationale",
    text: "Un interlocuteur unique entre le fournisseur, les transitaires, les transporteurs et vous, pour suivre l'avancement de l'expédition.",
  },
];

export default function LogisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Logistique"
        title="Du fournisseur jusqu'à votre marché."
        lead="BME SINO TRADE accompagne la coordination de solutions de transport international adaptées à votre envoi, à votre produit, à votre destination et aux exigences de votre projet."
        breadcrumbs={[{ label: "Logistique" }]}
        image={{ src: "/images/services/trucking.webp", alt: "Camion porte-conteneur près de conteneurs empilés" }}
        actions={
          <ButtonLink href="#devis-logistique" size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
            Demander un devis logistique
          </ButtonLink>
        }
      />

      <Section labelledBy="modes-title">
        <Container>
          <SectionHeading
            eyebrow="Nos solutions"
            title={<span id="modes-title">Le transport adapté à chaque envoi.</span>}
            description="Le choix dépend du volume, du poids, de la valeur, de l'urgence et de la destination de vos marchandises."
          />
          <div className="mt-10 sm:mt-12">
            <FeatureRows items={services} />
          </div>
        </Container>
      </Section>

      <Section className="relative isolate overflow-hidden bg-navy-950 text-white" labelledBy="routes-title">
        <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Destinations"
              title={<span id="routes-title">De la Chine et de l&apos;Europe vers vos marchés.</span>}
              description="Les itinéraires, les ports, les délais et les tarifs dépendent de chaque expédition : ils sont précisés dans le devis, sans engagement générique."
            />
            <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-white/10 lg:block">
              <Image
                src="/images/hero/container-ship-sea.webp"
                alt="Vue aérienne d'un porte-conteneurs en pleine mer"
                fill
                sizes="(min-width: 1024px) 38vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
          <MarketRoutes tone="dark" className="lg:col-span-7" />
        </Container>
      </Section>

      <Section id="devis-logistique" labelledBy="logistics-form-title" className="scroll-mt-[var(--header-h)] bg-surface">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Devis logistique"
              title={<span id="logistics-form-title">Demandez un devis logistique.</span>}
              description="Indiquez ce que vous connaissez de votre envoi : nous complétons les informations manquantes avec vous."
            />
            <CheckList
              className="mt-8"
              items={[
                "Nature des marchandises et code douanier s'il est connu",
                "Poids brut, volume et nombre de colis ou de palettes",
                "Adresse d'enlèvement et destination finale",
                "Incoterm souhaité et date de disponibilité",
              ]}
            />
            <InfoNote className="mt-8 bg-white">
              Le transport est réalisé par des transitaires et transporteurs partenaires. Les tarifs, délais et
              disponibilités évoluent selon les périodes et sont confirmés pour chaque expédition.
            </InfoNote>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <LogisticsForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
