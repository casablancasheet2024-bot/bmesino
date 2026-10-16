"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales, switchLocalePath } from "@/i18n/config";
import { useLocale } from "@/i18n/link";
import { cn } from "@/lib/cn";

/**
 * Language selector. Only enabled locales are links; the others are shown as
 * "bientôt" so visitors know the site will be translated, without dead links.
 */
export function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "inline" }) {
  const current = useLocale();
  const pathname = usePathname();

  if (variant === "inline") {
    return (
      <div>
        <p className="font-label text-[0.68rem] uppercase tracking-[0.16em] text-subtle">Langue</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {locales.map((locale) => {
            const active = locale.code === current;
            const content = (
              <>
                <span className="font-label text-sm font-medium">{locale.short}</span>
                <span lang={locale.htmlLang} dir={locale.dir} className="text-[0.7rem]">
                  {locale.enabled ? locale.label : "Bientôt"}
                </span>
              </>
            );
            const className = cn(
              "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-md border px-2 text-center",
              active
                ? "border-navy-900 bg-navy-900 text-white"
                : locale.enabled
                  ? "border-line-strong text-navy-900 hover:border-brand-600"
                  : "border-dashed border-line text-subtle",
            );
            return (
              <li key={locale.code}>
                {locale.enabled ? (
                  <NextLink
                    href={switchLocalePath(pathname, locale.code)}
                    hrefLang={locale.htmlLang}
                    aria-current={active ? "true" : undefined}
                    aria-label={locale.label}
                    className={className}
                  >
                    {content}
                  </NextLink>
                ) : (
                  <span aria-disabled="true" aria-label={`${locale.label} — bientôt disponible`} className={className}>
                    {content}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <LanguageMenu current={current} pathname={pathname} />;
}

function LanguageMenu({ current, pathname }: { current: string; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const currentMeta = locales.find((locale) => locale.code === current) ?? locales[0];

  // Reset when the route is hidden by <Activity> (Cache Components).
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Langue : ${currentMeta.label}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-navy-900"
      >
        <Globe aria-hidden className="size-4" />
        <span className="font-label">{currentMeta.short}</span>
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div id={menuId} hidden={!open} className="absolute right-0 top-full z-50 w-56 pt-2">
        <ul className="animate-in overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-1.5 shadow-lift">
          {locales.map((locale) => {
            const active = locale.code === current;
            return (
              <li key={locale.code}>
                {locale.enabled ? (
                  <NextLink
                    href={switchLocalePath(pathname, locale.code)}
                    hrefLang={locale.htmlLang}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-navy-900 hover:bg-surface focus-visible:bg-surface"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 font-label text-xs text-brand-600">{locale.short}</span>
                      <span lang={locale.htmlLang}>{locale.label}</span>
                    </span>
                    {active && <Check aria-hidden className="size-4 text-brand-600" />}
                  </NextLink>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-subtle"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 font-label text-xs">{locale.short}</span>
                      <span lang={locale.htmlLang} dir={locale.dir}>
                        {locale.label}
                      </span>
                    </span>
                    <span className="font-label text-[0.62rem] uppercase tracking-[0.12em]">Bientôt</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
