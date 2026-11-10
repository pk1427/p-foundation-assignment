"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProviderById } from "@/lib/providers";
import { CorrectionDialog } from "@/components/practo/correction-dialog";
import { ToastProvider } from "@/components/practo/toast";

export default function SubmitCorrectionPage() {
  const [providerId, setProviderId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read URL param once on mount (client-only)
    setProviderId(new URLSearchParams(window.location.search).get("provider") || undefined);
  }, []);

  if (providerId && !getProviderById(providerId)) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-var(--header-height, 64px))]">
      <main className="flex-grow">
        <ToastProvider>
          <div className="px-4 lg:px-6 py-10 max-w-md mx-auto">
            <div className="rounded-2xl border border-practo-border bg-practo-surface p-8">
              <h1 className="text-2xl font-bold text-practo-text mb-2">
                Submit a Correction
              </h1>
              <p className="text-sm text-practo-text-muted mb-6">
                Spot outdated info on a listing? Let us know and our team will
                review it.
              </p>
              {providerId ? (
                <CorrectionDialog providerId={providerId} />
              ) : (
                <p className="text-sm text-practo-text-muted">
                  No provider selected. <a href="/search" className="text-practo-primary underline underline-offset-4">Browse providers</a>.
                </p>
              )}
            </div>
          </div>
        </ToastProvider>
      </main>
    </div>
  );
}
