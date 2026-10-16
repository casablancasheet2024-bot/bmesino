import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "light" | "dark";

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-label text-[0.7rem] font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-brand-600" : "text-cyan-400",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", tone === "light" ? "bg-brand-600" : "bg-cyan-400")} />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center [&>p:first-child]:justify-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-4 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.6rem]",
          tone === "light" ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </Heading>
      {description && (
        <div
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-[1.05rem]",
            tone === "light" ? "text-muted" : "text-white/72",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}
