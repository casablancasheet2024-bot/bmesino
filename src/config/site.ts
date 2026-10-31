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

/** Offices and direct lines, as supplied by the client (2026-10-31). */
export const offices = [
  {
    code: "MA",
    name: "Bureau Maroc",
    role: "Siège",
    address: "147 Bd La Résistance, Rés. AFA, Étage 1, Appt 16, Dom. chez Nexus, Casablanca, Maroc",
    phone: "+212 664 404 923",
    whatsapp: "+212 634 264 577",
  },
  {
    code: "CN",
    name: "Bureau Chine",
    role: "Sourcing & contrôle qualité",
    address:
      "Salle 1F020-045, Parking Jin Fuyuan, n° 680, route Chouzhou Nord, Yiwu, ville de Jinhua, province du Zhejiang, Chine",
    phone: "+86 139 5749 3838",
    whatsapp: "+86 130 4071 9060",
  },
  {
    code: "IT",
    name: "Italie",
    role: "Contact Europe",
    phone: "+39 353 336 6983",
  },
] as const satisfies readonly {
  code: string;
  name: string;
  role: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
}[];

const headOffice = offices[0];

export const contactConfig = {
  /** Verified details supplied by the client (head office); env vars can still override them. */
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "contact@bmesino.com",
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? headOffice.phone,
  whatsapp: digitsOnly(clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? headOffice.whatsapp),
  address: clean(process.env.NEXT_PUBLIC_CONTACT_ADDRESS) ?? headOffice.address,
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
