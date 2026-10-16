import type { Metadata } from "next";
import { Link } from "@/i18n/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardCheck, FileText, Info, MessageSquareText, Package, Ruler, Ship } from "lucide-react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Container, SectionHeading } from "@/components/ui/layout";
import { absoluteUrl } from "@/config/site";
import { getCategory } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { quoteHref } from "@/data/request-types";
import { whatsappUrl } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/produits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit introuvable" };

  return pageMetadata({
    title: product.seoTitle ?? `${product.name} — prix sur devis`,
    description: product.seoDescription ?? product.shortDescription,
    path: `/produits/${product.slug}`,
    image: product.images[0],
    // Illustrative entries stay out of search results until replaced by verified sheets.
    noIndex: product.status === "demo",
  });
}

const requestChecklist = [
  { icon: Ruler, label: "Spécifications techniques ou références souhaitées" },
  { icon: Package, label: "Quantité estimée et conditionnement" },
  { icon: Ship, label: "Pays et ville de destination" },
  { icon: ClipboardCheck, label: "Normes, certifications ou contrôle qualité attendus" },
];

export default async function ProductPage({ params }: PageProps<"/[locale]/produits/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const isDemo = product.status === "demo";
  const productUrl = absoluteUrl(`/produits/${product.slug}`);
  const whatsapp = whatsappUrl(
    `Bonjour BME SINO TRADE, je souhaite recevoir un devis pour : ${product.name}${productUrl ? ` (${productUrl})` : ""}.`,
  );
  const hasSpecs = Boolean(product.specifications?.length);
  const verifiedDetails = [
    product.originCountry && { label: "Origine", value: product.originCountry },
    product.supplierInformation && { label: "Fournisseur", value: product.supplierInformation },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumbs
            items={[
              { label: "Produits", href: "/produits" },
              ...(category ? [{ label: category.shortName, href: `/produits?categorie=${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
          <Link
            href={category ? `/produits?categorie=${category.slug}` : "/produits"}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 hover:text-navy-900 sm:self-auto"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Retour au catalogue
          </Link>
        </Container>
      </div>

      <article>
        <Container className="grid grid-cols-1 gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <ProductGallery images={product.images} name={product.name} badge={isDemo ? "Exemple" : undefined} />

          <div className="lg:py-2">
            {category && (
              <Link
                href={`/produits?categorie=${category.slug}`}
                className="font-label text-[0.72rem] font-medium uppercase tracking-[0.14em] text-brand-600 hover:text-navy-900"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-3 text-[2rem] leading-[1.1] font-semibold tracking-[-0.025em] text-navy-900 sm:text-[2.6rem]">
              {product.name}
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{product.shortDescription}</p>

            <div className="mt-7 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-soft sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-semibold text-navy-900">Prix sur devis</p>
                <p className="text-sm text-muted">Selon quantités, options et destination</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={quoteHref("sourcing-trading", { product: product.slug })} size="lg" arrow className="flex-1">
                  Demander un devis
                </ButtonLink>
                {whatsapp && (
                  <ExternalButton href={whatsapp} variant="outline" size="lg" icon={<WhatsAppIcon className="size-4 text-[#1fa855]" />} className="flex-1">
                    WhatsApp
                  </ExternalButton>
                )}
              </div>
            </div>

            {isDemo && (
              <p className="mt-5 flex items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                Fiche d&apos;exemple : elle présente une famille de produits que nous pouvons sourcer. Aucune caractéristique
                ni aucun fournisseur ne sont engagés tant que votre besoin n&apos;a pas été précisé.
              </p>
            )}

            <div className="mt-8 space-y-4 text-[0.98rem] leading-relaxed text-ink-soft">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8 border-t border-line pt-6">
                <h2 className="font-label text-[0.68rem] uppercase tracking-[0.14em] text-subtle">Options et variantes</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <li key={variant} className="rounded-full border border-line-strong px-3 py-1 text-sm text-navy-900">
                      {variant}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {verifiedDetails.length > 0 && (
              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
                {verifiedDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt className="font-label text-[0.68rem] uppercase tracking-[0.14em] text-subtle">{detail.label}</dt>
                    <dd className="mt-1 font-medium text-navy-900">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Container>

        <section aria-labelledby="specs-title" className="border-y border-line bg-surface py-12 sm:py-16">
          <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 id="specs-title" className="text-2xl font-semibold tracking-[-0.02em] text-navy-900">
                Caractéristiques techniques
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {hasSpecs
                  ? "Caractéristiques communiquées à titre indicatif ; elles sont confirmées dans chaque offre."
                  : "La fiche technique est établie à partir de votre demande et des offres reçues des fabricants."}
              </p>
            </div>
            <div className="lg:col-span-8">
              {hasSpecs ? (
                <dl className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                  {product.specifications!.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                      <dt className="text-sm font-medium text-muted">{spec.label}</dt>
                      <dd className="text-[0.95rem] font-medium text-navy-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-md bg-surface text-brand-600">
                      <FileText aria-hidden className="size-5" />
                    </span>
                    <p className="font-semibold text-navy-900">Fiche technique sur demande</p>
                  </div>
                  <p className="mt-4 text-[0.95rem] text-muted">Pour une offre précise, indiquez-nous si possible :</p>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {requestChecklist.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-start gap-3 rounded-md bg-surface px-4 py-3 text-[0.92rem] text-navy-900">
                        <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        {label}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={quoteHref("sourcing-trading", { product: product.slug })}
                    variant="secondary"
                    arrow
                    icon={<MessageSquareText aria-hidden className="size-4" />}
                    className="mt-6 w-full sm:w-auto"
                  >
                    Préciser ma demande
                  </ButtonLink>
                </div>
              )}
            </div>
          </Container>
        </section>
        <section aria-labelledby="notes-title" className="py-12 sm:py-16">
          <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2 id="notes-title" className="text-2xl font-semibold tracking-[-0.02em] text-navy-900">
                Notes de sourcing
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">Ce qui est précisé avec vous avant toute commande.</p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
              {[
                ...(product.sourcingNotes ?? []),
                "Quantité minimale de commande (MOQ), échantillons et délais de production, confirmés par le fournisseur dans chaque offre.",
                "Conditions de paiement, incoterm et conditionnement, discutés avant l'engagement.",
                "Inspection d'usine ou avant expédition, si vous souhaitez faire contrôler la marchandise.",
                "Transport jusqu'à votre destination, chiffré séparément selon le volume et le mode d'expédition.",
              ].map((note) => (
                <li key={note} className="flex items-start gap-3 rounded-md border border-line bg-white px-4 py-3.5 text-[0.92rem] leading-relaxed text-ink-soft">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {note}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-surface py-14 sm:py-20">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="À découvrir" title={<span id="related-title">Produits associés</span>} />
              <ButtonLink href="/produits" variant="outline" arrow className="self-start sm:self-auto">
                Tout le catalogue
              </ButtonLink>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
