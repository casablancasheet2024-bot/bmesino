import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isActiveLocale } from "@/i18n/config";
import { products } from "@/data/products";

const productSlugs = new Set(products.map((product) => product.slug));

/**
 * Sends requests that cannot match a page to the 404 page (rendered by
 * app/global-not-found.tsx with the full site layout and a real 404 status):
 *  - a first segment that is not an enabled locale ("/en" before English is
 *    published, mistyped or probing URLs);
 *  - an unknown product slug, which would otherwise be resolved after the
 *    response has started streaming (status 200).
 */
export function proxy(request: NextRequest) {
  const [, locale, section, slug, ...rest] = request.nextUrl.pathname.split("/");

  const unknownLocale = !isActiveLocale(locale);
  const unknownProduct = section === "produits" && slug !== undefined && slug !== "" && (!productSlugs.has(slug) || rest.length > 0);
  if (!unknownLocale && !unknownProduct) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}/_introuvable/404`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next.js internals, public assets and metadata files.
  matcher: ["/((?!_next/|images/|brand/|og-image\\.jpg|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml).+)"],
};
