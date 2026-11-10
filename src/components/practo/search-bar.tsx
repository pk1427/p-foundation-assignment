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

  const isLg = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-xl border border-practo-border bg-practo-surface shadow-card",
          isLg ? "flex items-stretch gap-0 p-0" : "flex flex-col gap-0 p-4",
          "transition-all duration-200"
        )}
      >
        <div className={cn("flex-1 border-r-0 border-b-0 border-practo-border", isLg ? "border-r border-b-0" : "")}>
          <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5 ml-4">
            What are you looking for?
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
            />
            <input
              className="w-full pl-10 pr-4 py-4 bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
              placeholder="Vet, clinic, service"
              value={what}
              onChange={(e) => setWhat(e.target.value)}
            />
          </div>
        </div>

        <div className={cn("flex-1 border-r-0 border-b-0 border-practo-border", isLg ? "border-r border-b-0" : "")}>
          <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5 ml-4">
            Location
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
            />
            <input
              className="w-full pl-10 pr-4 py-4 bg-transparent border-none text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-0"
              placeholder="Area or city"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
        </div>

        <div className={cn("flex-1 border-b-0 border-practo-border", isLg ? "border-r" : "")}>
          <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5 ml-4">
            Pet type
          </label>
          <select
            className="w-full pl-4 pr-10 py-4 bg-transparent border-none text-practo-text focus:outline-none focus:ring-0 appearance-none cursor-pointer"
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
          className={cn("w-full", isLg ? "px-6 py-4" : "w-full")}
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
      </form>

      <div className="mt-4 text-center">
        <a
          href="/search"
          className="text-sm text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover"
        >
          Explore all services &rarr;
        </a>
      </div>
    </div>
  );
}
