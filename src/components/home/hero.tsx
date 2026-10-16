"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { tradeRoutes } from "@/config/site";
import { CONTACT_FORM_PATH } from "@/data/request-types";
import { cn } from "@/lib/cn";

const SLIDE_DURATION_MS = 7000;

const slides = [
  {
    label: "Sourcing",
    eyebrow: "Sourcing & Trading",
    title: "Sourcer les bons produits,",
    highlight: "en Chine comme en Europe.",
    text: "Recherche de produits, identification et vérification de fournisseurs, accompagnement des échanges commerciaux et suivi des commandes, pour les entreprises et importateurs.",
    image: { src: "/images/services/sourcing-meeting.webp", alt: "Présentation d'échantillons de produits lors d'une réunion de sourcing" },
    secondary: { href: "/sourcing-trading", label: "Le sourcing" },
  },
  {
    label: "Contrôle qualité",
    eyebrow: "Contrôle qualité",
    title: "Vérifier la marchandise",
    highlight: "avant qu'elle ne parte.",
    text: "Inspection d'usine et inspection avant expédition selon le périmètre convenu, avec un rapport QC documenté pour décider en connaissance de cause.",
    image: { src: "/images/services/quality-inspection.webp", alt: "Contrôle de pièces sur une ligne de production" },
    secondary: { href: "/controle-qualite", label: "Les inspections" },
  },
  {
    label: "Logistique",
    eyebrow: "Logistique internationale",
    title: "Acheminer vos marchandises",
    highlight: "jusqu'à vos marchés.",
    text: "Fret maritime et aérien, conteneurs et transport intérieur : de la Chine ou de l'Europe vers le Maroc, et de la Chine vers l'Europe, l'Afrique, les États-Unis et le Canada.",
    image: { src: "/images/hero/port-containers.webp", alt: "Vue aérienne d'un porte-conteneurs à quai sous des grues portuaires" },
    secondary: { href: "/logistique", label: "La logistique" },
  },
] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const goTo = useCallback((index: number) => setActive((index + slides.length) % slides.length), []);
  const next = useCallback(() => setActive((current) => (current + 1) % slides.length), []);
  const prev = useCallback(() => setActive((current) => (current - 1 + slides.length) % slides.length), []);

  const autoplay = !reducedMotion && !userPaused;
  const paused = hovering || focusWithin;

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
  }

  return (
    <section
      aria-labelledby="hero-title"
      aria-roledescription="carrousel"
      className="relative isolate overflow-hidden bg-navy-950 text-white"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      // Pause for keyboard focus only: a mouse click on a control must not stop autoplay.
      onFocus={(event) => setFocusWithin(event.target.matches(":focus-visible"))}
      onBlur={handleBlur}
      onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
    >
      <h1 id="hero-title" className="sr-only">
        BME SINO TRADE — sourcing international, contrôle qualité et logistique
      </h1>

      {/* Backgrounds: cross-fade with a slow zoom on the active slide. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.image.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.image.src}
              alt=""
              fill
              preload={index === 0}
              sizes="100vw"
              className={cn(
                "object-cover transition-transform ease-out [transition-duration:8000ms]",
                index === active ? "scale-100" : "scale-110",
              )}
            />
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,black,transparent_55%)]" />

      <Container className="flex min-h-[min(46rem,calc(100svh-var(--header-h)))] flex-col pt-14 pb-6 sm:pt-20 lg:pt-24">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
          {/* Slide copy, stacked in one grid cell so the height never jumps. */}
          <div className="grid lg:col-span-7 xl:col-span-6">
            {slides.map((slide, index) => {
              const isActive = index === active;
              const step = (order: number) => ({ transitionDelay: isActive ? `${150 + order * 90}ms` : "0ms" });
              const appear = cn(
                "transition-[opacity,transform] duration-700 ease-[var(--ease-out-quart)]",
                isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              );
              return (
                <div
                  key={slide.label}
                  role="group"
                  aria-roledescription="diapositive"
                  aria-label={`${index + 1} sur ${slides.length} : ${slide.label}`}
                  inert={!isActive}
                  className={cn("[grid-area:1/1]", !isActive && "pointer-events-none")}
                >
                  <p style={step(0)} className={cn(appear, "flex items-center gap-2.5 font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cyan-400")}>
                    <span aria-hidden className="h-px w-6 bg-cyan-400" />
                    {slide.eyebrow}
                  </p>
                  <h2
                    style={step(1)}
                    className={cn(
                      appear,
                      "mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.025em] min-[400px]:text-[2.2rem] sm:mt-6 sm:text-[2.9rem] lg:text-[3.2rem] xl:text-[3.5rem]",
                    )}
                  >
                    {slide.title}{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-[#7fd3fb] bg-clip-text text-transparent">{slide.highlight}</span>
                  </h2>
                  <p style={step(2)} className={cn(appear, "mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/75 sm:mt-6 sm:text-lg")}>
                    {slide.text}
                  </p>
                  <div style={step(3)} className={cn(appear, "mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row")}>
                    <ButtonLink href={CONTACT_FORM_PATH} size="lg" arrow className="bg-cyan-500 text-navy-950 hover:bg-cyan-400">
                      Demander un devis
                    </ButtonLink>
                    <ButtonLink href={slide.secondary.href} variant="outline-light" size="lg" className="backdrop-blur-sm">
                      {slide.secondary.label}
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trade lanes — goods are sourced in China and in Europe. */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="rounded-[var(--radius-card)] border border-white/15 bg-navy-950/55 p-5 shadow-lift backdrop-blur-md">
              <p className="font-label text-[0.68rem] uppercase tracking-[0.16em] text-white/55">Couloirs commerciaux</p>
              <ul className="mt-4 grid grid-cols-2 gap-2" aria-label="Couloirs commerciaux">
                {tradeRoutes.map(({ from, to }) => (
                  <li
                    key={`${from}-${to}`}
                    className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-label text-sm"
                  >
                    <span>{from}</span>
                    <span aria-hidden className="relative mx-2 h-px flex-1 overflow-hidden bg-white/20">
                      <span className="absolute inset-y-0 left-0 w-1/3 bg-cyan-400 motion-safe:animate-[route_2.4s_linear_infinite]" />
                    </span>
                    <span className="sr-only">vers</span>
                    <span className="text-cyan-400">{to}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/60">
                Approvisionnement en Chine et en Europe, vers le Maroc, l&apos;Afrique, l&apos;Europe, les États-Unis et le Canada.
              </p>
            </div>
          </div>
        </div>

        {/* Controls: one tab per slide with its autoplay timer, plus prev / pause / next. */}
        <div className="mt-12 flex items-end gap-4 sm:gap-6">
          <ol className="grid flex-1 grid-cols-3 gap-3 sm:gap-5">
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <li key={slide.label}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Afficher la diapositive ${index + 1} : ${slide.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group block w-full cursor-pointer pt-3 text-left"
                  >
                    <span className="relative block h-0.5 overflow-hidden rounded-full bg-white/20">
                      {isActive && (
                        <span
                          key={`${active}-${autoplay}`}
                          className={cn("absolute inset-0 origin-left bg-cyan-400", autoplay && "hero-progress")}
                          style={
                            autoplay
                              ? ({
                                  "--hero-slide-duration": `${SLIDE_DURATION_MS}ms`,
                                  animationPlayState: paused ? "paused" : "running",
                                } as CSSProperties)
                              : undefined
                          }
                          onAnimationEnd={next}
                        />
                      )}
                    </span>
                    <span className="mt-3 flex items-baseline gap-2 font-label text-[0.72rem] uppercase tracking-[0.14em]">
                      <span className={isActive ? "text-cyan-400" : "text-white/45"}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={cn("hidden transition-colors sm:inline", isActive ? "text-white" : "text-white/55 group-hover:text-white/85")}>
                        {slide.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Diapositive précédente"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-label={userPaused ? "Relancer le défilement" : "Mettre le défilement en pause"}
                className="hidden size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10 sm:grid"
              >
                {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={next}
              aria-label="Diapositive suivante"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
