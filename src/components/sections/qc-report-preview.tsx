import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";

const identification = ["Fournisseur / usine", "Date d'inspection", "Produit", "Réf. PI / PO", "Quantité commandée", "Quantité contrôlée"];
const checkpoints = ["Spécifications et dimensions", "Aspect et finitions", "Quantités et emballage", "Marquage et étiquetage", "Tests de fonctionnement"];

function Bar({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-1.5 rounded-full bg-surface-2", className)} />;
}

/**
 * Illustrative QC report layout. Field labels only: it never shows results,
 * suppliers or photos from a real inspection, and is labelled as a demonstration.
 */
export function QcReportPreview({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white text-ink shadow-lift">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] select-none whitespace-nowrap font-display text-[2.6rem] font-semibold tracking-[0.12em] text-navy-900/[0.04] sm:text-[3.4rem]"
        >
          DÉMONSTRATION
        </span>

        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/brand/bmesino-mark.png" alt="" width={703} height={526} sizes="40px" className="h-7 w-auto shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-label text-[0.62rem] uppercase tracking-[0.16em] text-subtle">Rapport de contrôle qualité</p>
              <p className="mt-0.5 font-display text-[0.95rem] font-semibold text-navy-900">Inspection avant expédition</p>
            </div>
          </div>
          <span className="shrink-0 rounded border border-amber-300 bg-amber-50 px-2 py-1 font-label text-[0.58rem] font-medium uppercase tracking-[0.12em] text-amber-800">
            Démonstration
          </span>
        </div>

        <div className="divide-y divide-line">
          <section className="px-4 py-4 sm:px-5">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-brand-600">01 · Identification</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {identification.map((field) => (
                <div key={field} className="min-w-0">
                  <dt className="truncate text-[0.7rem] text-muted">{field}</dt>
                  <dd className="mt-1.5">
                    <Bar className="w-4/5" />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="px-4 py-4 sm:px-5">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-brand-600">02 · Points de contrôle</p>
            <table className="mt-3 w-full text-left text-[0.72rem]">
              <thead>
                <tr className="text-subtle">
                  <th scope="col" className="pb-1.5 font-normal">Contrôle</th>
                  <th scope="col" className="pb-1.5 text-right font-normal">Résultat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {checkpoints.map((point) => (
                  <tr key={point}>
                    <td className="py-1.5 text-ink-soft">{point}</td>
                    <td className="py-1.5">
                      <span aria-hidden className="ml-auto block h-4 w-16 rounded border border-dashed border-line-strong" />
                      <span className="sr-only">à renseigner</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="px-4 py-4 sm:px-5">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-brand-600">03 · Constats et photos</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((tile) => (
                <span key={tile} aria-hidden className="grid aspect-[4/3] place-items-center rounded-md bg-surface text-subtle">
                  <Camera className="size-4" />
                </span>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              <Bar className="w-full" />
              <Bar className="w-2/3" />
            </div>
          </section>

          <section className="px-4 py-4 sm:px-5">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-brand-600">04 · Conclusion</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Conforme", "Avec réserves", "Non conforme"].map((status) => (
                <span key={status} className="rounded border border-line px-2 py-1 text-[0.68rem] font-medium text-muted">
                  {status}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] text-muted">Remarques de l&apos;inspecteur</p>
            <Bar className="mt-1.5 w-11/12" />
          </section>
        </div>
      </div>
      <figcaption className="mt-3 text-[0.8rem] leading-relaxed text-muted">
        Mise en page illustrative, présentée à titre de démonstration : elle ne reproduit aucun rapport client. Le contenu
        réel dépend du périmètre d&apos;inspection convenu.
      </figcaption>
    </figure>
  );
}
