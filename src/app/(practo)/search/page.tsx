"use client";

import Link from "next/link";
import {
  Search,
  Layout,
  LayoutGrid,
  Clock,
  X,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Hospital,
  Bed,
  Microscope,
  Ambulance,
  HandHeart,
} from "lucide-react";
import { useState } from "react";
import { FilterTrigger } from "@/components/practo/filter-trigger";
import ProviderCard from "@/components/practo/provider-card";
import {
  filterProviders,
  sortProviders,
  DEFAULT_LAT,
  DEFAULT_LNG,
} from "@/lib/providers";
import { PROVIDERS } from "@/data/providers";
import type { ProviderFilters } from "@/data/models";
import { Container, Section, SectionHeader } from "@/components/practo/layout";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const CATEGORIES: { id: string; label: string; icon: React.ElementType }[] = [
  { id: "veterinary-clinics", label: "Veterinary Clinics", icon: Stethoscope },
  { id: "animal-hospitals", label: "Animal Hospitals", icon: Hospital },
  { id: "boarding-daycare", label: "Boarding & Daycare", icon: Bed },
  { id: "diagnostics-labs", label: "Diagnostics & Labs", icon: Microscope },
  { id: "ambulances", label: "Ambulances", icon: Ambulance },
  { id: "ngo-rescue", label: "NGOs & Rescue", icon: HandHeart },
];

const SPECIES = ["Dog", "Cat", "Bird", "Exotic", "Livestock"];
const DISTANCES = ["3", "5", "10", "25"];
const SORTS = [
  { id: "nearest", label: "Nearest" },
  { id: "rating", label: "Top rated" },
  { id: "openNow", label: "Open now" },
];

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

function boolValue(
  current: ProviderFilters,
  key: "openNow" | "is24x7" | "emergency" | "ambulance" | "homeVisit" | "verifiedOnly"
): string | undefined {
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

function categoryIcon(name: string): React.ElementType {
  const m: Record<string, React.ElementType> = {
    Stethoscope,
    Hospital,
    Bed,
    Microscope,
    Ambulance,
    HandHeart,
  };
  return m[name] ?? MapPin;
}

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
  if (p.where && !filters.q) filters.q = String(p.where);

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

  const activeCategory = CATEGORIES.find((c) => c.id === filters.category);
  const pageTitle = activeCategory
    ? `${activeCategory.label} near Gurugram`
    : "Vets and care near Gurugram";

  return (
      <div className="min-h-[calc(100vh-var(--header-height, 64px))]">
        <Section className="py-6 sm:py-8 lg:py-10" background="none">
          <Container>
            <SectionHeader
              eyebrow="Search results"
              title={pageTitle}
              subtitle={
                activeCount > 0
                  ? `${activeCount} filter${activeCount !== 1 ? "s" : ""} active`
                  : undefined
              }
              viewAll={view === "map" ? "/search?list" : "/search?view=map"}
            />

            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  const k = key as keyof ProviderFilters;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-practo-border/50 bg-practo-primary/5 px-3 py-1.5 text-xs font-medium text-practo-text"
                    >
                      {chipLabel(key, value)}
                      <Link
                        href={setFilter(filters, k, undefined)}
                        className="ml-1 text-practo-text-muted hover:text-practo-primary"
                        aria-label={`Remove ${chipLabel(key, value)}`}
                      >
                        <X className="w-3 h-3" />
                      </Link>
                    </span>
                  );
                })}
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1 rounded-full border border-practo-border/50 bg-practo-surface px-3 py-1.5 text-xs font-medium text-practo-primary hover:bg-practo-primary/5"
                >
                  <X className="w-3 h-3" /> Clear all
                </Link>
              </div>
            )}

            {/* Desktop: two-column layout with sticky sidebar */}
            {!p.view || p.view !== "map" ? (
              <div className="grid lg:grid-cols-12 gap-8">
                <aside
                  className={
                    "lg:col-span-3 order-2 lg:order-1 self-start top-6 max-h-[calc(100vh-110px)] overflow-y-auto pr-4"
                  }
                >
                  <FilterSidebar
                    filters={filters}
                    setFilter={setFilter}
                    boolValue={boolValue}
                  />
                </aside>
                <div className="lg:col-span-9 order-1 lg:order-2">
                  <PageActions
                    activeCount={activeCount}
                    filters={filters}
                    sortedLength={sorted.length}
                    view={view}
                    buildURL={buildURL}
                  />
                  <ResultsGrid
                    providers={sorted}
                    userLat={DEFAULT_LAT}
                    userLng={DEFAULT_LNG}
                  />
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5">
                  <MapSvg providers={sorted} />
                  <div className="mt-4 absolute bottom-4 right-4 z-10 hidden lg:block">
                    <Link
                      href={buildURL({ ...filters, openNow: "1", is24x7: "1" })}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl border border-practo-emergency bg-practo-emergency text-white px-3 py-2 text-sm font-semibold hover:bg-practo-emergency/90 transition-colors min-h-[44px]"
                      )}
                    >
                      <Clock className="w-4 h-4 mr-1.5" />
                      Emergency near me
                    </Link>
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
            )}
          </Container>
        </Section>

        {/* Mobile: Filter bottom sheet trigger (not on desktop) */}
        <div className="lg:hidden px-4 pb-6">
          <FilterTrigger
            current={filters}
            activeCount={activeCount}
            className="w-full"
          />
        </div>
    </div>
   );
}

interface FilterSidebarProps {
  filters: ProviderFilters;
  setFilter: (
    current: ProviderFilters,
    key: keyof ProviderFilters,
    value: string | undefined
  ) => string;
  boolValue: (
    current: ProviderFilters,
    key: "openNow" | "is24x7" | "emergency" | "ambulance" | "homeVisit" | "verifiedOnly"
  ) => string | undefined;
}

function FilterSidebar({
  filters,
  setFilter,
  boolValue,
}: FilterSidebarProps) {
  const [openGroups, setOpenGroups] = useState<string[]>([
    "category",
    "species",
    "features",
  ]);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openGroups.includes(id);

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold text-practo-text-muted uppercase tracking-wider">
        Filters
      </h3>

      <AccordionGroup
        id="category"
        title="Category"
        open={isOpen("category")}
        onToggle={() => toggleGroup("category")}
      >
        <div className="grid grid-cols-1 gap-2">
          {CATEGORIES.map((c) => {
            const active = filters.category === c.id;
            const Icon = categoryIcon(c.icon.toString());
            return (
              <Link
                key={c.id}
                href={setFilter(filters, "category", active ? undefined : c.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-practo-primary text-white border-practo-primary"
                    : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {c.label}
              </Link>
            );
          })}
        </div>
      </AccordionGroup>

      <AccordionGroup
        id="species"
        title="Species treated"
        open={isOpen("species")}
        onToggle={() => toggleGroup("species")}
      >
        <div className="flex flex-wrap gap-2">
          {SPECIES.map((s) => {
            const active = filters.species === s;
            return (
              <Link
                key={s}
                href={setFilter(filters, "species", active ? undefined : s)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-practo-primary text-white border-practo-primary"
                    : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                )}
              >
                {s}
              </Link>
            );
          })}
        </div>
      </AccordionGroup>

      <AccordionGroup
        id="features"
        title="Availability & features"
        open={isOpen("features")}
        onToggle={() => toggleGroup("features")}
      >
        <div className="grid grid-cols-1 gap-2">
          {[
            { key: "openNow" as const, label: "Open now" },
            { key: "is24x7" as const, label: "24×7" },
            { key: "ambulance" as const, label: "Ambulance" },
            { key: "homeVisit" as const, label: "Home visit" },
            { key: "verifiedOnly" as const, label: "Verified only" },
          ].map(({ key, label }) => {
            const active = filters[key] === "1";
            return (
              <Link
                key={key}
                href={setFilter(filters, key, boolValue(filters, key))}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-practo-primary text-white border-practo-primary"
                    : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                )}
              >
                {active ? (
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 shrink-0" />
                )}
                {label}
              </Link>
            );
          })}
        </div>
      </AccordionGroup>

      <AccordionGroup
        id="distance"
        title="Max distance"
        open={isOpen("distance")}
        onToggle={() => toggleGroup("distance")}
      >
        <div className="flex flex-wrap gap-2">
          <Link
            href={setFilter(filters, "distance", undefined)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
              !filters.distance
                ? "bg-practo-primary text-white border-practo-primary"
                : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
            )}
          >
            Any
          </Link>
          {DISTANCES.map((d) => {
            const active = filters.distance === d;
            return (
              <Link
                key={d}
                href={setFilter(filters, "distance", active ? undefined : d)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-practo-primary text-white border-practo-primary"
                    : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                )}
              >
                {d} km
              </Link>
            );
          })}
        </div>
      </AccordionGroup>

      <AccordionGroup
        id="sort"
        title="Sort by"
        open={isOpen("sort")}
        onToggle={() => toggleGroup("sort")}
      >
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => {
            const active = filters.sort === s.id;
            return (
              <Link
                key={s.id}
                href={setFilter(filters, "sort", active ? undefined : s.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-practo-primary text-white border-practo-primary"
                    : "bg-practo-surface text-practo-text border-practo-border hover:bg-practo-primary/5"
                )}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </AccordionGroup>
    </div>
  );
}

interface AccordionGroupProps {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionGroup({
  title,
  open,
  onToggle,
  children,
}: AccordionGroupProps) {
  return (
    <div className="rounded-xl border border-practo-border bg-practo-surface overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-practo-text hover:bg-practo-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={cn("w-4 h-4 text-practo-text-muted transition-transform", {
            "rotate-180": open,
          })}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 py-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PageActionsProps {
  activeCount: number;
  filters: ProviderFilters;
  sortedLength: number;
  view: string;
  buildURL: (params: ProviderFilters, view?: string) => string;
}

function PageActions({
  filters,
  sortedLength,
  view,
  buildURL,
}: PageActionsProps) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-2">
      <div className="space-y-1">
        <span className="text-xs font-bold text-practo-text-muted uppercase tracking-wider">
          {sortedLength} provider{sortedLength !== 1 ? "s" : ""} found
        </span>
      </div>
      <div className="flex items-center gap-3">
        <select
          defaultValue={filters.sort || "nearest"}
          onChange={(e) => {
            const next = { ...filters, sort: e.target.value };
            window.location.href = buildURL(next);
          }}
          className="text-sm rounded-lg border border-practo-border bg-practo-surface px-3 py-2 text-practo-text focus:outline-none focus:ring-2 focus:ring-practo-primary min-h-[44px]"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <Link
          href={buildURL(filters, view === "map" ? "list" : "map")}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-practo-border bg-practo-surface px-3 py-2 text-sm font-medium text-practo-text hover:bg-practo-primary-light transition-colors min-h-[44px]",
            view === "map" ? "bg-practo-primary text-white border-practo-primary" : ""
          )}
        >
          {view === "map" ? <Layout className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          {view === "map" ? "List" : "Map"}
        </Link>
      </div>
    </div>
  );
}

interface ResultsGridProps {
  providers: typeof PROVIDERS;
  userLat: number;
  userLng: number;
}

function ResultsGrid({
  providers,
  userLat,
  userLng,
}: ResultsGridProps) {
  if (providers.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {providers.map((p) => (
        <ProviderCard
          key={p.id}
          provider={p}
          userLat={userLat}
          userLng={userLng}
        />
      ))}
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
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/search"
          className="text-sm font-semibold text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover"
        >
          Clear all filters
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-lg border border-practo-border bg-practo-surface px-4 py-2 text-sm font-medium text-practo-text hover:bg-practo-primary-light transition-colors min-h-[44px]"
        >
          Browse all categories
        </Link>
      </div>
    </div>
  );
}

function MapSvg({ providers }: { providers: typeof PROVIDERS }) {
  if (providers.length === 0) {
    return (
      <div className="rounded-2xl border border-practo-border h-[400px] flex items-center justify-center bg-practo-primary/5">
        <p className="text-sm text-practo-text-muted">No providers to display on map</p>
      </div>
    );
  }

  const lats = providers.map((p) => p.lat);
  const lngs = providers.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latPad = (maxLat - minLat) * 0.15 || 0.01;
  const lngPad = (maxLng - minLng) * 0.15 || 0.01;

  // Ensure a minimum viewBox span so single-provider maps don't degenerate
  const minSpan = 0.1;
  const spanLat = Math.max(maxLat - minLat, minSpan);
  const spanLng = Math.max(maxLng - minLng, minSpan);

  const viewBox = [
    minLng - lngPad,
    maxLat + latPad,
    spanLng + lngPad * 2,
    spanLat + latPad * 2,
  ].join(" ");

  const toX = (lng: number) =>
    ((lng - (minLng - lngPad)) / ((maxLng - minLng) + lngPad * 2)) * 100;
  const toY = (lat: number) =>
    ((maxLat + latPad - lat) / ((maxLat - minLat) + latPad * 2)) * 100;

  return (
    <div className="rounded-2xl border border-practo-border h-[400px] relative overflow-hidden bg-practo-primary/5">
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="block"
        aria-label="Provider locations map"
        role="img"
      >
        <defs>
          <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={2} />
            <feOffset dx={0} dy={1} result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={0.3} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {providers.map((p) => (
          <Link
            key={p.id}
            href={`/provider/${p.id}`}
            className="block"
          >
            <circle
              cx={toX(p.lng)}
              cy={toY(p.lat)}
              r="0.008"
              fill={p.is24x7 ? "#b91c1c" : "#0f766e"}
              filter="url(#pinShadow)"
            />
            <circle
              cx={toX(p.lng)}
              cy={toY(p.lat)}
              r="0.003"
              fill="white"
            />
            <title>{p.name}</title>
          </Link>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <span className="flex items-center gap-1 text-[10px] font-bold text-practo-text bg-practo-surface/90 px-2 py-1 rounded border border-practo-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-practo-emergency" />
          24×7
        </span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-practo-text bg-practo-surface/90 px-2 py-1 rounded border border-practo-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-practo-primary" />
          All providers
        </span>
      </div>
    </div>
  );
}
