import { notFound } from "next/navigation";
import {
  Phone,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Clock,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { getProviderById } from "@/lib/providers";
import { PROVIDERS } from "@/data/providers";
import { Button } from "@/components/shared/button";
import { CorrectionDialog } from "@/components/practo/correction-dialog";
import { OpenStatusBadge } from "@/components/practo/open-status-badge";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeader } from "@/components/practo/layout";

export async function generateStaticParams() {
  return PROVIDERS.map((p) => ({ id: p.id }));
}

interface ProviderPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    provider.address
  )}`;
  const whatsappUrl = provider.whatsapp
    ? `https://wa.me/${provider.whatsapp.replace(/\D/g, "")}`
    : null;
  const telUrl = `tel:${provider.phone}`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height, 64px))]">
      {/* Header */}
      <Section className="py-6 sm:py-8">
        <Container>
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-sm text-practo-primary underline underline-offset-4 hover:text-practo-primary-hover mb-4"
          >
            <ChevronRight className="w-3 h-3 rotate-180" /> Back to search
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <OpenStatusBadge provider={provider} />
                {provider.verified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-practo-primary px-2.5 py-0.5 text-[10px] font-bold border border-practo-primary/20 shadow-sm">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-practo-text leading-tight">
                {provider.name}
              </h1>
              <p className="text-sm text-practo-text-muted mt-1">
                <MapPin className="w-4 h-4 mr-1.5" /> {provider.address}
              </p>
              <p className="text-sm text-practo-text-muted mt-1">
                Last verified{" "}
                <time dateTime={provider.lastVerifiedAt}>{provider.lastVerifiedAt}</time>
                &middot;
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-medium",
                    provider.priceBand === "₹₹₹"
                      ? "border-amber-200 text-practo-amber bg-amber-50"
                      : "border-practo-border/40 text-practo-text-muted bg-practo-surface/50"
                  )}
                >
                  {provider.priceBand}
                  <span className="sr-only">indicative pricing</span>
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                href={telUrl}
                size="lg"
                className="w-full sm:w-auto min-h-[52px]"
              >
                <Phone className="w-5 h-5 mr-2" /> Call
              </Button>
              {provider.whatsapp && whatsappUrl && (
                <Button
                  href={whatsappUrl}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-h-[52px]"
                  target="_blank"
                  rel="noopener"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                </Button>
              )}
              <Button
                href={mapsUrl}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-[52px]"
                target="_blank"
                rel="noopener"
              >
                <MapPin className="w-5 h-5 mr-2" /> Directions
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Photo + About */}
      <Section background="sage">
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 rounded-2xl overflow-hidden bg-practo-primary-light flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-white/30" aria-hidden="true" />
                <span className="relative text-6xl text-practo-primary">🏥</span>
              </div>
              <p className="text-practo-text-muted leading-relaxed text-sm max-w-prose">
                {provider.about}
              </p>
            </div>
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-xl border border-practo-border bg-practo-surface p-4">
                <h3 className="text-xs font-bold text-practo-text-muted uppercase tracking-wider mb-3">
                  Services &amp; prices
                </h3>
                <ul className="space-y-2 text-sm text-practo-text">
                  {provider.services.map((s) => (
                    <li key={s} className="flex items-center justify-between">
                      <span>{s}</span>
                      <span
                        className={cn(
                          "font-medium",
                          provider.priceBand === "₹₹₹"
                            ? "text-practo-amber"
                            : "text-practo-primary"
                        )}
                      >
                        {provider.priceBand}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-practo-border bg-practo-surface p-4">
                <h3 className="text-xs font-bold text-practo-text-muted uppercase tracking-wider mb-3">
                  Species treated
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.species.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-practo-border/50 bg-practo-sage px-2.5 py-1 text-[10px] font-medium text-practo-text"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-practo-border bg-practo-surface p-4">
                <h3 className="text-xs font-bold text-practo-text-muted uppercase tracking-wider mb-3">
                  Facilities
                </h3>
                <ul className="space-y-1 text-sm text-practo-text">
                  {provider.facilities.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-practo-open" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hours */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Hours"
            title="Opening hours"
            subtitle="All times in IST"
          />
          <div className="rounded-xl border border-practo-border bg-practo-surface p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0 last:mb-0"
                >
                  <span className="text-practo-text-muted">{day}</span>
                  <span className="text-practo-text font-medium">
                    {provider.hours[day]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Doctors */}
      {provider.doctors.length > 0 && (
        <Section background="surface">
          <Container>
            <SectionHeader
              eyebrow="Team"
              title="Doctors &amp; specialities"
            />
            <div className="grid md:grid-cols-2 gap-4">
              {provider.doctors.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-3 p-3 rounded-lg border border-practo-border/50 hover:bg-practo-primary/5 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-practo-primary-light flex items-center justify-center text-practo-primary font-bold text-sm">
                    {d.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span className="text-sm text-practo-text">{d}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Reviews */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Reviews"
            title="What pet owners say"
            subtitle={provider.reviewCount > 0 ? `${provider.reviewCount} reviews` : undefined}
          />
          <div className="space-y-4 rounded-xl border border-practo-border bg-practo-surface p-4 sm:p-6">
            {[1, 2].map((i) => {
              const r =
                provider.reviewCount > i
                  ? { rating: 4 + (i % 2) * 0.5, text: "Great care for my pet." }
                  : null;
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-practo-primary-light flex items-center justify-center text-practo-primary font-bold text-sm shrink-0">
                    {i === 1 ? "SA" : "MK"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-sm text-practo-text">
                        Sample client {i}
                      </span>
                      <span className="text-xs text-practo-text-muted">
                        Oct 20, 2026
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            star <= (r?.rating || 5)
                              ? "fill-yellow-400 text-yellow-500"
                              : "text-yellow-200"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-practo-text-muted mt-2 leading-relaxed">
                      {r?.text || "Highly recommended — caring and professional."}
                    </p>
                  </div>
                </div>
              );
            })}
            <p className="text-[10px] text-practo-text-muted mt-4">
              All reviews shown are labelled &ldquo;Sample&rdquo; — this is a demo with fictional data.
            </p>
          </div>
        </Container>
      </Section>

      {/* Correction CTA */}
      <Section>
        <Container>
          <CorrectionDialog providerId={provider.id} />
        </Container>
      </Section>

      {/* Sticky mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-practo-surface/95 backdrop-blur border-t border-practo-border">
        <div className="flex justify-around px-4 py-3">
          <a
            href={telUrl}
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-practo-primary"
            aria-label="Call"
          >
            <Phone className="w-5 h-5" /> Call
          </a>
          <a
            href={mapsUrl}
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-practo-text-muted"
            target="_blank"
            rel="noopener"
            aria-label="Directions"
          >
            <MapPin className="w-5 h-5" /> Directions
          </a>
          <a
            href={`/submit-correction?provider=${provider.id}`}
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-practo-text-muted"
            aria-label="Submit correction"
          >
            <MessageCircle className="w-5 h-5" /> Correct
          </a>
        </div>
      </div>
    </div>
  );
}
