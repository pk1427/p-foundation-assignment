import { Search, MapPin, Layout, LayoutGrid, Clock, X } from "lucide-react";
import { FilterTrigger } from "@/components/practo/filter-trigger";
import ProviderCard from "@/components/practo/provider-card";
import { filterProviders, sortProviders, DEFAULT_LAT, DEFAULT_LNG } from "@/lib/providers";
import { PROVIDERS } from "@/data/providers";
import type { ProviderFilters } from "@/data/models";
import { cn } from "@/lib/utils";

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function buildURL(params: ProviderFilters, view?: string): string {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.species) search.set("species", params.species);
  if (params.openNow) search.set("openNow", params.openNow);
  if (params.is24x7) search.set("open24x7", params.is24x7);
  if (params.emergency) search.set("emergency", params.emergency);
  if (params.ambulance) search.set("ambulance", params.ambulance);
  if (params.homeVisit) search.set("homeVisit", params.homeVisit);
  if (params.verifiedOnly) search.set("verified", params.verifiedOnly);
  if (params.distance) search.set("maxDistance", params.distance);
  if (params.sort) search.set("sort", params.sort);
  if (params.q) search.set("q", params.q);
  if (view) search.set("view", view);
  return `/search?${search.toString()}`;
}

function setFilter(
  current: ProviderFilters,
  key: keyof ProviderFilters,
  value: string | undefined
): string {
  const next = { ...current };
  if (value === undefined || value === "") {
    delete next[key];
  } else {
    next[key] = value;
  }
  return buildURL(next);
}

function boolValue(current: ProviderFilters, key: "openNow" | "is24x7" | "emergency" | "ambulance" | "homeVisit" | "verifiedOnly"): string | undefined {
  return current[key] === "1" ? undefined : "1";
}

function chipLabel(key: string, value: string): string {
  const map: Record<string, Record<string, string>> = {
    category: {
      "veterinary-clinics": "Veterinary Clinics",
      "animal-hospitals": "Animal Hospitals",
      "boarding-daycare": "Boarding & Daycare",
      "diagnostics-labs": "Diagnostics & Labs",
      ambulances: "Ambulances",
      "ngo-rescue": "NGOs & Rescue",
    },
    species: { Dog: "Dog", Cat: "Cat", Bird: "Bird", Exotic: "Exotic", Livestock: "Livestock" },
    sort: { nearest: "Nearest", rating: "Top rated", openNow: "Open now" },
    distance: { "3": "3 km", "5": "5 km", "10": "10 km", "25": "25 km" },
  };
  if (map[key] && map[key][value]) return map[key][value];
  const boolMap: Record<string, string> = {
    openNow: "Open now",
    is24x7: "24x7",
    emergency: "Emergency",
    ambulance: "Ambulance",
    homeVisit: "Home visit",
    verifiedOnly: "Verified only",
  };
  return boolMap[key] || value;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: "veterinary-clinics", label: "Veterinary Clinics" },
  { id: "animal-hospitals", label: "Animal Hospitals" },
  { id: "boarding-daycare", label: "Boarding & Daycare" },
  { id: "diagnostics-labs", label: "Diagnostics & Labs" },
  { id: "ambulances", label: "Ambulances" },
  { id: "ngo-rescue", label: "NGOs & Rescue" },
];
const SPECIES = ["Dog", "Cat", "Bird", "Exotic", "Livestock"];
const DISTANCES = ["3", "5", "10", "25"];
const SORTS = [{ id: "nearest", label: "Nearest" }, { id: "rating", label: "Top rated" }, { id: "openNow", label: "Open now" }];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const p = (await searchParams) ?? {};

  const filters: ProviderFilters = {};
  if (p.category) filters.category = String(p.category);
  if (p.species) filters.species = String(p.species);
  if (p.openNow) filters.openNow = String(p.openNow);
  if (p.open24x7) filters.is24x7 = String(p.open24x7);
  if (p.emergency) filters.emergency = String(p.emergency);
  if (p.ambulance) filters.ambulance = String(p.ambulance);
  if (p.homeVisit) filters.homeVisit = String(p.homeVisit);
  if (p.verified) filters.verifiedOnly = String(p.verified);
  if (p.maxDistance) filters.distance = String(p.maxDistance);
  if (p.sort) filters.sort = String(p.sort);
  if (p.q) filters.q = String(p.q);
  if (p.location && !filters.q) filters.q = String(p.location);

  const activeCount =
    (filters.category ? 1 : 0) +
    (filters.species ? 1 : 0) +
    (filters.openNow ? 1 : 0) +
    (filters.is24x7 ? 1 : 0) +
    (filters.emergency ? 1 : 0) +
    (filters.ambulance ? 1 : 0) +
    (filters.homeVisit ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.distance ? 1 : 0) +
    (filters.q ? 1 : 0);

  const filtered = filterProviders(PROVIDERS, filters, DEFAULT_LAT, DEFAULT_LNG);
  const sorted = sortProviders(filtered, filters.sort || "nearest", DEFAULT_LAT, DEFAULT_LNG);
  const view = p.view === "map" ? "map" : "list";

  return (
    <div className="min-h-[calc(100vh-var(--header-height, 64px))]">
      <div className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-practo-text">
              {activeCount ? "Filtered results" : "All providers"}
            </h1>
            <p className="text-sm text-practo-text-muted">
              {sorted.length} provider{sorted.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <FilterTrigger
            current={filters}
            activeCount={activeCount}
          />

          <div className="flex items-center gap-2">
            <a
              href={buildURL(filters, view === "map" ? "list" : "map")}
              className={cn(
                "flex items-center gap-2 rounded-xl border border-practo-border bg-practo-surface px-3 py-2 text-sm font-medium text-practo-text hover:bg-practo-primary-light transition-colors min-h-[44px]",
                view === "map" ? "bg-practo-primary text-white border-practo-primary" : ""
              )}
            >
              {view === "map" ? <Layout className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
              {view === "map" ? "List" : "Map"}
            </a>
          </div>
        </div>

        {/* Active filter chips */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              const k = key as keyof ProviderFilters;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-practo-border/50 bg-practo-primary/5 px-3 py-1.5 text-xs font-medium text-practo-text"
                >
                  {chipLabel(key, value)}
                  <a
                    href={setFilter(filters, k, undefined)}
                    className="ml-1 text-practo-text-muted hover:text-practo-primary"
                    aria-label={`Remove ${chipLabel(key, value)}`}
                  >
                    <X className="w-3 h-3" />
                  </a>
                </span>
              );
            })}
            <a
              href="/search"
              className="inline-flex items-center gap-1 rounded-full border border-practo-border/50 bg-practo-surface px-3 py-1.5 text-xs font-medium text-practo-primary hover:bg-practo-primary/5"
            >
              <X className="w-3 h-3" /> Clear all
            </a>
          </div>
        )}

        {/* Desktop filter sidebar (links only, server-rendered) */}
        {(!p.view || p.view !== "map") && (
          <aside className="hidden lg:block lg:w-72 mb-10">
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-practo-text-muted uppercase tracking-wider">
                Filters
              </h3>

              <div>
                <h4 className="text-xs font-bold text-practo-text mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const active = filters.category === c.id;
                    return (
                      <a
                        key={c.id}
                        href={setFilter(filters, "category", active ? undefined : c.id)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                          active
                            ? "bg-practo-primary text-white border-practo-primary"
                            : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                        )}
                      >
                        {c.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-practo-text mb-3">Species treated</h4>
                <div className="flex flex-wrap gap-2">
                  {SPECIES.map((s) => {
                    const active = filters.species === s;
                    return (
                      <a
                        key={s}
                        href={setFilter(filters, "species", active ? undefined : s)}
                        className={cn(
                          "rounded-xl border px-3 py-1.5 text-[10px] font-medium transition-colors",
                          active
                            ? "bg-practo-primary text-white border-practo-primary"
                            : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                        )}
                      >
                        {s}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-practo-text mb-3">Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "openNow" as const, label: "Open now" },
                    { key: "is24x7" as const, label: "24x7" },
                    { key: "ambulance" as const, label: "Ambulance" },
                    { key: "homeVisit" as const, label: "Home visit" },
                    { key: "verifiedOnly" as const, label: "Verified only" },
                  ].map(({ key, label }) => {
                    const active = filters[key] === "1";
                    return (
                      <a
                        key={key}
                        href={setFilter(filters, key, boolValue(filters, key))}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                          active
                            ? "bg-practo-primary text-white border-practo-primary"
                            : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                        )}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-practo-text mb-3">Max distance</h4>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={setFilter(filters, "distance", undefined)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                      !filters.distance
                        ? "bg-practo-primary text-white border-practo-primary"
                        : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                    )}
                  >
                    Any
                  </a>
                  {DISTANCES.map((d) => {
                    const active = filters.distance === d;
                    return (
                      <a
                        key={d}
                        href={setFilter(filters, "distance", active ? undefined : d)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                          active
                            ? "bg-practo-primary text-white border-practo-primary"
                            : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                        )}
                      >
                        {d} km
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-practo-text mb-3">Sort by</h4>
                <div className="flex flex-wrap gap-2">
                  {SORTS.map((s) => {
                    const active = filters.sort === s.id;
                    return (
                      <a
                        key={s.id}
                        href={setFilter(filters, "sort", active ? undefined : s.id)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                          active
                            ? "bg-practo-primary text-white border-practo-primary"
                            : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                        )}
                      >
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        )}

        <div className="lg:ml-72">
          {view === "map" ? (
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-2xl border border-practo-border h-[400px] relative overflow-hidden flex items-center justify-center bg-practo-primary/5">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-practo-text-muted/50 mx-auto mb-2" />
                    <p className="text-sm text-practo-text-muted">
                      Map placeholder — pins positioned from provider coordinates
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-10 hidden lg:block">
                  <a
                    href={buildURL({ ...filters, openNow: "1", is24x7: "1" })}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl border border-practo-emergency bg-practo-emergency text-white px-3 py-2 text-sm font-semibold hover:bg-practo-emergency/90 transition-colors min-h-[44px]"
                    )}
                  >
                    <Clock className="w-4 h-4 mr-1.5" />
                    Emergency near me
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7">
                {sorted.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {sorted.map((p) => (
                      <ProviderCard
                        key={p.id}
                        provider={p}
                        userLat={DEFAULT_LAT}
                        userLng={DEFAULT_LNG}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {sorted.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sorted.map((p) => (
                    <ProviderCard
                      key={p.id}
                      provider={p}
                      userLat={DEFAULT_LAT}
                      userLng={DEFAULT_LNG}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-practo-border border-dashed bg-practo-surface/50 p-12 text-center">
      <Search className="w-10 h-10 mx-auto mb-3 text-practo-text-muted" />
      <h3 className="font-bold text-practo-text mb-2">No providers match your filters</h3>
      <p className="text-sm text-practo-text-muted mb-6 max-w-xs mx-auto">
        Try adjusting your filters or clear them to see all providers.
      </p>
      <a
        href="/search"
        className="text-sm font-semibold text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover"
      >
        Clear all filters
      </a>
    </div>
  );
}
