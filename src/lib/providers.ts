import type { Provider, ProviderFilters, Species } from "@/data/models";
import { PROVIDERS } from "@/data/providers";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const EARTH_RADIUS_KM = 6371;
export const DEFAULT_LAT = 12.9716;
export const DEFAULT_LNG = 77.5946;

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function parseTime(t: string): number | null {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const mi = parseInt(m[2], 10);
  const ampm = m[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + mi;
}

export function isOpenNow(provider: Provider, now: Date = new Date()): boolean {
  const day = DAYS[now.getDay()];
  const hours = provider.hours[day];
  if (!hours) return false;
  const lower = hours.toLowerCase();
  if (lower.includes("closed") && !lower.includes("open 24")) return false;
  if (lower.includes("open 24") || lower.includes("24 hours")) return true;
  const parts = hours.split(/–|—|-/);
  if (parts.length < 2) return false;
  const start = parseTime(parts[0].trim());
  const end = parseTime(parts[1].trim());
  if (start == null || end == null) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= start && current <= end;
}

export function getFeatured(count = 4): Provider[] {
  return [...PROVIDERS]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, count);
}

export function filterProviders(
  providers: Provider[],
  params: ProviderFilters,
  userLat?: number,
  userLng?: number
): Provider[] {
  return providers.filter((p) => {
    if (params.category && params.category !== "all" && p.category !== params.category)
      return false;
    if (params.species && !p.species.includes(params.species as Species)) return false;
    if (params.openNow === "1" && !isOpenNow(p)) return false;
    if (params.is24x7 === "1" && !p.is24x7) return false;
    if (params.emergency === "1" && !p.emergency) return false;
    if (params.ambulance === "1" && !p.ambulance) return false;
    if (params.homeVisit === "1" && !p.homeVisit) return false;
    if (params.verifiedOnly === "1" && !p.verified) return false;
    if (
      params.distance &&
      userLat != null &&
      userLng != null &&
      distanceKm(userLat, userLng, p.lat, p.lng) > Number(params.distance)
    )
      return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      const haystack = [p.name, p.about, ...p.services, p.address]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProviders(
  list: Provider[],
  sort: string,
  userLat?: number,
  userLng?: number
): Provider[] {
  return [...list].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
    if (sort === "nearest" && userLat != null && userLng != null) {
      return (
        distanceKm(userLat, userLng, a.lat, a.lng) -
        distanceKm(userLat, userLng, b.lat, b.lng)
      );
    }
    if (sort === "openNow") {
      const ao = isOpenNow(a);
      const bo = isOpenNow(b);
      if (ao === bo) return 0;
      return ao ? -1 : 1;
    }
    return 0;
  });
}

export function getProviderById(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

export function providersByCategory(category: string): Provider[] {
  return PROVIDERS.filter((p) => p.category === category);
}
