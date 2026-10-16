import { marketByCode, originCodes, tradeRoutes } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Sourcing origins (China, Europe) → markets served, presented as a route board.
 * Purely descriptive: no ports, transit times or established lines are implied.
 */
export function MarketRoutes({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const origins = originCodes.map(marketByCode);
  const dark = tone === "dark";

  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-card)] border", dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-white", className)}>
      <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3 border-b px-5 py-4", dark ? "border-white/10" : "border-line bg-surface")}>
        <p className={cn("w-full font-label text-[0.68rem] uppercase tracking-[0.16em]", dark ? "text-white/50" : "text-subtle")}>
          Origines d&apos;approvisionnement
        </p>
        {origins.map((origin) => (
          <div key={origin.code} className="flex items-center gap-3">
            <span className="inline-flex rounded bg-navy-900 px-1.5 py-0.5 font-label text-sm font-medium text-white ring-1 ring-white/15">
              {origin.code}
            </span>
            <p className={cn("font-display text-[1.05rem] font-semibold", dark ? "text-white" : "text-navy-900")}>{origin.name}</p>
          </div>
        ))}
      </div>
      <ul className={cn("divide-y", dark ? "divide-white/10" : "divide-line")}>
        {tradeRoutes.map(({ from, to }) => {
          const origin = marketByCode(from);
          const destination = marketByCode(to);
          return (
            <li key={`${from}-${to}`} className="reveal grid grid-cols-[auto_1fr] items-center gap-x-4 px-5 py-3.5 sm:grid-cols-[auto_1fr_auto]">
              <span aria-hidden className={cn("w-14 font-label text-[0.8rem]", dark ? "text-cyan-400" : "text-brand-600")}>
                {from}→{to}
              </span>
              <span className={cn("font-medium", dark ? "text-white" : "text-navy-900")}>
                {origin.name} <span aria-hidden className={dark ? "text-white/40" : "text-subtle"}>→</span>
                <span className="sr-only">vers</span> {destination.name}
              </span>
              <span className={cn("col-start-2 text-[0.82rem] sm:col-start-auto sm:text-right", dark ? "text-white/55" : "text-muted")}>
                {to === "MA" ? "Siège de la société" : "Marché de destination"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
