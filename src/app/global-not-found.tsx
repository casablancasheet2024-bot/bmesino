import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { getLocaleMeta, defaultLocale } from "@/i18n/config";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundContent } from "@/components/sections/not-found-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable | BME SINO TRADE",
  robots: { index: false, follow: true },
};

/** Unmatched URLs (outside any route) — rendered with the default locale. */
export default function GlobalNotFound() {
  const meta = getLocaleMeta(defaultLocale);
  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <SiteShell>
          <NotFoundContent />
        </SiteShell>
      </body>
    </html>
  );
}
