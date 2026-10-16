/**
 * Locale configuration.
 *
 * Every page lives under `app/[locale]`. Only locales marked `enabled` are
 * prerendered and reachable; the others are listed so the language selector
 * and the routing are ready for them. To open a new language, translate its
 * content (see README → "Ajouter une langue") and set `enabled: true`.
 */
export const locales = [
  { code: "fr", label: "Français", short: "FR", htmlLang: "fr", dir: "ltr", ogLocale: "fr_MA", enabled: true },
  { code: "en", label: "English", short: "EN", htmlLang: "en", dir: "ltr", ogLocale: "en_US", enabled: false },
  { code: "ar", label: "العربية", short: "AR", htmlLang: "ar", dir: "rtl", ogLocale: "ar_MA", enabled: false },
] as const;

export type LocaleCode = (typeof locales)[number]["code"];
export type LocaleMeta = (typeof locales)[number];

export const defaultLocale: LocaleCode = "fr";

export const activeLocales = locales.filter((locale) => locale.enabled);

export function isActiveLocale(value: unknown): value is LocaleCode {
  return activeLocales.some((locale) => locale.code === value);
}

export function getLocaleMeta(code: LocaleCode): LocaleMeta {
  return locales.find((locale) => locale.code === code) ?? locales[0];
}

export function resolveLocale(value: unknown): LocaleCode {
  return isActiveLocale(value) ? value : defaultLocale;
}

const LOCALE_PREFIX = new RegExp(`^/(${locales.map((locale) => locale.code).join("|")})(?=/|$|[?#])`);

/**
 * Prefixes an internal, locale-agnostic path with the locale:
 * "/produits?x=1" → "/fr/produits?x=1", "/#services" → "/fr#services".
 * External URLs, anchors, files ("/brand/logo.png") and already-localized
 * paths are returned unchanged.
 */
export function localizePath(path: string, locale: LocaleCode = defaultLocale): string {
  if (!path.startsWith("/") || path.startsWith("//") || LOCALE_PREFIX.test(path)) return path;
  if (/\.[a-z0-9]+$/i.test(path.split(/[?#]/)[0])) return path;
  if (path === "/" || path.startsWith("/?") || path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Replaces the locale segment of a localized pathname (used by the language selector). */
export function switchLocalePath(pathname: string, locale: LocaleCode): string {
  return LOCALE_PREFIX.test(pathname) ? pathname.replace(LOCALE_PREFIX, `/${locale}`) : localizePath(pathname, locale);
}
