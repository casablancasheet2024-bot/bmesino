import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { MarketRoutes } from "@/components/sections/market-routes";

export function GlobalMarkets() {
  return (
    <Section labelledBy="markets-title" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="Marchés"
            title={<span id="markets-title">Une passerelle entre vos fournisseurs et vos marchés.</span>}
            description={
              <div className="space-y-4">
                <p>
                  Depuis le Maroc, nous accompagnons des acheteurs professionnels qui s&apos;approvisionnent en Chine ou en
                  Europe : de l&apos;Europe ou de la Chine vers le Maroc, de la Chine vers l&apos;Europe, l&apos;Afrique,
                  les États-Unis et le Canada.
                </p>
                <p className="text-[0.95rem] text-white/55">
                  Les itinéraires, les ports et les délais dépendent de chaque expédition : ils sont précisés dans chaque
                  devis.
                </p>
              </div>
            }
          />
        </div>
        <MarketRoutes tone="dark" className="lg:col-span-7" />
      </Container>
    </Section>
  );
}
