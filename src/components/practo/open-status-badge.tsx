"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { isOpenNow } from "@/lib/providers";
import type { Provider } from "@/data/models";
import { cn } from "@/lib/utils";

interface OpenStatusBadgeProps {
  provider: Provider;
}

export function OpenStatusBadge({ provider }: OpenStatusBadgeProps) {
  const [open, setOpen] = useState<boolean | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- open/closed status depends on
     the current time, which can only be computed on the client after mount. */
  useEffect(() => {
    setOpen(isOpenNow(provider));
  }, [provider]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const status =
    provider.is24x7 ? "24x7" : open === null ? "Hours" : open ? "Open" : "Closed";

  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border";
  const cls =
    provider.is24x7
      ? "bg-practo-emergency text-white border-practo-emergency"
      : open === null
        ? "bg-practo-surface text-practo-text-muted border-practo-border/40"
        : open
          ? "bg-practo-open-light text-practo-open border-practo-open/20"
          : "bg-practo-closed/10 text-practo-closed border-practo-closed/30";

  return (
    <span className={cn(cls, base)}>
      <Clock className="w-3 h-3" />
      {status}
    </span>
  );
}
