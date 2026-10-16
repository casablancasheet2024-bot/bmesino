import Image from "next/image";
import { Link } from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { quoteHref } from "@/data/request-types";

export function FeaturedCategories() {
  return (
    <Section labelledBy="categories-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Catalogue"
            title={<span id="categories-title">Sept familles de produits à sourcer.</span>}
            description="Machines, équipements, pièces et biens de consommation : explorez nos catégories ou transmettez-nous directement votre besoin."
          />
          <ButtonLink href="/produits" variant="outline" arrow className="self-start lg:self-auto">
            Explorer les produits
          </ButtonLink>
        </div>
      </Container>

      {/* Horizontal scroll-snap rail on mobile, editorial grid from lg. */}
      <div className="mt-10 lg:mx-auto lg:mt-12 lg:max-w-[1240px] lg:px-8">
        <ul
          aria-label="Catégories de produits"
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-6 sm:px-6 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {categories.map((category, index) => (
            <li
              key={category.slug}
              className={cn(
                "w-[78%] shrink-0 snap-start min-[480px]:w-[60%] sm:w-[44%] lg:w-auto",
                index === 0 && "lg:col-span-2 lg:row-span-2",
              )}
            >
              <Link
                href={`/produits?categorie=${category.slug}`}
                className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-navy-900 text-white lg:min-h-[15.5rem]"
              >
                <Image
                  src={category.image.src}
                  alt=""
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 600px, 80vw" : "(min-width: 1024px) 300px, 80vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/45 to-navy-950/5" />
                <div className="relative p-5 sm:p-6">
                  <span className="font-label text-[0.7rem] text-cyan-400">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={cn("mt-2 leading-snug font-semibold", index === 0 ? "text-xl lg:text-[1.75rem]" : "text-[1.05rem]")}>
                    {category.name}
                  </h3>
                  {index === 0 && <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-white/75 lg:block">{category.description}</p>}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                    Voir les produits
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="w-[78%] shrink-0 snap-start min-[480px]:w-[60%] sm:w-[44%] lg:col-span-2 lg:w-auto">
            <Link
              href={quoteHref("sourcing-trading")}
              className="group flex h-full min-h-[19rem] flex-col justify-between rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface p-5 transition-colors hover:border-brand-600 sm:p-6 lg:min-h-[15.5rem]"
            >
              <span className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-brand-600">Sur mesure</span>
              <span>
                <span className="block text-[1.05rem] leading-snug font-semibold text-navy-900 lg:text-xl">
                  Votre produit ne figure pas dans ces catégories ?
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  Décrivez-le : nous recherchons des fabricants adaptés à votre besoin.
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Envoyer une demande de sourcing
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
}
