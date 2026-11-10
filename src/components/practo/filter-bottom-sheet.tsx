"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  MapPin,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import type { ProviderFilters } from "@/data/models";

const SPECIES = ["Dog", "Cat", "Bird", "Exotic", "Livestock"];

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  current: ProviderFilters;
  onApply: (next: ProviderFilters) => void;
}

export function FilterBottomSheet({
  open,
  onClose,
  current,
  onApply,
}: FilterBottomSheetProps) {
  const [form, setForm] = useState<ProviderFilters>(current);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync URL-driven props into local form state on mount/update
    setForm(current);
  }, [current]);

  const categories = [
    { id: "veterinary-clinics", label: "Veterinary Clinics" },
    { id: "animal-hospitals", label: "Animal Hospitals" },
    { id: "boarding-daycare", label: "Boarding & Daycare" },
    { id: "diagnostics-labs", label: "Diagnostics & Labs" },
    { id: "ambulances", label: "Ambulances" },
    { id: "ngo-rescue", label: "NGOs & Rescue" },
  ];

  const sorts = [
    { id: "nearest", label: "Nearest" },
    { id: "rating", label: "Top rated" },
    { id: "openNow", label: "Open now" },
  ];

  const toggleBoolean = (key: keyof ProviderFilters) => {
    setForm((prev) => {
      const val = prev[key];
      const next = { ...prev, [key]: val === "1" ? undefined : "1" };
      return next;
    });
  };

  const apply = () => {
    const next: ProviderFilters = {};
    if (form.category) next.category = form.category;
    if (form.species) next.species = form.species;
    if (form.openNow) next.openNow = form.openNow;
    if (form.is24x7) next.is24x7 = form.is24x7;
    if (form.emergency) next.emergency = form.emergency;
    if (form.ambulance) next.ambulance = form.ambulance;
    if (form.homeVisit) next.homeVisit = form.homeVisit;
    if (form.verifiedOnly) next.verifiedOnly = form.verifiedOnly;
    if (form.distance) next.distance = form.distance;
    if (form.sort) next.sort = form.sort;
    if (form.q) next.q = form.q;
    onApply(next);
    onClose();
  };

  const activeCount =
    (form.category ? 1 : 0) +
    (form.species ? 1 : 0) +
    (form.openNow ? 1 : 0) +
    (form.is24x7 ? 1 : 0) +
    (form.emergency ? 1 : 0) +
    (form.ambulance ? 1 : 0) +
    (form.homeVisit ? 1 : 0) +
    (form.verifiedOnly ? 1 : 0) +
    (form.distance ? 1 : 0) +
    (form.q ? 1 : 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-practo-surface border-t border-practo-border shadow-card rounded-t-3xl p-6 md:hidden max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-practo-text">Filters</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-practo-text-muted hover:bg-practo-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
              <div>
                <h3 className="text-xs font-semibold text-practo-text-muted uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleBoolean("category")}
                      disabled={form.category !== c.id}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                        form.category === c.id
                          ? "bg-practo-primary text-white border-practo-primary"
                          : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                      )}
                    >
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                        {form.category === c.id ? (
                          <X className="w-2 h-2" />
                        ) : (
                          <SlidersHorizontal className="w-2.5 h-2.5" />
                        )}
                      </span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-practo-text-muted uppercase tracking-wider mb-3">
                  Species treated
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SPECIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleBoolean("species")}
                      disabled={form.species !== s}
                      className={cn(
                        "rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
                        form.species === s
                          ? "bg-practo-primary text-white border-practo-primary"
                          : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "openNow" as const, label: "Open now", icon: <MapPin className="w-4 h-4" /> },
                  { key: "is24x7" as const, label: "24x7", icon: <Search className="w-4 h-4" /> },
                  { key: "ambulance" as const, label: "Ambulance", icon: <MapPin className="w-4 h-4" /> },
                  { key: "homeVisit" as const, label: "Home visit", icon: <MapPin className="w-4 h-4" /> },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => toggleBoolean(key)}
                    disabled={form[key] === "1"}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                      form[key] === "1"
                        ? "bg-practo-primary text-white border-practo-primary"
                        : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                    )}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => toggleBoolean("verifiedOnly")}
                  disabled={form.verifiedOnly === "1"}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                    form.verifiedOnly === "1"
                      ? "bg-practo-primary text-white border-practo-primary"
                      : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                  )}
                >
                  <ShieldCheckIcon />
                  Verified only
                </button>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-practo-text-muted uppercase tracking-wider mb-3">
                  Max distance
                </h3>
                <select
                  value={form.distance ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, distance: e.target.value || undefined }))}
                  className="w-full py-2.5 rounded-xl border border-practo-border bg-practo-surface text-sm text-practo-text focus:outline-none focus:ring-2 focus:ring-practo-primary"
                >
                  <option value="">Any distance</option>
                  <option value="3">3 km</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                </select>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-practo-text-muted uppercase tracking-wider mb-3">
                  Sort by
                </h3>
                <div className="flex gap-2">
                  {sorts.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setForm((prev) => ({ ...prev, sort: s.id }))}
                      className={cn(
                        "flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                        form.sort === s.id
                          ? "bg-practo-primary text-white border-practo-primary"
                          : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

              <div className="mt-6 pt-6 border-t border-practo-border flex items-center justify-between">
                <span className="text-sm text-practo-text-muted">
                  {activeCount} active filter{activeCount !== 1 ? "s" : ""}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onApply({});
                      onClose();
                    }}
                    className="min-h-[44px]"
                  >
                    Clear all
                  </Button>
                  <Button size="sm" className="min-h-[44px]" onClick={apply}>
                    Apply {activeCount}
                  </Button>
                </div>
              </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
