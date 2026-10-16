import { cn } from "@/lib/cn";

export type ProcessStep = {
  title: string;
  text: string;
  optional?: boolean;
};

/** Numbered process. Horizontal on large screens, vertical timeline on mobile. */
export function ProcessSteps({
  steps,
  tone = "light",
  columns = 3,
}: {
  steps: ProcessStep[];
  tone?: "light" | "dark";
  columns?: 2 | 3 | 6;
}) {
  const dark = tone === "dark";
  return (
    <ol
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border",
        dark ? "border-white/10 bg-white/10" : "border-line bg-line",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 6 && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className={cn("reveal relative flex flex-col p-6 sm:p-7", dark ? "bg-navy-950" : "bg-white")}>
          <div className="flex items-center justify-between gap-3">
            <span className={cn("font-label text-sm font-medium", dark ? "text-cyan-400" : "text-brand-600")}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {step.optional && (
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 font-label text-[0.65rem] uppercase tracking-[0.12em]",
                  dark ? "border-white/20 text-white/60" : "border-line-strong text-muted",
                )}
              >
                Selon besoin
              </span>
            )}
          </div>
          <span aria-hidden className={cn("mt-4 block h-px w-10", dark ? "bg-cyan-400/60" : "bg-brand-600/40")} />
          <h3 className={cn("mt-4 text-[1.05rem] leading-snug font-semibold", dark ? "text-white" : "text-navy-900")}>{step.title}</h3>
          <p className={cn("mt-2 text-[0.92rem] leading-relaxed", dark ? "text-white/65" : "text-muted")}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
