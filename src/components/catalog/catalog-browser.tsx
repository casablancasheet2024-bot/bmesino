"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, SearchX, X } from "lucide-react";
import { categories, getCategory, isCategorySlug, type CategorySlug } from "@/data/categories";
import { CATALOG_PAGE_SIZE as PAGE_SIZE, normalizeSearch, products } from "@/data/products";
import { quoteHref } from "@/data/request-types";
import { Link } from "@/i18n/link";
import { ProductCard } from "./product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";


function searchableText(product: (typeof products)[number]) {
  const category = getCategory(product.category);
  return normalizeSearch(
    [product.name, product.shortDescription, category?.name, product.subcategory, ...(product.keywords ?? [])]
      .filter(Boolean)
      .join(" "),
  );
}

const index = products.map((product) => ({ product, text: searchableText(product) }));

function buildHref(pathname: string, params: { q?: string; categorie?: CategorySlug | null; page?: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.categorie) search.set("categorie", params.categorie);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function CatalogBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);

  const urlQuery = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("categorie");
  const category = isCategorySlug(rawCategory) ? rawCategory : null;
  const requestedPage = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const [query, setQuery] = useState(urlQuery);

  // Keep the input in sync with back/forward navigation.
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  // Debounced URL update while typing.
  useEffect(() => {
    if (query.trim() === urlQuery) return;
    const timer = window.setTimeout(() => {
      router.replace(buildHref(pathname, { q: query.trim(), categorie: category }), { scroll: false });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, urlQuery, category, pathname, router]);

  const normalizedQuery = normalizeSearch(urlQuery);

  const filtered = useMemo(() => {
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    return index
      .filter(({ product, text }) => (!category || product.category === category) && terms.every((term) => text.includes(term)))
      .map(({ product }) => product);
  }, [category, normalizedQuery]);

  const counts = useMemo(() => {
    const map = new Map<CategorySlug, number>();
    for (const { product } of index) map.set(product.category, (map.get(product.category) ?? 0) + 1);
    return map;
  }, []);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(category || urlQuery);
  const activeCategory = category ? getCategory(category) : undefined;

  const setCategory = (slug: CategorySlug | null) => {
    router.replace(buildHref(pathname, { q: urlQuery, categorie: slug }), { scroll: false });
  };

  const reset = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const chip = (selected: boolean) =>
    cn(
      "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
      selected
        ? "border-navy-900 bg-navy-900 text-white"
        : "border-line-strong bg-white text-ink-soft hover:border-brand-600 hover:text-brand-600",
    );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16.5rem_1fr] lg:gap-10">
      {/* Filters */}
      <aside aria-label="Filtres du catalogue" className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor={searchId} className="text-sm font-semibold text-navy-900">
            Rechercher un produit
          </label>
          <div className="relative mt-2">
            <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex. tracteur, câbles, compresseur…"
              autoComplete="off"
              enterKeyHint="search"
              className="h-12 w-full rounded-md border border-line-strong bg-white pl-10 pr-10 text-[0.95rem] text-ink placeholder:text-subtle focus:border-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-600/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded text-subtle hover:text-navy-900"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
        </form>

        <fieldset className="mt-6 min-w-0">
          <legend className="text-sm font-semibold text-navy-900">Catégories</legend>
          {/* Mobile & tablet: scrollable chips */}
          <div className="scrollbar-none -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-6 sm:px-6 lg:hidden">
            <button type="button" aria-pressed={!category} onClick={() => setCategory(null)} className={chip(!category)}>
              Toutes
            </button>
            {categories.map((item) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={category === item.slug}
                onClick={() => setCategory(category === item.slug ? null : item.slug)}
                className={chip(category === item.slug)}
              >
                {item.shortName}
              </button>
            ))}
          </div>
          {/* Desktop: list with counts */}
          <ul className="mt-3 hidden space-y-1 lg:block">
            {[{ slug: null, name: "Toutes les catégories", count: products.length }, ...categories.map((item) => ({ slug: item.slug, name: item.name, count: counts.get(item.slug) ?? 0 }))].map((item) => {
              const selected = category === item.slug;
              return (
                <li key={item.slug ?? "all"}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item.slug)}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left text-[0.88rem] leading-snug transition-colors",
                      selected ? "bg-navy-900 font-semibold text-white" : "text-ink-soft hover:bg-surface hover:text-navy-900",
                    )}
                  >
                    <span>{item.name}</span>
                    <span className={cn("font-label text-xs", selected ? "text-cyan-400" : "text-subtle")}>{item.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </aside>

      {/* Results */}
      <div ref={resultsRef} className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p aria-live="polite" className="text-sm text-muted">
            <span className="font-semibold text-navy-900">{filtered.length}</span>{" "}
            {filtered.length > 1 ? "produits" : "produit"}
            {activeCategory ? ` · ${activeCategory.shortName}` : ""}
          </p>
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {activeCategory && (
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 py-1 pl-3 pr-2 text-xs font-medium text-navy-900 hover:bg-line"
                >
                  {activeCategory.shortName}
                  <X aria-hidden className="size-3.5" />
                  <span className="sr-only">Retirer le filtre catégorie</span>
                </button>
              )}
              {urlQuery && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 py-1 pl-3 pr-2 text-xs font-medium text-navy-900 hover:bg-line"
                >
                  « {urlQuery} »
                  <X aria-hidden className="size-3.5" />
                  <span className="sr-only">Retirer la recherche</span>
                </button>
              )}
              <button type="button" onClick={reset} className="text-xs font-semibold text-brand-600 underline-offset-4 hover:underline">
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        {activeCategory && (
          <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-navy-900">{activeCategory.name}</h2>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{activeCategory.description}</p>
            {activeCategory.subcategories.length > 0 && (
              <div className="mt-4">
                <p className="font-label text-[0.66rem] uppercase tracking-[0.14em] text-subtle">Familles de produits sourcées</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {activeCategory.subcategories.map((name) => (
                    <li key={name} className="rounded-full border border-line bg-white px-3 py-1 text-[0.8rem] text-ink-soft">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {visible.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} headingLevel={activeCategory ? "h3" : "h2"} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <EmptyState
              icon={SearchX}
              title="Vous ne trouvez pas le produit recherché ? Envoyez-nous votre demande."
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={quoteHref("sourcing-trading")} className={buttonClasses()}>
                    Envoyer une demande de sourcing
                  </Link>
                  <button type="button" onClick={reset} className={buttonClasses({ variant: "outline" })}>
                    Réinitialiser les filtres
                  </button>
                </div>
              }
            >
              Aucune fiche ne correspond à {urlQuery ? <>« {urlQuery} »</> : "ces critères"}
              {activeCategory ? <> dans la catégorie {activeCategory.shortName}</> : null}. Notre catalogue en ligne ne
              présente qu&apos;une partie des produits que nous pouvons sourcer : décrivez votre besoin, nous rechercherons
              des fournisseurs adaptés.
            </EmptyState>
          </div>
        )}

        {pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
            <PageLink href={buildHref(pathname, { q: urlQuery, categorie: category, page: page - 1 })} disabled={page === 1} label="Page précédente">
              <ChevronLeft aria-hidden className="size-4" />
            </PageLink>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <Link
                key={number}
                href={buildHref(pathname, { q: urlQuery, categorie: category, page: number })}
                scroll={false}
                onClick={() => resultsRef.current?.scrollIntoView({ block: "start" })}
                aria-current={number === page ? "page" : undefined}
                className={cn(
                  "grid size-10 place-items-center rounded-md font-label text-sm transition-colors",
                  number === page ? "bg-navy-900 text-white" : "text-ink-soft hover:bg-surface",
                )}
              >
                {number}
              </Link>
            ))}
            <PageLink href={buildHref(pathname, { q: urlQuery, categorie: category, page: page + 1 })} disabled={page === pageCount} label="Page suivante">
              <ChevronRight aria-hidden className="size-4" />
            </PageLink>
          </nav>
        )}
      </div>
    </div>
  );
}

function PageLink({ href, disabled, label, children }: { href: string; disabled: boolean; label: string; children: React.ReactNode }) {
  const className = "grid size-10 place-items-center rounded-md border border-line text-navy-900 transition-colors";
  if (disabled) {
    return (
      <span aria-hidden className={cn(className, "opacity-40")}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} scroll={false} aria-label={label} className={cn(className, "hover:border-brand-600 hover:text-brand-600")}>
      {children}
    </Link>
  );
}
