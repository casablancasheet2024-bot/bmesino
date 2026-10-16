import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { activeLocales, getLocaleMeta, isActiveLocale } from "@/i18n/config";
import { defaultOgImage } from "@/lib/metadata";
import { fontVariables } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/site-shell";
import "../globals.css";

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale: locale.code }));
}

export const metadata: Metadata = {
  // Absolute URLs for social images. Canonicals are only emitted when NEXT_PUBLIC_SITE_URL is set (see lib/metadata).
  metadataBase: new URL(
    siteConfig.url ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: {
    default: `${siteConfig.shortLegalName} — Sourcing international, contrôle qualité et logistique`,
    template: `%s | ${siteConfig.shortLegalName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#082b63",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();
  const meta = getLocaleMeta(locale);

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
