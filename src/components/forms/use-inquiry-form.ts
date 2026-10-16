"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitInquiry, type InquiryState } from "@/lib/inquiry-action";
import {
  fieldOrder,
  inquirySummary,
  readAttachment,
  readInquiry,
  validateInquiry,
  type FieldErrors,
  type InquiryField,
} from "@/lib/inquiry";

const initialState: InquiryState = { status: "idle" };

/** Shared submission logic: client validation, server action, focus management, fallback summary. */
export function useInquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef(0);

  // Fill-time stamp for spam protection (set after mount, never during render).
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // Move focus to the outcome so screen-reader and keyboard users notice it.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "invalid") {
      const first = fieldOrder.find((field) => state.fieldErrors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    statusRef.current?.focus();
  }, [state]);

  const serverErrors = state.status === "invalid" ? state.fieldErrors : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("startedAt", String(startedAtRef.current));
    const values = readInquiry(formData);
    const attachment = values.kind === "quote" ? readAttachment(formData) : null;
    const nextErrors = validateInquiry(values, attachment, formData.get("consent") === "on");
    setClientErrors(nextErrors);
    setSummary(inquirySummary(values, attachment?.name));

    const first = fieldOrder.find((field) => nextErrors[field]);
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Calling the action in a transition (instead of <form action>) keeps the
    // typed values in place if the server rejects or cannot deliver the request.
    startTransition(() => formAction(formData));
  }

  function clearError(field: InquiryField) {
    if (!clientErrors[field]) return;
    setClientErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  return {
    state,
    pending,
    errors,
    hasClientErrors: Object.keys(clientErrors).length > 0,
    summary,
    formRef,
    statusRef,
    handleSubmit,
    clearError,
  };
}
