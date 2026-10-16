import type { Metadata } from "next";
import { LegalPage, ToComplete } from "@/components/sections/legal-page";
import { contactConfig, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}, édité par ${siteConfig.legalName}.`,
  path: "/mentions-legales",
  noIndex: true,
});

export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <ul>
          <li>Raison sociale : {siteConfig.legalName}</li>
          <li>Forme juridique : société à responsabilité limitée (SARL)</li>
          <li>Siège social : {contactConfig.address ?? <ToComplete>adresse du siège, Maroc</ToComplete>}</li>
          <li>Capital social : <ToComplete>montant</ToComplete></li>
          <li>Registre du commerce (RC) : <ToComplete>numéro et ville</ToComplete></li>
          <li>Identifiant commun de l&apos;entreprise (ICE) : <ToComplete>numéro</ToComplete></li>
          <li>Identifiant fiscal (IF) : <ToComplete>numéro</ToComplete></li>
          <li>Directeur de la publication : <ToComplete>nom et fonction</ToComplete></li>
          <li>Contact : {contactConfig.email ?? <ToComplete>adresse e-mail</ToComplete>}</li>
        </ul>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          <ToComplete>nom, adresse et contact de l&apos;hébergeur (par exemple Vercel Inc. en cas de déploiement sur Vercel)</ToComplete>
        </p>
      </section>
      <section>
        <h2>Conception et réalisation</h2>
        <p>Youness Web.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le logo, la marque {siteConfig.name} et les contenus rédactionnels du site sont la propriété de {siteConfig.legalName}.
          Toute reproduction sans autorisation préalable est interdite.
        </p>
        <p>
          Les photographies d&apos;illustration proviennent des banques d&apos;images Unsplash et Pexels, utilisées
          conformément à leurs licences. Elles ne représentent pas les installations de {siteConfig.legalName} ni de ses
          fournisseurs. Les fiches produits marquées « Exemple » sont illustratives.
        </p>
      </section>
      <section>
        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif. Les caractéristiques, prix et conditions
          des produits et services sont précisés dans chaque offre commerciale.
        </p>
      </section>
    </LegalPage>
  );
}
