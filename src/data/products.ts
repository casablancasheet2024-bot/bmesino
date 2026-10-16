import type { CategorySlug } from "./categories";

/**
 * Product catalogue.
 *
 * `status` distinguishes illustrative entries from client-approved data:
 *  - "demo"     → illustrative catalogue entry used while the real catalogue is
 *                 being built. Shown with an "Exemple" badge, excluded from the
 *                 sitemap and marked noindex. Never carries specifications,
 *                 origin or supplier information.
 *  - "verified" → product sheet approved by BME SINO TRADE. Only these may
 *                 contain specifications, originCountry and supplierInformation.
 *
 * To add a real product, copy the template at the end of this file.
 */
export const CATALOG_PAGE_SIZE = 9;

export type ProductStatus = "demo" | "verified";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  name: string;
  category: CategorySlug;
  /** One of the category's `subcategories`. */
  subcategory?: string;
  shortDescription: string;
  description: string[];
  images: ProductImage[];
  specifications?: ProductSpecification[];
  /** Known options or variants (e.g. power ratings, versions) — verified products only. */
  variants?: string[];
  /** Product-specific points to clarify when requesting a quotation. */
  sourcingNotes?: string[];
  /** Only when verified by BME SINO TRADE. */
  originCountry?: string;
  /** Only when the supplier has approved being named. */
  supplierInformation?: string;
  /** Extra search terms (synonyms, references) — not displayed. */
  keywords?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

const demoDescriptionNote =
  "Cette fiche illustre une famille de produits que nous pouvons rechercher pour vous. Les caractéristiques, la configuration et le fournisseur sont définis à partir de votre cahier des charges.";

function img(file: string, alt: string): ProductImage {
  return { src: `/images/products/${file}.webp`, alt };
}

export const products: Product[] = [
  {
    id: "p-001",
    slug: "pelle-hydraulique",
    status: "demo",
    name: "Pelle hydraulique sur chenilles",
    category: "construction",
    subcategory: "Excavatrices",
    shortDescription:
      "Engin de terrassement pour chantiers de construction, travaux publics et carrières.",
    description: [
      "Les pelles hydrauliques sur chenilles sont disponibles en de nombreuses classes de poids, de la mini-pelle aux modèles destinés aux gros terrassements.",
      "Indiquez-nous l'usage prévu, la capacité de godet souhaitée, les équipements optionnels et les normes applicables dans votre pays : nous consultons des fabricants adaptés et comparons leurs offres.",
      demoDescriptionNote,
    ],
    images: [img("excavator", "Pelle hydraulique jaune sur fond de ciel bleu")],
    keywords: ["excavatrice", "mini-pelle", "terrassement", "engin de chantier"],
    featured: true,
  },
  {
    id: "p-002",
    slug: "chargeuse-sur-pneus",
    status: "demo",
    name: "Chargeuse sur pneus",
    category: "construction",
    subcategory: "Équipements de chantier",
    shortDescription:
      "Engin de chargement et de manutention de matériaux pour chantiers, carrières et plateformes.",
    description: [
      "Les chargeuses sur pneus sont utilisées pour le chargement de camions, la manutention de granulats et les travaux de voirie.",
      "Nous pouvons rechercher différentes capacités de godet et configurations selon votre activité et vos contraintes d'exploitation.",
      demoDescriptionNote,
    ],
    images: [img("wheel-loader", "Chargeuse sur pneus")],
    keywords: ["chargeur", "loader", "manutention", "godet"],
  },
  {
    id: "p-003",
    slug: "tracteur-agricole",
    status: "demo",
    name: "Tracteur agricole",
    category: "agricole",
    subcategory: "Tracteurs",
    shortDescription:
      "Tracteurs pour travaux des champs, transport et entraînement d'outils attelés.",
    description: [
      "Les tracteurs agricoles se déclinent selon la puissance, la transmission et le type de travaux : labour, semis, transport ou travaux en vergers.",
      "Précisez la puissance recherchée, les outils à atteler et les conditions d'utilisation afin que nous puissions identifier des fournisseurs pertinents.",
      demoDescriptionNote,
    ],
    images: [img("tractor", "Tracteur agricole")],
    keywords: ["agriculture", "motoculture", "exploitation agricole"],
    featured: true,
  },
  {
    id: "p-004",
    slug: "groupe-electrogene-diesel",
    status: "demo",
    name: "Groupe électrogène diesel",
    category: "electricite",
    shortDescription:
      "Production d'énergie de secours ou principale pour sites industriels, chantiers et bâtiments.",
    description: [
      "Les groupes électrogènes sont proposés en version ouverte ou insonorisée, avec différents niveaux de puissance et options de commande.",
      "Communiquez-nous la puissance nécessaire, la tension, la fréquence et l'usage prévu (secours ou continu) pour lancer la recherche.",
      demoDescriptionNote,
    ],
    images: [img("generator", "Groupe électrogène diesel")],
    keywords: ["générateur", "énergie", "groupe électrogène", "diesel"],
    featured: true,
  },
  {
    id: "p-005",
    slug: "machine-usinage-cnc",
    status: "demo",
    name: "Machine d'usinage CNC",
    category: "industriel",
    subcategory: "Équipements de fabrication",
    shortDescription:
      "Centres d'usinage, fraiseuses et tours à commande numérique pour la production de pièces.",
    description: [
      "Tours, fraiseuses et centres d'usinage sont disponibles en version conventionnelle ou CNC, selon les dimensions des pièces et la précision attendue.",
      "Une inspection avant expédition peut être organisée pour vérifier la conformité de la machine à la configuration commandée.",
      demoDescriptionNote,
    ],
    images: [img("lathe", "Fraisage CNC d'une pièce métallique")],
    keywords: ["CNC", "usinage", "machine-outil", "fraiseuse", "tour"],
  },
  {
    id: "p-006",
    slug: "compresseur-air-industriel",
    status: "demo",
    name: "Compresseur d'air industriel",
    category: "outillage",
    subcategory: "Équipements d'atelier",
    shortDescription:
      "Production d'air comprimé pour ateliers, lignes de production et outillage pneumatique.",
    description: [
      "Les compresseurs d'air existent en technologie à piston ou à vis, avec ou sans sécheur et réservoir.",
      "Indiquez le débit, la pression de service et l'alimentation électrique disponible pour que nous puissions comparer les offres.",
      demoDescriptionNote,
    ],
    images: [img("air-compressor", "Compresseur d'air industriel")],
    keywords: ["air comprimé", "pneumatique", "compresseur à vis"],
  },
  {
    id: "p-007",
    slug: "perceuse-professionnelle",
    status: "demo",
    name: "Perceuse et outillage électroportatif",
    category: "outillage",
    subcategory: "Outils électriques",
    shortDescription:
      "Outillage électroportatif filaire ou sans fil pour professionnels et distributeurs.",
    description: [
      "Perceuses, visseuses, meuleuses et perforateurs peuvent être sourcés en marque du fabricant ou en marque de distributeur, selon les quantités.",
      "Précisez la gamme, la tension, les accessoires et le conditionnement attendus.",
      demoDescriptionNote,
    ],
    images: [img("drill", "Perceuse électroportative")],
    keywords: ["visseuse", "électroportatif", "outil", "meuleuse"],
  },
  {
    id: "p-008",
    slug: "coffret-outillage-a-main",
    status: "demo",
    name: "Coffret d'outillage à main",
    category: "outillage",
    subcategory: "Outils à main",
    shortDescription:
      "Clés, douilles et outillage à main pour ateliers, garages et réseaux de distribution.",
    description: [
      "Les coffrets d'outillage peuvent être composés selon vos besoins : clés, douilles, tournevis, pinces et accessoires.",
      "Le conditionnement et le marquage peuvent être adaptés pour la distribution.",
      demoDescriptionNote,
    ],
    images: [img("toolset", "Coffret d'outillage à main")],
    keywords: ["clés", "douilles", "outillage à main", "garage"],
  },
  {
    id: "p-009",
    slug: "pieces-de-freinage",
    status: "demo",
    name: "Pièces de freinage automobile",
    category: "automobile",
    subcategory: "Pièces détachées",
    shortDescription:
      "Disques, plaquettes et composants de freinage pour véhicules légers et utilitaires.",
    description: [
      "Les pièces de freinage sont recherchées à partir des références constructeur ou des références d'origine que vous nous transmettez.",
      "Le contrôle des dimensions et de l'emballage peut être intégré à une inspection avant expédition.",
      demoDescriptionNote,
    ],
    images: [img("brake-parts", "Disque de frein automobile")],
    keywords: ["freins", "disques", "plaquettes", "pièces détachées"],
    featured: true,
  },
  {
    id: "p-010",
    slug: "petit-electromenager",
    status: "demo",
    name: "Petit électroménager de cuisine",
    category: "domestique",
    shortDescription:
      "Blenders, robots et appareils de cuisine destinés à la distribution et au commerce de détail.",
    description: [
      "Le petit électroménager peut être sourcé avec différentes options de personnalisation : coloris, packaging, notice et marquage.",
      "Les exigences de conformité électrique et d'étiquetage du marché de destination doivent être précisées dès la demande.",
      demoDescriptionNote,
    ],
    images: [img("kitchen-appliance", "Appareil de cuisine électrique")],
    keywords: ["blender", "électroménager", "cuisine", "appareil ménager"],
  },
  {
    id: "p-011",
    slug: "cables-electriques",
    status: "demo",
    name: "Câbles et fils électriques",
    category: "electricite",
    shortDescription:
      "Câbles d'énergie, fils de bâtiment et câbles de commande pour projets et distribution.",
    description: [
      "Les câbles électriques sont recherchés selon la section, le nombre de conducteurs, l'isolant et les normes exigées sur votre marché.",
      "Transmettez-nous vos références ou vos spécifications techniques pour une comparaison des offres.",
      demoDescriptionNote,
    ],
    images: [img("cables", "Câbles électriques torsadés")],
    keywords: ["câblage", "fils", "conducteurs", "énergie"],
  },
  {
    id: "p-012",
    slug: "panneaux-solaires",
    status: "demo",
    name: "Panneaux solaires photovoltaïques",
    category: "electricite",
    shortDescription:
      "Modules photovoltaïques et équipements associés pour installations résidentielles et professionnelles.",
    description: [
      "Les panneaux solaires sont disponibles en différentes puissances et technologies. Les onduleurs, structures et accessoires peuvent être intégrés à la même demande.",
      "Indiquez la puissance totale du projet, le type d'installation et les certifications requises sur votre marché.",
      demoDescriptionNote,
    ],
    images: [img("solar-panels", "Panneaux solaires photovoltaïques")],
    keywords: ["photovoltaïque", "énergie solaire", "modules", "onduleur"],
    featured: true,
  },
];

/*
 * Template for a client-approved product:
 *
 * {
 *   id: "p-100",
 *   slug: "nom-du-produit",
 *   status: "verified",
 *   name: "Nom du produit",
 *   category: "industriel",
 *   shortDescription: "Une phrase de présentation.",
 *   description: ["Paragraphe 1", "Paragraphe 2"],
 *   images: [{ src: "/images/products/nom.webp", alt: "…" }],
 *   subcategory: "Équipements de fabrication",
 *   specifications: [{ label: "Puissance", value: "…" }],
 *   variants: ["Version 1", "Version 2"],
 *   sourcingNotes: ["Point à préciser dans la demande"],
 *   originCountry: "Chine",
 *   supplierInformation: "Uniquement si le fournisseur a donné son accord.",
 *   featured: false,
 *   seoTitle: "…",
 *   seoDescription: "…",
 * }
 */

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (candidate) => candidate.category === product.category && candidate.slug !== product.slug,
  );
  const others = products.filter(
    (candidate) => candidate.category !== product.category && candidate.featured,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
