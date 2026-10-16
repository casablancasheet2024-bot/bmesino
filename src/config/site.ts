import { defaultLocale, localizePath, type LocaleCode } from "@/i18n/config";

/**
 * Site-wide settings.
 *
 * Contact details are intentionally read from environment variables so that
 * no fictional phone number or e-mail address is ever published. Anything left
 * empty is simply not rendered. See README.md → "Configuration client".
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Keep digits only, as required by https://wa.me/<number>. */
function digitsOnly(value: string | undefined): string | undefined {
  const digits = value?.replace(/\D/g, "");
  return digits && digits.length >= 8 ? digits : undefined;
}

export const siteConfig = {
  name: "Bmesino",
  legalName: "BME SINO TRADE SARL",
  shortLegalName: "BME SINO TRADE",
  tagline: "Business & Market Exchange",
  slogan: "Connecting Markets, Creating Opportunities",
  positioning: "Nous connectons les fournisseurs aux marchés du monde entier.",
  description:
    "BME SINO TRADE SARL accompagne les entreprises et importateurs dans le sourcing international en Chine et en Europe, la vérification des fournisseurs, le contrôle qualité et la coordination logistique.",
  country: "Maroc",
  /** Production URL, e.g. https://www.bmesino.com — enables canonical URLs and the sitemap host. */
  url: clean(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/$/, ""),
  logo: {
    src: "/brand/bmesino-logo.png",
    width: 1699,
    height: 550,
  },
  /** White version for dark backgrounds (footer). */
  logoWhite: {
    src: "/brand/bmesino-logo-white.png",
    width: 1675,
    height: 526,
  },
} as const;

export const contactConfig = {
  /** Verified address supplied by the client; the env var can still override it. */
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "contact@bmesino.com",
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  whatsapp: digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  address: clean(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
} as const;

export const markets = [
  { code: "MA", name: "Maroc", role: "Siège de la société · marché de destination" },
  { code: "CN", name: "Chine", role: "Marché d'approvisionnement" },
  { code: "EU", name: "Europe", role: "Marché d'approvisionnement et de destination" },
  { code: "AF", name: "Afrique", role: "Marché de destination" },
  { code: "US", name: "États-Unis", role: "Marché de destination" },
  { code: "CA", name: "Canada", role: "Marché de destination" },
] as const;

export type MarketCode = (typeof markets)[number]["code"];

/** Sourcing origins — goods do not all come from China. */
export const originCodes = ["CN", "EU"] as const satisfies readonly MarketCode[];

/** Trade lanes handled, origin → destination. */
export const tradeRoutes = [
  { from: "CN", to: "MA" },
  { from: "EU", to: "MA" },
  { from: "CN", to: "EU" },
  { from: "CN", to: "AF" },
  { from: "CN", to: "US" },
  { from: "CN", to: "CA" },
] as const satisfies readonly { from: MarketCode; to: MarketCode }[];

export function marketByCode(code: MarketCode) {
  return markets.find((market) => market.code === code)!;
}

/** Absolute URL for an internal path (locale-agnostic paths are localized). Undefined until the domain is configured. */
export function absoluteUrl(path = "/", locale: LocaleCode = defaultLocale): string | undefined {
  return siteConfig.url ? `${siteConfig.url}${localizePath(path, locale)}` : undefined;
}
