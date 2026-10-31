# Bmesino — site B2B de BME SINO TRADE SARL

Site vitrine et catalogue B2B (sourcing international, contrôle qualité, logistique) — **pas de boutique en ligne** :
aucun panier ni paiement, chaque produit est « Prix sur devis ».

Réalisation : Youness Web.

## Stack

- Next.js 16 (App Router, Cache Components / Partial Prerendering), React 19, TypeScript
- Tailwind CSS v4 (design tokens dans `src/app/globals.css`)
- `lucide-react` pour les icônes — aucune autre dépendance d'exécution
- Polices : Montserrat (titres et libellés, typographie du logo) et Inter (texte courant) via `next/font`

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck   # next typegen + tsc
npm run build && npm run start
```

> Ce projet utilise Next.js 16 : la documentation de référence est fournie dans `node_modules/next/dist/docs/` (voir `AGENTS.md`).

## Pages

Toutes les pages sont préfixées par la langue (`/` redirige vers `/fr`) :

| Route | Page |
| --- | --- |
| `/fr` | Accueil |
| `/fr/produits`, `/fr/produits/<slug>` | Catalogue et fiches produits |
| `/fr/sourcing-trading` | Sourcing & Trading (formulaire pré-rempli `#demande-sourcing`) |
| `/fr/controle-qualite` | Contrôle Qualité, dont les Rapports QC (`#rapports-qc`) |
| `/fr/logistique` | Logistique, avec le formulaire de devis logistique (`#devis-logistique`) |
| `/fr/a-propos-contact` | À propos & Contact, avec le formulaire principal (`#demande`) |
| `/fr/mentions-legales`, `/fr/politique-de-confidentialite` | Pages légales provisoires (`noindex`) |

Les adresses sans préfixe (`/produits`, `/contact`…) redirigent vers leur équivalent `/fr`. `src/proxy.ts` renvoie une
vraie 404 (avec la mise en page du site, `src/app/global-not-found.tsx`) pour une langue non publiée ou un produit inconnu.

## Configuration client (à fournir)

Copier `.env.example` vers `.env.local` (ou renseigner les variables dans Vercel). Tout champ vide est simplement masqué :
le site n'affiche jamais de coordonnées fictives.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine de production → URLs canoniques, sitemap, robots |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Surcharge du WhatsApp principal (défaut : bureau Maroc) → bouton mobile, liens contextuels |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` / `_ADDRESS` | Surcharges optionnelles ; les bureaux (Maroc, Chine, Italie) sont définis dans `offices` (`src/config/site.ts`) |
| `RESEND_API_KEY`, `CONTACT_FORM_TO`, `CONTACT_FORM_FROM` | Envoi des demandes du formulaire par e-mail via [Resend](https://resend.com) |

### Formulaires

Deux formulaires : la demande principale (`src/components/forms/quote-form.tsx`) et le devis logistique
(`src/components/forms/logistics-form.tsx`).

- Validation partagée navigateur / serveur : `src/lib/inquiry.ts`
- Server Action : `src/lib/inquiry-action.ts` (honeypot, délai minimal de saisie, limitation de débit par instance,
  pièce jointe ≤ 5 Mo aux formats PDF / image / Word / Excel pour la demande principale, e-mail en texte brut)
- **Sans configuration Resend, aucun faux succès** : le visiteur est informé que la demande n'a pas été envoyée et peut
  la transmettre par WhatsApp, par e-mail ou la copier.
- Pour un autre prestataire (SMTP, CRM…), remplacer uniquement l'appel `fetch` dans `inquiry-action.ts`.
- Les CTA pré-remplissent le formulaire principal via `quoteHref()` (`src/data/request-types.ts`) :
  `/fr/a-propos-contact?service=rapport-qc#demande`, `?service=sourcing-trading&produit=<slug>`.

### Éléments encore à fournir par le client

- Domaine de production
- Informations légales : siège, capital, RC, ICE, IF, directeur de la publication, hébergeur, CNDP, durée de conservation
  (repérées par `[À compléter]` dans `/mentions-legales` et `/politique-de-confidentialite`, pages en `noindex`)
- Fiches produits réelles et photos (voir ci-dessous)

## Catalogue produits

Données : `src/data/products.ts` (catégories et sous-catégories : `src/data/categories.ts`).

- `status: "demo"` — fiche illustrative : badge « Exemple », `noindex`, exclue du sitemap, **sans** caractéristiques,
  origine ni fournisseur.
- `status: "verified"` — fiche validée par BME SINO TRADE : peut contenir `specifications`, `variants`,
  `originCountry`, `supplierInformation` ; incluse dans le sitemap. Les cartes affichent alors les caractéristiques
  clés et l'origine.

Un modèle de fiche est fourni en commentaire en fin de fichier. Recherche (insensible aux accents), filtres et pagination
sont synchronisés avec l'URL (`?q=`, `?categorie=`, `?page=`).

## Langues

Lancement en français uniquement. L'architecture est prête pour l'anglais et l'arabe :

- `src/i18n/config.ts` : liste des langues (`enabled`, `dir: "rtl"` pour l'arabe, locale Open Graph). Seules les
  langues activées sont pré-rendues ; les autres apparaissent « Bientôt » dans le sélecteur de langue.
- Toutes les routes sont sous `src/app/[locale]/` ; `<html lang dir>` suit la langue.
- Les liens internes s'écrivent sans langue (`/produits`) : le composant `Link` de `src/i18n/link.tsx` ajoute la
  langue courante. `pageMetadata()` génère canonicals et `hreflang` pour les langues activées.

### Ajouter une langue

1. Traduire les textes : ils sont regroupés dans `src/config` (navigation, site), `src/data` (catégories, produits,
   services) et dans chaque page.
2. Passer la langue à `enabled: true` dans `src/i18n/config.ts`.
3. Pour l'arabe, vérifier la mise en page en `dir="rtl"`.

## Images

Photos libres de droits (Unsplash / Pexels), hébergées localement dans `public/images` — sources et licences dans
`public/images/CREDITS.md`. Elles illustrent les secteurs et **ne représentent pas** les installations de BME SINO TRADE.
Le logo approuvé original est dans `logo/` ; `public/brand/bmesino-logo.png` en est une version recadrée (transparence et
proportions conservées) ; les icônes `src/app/icon.png` / `apple-icon.png` reprennent l'emblème du logo.

## Déploiement (Vercel)

Importer le dépôt dans Vercel (framework détecté automatiquement), renseigner les variables d'environnement, déployer.
