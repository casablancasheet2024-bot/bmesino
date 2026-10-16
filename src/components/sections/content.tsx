import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronDown, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Feature = {
  id?: string;
  icon?: LucideIcon;
  title: string;
  text: ReactNode;
  points?: string[];
};

/** Detailed numbered rows — used for substantive service explanations. */
export function FeatureRows({ items }: { items: Feature[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <li
            key={item.title}
            id={item.id}
            className="reveal grid grid-cols-1 scroll-mt-[calc(var(--header-h)+1.5rem)] gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:py-10"
          >
            <div className="flex items-center gap-3 sm:block">
              <span className="font-label text-sm font-medium text-brand-600">{String(index + 1).padStart(2, "0")}</span>
              {Icon && (
                <span className="grid size-10 place-items-center rounded-md bg-surface text-brand-600 sm:mt-4">
                  <Icon aria-hidden className="size-5" />
                </span>
              )}
            </div>
            <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em] text-navy-900 lg:text-[1.35rem]">{item.title}</h3>
            <div className="sm:col-start-2 lg:col-start-auto">
              <div className="leading-relaxed text-ink-soft">{item.text}</div>
              {item.points && <CheckList items={item.points} className="mt-4" />}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Compact icon cards. */
export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.title} id={item.id} className="reveal scroll-mt-[calc(var(--header-h)+1.5rem)] bg-white p-6 sm:p-7">
            {Icon && (
              <span className="grid size-11 place-items-center rounded-md bg-surface text-brand-600">
                <Icon aria-hidden className="size-5" />
              </span>
            )}
            <h3 className="mt-5 text-[1.08rem] font-semibold text-navy-900">{item.title}</h3>
            <div className="mt-2 text-[0.93rem] leading-relaxed text-muted">{item.text}</div>
            {item.points && <CheckList items={item.points} className="mt-4" compact />}
          </li>
        );
      })}
    </ul>
  );
}

export function CheckList({ items, className, compact, tone = "light" }: { items: string[]; className?: string; compact?: boolean; tone?: "light" | "dark" }) {
  return (
    <ul className={cn(compact ? "space-y-2" : "space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-2.5", compact ? "text-[0.9rem]" : "text-[0.95rem]", tone === "light" ? "text-ink-soft" : "text-white/80")}>
          <Check aria-hidden className={cn("mt-1 size-4 shrink-0", tone === "light" ? "text-brand-600" : "text-cyan-400")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function InfoNote({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <aside className={cn("flex gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6", className)}>
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
      <div className="text-[0.93rem] leading-relaxed text-ink-soft">
        {title && <p className="mb-1 font-semibold text-navy-900">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

export function Faq({ items }: { items: { question: string; answer: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-navy-900 transition-colors hover:text-brand-600 [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown aria-hidden className="size-5 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-5 pr-8 leading-relaxed text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function SplitMedia({
  image,
  children,
  reverse,
  className,
}: {
  image: { src: string; alt: string };
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16", className)}>
      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]", reverse && "lg:order-last")}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
      </div>
      <div>{children}</div>
    </div>
  );
}
