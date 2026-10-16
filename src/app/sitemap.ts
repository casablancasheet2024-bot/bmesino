import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { activeLocales, localizePath } from "@/i18n/config";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/produits", priority: 0.9 },
  { path: "/sourcing-trading", priority: 0.9 },
  { path: "/controle-qualite", priority: 0.9 },
  { path: "/logistique", priority: 0.8 },
  { path: "/a-propos-contact", priority: 0.8 },
];

/** Uses NEXT_PUBLIC_SITE_URL. Illustrative ("demo") products are excluded until verified. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url ?? "http://localhost:3000";
  const routes = [
    ...staticRoutes,
    ...products
      .filter((product) => product.status === "verified")
      .map((product) => ({ path: `/produits/${product.slug}`, priority: 0.6 })),
  ];
  return activeLocales.flatMap((locale) =>
    routes.map((route) => ({ url: `${base}${localizePath(route.path, locale.code)}`, priority: route.priority })),
  );
}
