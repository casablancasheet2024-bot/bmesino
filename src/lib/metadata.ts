import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { activeLocales, defaultLocale, getLocaleMeta, localizePath, type LocaleCode } from "@/i18n/config";

export const defaultOgImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.slogan}`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Locale-agnostic path, e.g. "/produits". */
  path: string;
  locale?: LocaleCode;
  image?: { src: string; alt: string };
  noIndex?: boolean;
};

/**
 * Consistent per-page metadata. Canonical and hreflang URLs are only emitted
 * once the production domain is configured (NEXT_PUBLIC_SITE_URL).
 */
export function pageMetadata({ title, description, path, locale = defaultLocale, image, noIndex }: PageMetadataInput): Metadata {
  const url = localizePath(path, locale);
  return {
    title,
    description,
    ...(siteConfig.url
      ? {
          alternates: {
            canonical: url,
            languages: {
              ...Object.fromEntries(activeLocales.map((item) => [item.htmlLang, localizePath(path, item.code)])),
              "x-default": localizePath(path, defaultLocale),
            },
          },
        }
      : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: getLocaleMeta(locale).ogLocale,
      type: "website",
      images: [image ? { url: image.src, alt: image.alt } : defaultOgImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
