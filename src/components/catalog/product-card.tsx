import Image from "next/image";
import { ArrowRight, ImageOff } from "lucide-react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/categories";
import { quoteHref } from "@/data/request-types";
import { Link } from "@/i18n/link";
import { buttonClasses } from "@/components/ui/button";

export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const category = getCategory(product.category);
  const image = product.images[0];
  const Heading = headingLevel;
  const href = `/produits/${product.slug}`;
  // Only verified sheets carry specifications or origin; demo entries never do.
  const keySpecs = product.specifications?.slice(0, 3) ?? [];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift has-[h2_a:focus-visible,h3_a:focus-visible]:ring-2 has-[h2_a:focus-visible,h3_a:focus-visible]:ring-cyan-500">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden bg-surface">
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid h-full place-items-center text-subtle">
            <ImageOff className="size-6" />
          </span>
        )}
        {product.status === "demo" && (
          <span className="absolute left-3 top-3 rounded bg-white/92 px-2 py-0.5 font-label text-[0.62rem] font-medium uppercase tracking-[0.12em] text-muted shadow-soft backdrop-blur">
            Exemple
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <p className="font-label text-[0.68rem] font-medium uppercase tracking-[0.14em] text-brand-600">
            {category.shortName}
            {product.subcategory && <span className="text-subtle"> · {product.subcategory}</span>}
          </p>
        )}
        <Heading className="mt-2 text-[1.08rem] leading-snug font-semibold text-navy-900">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-muted">{product.shortDescription}</p>

        {(keySpecs.length > 0 || product.originCountry) && (
          <dl className="mt-4 space-y-1.5 border-t border-dashed border-line pt-3 text-[0.82rem]">
            {keySpecs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-3">
                <dt className="text-muted">{spec.label}</dt>
                <dd className="text-right font-medium text-navy-900">{spec.value}</dd>
              </div>
            ))}
            {product.originCountry && (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Origine</dt>
                <dd className="text-right font-medium text-navy-900">{product.originCountry}</dd>
              </div>
            )}
          </dl>
        )}

        <p className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
          <span className="font-semibold text-navy-900">Prix sur devis</span>
          <span className="inline-flex items-center gap-1 font-medium text-brand-600">
            Voir les détails
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </p>
        <Link
          href={quoteHref("sourcing-trading", { product: product.slug })}
          className={buttonClasses({ variant: "outline", className: "relative z-10 mt-4 w-full" })}
        >
          Demander un devis
          <span className="sr-only"> pour {product.name}</span>
        </Link>
      </div>
    </article>
  );
}
