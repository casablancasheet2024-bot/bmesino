/** "Service recherché" options of the main quotation form. */
export const serviceOptions = [
  { value: "sourcing-trading", label: "Sourcing & Trading" },
  { value: "recherche-fournisseur", label: "Recherche de fournisseur" },
  { value: "controle-qualite", label: "Contrôle qualité" },
  { value: "inspection-usine", label: "Inspection d'usine" },
  { value: "rapport-qc", label: "Rapport QC" },
  { value: "logistique", label: "Logistique" },
  { value: "import-export", label: "Import & Export" },
  { value: "demande-generale", label: "Demande générale" },
] as const;

export type ServiceOption = (typeof serviceOptions)[number]["value"];

export function isServiceOption(value: unknown): value is ServiceOption {
  return serviceOptions.some((option) => option.value === value);
}

export function serviceLabel(value: ServiceOption): string {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}

/** Anchor of the main form on the "À propos & Contact" page. */
export const CONTACT_FORM_PATH = "/a-propos-contact#demande";
/** Anchor of the shipping quotation form on the logistics page. */
export const LOGISTICS_FORM_PATH = "/logistique#devis-logistique";

/**
 * Link to the main quotation form with a service (and optionally a product)
 * preselected. Paths are locale-agnostic; the Link component adds the locale.
 */
export function quoteHref(service?: ServiceOption, options: { product?: string } = {}): string {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (options.product) params.set("produit", options.product);
  const query = params.toString();
  return `/a-propos-contact${query ? `?${query}` : ""}#demande`;
}
