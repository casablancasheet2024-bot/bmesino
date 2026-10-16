"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { CONTACT_FORM_PATH } from "@/data/request-types";
import { localizePath } from "@/i18n/config";
import { Link, useLocale } from "@/i18n/link";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./language-switcher";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** Full navigation from this width; below it, the menu button takes over. */
const DESKTOP_QUERY = "(min-width: 1280px)";

function useIsActive() {
  const pathname = usePathname();
  const locale = useLocale();
  return (href: string) => {
    const target = localizePath(href, locale);
    return href === "/" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };
}

export function SiteNav() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop                                                             */
/* ------------------------------------------------------------------ */

function DesktopNav() {
  const isActive = useIsActive();

  return (
    <div className="hidden items-center gap-3 xl:flex">
      <nav aria-label="Navigation principale">
        <ul className="flex items-center">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center whitespace-nowrap px-2.5 text-[0.9rem] font-medium transition-colors 2xl:px-3",
                    "after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-600 after:transition-transform after:duration-300 2xl:after:inset-x-3",
                    active ? "text-navy-900 after:scale-x-100" : "text-ink-soft hover:text-brand-600 hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <span aria-hidden className="h-6 w-px bg-line" />
      <LanguageSwitcher />
      <Link href={CONTACT_FORM_PATH} className={buttonClasses({ size: "md", className: "whitespace-nowrap" })}>
        Demander un devis
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile & tablet                                                     */
/* ------------------------------------------------------------------ */

function MobileNav() {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Reset when the route is hidden by <Activity> (Cache Components).
  useLayoutEffect(() => () => setOpen(false), []);

  // Scroll lock, Escape, focus trap.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.offsetParent !== null,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia(DESKTOP_QUERY).matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 xl:hidden">
      <Link
        href={CONTACT_FORM_PATH}
        onClick={() => close()}
        className={buttonClasses({ size: "md", className: "min-h-10 px-3.5 sm:min-h-11 sm:px-4" })}
      >
        <span className="sm:hidden" aria-hidden>
          Devis
        </span>
        <span className="sr-only sm:not-sr-only">Demander un devis</span>
      </Link>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 grid size-11 place-items-center rounded-md text-navy-900 transition-colors hover:bg-surface"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto overscroll-contain border-t border-line bg-white"
      >
        <div className="animate-in mx-auto flex min-h-full max-w-xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
          <nav aria-label="Navigation mobile">
            <ul>
              {primaryNav.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => close()}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center gap-4 border-b border-line py-3 text-[1.08rem] font-medium",
                        active ? "text-brand-600" : "text-navy-900",
                      )}
                    >
                      <span className="w-6 font-label text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight aria-hidden className={cn("size-4", active ? "text-brand-600" : "text-subtle")} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8">
            <LanguageSwitcher variant="inline" />
          </div>

          {/* CTA sits at the bottom, within thumb reach. */}
          <div className="mt-auto pt-8">
            <Link href={CONTACT_FORM_PATH} onClick={() => close()} className={buttonClasses({ size: "lg", className: "w-full" })}>
              Demander un devis
            </Link>
            <p className="mt-4 text-center font-label text-[0.68rem] uppercase tracking-[0.18em] text-subtle">
              Business &amp; Market Exchange
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
