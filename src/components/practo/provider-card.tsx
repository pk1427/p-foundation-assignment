import Link from "next/link";
import {
  Phone,
  MapPin,
  Star,
  ShieldCheck,
  ChevronRight,
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
  const distance =
    userLat != null && userLng != null
      ? distanceKm(userLat, userLng, provider.lat, provider.lng)
      : null;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    provider.address
  )}`;
  const telUrl = `tel:${provider.phone}`;

  return (
    <article
      className={cn(
        "bg-practo-surface border border-practo-border rounded-2xl p-5 shadow-soft",
        "hover:shadow-card transition-all duration-200 group"
      )}
    >
      <div className="relative h-36 rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-practo-primary-light">
        <PhotoIcon className="w-12 h-12 text-practo-primary" />
        {provider.is24x7 && (
          <span className="absolute top-3 right-3 rounded-full bg-practo-emergency text-white px-2.5 py-0.5 text-[10px] font-bold tracking-tight">
            24x7
          </span>
        )}
      </div>

      <Link href={`/provider/${provider.id}`} className="block">
        <h3 className="font-bold text-practo-text leading-tight">{provider.name}</h3>
        <p className="text-xs text-practo-text-muted truncate">{provider.address}</p>
      </Link>

      <div className="flex items-center gap-3 mb-3">
        <OpenStatusBadge provider={provider} />
        {provider.verified && (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-practo-primary/10 text-practo-primary border border-practo-primary/20">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        )}
        {showDistance && distance != null && (
          <span className="ml-auto text-xs text-practo-text-muted">
            {distance.toFixed(1)} km
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
          <span className="text-sm font-bold text-practo-text">
            {provider.rating}
          </span>
          <span className="text-xs text-practo-text-muted">({provider.reviewCount})</span>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-practo-text">{provider.priceBand}</p>
          <p className="text-[10px] text-practo-text-muted">indicative</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.services.slice(0, 4).map((s) => (
          <span
            key={s}
            className="px-2 py-1 rounded border border-practo-border/50 text-[10px] font-medium text-practo-text-muted bg-practo-primary/5"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          href={telUrl}
          variant="outline"
          size="sm"
          className="w-full min-h-[44px]"
          aria-label={`Call ${provider.name}`}
        >
          <Phone className="w-4 h-4 mr-1.5" />
          Call
        </Button>
        <Button
          href={mapsUrl}
          variant="outline"
          size="sm"
          className="w-full min-h-[44px]"
          target="_blank"
          rel="noopener"
          aria-label={`Directions to ${provider.name}`}
        >
          <MapPin className="w-4 h-4 mr-1.5" />
          Directions
        </Button>
      </div>

      <Link
        href={`/provider/${provider.id}`}
        className="mt-3 block text-center text-xs font-semibold text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover flex items-center justify-center gap-1"
      >
        View profile <ChevronRight className="w-3 h-3" />
      </Link>
    </article>
  );
}
