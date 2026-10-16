import { Link } from "@/i18n/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "./json-ld";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  const canStructure = all.every((item, index) => item.href || index === all.length - 1) && absoluteUrl("/");

  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8rem]">
        {all.map((item, index) => {
          const last = index === all.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 transition-colors hover:underline",
                    tone === "light" ? "text-muted hover:text-navy-900" : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={tone === "light" ? "text-navy-900" : "text-white"}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className={cn("size-3.5", tone === "light" ? "text-subtle" : "text-white/40")} />}
            </li>
          );
        })}
      </ol>
      {canStructure && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              ...(item.href ? { item: absoluteUrl(item.href) } : {}),
            })),
          }}
        />
      )}
    </nav>
  );
}
