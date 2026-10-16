import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { cn } from "@/lib/cn";

const steps = [
  { title: "Votre demande", text: "Vous décrivez le produit ou le service recherché, les quantités, les spécifications et la destination." },
  { title: "Recherche du fournisseur", text: "Nous identifions et consultons des fabricants et fournisseurs adaptés à votre besoin." },
  { title: "Comparaison et devis", text: "Vous recevez des offres comparables et un devis, avec les conditions commerciales associées." },
  { title: "Contrôle qualité", text: "Inspection en usine ou avant expédition, lorsque vous la demandez.", optional: true },
  { title: "Coordination de l'expédition", text: "Organisation du transport avec des partenaires logistiques adaptés à l'envoi.", optional: true },
  { title: "Livraison à destination", text: "La marchandise est acheminée jusqu'au lieu et selon les conditions convenus dans l'offre." },
];

export function HowItWorks() {
  return (
    <Section labelledBy="process-title" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Comment ça marche"
          title={<span id="process-title">Six étapes, de votre demande à la livraison.</span>}
          description="Vous gardez la main à chaque étape. Le contrôle qualité et la logistique sont proposés selon votre besoin."
        />

        {/* Vertical sequence on mobile, grid from sm. */}
        <ol className="relative mt-10 grid grid-cols-1 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <span aria-hidden className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-brand-600 via-line-strong to-line sm:hidden" />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative flex gap-5 pb-7 last:pb-0 sm:flex-col sm:gap-0 sm:rounded-[var(--radius-card)] sm:border sm:border-line sm:bg-white sm:p-6 sm:pb-6"
            >
              <span
                className={cn(
                  "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border font-label text-sm font-medium",
                  index === 0 || index === steps.length - 1
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-line-strong bg-white text-brand-600",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 sm:mt-5 sm:pt-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-[1.05rem] leading-snug font-semibold text-navy-900">{step.title}</h3>
                  {step.optional && (
                    <span className="rounded-full border border-line-strong px-2 py-0.5 font-label text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                      Selon besoin
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
