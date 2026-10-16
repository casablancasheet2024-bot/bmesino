export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

/** The six main pages, in header order. Paths are locale-agnostic. */
export const primaryNav: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Sourcing & Trading", href: "/sourcing-trading" },
  { label: "Contrôle Qualité", href: "/controle-qualite" },
  { label: "Logistique", href: "/logistique" },
  { label: "À propos & Contact", href: "/a-propos-contact" },
];

/** Service shortcuts (footer, 404) — each points to a section of a main page. */
export const serviceLinks: NavLink[] = [
  { label: "Sourcing & Trading", href: "/sourcing-trading" },
  { label: "Vérification des fournisseurs", href: "/sourcing-trading#verification" },
  { label: "Import & Export", href: "/sourcing-trading#import-export" },
  { label: "Inspection d'usine", href: "/controle-qualite#inspection-usine" },
  { label: "Inspection avant expédition", href: "/controle-qualite#psi" },
  { label: "Rapports QC", href: "/controle-qualite#rapports-qc" },
  { label: "Logistique internationale", href: "/logistique" },
];

export const legalLinks: NavLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];
