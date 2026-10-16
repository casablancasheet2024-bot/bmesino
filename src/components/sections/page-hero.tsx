import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/layout";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  image?: { src: string; alt: string };
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, breadcrumbs, actions, image, aside }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[32rem] rounded-full bg-brand-600/25 blur-3xl" />
      <Container className="grid grid-cols-1 gap-10 pb-14 pt-8 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-10">
        <div className="lg:col-span-7">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
          <Eyebrow tone="dark" className="mt-10 lg:mt-14">
            {eyebrow}
          </Eyebrow>
          <h1 className="animate-in mt-5 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{lead}</div>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {image ? (
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/10 lg:aspect-[4/5]">
              <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent" />
            </div>
          </div>
        ) : (
          aside && <div className="lg:col-span-5">{aside}</div>
        )}
      </Container>
    </section>
  );
}
