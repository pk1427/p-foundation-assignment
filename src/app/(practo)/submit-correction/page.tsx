"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProviderById } from "@/lib/providers";
import { CorrectionDialog } from "@/components/practo/correction-dialog";
import { ToastProvider } from "@/components/practo/toast";
import { Container, Section, SectionHeader } from "@/components/practo/layout";
import Link from "next/link";

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
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height, 64px))]">
      <Section className="py-6 sm:py-8 lg:py-12">
        <Container>
          <SectionHeader
            eyebrow="Help us improve"
            title="Submit a Correction"
            subtitle={
              providerId
                ? "Spot outdated info on this listing? Let us know and our team will review it."
                : "No provider selected. Browse providers to submit a correction."
            }
          />
          <ToastProvider>
            <div className="rounded-2xl border border-practo-border bg-practo-surface p-4 sm:p-6 shadow-soft">
              {providerId ? (
                <CorrectionDialog providerId={providerId} />
              ) : (
                <p className="text-sm text-practo-text-muted">
                  No provider selected. <Link href="/search" className="text-practo-primary underline underline-offset-4">Browse providers</Link>.
                </p>
              )}
            </div>
          </ToastProvider>
        </Container>
      </Section>
    </div>
  );
}
