"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { localizePath, resolveLocale, type LocaleCode } from "./config";

/** Current locale from the `[locale]` segment (falls back to the default locale, e.g. on the global 404). */
export function useLocale(): LocaleCode {
  const params = useParams<{ locale?: string }>();
  return resolveLocale(params?.locale);
}

/**
 * Drop-in replacement for `next/link`: internal hrefs are written without a
 * locale ("/produits") and prefixed with the current one ("/fr/produits").
 */
export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localizePath(href, locale) : href} {...props} />;
}
