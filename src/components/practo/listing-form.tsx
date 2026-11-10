"use client";

import { useState } from "react";
import { useToast } from "@/components/practo/toast";
import { listingSchema } from "@/data/schemas";
import { CATEGORY_IDS } from "@/data/schemas";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

interface ListingFormProps {
  onSuccess?: () => void;
}

export function ListingForm({ onSuccess }: ListingFormProps) {
  const { add } = useToast();
  const [data, setData] = useState({
    businessName: "",
    category: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    services: "",
    is24x7: false,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = data.services
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
    const parsed = listingSchema.safeParse({
      ...data,
      services: servicesList,
      category: data.category,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      const flat = parsed.error.flatten().fieldErrors;
      for (const [key, vals] of Object.entries(flat)) {
        fieldErrors[key] = (vals as string[])[0] ?? "";
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitting(false);
      setSubmitted(true);
      add({
        title: "Listing submitted",
        description: "Thanks — we’ll review and list your business.",
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
        <h3 className="font-bold text-practo-text mb-2">Listing submitted</h3>
        <p className="text-sm text-practo-text-muted">
          Thanks! We’ll review your business and get in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Business name
          </label>
          <input
            name="businessName"
            value={data.businessName}
            onChange={(e) => setField("businessName", e.target.value)}
            placeholder="e.g. Happy Paws Clinic"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.businessName ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.businessName && <p className="text-[10px] text-red-600">{errors.businessName}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={(e) => setField("category", e.target.value)}
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.category ? "border-red-500" : "border-practo-border"
            )}
          >
            <option value="">Select a category</option>
            {CATEGORY_IDS.map((c) => {
              const label = c
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
              return (
                <option key={c} value={c}>
                  {label}
                </option>
              );
            })}
          </select>
          {errors.category && <p className="text-[10px] text-red-600">{errors.category}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Contact name
          </label>
          <input
            name="contactName"
            value={data.contactName}
            onChange={(e) => setField("contactName", e.target.value)}
            placeholder="Your name"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.contactName ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.contactName && <p className="text-[10px] text-red-600">{errors.contactName}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Phone / WhatsApp
          </label>
          <input
            name="phone"
            value={data.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.phone ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.phone && <p className="text-[10px] text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Email
          </label>
          <input
            name="email"
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
            type="email"
            placeholder="you@clinic.example"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.email ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
            Address / city
          </label>
          <input
            name="address"
            value={data.address}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="Bengaluru, KA"
            className={cn(
              "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
              errors.address ? "border-red-500" : "border-practo-border"
            )}
          />
          {errors.address && <p className="text-[10px] text-red-600">{errors.address}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-practo-text uppercase tracking-wider">
          Services (comma separated)
        </label>
        <input
          name="services"
          value={data.services}
          onChange={(e) => setField("services", e.target.value)}
          placeholder="Consultation, Vaccination, Grooming"
          className={cn(
            "w-full py-2.5 rounded-xl border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary",
            errors.services ? "border-red-500" : "border-practo-border"
          )}
        />
        {errors.services && <p className="text-[10px] text-red-600">{errors.services}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            id="is24x7"
            name="is24x7"
            type="checkbox"
            checked={data.is24x7}
            onChange={() => setData((prev) => ({ ...prev, is24x7: !prev.is24x7 }))}
            className="w-4 h-4 rounded border-practo-border text-practo-primary focus:ring-practo-primary mt-0.5"
          />
          <div>
            <label htmlFor="is24x7" className="text-xs font-semibold text-practo-text uppercase tracking-wider">
              24×7 emergency service
            </label>
            <p className="text-[10px] text-practo-text-muted">Tick if you’re open round the clock.</p>
          </div>
        </div>
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
          placeholder="Anything else we should know?"
          className="w-full py-2.5 rounded-xl border border-practo-border bg-practo-surface text-practo-text text-sm focus:outline-none focus:ring-2 focus:ring-practo-primary"
        />
      </div>

      <Button type="submit" size="lg" className="w-full min-h-[52px]" disabled={submitting}>
        {submitting ? "Submitting…" : "List my business"}
      </Button>
    </form>
  );
}
