"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { ALL_SPECIES } from "@/data/models";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("Bengaluru, KA");
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
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col lg:flex-row gap-3 rounded-2xl border border-practo-border bg-practo-surface shadow-card p-3 md:p-4",
        className
      )}
    >
      <div className="flex-1 min-w-[150px]">
        <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5">
          What are you looking for?
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
          />
          <input
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-practo-border bg-practo-bg text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-2 focus:ring-practo-primary transition-all"
            placeholder="e.g. vet, dentist, grooming"
            value={what}
            onChange={(e) => setWhat(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5">
          Location
        </label>
        <div className="relative">
          <MapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-practo-text-muted"
          />
          <input
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-practo-border bg-practo-bg text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-2 focus:ring-practo-primary transition-all"
            placeholder="Area or pincode"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 min-w-[160px]">
        <label className="block text-[10px] uppercase font-semibold text-practo-text-muted mb-1.5">
          Pet type
        </label>
        <select
          className="w-full py-3 rounded-xl border border-practo-border bg-practo-surface text-practo-text placeholder:text-practo-text-muted focus:outline-none focus:ring-2 focus:ring-practo-primary appearance-none transition-all"
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
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full lg:w-auto min-w-[150px] min-h-[52px]"
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

      <a
        href="/search"
        className="text-center text-sm text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover"
      >
        Explore all services &rarr;
      </a>
    </form>
  );
}
