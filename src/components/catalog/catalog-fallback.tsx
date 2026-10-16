import { CATALOG_PAGE_SIZE, products } from "@/data/products";
import { ProductCard } from "./product-card";

/**
 * Prerendered first page of the catalogue, shown until the interactive
 * browser (which reads the URL search params) hydrates. Keeps the page indexable.
 */
export function CatalogFallback() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16.5rem_1fr] lg:gap-10">
      <div aria-hidden className="space-y-3">
        <div className="h-5 w-40 rounded bg-surface-2" />
        <div className="h-12 rounded-md border border-line bg-surface" />
        <div className="hidden space-y-2 pt-4 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-9 rounded-md bg-surface" />
          ))}
        </div>
      </div>
      <div className="min-w-0">
        <p className="border-b border-line pb-4 text-sm text-muted">
          <span className="font-semibold text-navy-900">{products.length}</span> produits
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, CATALOG_PAGE_SIZE).map((product) => (
            <li key={product.id}>
              <ProductCard product={product} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
