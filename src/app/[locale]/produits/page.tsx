import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { CatalogFallback } from "@/components/catalog/catalog-fallback";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { products } from "@/data/products";
import { quoteHref } from "@/data/request-types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Catalogue de produits",
  description:
    "Machines de construction, équipements agricoles, outillage, pièces automobiles, machines industrielles, produits domestiques et matériel électrique : demandez un devis à BME SINO TRADE.",
  path: "/produits",
});

export default function ProductsPage() {
  const hasDemo = products.some((product) => product.status === "demo");

  return (
    <>
      <PageHero
        eyebrow="Catalogue B2B"
        title="Un catalogue professionnel, des prix sur devis."
        lead="Explorez nos familles de produits et demandez un devis. Chaque offre dépend des quantités, des spécifications, de la disponibilité et de la destination."
        breadcrumbs={[{ label: "Produits" }]}
        actions={
          <>
            <ButtonLink href={quoteHref("sourcing-trading")} size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
              Demander un devis
            </ButtonLink>
            <ButtonLink href="#catalogue" variant="outline-light" size="lg">
              Explorer les produits
            </ButtonLink>
          </>
        }
      />

      <section id="catalogue" aria-label="Catalogue" className="scroll-mt-[var(--header-h)] py-10 sm:py-14 lg:py-16">
        <Container>
          {hasDemo && (
            <p className="mb-8 flex items-start gap-3 rounded-md border border-line bg-surface px-4 py-3 text-[0.88rem] leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>
                Catalogue en cours de constitution. Les fiches marquées <strong className="font-semibold text-navy-900">Exemple</strong>{" "}
                illustrent des familles de produits que nous pouvons rechercher ; leurs caractéristiques sont définies avec
                vous lors de la demande de devis.
              </span>
            </p>
          )}
          <Suspense fallback={<CatalogFallback />}>
            <CatalogBrowser />
          </Suspense>
        </Container>
      </section>

      <QuoteCTA
        eyebrow="Sourcing sur mesure"
        title="Votre produit n'apparaît pas dans le catalogue ?"
        text="Transmettez-nous une photo, une référence, des spécifications ou un catalogue fournisseur. Nous rechercherons des fabricants adaptés."
        href={quoteHref("sourcing-trading")}
        label="Envoyer une demande de sourcing"
        whatsappSubject="une recherche de produit"
      />
    </>
  );
}
