import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Capabilities } from "@/components/home/capabilities";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { QualityControlHighlight } from "@/components/home/quality-control";
import { GlobalMarkets } from "@/components/home/global-markets";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl, contactConfig, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Sourcing international, contrôle qualité et logistique",
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.shortLegalName} — Sourcing international, contrôle qualité et logistique` },
};

export default function HomePage() {
  const url = absoluteUrl("/");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.legalName,
          alternateName: siteConfig.name,
          slogan: siteConfig.slogan,
          description: siteConfig.description,
          address: { "@type": "PostalAddress", addressCountry: "MA" },
          areaServed: ["Maroc", "Afrique", "Europe", "États-Unis", "Canada"],
          ...(url ? { url, logo: absoluteUrl(siteConfig.logo.src) } : {}),
          ...(contactConfig.email ? { email: contactConfig.email } : {}),
          ...(contactConfig.phone ? { telephone: contactConfig.phone } : {}),
        }}
      />
      <Hero />
      <Capabilities />
      <FeaturedCategories />
      <HowItWorks />
      <QualityControlHighlight />
      <GlobalMarkets />
      <QuoteCTA
        eyebrow="Votre projet"
        title="Vous recherchez un produit ou un fournisseur ?"
        text="Partagez votre besoin avec notre équipe afin d'étudier les solutions adaptées à votre projet."
        label="Envoyer ma demande"
      />
    </>
  );
}
