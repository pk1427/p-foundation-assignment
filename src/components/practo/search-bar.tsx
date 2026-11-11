"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { ALL_SPECIES } from "@/data/models";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("Gurugram, HR");
  const [pet, setPet] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    if (what.trim()) params.set("q", what.trim());
    if (where.trim()) params.set("where", where.trim());
    if (pet && pet !== "all") params.set("species", pet);
    router.push(`/search?${params.toString()}`);
    setLoading(false);
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-2xl border border-practo-border bg-practo-surface shadow-card transition-all duration-200",
          "focus-within:ring-2 ring-practo-primary/30 focus-within:ring-offset-1"
        )}
      >
        {/* Desktop: CSS grid layout */}
        <div
          className={cn(
            "grid grid-cols-[1.4fr_1fr_0.9fr_auto] items-stretch gap-0 border-b border-b-transparent",
            "lg:grid-cols-[1.4fr_1fr_0.9fr_auto]"
          )}
        >
          {/* Field 1: Looking for */}
          <div className="border-b-0 border-r border-practo-border/50 p-3 sm:px-4 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted whitespace-nowrap truncate mb-1.5">
              Looking for
            </label>
            <div className="relative min-w-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
              />
              <input
                className="min-w-0 w-full pl-10 pr-4 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
                placeholder="Vet, clinic, service"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
              />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px bg-practo-border/50" />

          {/* Field 2: Location */}
          <div className="border-b-0 border-r border-practo-border/50 p-3 sm:px-4 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted whitespace-nowrap truncate mb-1.5">
              Location
            </label>
            <div className="relative min-w-0">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
              />
              <input
                className="min-w-0 w-full pl-10 pr-4 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
                placeholder="Area or city"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
              />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block w-px bg-practo-border/50" />

          {/* Field 3: Pet type */}
          <div className="border-b-0 p-3 sm:px-4 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted whitespace-nowrap truncate mb-1.5">
              Pet type
            </label>
            <div className="relative min-w-0">
              <select
                className="min-w-0 w-full pl-4 pr-10 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                value={pet}
                onChange={(e) => setPet(e.target.value)}
              >
                <option value="all">All pets</option>
                {ALL_SPECIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted pointer-events-none"
              />
            </div>
          </div>

          {/* Button: fixed size, never growing */}
          <Button
            type="submit"
            size="lg"
            className="w-auto shrink-0 whitespace-nowrap px-8"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Finding…
              </>
            ) : (
              "Find a Vet"
            )}
          </Button>
        </div>

        {/* Mobile: single-column stack */}
        <div className="lg:hidden border-t border-practo-border/50 divide-y divide-practo-border/50">
          <div className="p-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted mb-1.5">
              Looking for
            </label>
            <input
              className="w-full pl-4 pr-4 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
              placeholder="Vet, clinic, service"
              value={what}
              onChange={(e) => setWhat(e.target.value)}
            />
          </div>
          <div className="p-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted mb-1.5">
              Location
            </label>
            <input
              className="w-full pl-4 pr-4 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
              placeholder="Area or city"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
          <div className="p-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-practo-text-muted mb-1.5">
              Pet type
            </label>
            <select
              className="w-full pl-4 pr-10 py-3 text-base bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0 appearance-none cursor-pointer"
              value={pet}
              onChange={(e) => setPet(e.target.value)}
            >
              <option value="all">All pets</option>
              {ALL_SPECIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted pointer-events-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 mt-4 px-8"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Finding…
              </>
            ) : (
              "Find a Vet"
            )}
          </Button>
        </div>
      </form>

      {/* Explore link: left-aligned under card */}
      <div className="mt-3 text-left">
        <a
          href="/search"
          className="text-sm text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover"
        >
          Explore all services &rarr;
        </a>
      </div>

      {/* Quick-pick chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href="/search?openNow=1&is24x7=1"
          className="h-10 px-4 rounded-xl border border-practo-border/50 bg-practo-surface text-xs font-medium text-practo-text hover:bg-practo-primary-light transition-colors shrink-0"
        >
          24×7 emergency
        </a>
        <a
          href="/search?species=Dog"
          className="h-10 px-4 rounded-xl border border-practo-border/50 bg-practo-surface text-xs font-medium text-practo-text hover:bg-practo-primary-light transition-colors shrink-0"
        >
          Dogs
        </a>
        <a
          href="/search?species=Cat"
          className="h-10 px-4 rounded-xl border border-practo-border/50 bg-practo-surface text-xs font-medium text-practo-text hover:bg-practo-primary-light transition-colors shrink-0"
        >
          Cats
        </a>
        <a
          href="/search?category=boarding-daycare"
          className="h-10 px-4 rounded-xl border border-practo-border/50 bg-practo-surface text-xs font-medium text-practo-text hover:bg-practo-primary-light transition-colors shrink-0"
        >
          Boarding
        </a>
      </div>
    </div>
  );
}
