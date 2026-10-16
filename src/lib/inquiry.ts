import { isServiceOption, serviceLabel, type ServiceOption } from "@/data/request-types";

/**
 * Validation shared by the browser (instant feedback) and the server action
 * (authoritative). Two forms use it: the main quotation form ("quote") and the
 * shipping quotation form ("logistics").
 */

export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;
export const ATTACHMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx";
const ATTACHMENT_EXTENSIONS = ATTACHMENT_ACCEPT.split(",");
/** Minimum time (ms) between form render and submission — basic bot filter. */
export const MIN_FILL_TIME_MS = 3000;

export const transportModes = [
  { value: "maritime", label: "Fret maritime" },
  { value: "aerien", label: "Fret aérien" },
  { value: "conteneur", label: "Transport par conteneur (FCL / LCL)" },
  { value: "interieur", label: "Transport intérieur" },
  { value: "a-conseiller", label: "À conseiller selon la marchandise" },
] as const;

export type TransportMode = (typeof transportModes)[number]["value"];

function isTransportMode(value: unknown): value is TransportMode {
  return transportModes.some((mode) => mode.value === value);
}

export type InquiryKind = "quote" | "logistics";

export type QuoteValues = {
  kind: "quote";
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  service: ServiceOption | "";
  product: string;
  quantity: string;
  details: string;
  productUrl: string;
};

export type LogisticsValues = {
  kind: "logistics";
  fullName: string;
  company: string;
  email: string;
  phone: string;
  originCountry: string;
  destinationCountry: string;
  goods: string;
  volume: string;
  transportMode: TransportMode | "";
  details: string;
};

export type InquiryValues = QuoteValues | LogisticsValues;

export type InquiryField =
  | Exclude<keyof QuoteValues | keyof LogisticsValues, "kind" | "productUrl">
  | "attachment"
  | "consent";

export type FieldErrors = Partial<Record<InquiryField, string>>;

/** Focus order for the first invalid field. */
export const fieldOrder: InquiryField[] = [
  "fullName",
  "company",
  "country",
  "email",
  "phone",
  "service",
  "product",
  "originCountry",
  "destinationCountry",
  "goods",
  "volume",
  "transportMode",
  "quantity",
  "details",
  "attachment",
  "consent",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{8,20}$/;

function text(formData: FormData, key: string, max: number): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function readInquiry(formData: FormData): InquiryValues {
  const common = {
    fullName: text(formData, "fullName", 120),
    company: text(formData, "company", 160),
    email: text(formData, "email", 160),
    phone: text(formData, "phone", 30),
    details: text(formData, "details", 5000),
  };

  if (formData.get("kind") === "logistics") {
    const transportMode = text(formData, "transportMode", 40);
    return {
      kind: "logistics",
      ...common,
      originCountry: text(formData, "originCountry", 80),
      destinationCountry: text(formData, "destinationCountry", 80),
      goods: text(formData, "goods", 200),
      volume: text(formData, "volume", 120),
      transportMode: isTransportMode(transportMode) ? transportMode : "",
    };
  }

  const service = text(formData, "service", 40);
  return {
    kind: "quote",
    ...common,
    country: text(formData, "country", 80),
    service: isServiceOption(service) ? service : "",
    product: text(formData, "product", 200),
    quantity: text(formData, "quantity", 80),
    productUrl: text(formData, "productUrl", 300),
  };
}

export function readAttachment(formData: FormData): File | null {
  const file = formData.get("attachment");
  return file instanceof File && file.size > 0 ? file : null;
}

export function validateInquiry(values: InquiryValues, attachment: File | null, consent: boolean): FieldErrors {
  const errors: FieldErrors = {};

  if (values.fullName.length < 2) errors.fullName = "Indiquez votre nom complet.";
  if (!values.email) errors.email = "Indiquez votre adresse e-mail.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Cette adresse e-mail ne semble pas valide.";
  if (values.phone && !PHONE_PATTERN.test(values.phone))
    errors.phone = "Utilisez le format international, par exemple +212 6 00 00 00 00.";

  if (values.kind === "quote") {
    if (values.country.length < 2) errors.country = "Indiquez votre pays.";
    if (!values.service) errors.service = "Choisissez le service recherché.";
    if (values.details.length < 20)
      errors.details = "Décrivez votre projet en quelques phrases (20 caractères minimum).";
  } else {
    if (values.originCountry.length < 2) errors.originCountry = "Indiquez le pays de départ.";
    if (values.destinationCountry.length < 2) errors.destinationCountry = "Indiquez le pays de destination.";
    if (values.goods.length < 2) errors.goods = "Précisez le type de marchandise.";
  }

  if (attachment) {
    const name = attachment.name.toLowerCase();
    if (!ATTACHMENT_EXTENSIONS.some((extension) => name.endsWith(extension)))
      errors.attachment = "Formats acceptés : PDF, JPG, PNG, WEBP, Word ou Excel.";
    else if (attachment.size > ATTACHMENT_MAX_BYTES) errors.attachment = "Le fichier ne doit pas dépasser 5 Mo.";
  }

  if (!consent) errors.consent = "Votre accord est nécessaire pour que nous puissions traiter votre demande.";

  return errors;
}

/** E-mail subject line (single line, no user-controlled line breaks). */
export function inquirySubject(values: InquiryValues): string {
  const topic =
    values.kind === "quote"
      ? `${values.service ? serviceLabel(values.service) : "Demande"}${values.product ? ` — ${values.product}` : ""}`
      : `Devis logistique — ${values.originCountry} → ${values.destinationCountry}`;
  return `[Bmesino] ${topic} (${values.fullName})`.replace(/[\r\n]+/g, " ").trim().slice(0, 180);
}

/** Plain-text summary used in the e-mail and in the WhatsApp / e-mail fallbacks. */
export function inquirySummary(values: InquiryValues, attachmentName?: string): string {
  const request =
    values.kind === "quote"
      ? [
          `Service recherché : ${values.service ? serviceLabel(values.service) : "—"}`,
          values.product ? `Produit recherché : ${values.product}` : null,
          values.quantity ? `Quantité : ${values.quantity}` : null,
          values.productUrl ? `Page produit : ${values.productUrl}` : null,
        ]
      : [
          "Demande : devis logistique",
          `Départ : ${values.originCountry}`,
          `Destination : ${values.destinationCountry}`,
          `Marchandise : ${values.goods}`,
          values.volume ? `Quantité / volume : ${values.volume}` : null,
          values.transportMode
            ? `Mode de transport : ${transportModes.find((mode) => mode.value === values.transportMode)?.label}`
            : null,
        ];

  const lines = [
    ...request,
    "",
    `Nom : ${values.fullName}`,
    values.company ? `Entreprise : ${values.company}` : null,
    values.kind === "quote" ? `Pays : ${values.country}` : null,
    `E-mail : ${values.email}`,
    values.phone ? `Téléphone / WhatsApp : ${values.phone}` : null,
    ...(values.details ? ["", values.kind === "quote" ? "Spécifications et détails :" : "Détails :", values.details] : []),
    attachmentName ? `\nPièce jointe : ${attachmentName}` : null,
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}
