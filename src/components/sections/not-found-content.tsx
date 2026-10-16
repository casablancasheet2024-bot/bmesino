import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Link } from "@/i18n/link";
import { primaryNav } from "@/config/navigation";

export function NotFoundContent() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="max-w-3xl text-center">
        <p className="font-label text-sm tracking-[0.2em] text-cyan-400">ERREUR 404</p>
        <h1 className="mt-5 text-[2.1rem] leading-tight font-semibold tracking-[-0.02em] sm:text-5xl">
          Cette page n&apos;a pas atteint sa destination.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-white/70">
          L&apos;adresse demandée n&apos;existe pas ou a été déplacée. Poursuivez votre navigation depuis l&apos;une des
          pages ci-dessous.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="light" size="lg" arrow>
            Retour à l&apos;accueil
          </ButtonLink>
          <ButtonLink href="/produits" variant="outline-light" size="lg">
            Explorer les produits
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {primaryNav.slice(2).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white/70 underline-offset-4 hover:text-white hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
