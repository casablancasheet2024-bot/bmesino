import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArrowLeftRight,
  ClipboardCheck,
  Eye,
  FileText,
  Mail,
  MapPin,
  Network,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid, SplitMedia } from "@/components/sections/content";
import { QuoteForm, QuoteFormFromParams } from "@/components/forms/quote-form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contactConfig, markets, offices, siteConfig } from "@/config/site";
import { mailtoUrl, telUrl, whatsappMessageFor, whatsappUrl, whatsappUrlFor } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "À propos & Contact",
  description:
    "BME SINO TRADE SARL, société marocaine de commerce international : sourcing, vérification des fournisseurs, contrôle qualité, rapports QC et logistique. Présentez-nous votre projet.",
  path: "/a-propos-contact",
  image: { src: "/images/about/cranes-dusk.webp", alt: "Grues portuaires au crépuscule" },
});

const areas = [
  { icon: Search, title: "Sourcing & Trading", text: "Recherche de produits et de fabricants selon votre cahier des charges." },
  { icon: ShieldCheck, title: "Vérification des fournisseurs", text: "Vérification organisée selon le périmètre convenu pour votre projet." },
  { icon: ClipboardCheck, title: "Contrôle qualité", text: "Inspection d'usine et inspection des marchandises avant leur expédition." },
  { icon: FileText, title: "Documentation QC", text: "Rapports structurés, illustrés de photos et, si nécessaire, de vidéos." },
  { icon: Ship, title: "Logistique", text: "Coordination du transport maritime, aérien et intérieur." },
  { icon: ArrowLeftRight, title: "Import & Export", text: "Accompagnement des échanges commerciaux internationaux." },
];

const values = [
  { icon: Eye, title: "Clarté", text: "Des informations précises et des propositions faciles à comparer." },
  { icon: Scale, title: "Transparence", text: "Ce qui a été vérifié, ce qui ne l'a pas été, et pourquoi." },
  { icon: Network, title: "Coordination", text: "Un lien suivi entre vous, les fournisseurs et les transporteurs." },
];

const nextSteps = [
  { title: "Analyse de votre demande", text: "Nous revenons vers vous si des précisions sont nécessaires." },
  { title: "Recherche et consultation", text: "Nous consultons les fournisseurs ou partenaires adaptés." },
  { title: "Proposition", text: "Vous recevez une proposition détaillée, sans engagement de votre part." },
];

export default function AboutContactPage() {
  const channels = [
    contactConfig.whatsapp && {
      icon: <WhatsAppIcon className="size-5" />,
      label: "WhatsApp",
      value: "Écrire à notre équipe",
      href: whatsappUrl(whatsappMessageFor("une demande de devis")),
      external: true,
    },
    contactConfig.email && {
      icon: <Mail aria-hidden className="size-5" />,
      label: "E-mail",
      value: contactConfig.email,
      href: mailtoUrl("Demande d'information — BME SINO TRADE"),
    },
  ].filter((channel): channel is Exclude<typeof channel, undefined | ""> => Boolean(channel));

  return (
    <>
      <PageHero
        eyebrow="À propos & Contact"
        title={
          <>
            {siteConfig.tagline}.
            <span className="block text-white/60">{siteConfig.slogan}.</span>
          </>
        }
        lead={`${siteConfig.legalName} est une société marocaine spécialisée dans le commerce international et la mise en relation entre entreprises, importateurs, fabricants et fournisseurs sur les marchés internationaux.`}
        breadcrumbs={[{ label: "À propos & Contact" }]}
        image={{ src: "/images/about/cranes-dusk.webp", alt: "Grues portuaires et navire à quai à l'heure bleue" }}
        actions={
          <ButtonLink href="#demande" size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
            Nous contacter
          </ButtonLink>
        }
      />

      <Section labelledBy="about-title">
        <Container>
          <SplitMedia image={{ src: "/images/services/factory-floor.webp", alt: "Ligne de production automatisée dans une usine moderne" }}>
            <SectionHeading
              eyebrow="Qui sommes-nous"
              title={<span id="about-title">Une société marocaine tournée vers le commerce international.</span>}
              description={
                <div className="space-y-4">
                  <p>
                    {siteConfig.legalName} est une société marocaine spécialisée dans le commerce international et la mise
                    en relation entre entreprises, importateurs, fabricants et fournisseurs sur les marchés
                    internationaux.
                  </p>
                  <p>
                    Nous accompagnons les projets de sourcing, de vérification des fournisseurs, de contrôle qualité, de
                    documentation QC et de coordination logistique, selon les besoins de chaque client.
                  </p>
                  <p>
                    Acheter à l&apos;international implique de choisir un fournisseur à distance, de comprendre ses
                    conditions et de s&apos;assurer de la conformité des marchandises avant leur départ : notre rôle est
                    de vous aider à prendre ces décisions en connaissance de cause.
                  </p>
                </div>
              }
            />
          </SplitMedia>
        </Container>
      </Section>

      <Section className="bg-surface" labelledBy="areas-title">
        <Container>
          <SectionHeading eyebrow="Domaines d'intervention" title={<span id="areas-title">Ce que nous faisons.</span>} />
          <div className="mt-10 sm:mt-12">
            <FeatureGrid items={areas} />
          </div>
        </Container>
      </Section>

      <Section labelledBy="values-title">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Notre approche"
              title={<span id="values-title">Une relation fondée sur la confiance.</span>}
              description="Des informations vérifiables, des constats documentés et une coordination suivie, pour vous donner les moyens de décider."
            />
            <div className="mt-8">
              <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">Marchés couverts</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {markets.map((market) => (
                  <li key={market.code} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-navy-900">
                    <span className="font-label text-[0.7rem] text-brand-600">{market.code}</span>
                    {market.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="space-y-4 lg:col-span-7">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex gap-5 rounded-[var(--radius-card)] border border-line p-6">
                <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-brand-600" />
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section id="demande" aria-labelledby="form-title" className="scroll-mt-[var(--header-h)] border-t border-line bg-surface py-14 sm:py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <SectionHeading
              eyebrow="Contact"
              title={<span id="form-title">Présentez-nous votre projet.</span>}
              description="Produit à sourcer, fournisseur à rechercher, inspection à organiser ou expédition à coordonner : décrivez votre besoin, nous vous répondons avec une proposition adaptée."
            />
            <div className="mt-8">
              <Suspense fallback={<QuoteForm />}>
                <QuoteFormFromParams />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-4 lg:pt-2">
            {channels.length > 0 && (
              <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h2 className="font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-600">Contact direct</h2>
                <ul className="mt-4 space-y-1">
                  {channels.map((channel) => {
                    const content = (
                      <>
                        <span className="grid size-10 shrink-0 place-items-center rounded-md bg-surface text-brand-600">{channel.icon}</span>
                        <span className="min-w-0">
                          <span className="block text-xs text-muted">{channel.label}</span>
                          <span className="block truncate font-medium text-navy-900">{channel.value}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={channel.label}>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            {...("external" in channel && channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="-mx-2 flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-surface"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="-mx-2 flex items-center gap-3 p-2">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-600">Nos bureaux</h2>
              <ul className="mt-4 divide-y divide-line">
                {offices.map((office) => (
                  <li key={office.code} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-semibold text-navy-900">
                      {office.name} <span className="text-sm font-normal text-muted">· {office.role}</span>
                    </p>
                    {"address" in office && (
                      <p className="mt-2 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        {office.address}
                      </p>
                    )}
                    <div className="mt-2 space-y-1 text-sm">
                      {office.phone && (
                        <a href={telUrl(office.phone)} className="flex items-center gap-2.5 text-navy-900 hover:text-brand-600">
                          <Phone aria-hidden className="size-4 shrink-0 text-brand-600" />
                          {office.phone}
                        </a>
                      )}
                      {"whatsapp" in office && (
                        <a
                          href={whatsappUrlFor(office.whatsapp, whatsappMessageFor("une demande de devis"))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 text-navy-900 hover:text-brand-600"
                        >
                          <WhatsAppIcon className="size-4 shrink-0 text-brand-600" />
                          {office.whatsapp}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] bg-navy-900 p-6 text-white">
              <h2 className="font-label text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cyan-400">Après votre envoi</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-label text-sm text-cyan-400">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="font-semibold text-navy-900">Pour une réponse plus précise</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Joignez une image, une fiche technique, une référence ou un catalogue, et indiquez la quantité ainsi que
                le pays de destination.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
