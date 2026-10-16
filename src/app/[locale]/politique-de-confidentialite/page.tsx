import type { Metadata } from "next";
import { Link } from "@/i18n/link";
import { LegalPage, ToComplete } from "@/components/sections/legal-page";
import { contactConfig, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${siteConfig.legalName} traite les données personnelles transmises via le site ${siteConfig.name}.`,
  path: "/politique-de-confidentialite",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {siteConfig.legalName}, {contactConfig.address ?? <ToComplete>adresse du siège</ToComplete>}. Contact :{" "}
          {contactConfig.email ?? <ToComplete>adresse e-mail dédiée</ToComplete>}.
        </p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <p>
          Via le{" "}
          <Link href="/a-propos-contact#demande" className="text-brand-600 underline underline-offset-2">
            formulaire de demande
          </Link>{" "}
          et le{" "}
          <Link href="/logistique#devis-logistique" className="text-brand-600 underline underline-offset-2">
            formulaire de devis logistique
          </Link>
          , nous collectons uniquement les informations que vous choisissez de nous transmettre :
        </p>
        <ul>
          <li>nom complet, nom de l&apos;entreprise et pays ;</li>
          <li>adresse e-mail et, le cas échéant, numéro de téléphone ou WhatsApp ;</li>
          <li>description de votre projet : service et produit recherchés, quantité, spécifications ;</li>
          <li>pour un devis logistique : pays de départ et de destination, type de marchandise, volume et mode de transport ;</li>
          <li>pièce jointe éventuelle (image, fiche technique ou catalogue, 5 Mo maximum).</li>
        </ul>
      </section>
      <section>
        <h2>Finalités</h2>
        <p>
          Ces données sont utilisées uniquement pour étudier votre demande, vous répondre et, si vous le souhaitez,
          préparer une proposition commerciale. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.
        </p>
      </section>
      <section>
        <h2>Destinataires et sous-traitants</h2>
        <p>
          Les demandes sont transmises par e-mail via un prestataire d&apos;envoi <ToComplete>nom du prestataire, ex. Resend</ToComplete>{" "}
          et hébergées par <ToComplete>hébergeur du site</ToComplete>. Lorsque votre projet le nécessite, certaines informations
          techniques peuvent être partagées avec des fournisseurs ou partenaires logistiques, avec votre accord.
        </p>
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <p>
          <ToComplete>durée de conservation des demandes</ToComplete>
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des
          données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et
          d&apos;opposition. Pour l&apos;exercer, contactez-nous à{" "}
          {contactConfig.email ?? <ToComplete>adresse e-mail</ToComplete>}.
        </p>
        <p>
          <ToComplete>numéro de déclaration ou d&apos;autorisation CNDP, le cas échéant</ToComplete>
        </p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>Ce site n&apos;utilise pas de cookies publicitaires ni d&apos;outils de mesure d&apos;audience à ce jour.</p>
      </section>
    </LegalPage>
  );
}
