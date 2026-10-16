import type { NextConfig } from "next";

const defaultLocale = "fr";

/** Unprefixed shortcuts (and the first version's URLs) → localized routes. */
const legacyRoutes: [string, string][] = [
  ["/produits", "/produits"],
  ["/produits/:slug", "/produits/:slug"],
  ["/sourcing-trading", "/sourcing-trading"],
  ["/controle-qualite", "/controle-qualite"],
  ["/logistique", "/logistique"],
  ["/a-propos-contact", "/a-propos-contact"],
  ["/mentions-legales", "/mentions-legales"],
  ["/politique-de-confidentialite", "/politique-de-confidentialite"],
  ["/sourcing-chine", "/sourcing-trading"],
  ["/commerce-international", "/sourcing-trading"],
  ["/services", "/"],
  ["/rapports-qc", "/controle-qualite"],
  ["/a-propos", "/a-propos-contact"],
  ["/contact", "/a-propos-contact"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      // Temporary, so that browser-language detection can be introduced later without cached 308s.
      { source: "/", destination: `/${defaultLocale}`, permanent: false },
      ...legacyRoutes.map(([source, destination]) => ({
        source,
        destination: `/${defaultLocale}${destination === "/" ? "" : destination}`,
        permanent: false,
      })),
    ];
  },
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Root layout lives in app/[locale]: unmatched URLs render app/global-not-found.tsx.
    globalNotFound: true,
    serverActions: {
      // Inquiry attachments are capped at 5 MB; leave headroom for multipart overhead.
      bodySizeLimit: "6mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
