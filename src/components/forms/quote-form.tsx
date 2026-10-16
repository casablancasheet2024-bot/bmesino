"use client";

import { useSearchParams } from "next/navigation";
import { useId } from "react";
import { isServiceOption, serviceOptions, type ServiceOption } from "@/data/request-types";
import { getProduct } from "@/data/products";
import { absoluteUrl } from "@/config/site";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/link";
import {
  AttachmentField,
  ConsentField,
  Field,
  Fieldset,
  FormStatus,
  RequiredNote,
  SpamTrap,
  SubmitButton,
  SuccessPanel,
} from "./form-ui";
import { useInquiryForm } from "./use-inquiry-form";

export type QuotePrefill = { service?: ServiceOption; product?: string; productUrl?: string };

/** Reads ?service= and ?produit= so CTAs across the site can preselect the request. */
export function QuoteFormFromParams() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const service = searchParams.get("service");
  const productSlug = searchParams.get("produit");
  const product = productSlug ? getProduct(productSlug) : undefined;
  const productPath = product ? `/produits/${product.slug}` : undefined;

  const prefill: QuotePrefill = {
    service: isServiceOption(service) ? service : product ? "sourcing-trading" : undefined,
    product: product?.name,
    productUrl: productPath ? (absoluteUrl(productPath, locale) ?? localizePath(productPath, locale)) : undefined,
  };

  return <QuoteForm key={`${service}-${productSlug}`} prefill={prefill} />;
}

/** Main quotation / contact form. */
export function QuoteForm({ prefill = {} }: { prefill?: QuotePrefill }) {
  const { state, pending, errors, hasClientErrors, summary, formRef, statusRef, handleSubmit, clearError } = useInquiryForm();
  const uid = useId();

  if (state.status === "success") {
    return (
      <SuccessPanel
        statusRef={statusRef}
        text="Merci. Notre équipe étudie votre besoin et revient vers vous à l'adresse e-mail indiquée."
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      encType="multipart/form-data"
      className="space-y-6"
      aria-describedby={`${uid}-required`}
    >
      <RequiredNote id={`${uid}-required`} />
      <SpamTrap />
      <input type="hidden" name="kind" value="quote" />
      {prefill.productUrl && <input type="hidden" name="productUrl" value={prefill.productUrl} />}

      <Fieldset legend="Vos coordonnées">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${uid}-name`} label="Nom complet" required error={errors.fullName}>
            {(props) => <input {...props} name="fullName" type="text" autoComplete="name" onInput={() => clearError("fullName")} />}
          </Field>
          <Field id={`${uid}-company`} label="Nom de l'entreprise" error={errors.company}>
            {(props) => <input {...props} name="company" type="text" autoComplete="organization" />}
          </Field>
          <Field id={`${uid}-country`} label="Pays" required error={errors.country}>
            {(props) => <input {...props} name="country" type="text" autoComplete="country-name" onInput={() => clearError("country")} />}
          </Field>
          <Field id={`${uid}-email`} label="Adresse e-mail" required error={errors.email}>
            {(props) => (
              <input {...props} name="email" type="email" inputMode="email" autoComplete="email" onInput={() => clearError("email")} />
            )}
          </Field>
          <Field
            id={`${uid}-phone`}
            label="Téléphone / WhatsApp"
            hint="Format international, ex. +212…"
            error={errors.phone}
            className="sm:col-span-2"
          >
            {(props) => <input {...props} name="phone" type="tel" inputMode="tel" autoComplete="tel" onInput={() => clearError("phone")} />}
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Votre projet">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${uid}-service`} label="Service recherché" required error={errors.service} className="sm:col-span-2">
            {(props) => (
              <select {...props} name="service" defaultValue={prefill.service ?? ""} onChange={() => clearError("service")}>
                <option value="" disabled>
                  Sélectionnez un service…
                </option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field id={`${uid}-product`} label="Produit recherché" error={errors.product}>
            {(props) => <input {...props} name="product" type="text" defaultValue={prefill.product} />}
          </Field>
          <Field id={`${uid}-quantity`} label="Quantité" hint="Ex. 2 machines, 1 conteneur 40', 5 000 pièces" error={errors.quantity}>
            {(props) => <input {...props} name="quantity" type="text" />}
          </Field>
          <Field
            id={`${uid}-details`}
            label="Spécifications et détails du projet"
            required
            hint="Caractéristiques, normes, budget, destination, délai souhaité…"
            error={errors.details}
            className="sm:col-span-2"
          >
            {(props) => <textarea {...props} name="details" rows={6} onInput={() => clearError("details")} />}
          </Field>
          <div className="sm:col-span-2">
            <AttachmentField id={`${uid}-file`} error={errors.attachment} onChange={() => clearError("attachment")} />
          </div>
        </div>
      </Fieldset>

      <ConsentField id={`${uid}-consent`} error={errors.consent} onChange={() => clearError("consent")} />

      <FormStatus
        statusRef={statusRef}
        state={state}
        hasClientErrors={hasClientErrors}
        summary={summary}
        fallbackSubject="Demande de devis — BME SINO TRADE"
      />

      <SubmitButton pending={pending} label="Envoyer ma demande" />
    </form>
  );
}
