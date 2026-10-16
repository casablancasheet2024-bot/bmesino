export type CategorySlug =
  | "construction"
  | "agricole"
  | "outillage"
  | "automobile"
  | "industriel"
  | "domestique"
  | "electricite";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  /** Product families sourced within the category (informative, not filters). */
  subcategories: string[];
  image: { src: string; alt: string };
};

export const categories: Category[] = [
  {
    slug: "construction",
    name: "Machines & équipements de construction",
    shortName: "Construction",
    description:
      "Engins de chantier, équipements de levage et matériels pour les travaux publics et le bâtiment.",
    subcategories: ["Excavatrices", "Bulldozers", "Grues", "Équipements de chantier", "Pièces détachées"],
    image: {
      src: "/images/categories/construction.webp",
      alt: "Pelle hydraulique au travail sur un terrain rocheux",
    },
  },
  {
    slug: "agricole",
    name: "Machines & équipements agricoles",
    shortName: "Agricole",
    description:
      "Tracteurs, outils attelés, irrigation et équipements de transformation pour les exploitations agricoles.",
    subcategories: ["Tracteurs", "Machines de récolte", "Accessoires pour tracteurs", "Équipements d'irrigation", "Matériel agricole"],
    image: {
      src: "/images/categories/agriculture.webp",
      alt: "Vue aérienne d'un tracteur travaillant un champ",
    },
  },
  {
    slug: "outillage",
    name: "Outillage & équipements",
    shortName: "Outillage",
    description:
      "Outillage électroportatif, outillage à main et équipements d'atelier pour les professionnels.",
    subcategories: ["Outils électriques", "Outils à main", "Équipements d'atelier", "Équipements industriels"],
    image: {
      src: "/images/categories/tools.webp",
      alt: "Outils électroportatifs alignés dans un atelier",
    },
  },
  {
    slug: "automobile",
    name: "Produits automobiles",
    shortName: "Automobile",
    description:
      "Pièces détachées, composants, accessoires et équipements de garage pour véhicules légers et utilitaires.",
    subcategories: ["Accessoires automobiles", "Pièces détachées", "Équipements d'atelier"],
    image: {
      src: "/images/categories/automotive.webp",
      alt: "Bloc moteur automobile en aluminium",
    },
  },
  {
    slug: "industriel",
    name: "Machines industrielles",
    shortName: "Industriel",
    description:
      "Machines de production, d'usinage, d'emballage et de transformation pour les sites industriels.",
    subcategories: ["Lignes de production", "Machines d'emballage", "Machines de découpe", "Équipements de fabrication"],
    image: {
      src: "/images/categories/industrial.webp",
      alt: "Usinage d'une pièce en acier sur un tour",
    },
  },
  {
    slug: "domestique",
    name: "Produits domestiques & de consommation",
    shortName: "Domestique",
    description:
      "Petit électroménager, articles pour la maison et biens de consommation destinés à la distribution.",
    subcategories: [],
    image: {
      src: "/images/categories/household.webp",
      alt: "Cuisine équipée avec ustensiles et électroménager",
    },
  },
  {
    slug: "electricite",
    name: "Électricité & électronique",
    shortName: "Électricité",
    description:
      "Matériel électrique, câblage, composants électroniques, éclairage, groupes électrogènes et équipements d'énergie solaire.",
    subcategories: [],
    image: {
      src: "/images/categories/electrical.webp",
      alt: "Composants électroniques sur une carte de circuit imprimé",
    },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isCategorySlug(value: unknown): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}
