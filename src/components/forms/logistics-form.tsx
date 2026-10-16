"use client";

import { useId } from "react";
import { transportModes } from "@/lib/inquiry";
import { ConsentField, Field, Fieldset, FormStatus, RequiredNote, SpamTrap, SubmitButton, SuccessPanel } from "./form-ui";
import { useInquiryForm } from "./use-inquiry-form";

/** Shipping quotation form (logistics page). */
export function LogisticsForm() {
  const { state, pending, errors, hasClientErrors, summary, formRef, statusRef, handleSubmit, clearError } = useInquiryForm();
  const uid = useId();

  if (state.status === "success") {
    return (
      <SuccessPanel
        statusRef={statusRef}
        text="Merci. Nous étudions votre expédition et revenons vers vous avec une proposition à l'adresse e-mail indiquée."
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6" aria-describedby={`${uid}-required`}>
      <RequiredNote id={`${uid}-required`} />
      <SpamTrap />
      <input type="hidden" name="kind" value="logistics" />

      <Fieldset legend="Vos coordonnées">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${uid}-name`} label="Nom complet" required error={errors.fullName}>
            {(props) => <input {...props} name="fullName" type="text" autoComplete="name" onInput={() => clearError("fullName")} />}
          </Field>
          <Field id={`${uid}-company`} label="Entreprise" error={errors.company}>
            {(props) => <input {...props} name="company" type="text" autoComplete="organization" />}
          </Field>
          <Field id={`${uid}-email`} label="E-mail" required error={errors.email}>
            {(props) => (
              <input {...props} name="email" type="email" inputMode="email" autoComplete="email" onInput={() => clearError("email")} />
            )}
          </Field>
          <Field id={`${uid}-phone`} label="Téléphone / WhatsApp" hint="Format international, ex. +212…" error={errors.phone}>
            {(props) => <input {...props} name="phone" type="tel" inputMode="tel" autoComplete="tel" onInput={() => clearError("phone")} />}
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Votre expédition">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id={`${uid}-origin`} label="Pays de départ" required hint="Ex. Chine, Espagne, France…" error={errors.originCountry}>
            {(props) => (
              <input {...props} name="originCountry" type="text" autoComplete="off" onInput={() => clearError("originCountry")} />
            )}
          </Field>
          <Field id={`${uid}-destination`} label="Pays de destination" required hint="Ex. Maroc — Casablanca" error={errors.destinationCountry}>
            {(props) => (
              <input {...props} name="destinationCountry" type="text" autoComplete="country-name" onInput={() => clearError("destinationCountry")} />
            )}
          </Field>
          <Field id={`${uid}-goods`} label="Type de marchandise" required hint="Ex. machines, pièces détachées, textiles…" error={errors.goods}>
            {(props) => <input {...props} name="goods" type="text" onInput={() => clearError("goods")} />}
          </Field>
          <Field id={`${uid}-volume`} label="Quantité ou volume" hint="Si connu : colis, palettes, poids, m³, conteneur…" error={errors.volume}>
            {(props) => <input {...props} name="volume" type="text" />}
          </Field>
          <Field id={`${uid}-mode`} label="Mode de transport souhaité" error={errors.transportMode} className="sm:col-span-2">
            {(props) => (
              <select {...props} name="transportMode" defaultValue="">
                <option value="">Sans préférence</option>
                {transportModes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field
            id={`${uid}-details`}
            label="Détails complémentaires"
            hint="Adresse d'enlèvement, date de disponibilité, incoterm, contraintes particulières…"
            error={errors.details}
            className="sm:col-span-2"
          >
            {(props) => <textarea {...props} name="details" rows={5} />}
          </Field>
        </div>
      </Fieldset>

      <ConsentField id={`${uid}-consent`} error={errors.consent} onChange={() => clearError("consent")} />

      <FormStatus
        statusRef={statusRef}
        state={state}
        hasClientErrors={hasClientErrors}
        summary={summary}
        fallbackSubject="Demande de devis logistique — BME SINO TRADE"
      />

      <SubmitButton pending={pending} label="Demander un devis logistique" />
    </form>
  );
}
