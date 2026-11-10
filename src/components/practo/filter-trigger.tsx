"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterBottomSheet } from "@/components/practo/filter-bottom-sheet";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import type { ProviderFilters } from "@/data/models";

interface FilterTriggerProps {
  current: ProviderFilters;
  activeCount: number;
  className?: string;
}

export function FilterTrigger({
  current,
  activeCount,
  className,
}: FilterTriggerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onApply = (next: ProviderFilters) => {
    const search = new URLSearchParams();
    if (next.category) search.set("category", next.category);
    if (next.species) search.set("species", next.species);
    if (next.openNow) search.set("openNow", next.openNow);
    if (next.is24x7) search.set("open24x7", next.is24x7);
    if (next.emergency) search.set("emergency", next.emergency);
    if (next.ambulance) search.set("ambulance", next.ambulance);
    if (next.homeVisit) search.set("homeVisit", next.homeVisit);
    if (next.verifiedOnly) search.set("verified", next.verifiedOnly);
    if (next.distance) search.set("maxDistance", next.distance);
    if (next.sort) search.set("sort", next.sort);
    if (next.q) search.set("q", next.q);
    router.push(`/search?${search.toString()}`);
    setOpen(false);
  };

  return (
    <div className={cn("flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 w-full lg:w-auto", className)}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 min-h-[44px] lg:min-w-[130px]"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-block rounded-full bg-practo-primary text-white text-[10px] px-1.5 py-0.5">
              {activeCount}
            </span>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/search")}
          className="min-h-[44px]"
        >
          Clear all
        </Button>
      </div>

      <FilterBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        current={current}
        onApply={onApply}
      />
    </div>
  );
}
