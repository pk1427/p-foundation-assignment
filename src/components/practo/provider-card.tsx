import Link from "next/link";
import {
  Phone,
  MapPin,
  Star,
  ShieldCheck,
  Stethoscope,
  Hospital,
  Bed,
  Microscope,
  Ambulance,
  HandHeart,
} from "lucide-react";
import type { Provider } from "@/data/models";
import { Button } from "@/components/shared/button";
import { OpenStatusBadge } from "@/components/practo/open-status-badge";
import { distanceKm } from "@/lib/providers";
import { cn } from "@/lib/utils";

const ICON_BY_CATEGORY: Record<string, React.ElementType> = {
  "veterinary-clinics": Stethoscope,
  "animal-hospitals": Hospital,
  "boarding-daycare": Bed,
  "diagnostics-labs": Microscope,
  ambulances: Ambulance,
  "ngo-rescue": HandHeart,
};

const CATEGORY_TINT: Record<string, string> = {
  "veterinary-clinics": "bg-practo-sage",
  "animal-hospitals": "bg-practo-rose",
  "boarding-daycare": "bg-practo-amber-light",
  "diagnostics-labs": "bg-indigo-50",
  ambulances: "bg-practo-emergency-tint",
  "ngo-rescue": "bg-purple-50",
};

interface ProviderCardProps {
  provider: Provider;
  userLat?: number;
  userLng?: number;
  showDistance?: boolean;
}

export default function ProviderCard({
  provider,
  userLat,
  userLng,
  showDistance = true,
}: ProviderCardProps) {
  const PhotoIcon = ICON_BY_CATEGORY[provider.category];
  const tint = CATEGORY_TINT[provider.category] ?? "bg-practo-primary-light";
  const distance =
    userLat != null && userLng != null
      ? distanceKm(userLat, userLng, provider.lat, provider.lng)
      : null;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    provider.address
  )}`;
  const telUrl = `tel:${provider.phone}`;
  const remaining = provider.services.length - 3;

  return (
    <Link
      href={`/provider/${provider.id}`}
      className={cn(
        "flex flex-col h-full rounded-xl border border-practo-border bg-practo-surface shadow-soft hover:shadow-card-hover transition-all duration-200 group",
        provider.is24x7 ? "border-practo-emergency/30" : ""
      )}
      aria-label={`View profile for ${provider.name}`}
    >
      {/* Header area */}
      <div className={cn("relative h-32 rounded-t-xl overflow-hidden flex items-center justify-center", tint)}>
        <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
        <PhotoIcon className="w-10 h-10 text-practo-primary" />
        {provider.is24x7 && (
          <span className="absolute top-2 right-2 rounded-full bg-practo-emergency text-white px-2 py-0.5 text-[10px] font-bold tracking-tight shadow-sm">
            24×7
          </span>
        )}
        {provider.verified && (
          <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white text-practo-primary px-2 py-0.5 text-[10px] font-bold shadow-sm">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-practo-text line-clamp-2 leading-snug">{provider.name}</h3>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-500 shrink-0" />
            <span className="font-bold text-practo-text text-sm shrink-0">
              {provider.rating}
            </span>
          </div>
        </div>
        <p className="text-xs text-practo-text-muted line-clamp-1" title={provider.address}>
          <MapPin className="w-3 h-3 mr-1 shrink-0" />
          {provider.address.split(",").slice(0, 2).join(",")}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <OpenStatusBadge provider={provider} />
          {showDistance && distance != null && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-practo-border/40 bg-practo-surface/50 text-[10px] font-medium text-practo-text-muted">
              <MapPin className="w-3 h-3 shrink-0" />
              {distance.toFixed(1)} km
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded border bg-white text-[10px] font-medium shadow-sm",
              provider.priceBand === "₹₹₹"
                ? "border-amber-200 text-practo-amber bg-amber-50"
                : "border-practo-border/40 text-practo-text-muted bg-practo-surface/50"
            )}
          >
            {provider.priceBand}
            <span className="sr-only">indicative pricing</span>
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {provider.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="px-2 py-1 rounded border border-practo-border/50 text-[10px] font-medium text-practo-text-muted bg-practo-primary/5"
            >
              {s}
            </span>
          ))}
          {remaining > 0 && (
            <span className="px-2 py-1 rounded border border-practo-border/50 text-[10px] font-medium text-practo-text-muted bg-practo-primary/5">
              +{remaining} more
            </span>
          )}
        </div>
      </div>

      {/* Actions pinned to bottom */}
      <div className="border-t border-practo-border/40 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            href={telUrl}
            variant="primary"
            size="sm"
            className="w-full"
            aria-label={`Call ${provider.name}`}
          >
            <Phone className="w-4 h-4 shrink-0" />
            Call
          </Button>
          <Button
            href={mapsUrl}
            variant="outline"
            size="sm"
            className="w-full"
            target="_blank"
            rel="noopener"
            aria-label={`Directions to ${provider.name}`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            Directions
          </Button>
        </div>
      </div>
    </Link>
  );
}
