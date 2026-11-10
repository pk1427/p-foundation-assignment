"use client";

import { useState } from "react";
import { useToast } from "@/components/practo/toast";
import { correctionSchema } from "@/data/schemas";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

interface CorrectionFormProps {
  defaultProviderId?: string;
  onSuccess?: () => void;
}

export function CorrectionForm({
  defaultProviderId,
  onSuccess,
}: CorrectionFormProps) {
  const { add } = useToast();
  const [data, setData] = useState({
    providerId: defaultProviderId ?? "",
    field: "",
    suggestedValue: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = correctionSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, vals] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[key] = (vals as string[])[0] ?? "";
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/correction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitting(false);
      setSubmitted(true);
      add({
        title: "Correction submitted",
        description: "Thanks — our team will review it.",
        type: "success",
      });
      onSuccess?.();
    } catch {
      setSubmitting(false);
      add({ title: "Submission failed", description: "Please try again later.", type: "error" });
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-practo-border bg-practo-surface p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-practo-open-light flex items-center justify-center mx-auto mb-4 text-practo-open">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-practo-text mb-2">Correction submitted</h3>
        <p className="text-sm text-practo-text-muted">
          Our team will review your suggestion and update the listing if appropriate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Provider
          </label>
          <input
            name="providerId"
            value={data.providerId}
            readOnly
            className="w-full py-2.5 rounded-xl border border-practo-border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary disabled:bg-practo-primary/5"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            What is wrong
          </label>
          <input
            name="field"
            value={data.field}
            onChange={(e) => setField("field", e.target.value)}
            placeholder="e.g. phone number is wrong"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.field ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.field && (
            <p className="text-[10px] text-red-600">{errors.field}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
          Suggested value
        </label>
        <textarea
          name="suggestedValue"
          value={data.suggestedValue}
          onChange={(e) => setField("suggestedValue", e.target.value)}
          rows={3}
          placeholder="What should the correct value be?"
          className={cn(
            "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
            errors.suggestedValue ? "border-red-500" : "border-practo-border"
          )}
        />
        {errors.suggestedValue && (
          <p className="text-[10px] text-red-600">{errors.suggestedValue}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
          Your contact (optional)
        </label>
          <input
            name="contact"
            value={data.contact}
            onChange={(e) => setField("contact", e.target.value)}
            placeholder="Phone or email"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.contact ? "border-red-500" : "border-practo-border"
            )}
          />
        {errors.contact && (
          <p className="text-[10px] text-red-600">{errors.contact}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
          Additional details (optional)
        </label>
        <textarea
          name="message"
          value={data.message}
          onChange={(e) => setField("message", e.target.value)}
          rows={2}
          placeholder="Any extra context"
          className="w-full py-2.5 rounded-xl border border-practo-border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full min-h-[52px]"
        disabled={submitting}
      >
        {submitting ? "Submitting…" : "Submit correction"}
      </Button>
    </form>
  );
}
