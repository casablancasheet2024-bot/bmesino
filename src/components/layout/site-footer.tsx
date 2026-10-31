import Image from "next/image";
import { Link } from "@/i18n/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactConfig, markets, offices, siteConfig } from "@/config/site";
import { legalLinks, primaryNav, serviceLinks } from "@/config/navigation";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/ui/icons";
import { mailtoUrl, telUrl, whatsappUrlFor } from "@/lib/contact-links";
import { CopyrightYear } from "./copyright-year";

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cyan-400">{children}</h2>;
}

const linkClass = "text-[0.9rem] text-white/70 transition-colors hover:text-white";

export function SiteFooter() {
  const email = mailtoUrl();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.25fr_2fr] lg:gap-16 lg:py-20">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.name} — accueil`}
              className="inline-flex"
            >
              <Image
                src={siteConfig.logoWhite.src}
                width={siteConfig.logoWhite.width}
                height={siteConfig.logoWhite.height}
                alt={siteConfig.name}
                sizes="200px"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 font-display text-lg font-semibold">{siteConfig.legalName}</p>
            <p className="mt-1 font-label text-[0.72rem] uppercase tracking-[0.16em] text-cyan-400">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-white/60">{siteConfig.slogan}</p>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-white/65">
              Société marocaine de commerce international : sourcing et trading en Chine et en Europe, vérification des
              fournisseurs, contrôle qualité, rapports QC et coordination logistique vers vos marchés.
            </p>

            {email && (
              <a href={email} className={`mt-6 flex items-center gap-2.5 ${linkClass}`}>
                <Mail aria-hidden className="size-4 shrink-0 text-cyan-400" />
                {contactConfig.email}
              </a>
            )}

            <ul className="mt-6 space-y-5 text-[0.9rem]">
              {offices.map((office) => (
                <li key={office.code}>
                  <p className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-cyan-400">
                    {office.name} · {office.role}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {"address" in office && (
                      <li className="flex items-start gap-2.5 text-white/70">
                        <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                        {office.address}
                      </li>
                    )}
                    {office.phone && (
                      <li>
                        <a href={telUrl(office.phone)} className={`flex items-center gap-2.5 ${linkClass}`}>
                          <Phone aria-hidden className="size-4 shrink-0 text-cyan-400" />
                          {office.phone}
                        </a>
                      </li>
                    )}
                    {"whatsapp" in office && (
                      <li>
                        <a
                          href={whatsappUrlFor(office.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2.5 ${linkClass}`}
                        >
                          <WhatsAppIcon className="size-4 shrink-0 text-cyan-400" />
                          {office.whatsapp}
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            <nav aria-label="Navigation du pied de page">
              <FooterHeading>Pages</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services">
              <FooterHeading>Services</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Catégories de produits" className="col-span-2 sm:col-span-1">
              <FooterHeading>Produits</FooterHeading>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/produits?categorie=${category.slug}`} className={linkClass}>
                      {category.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-[0.7rem] uppercase tracking-[0.18em] text-white/45">Marchés couverts</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {markets.map((market) => (
              <li key={market.code} className="flex items-center gap-2">
                <span className="font-label text-[0.7rem] text-cyan-400">{market.code}</span>
                {market.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 py-6 pb-24 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © <CopyrightYear /> {siteConfig.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
