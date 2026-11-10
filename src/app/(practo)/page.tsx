import Link from "next/link";
import {
  Stethoscope,
  Hospital,
  Bed,
  Microscope,
  Ambulance,
  HandHeart,
  Clock,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Users,
} from "lucide-react";
import { SearchBar } from "@/components/practo/search-bar";
import ProviderCard from "@/components/practo/provider-card";
import {
  getFeatured,
  providersByCategory,
  DEFAULT_LAT,
  DEFAULT_LNG,
} from "@/lib/providers";
import { CATEGORIES, type CategoryId } from "@/data/models";
import { Button } from "@/components/shared/button";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/practo/layout";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  Hospital,
  Bed,
  Microscope,
  Ambulance,
  HandHeart,
};

const featured = getFeatured(4);
const ngo = providersByCategory("ngo-rescue" as CategoryId)[0];

const STATS = [
  { value: "14+", label: "Sample providers", note: "demo data" },
  { value: "6", label: "Care categories", note: "" },
  { value: "24×7", label: "Emergency hospital", note: "" },
  { value: "100%", label: "Fictional sample", note: "data" },
];

const QUICK_PICKS = [
  { label: "24×7 emergency", href: "/search?openNow=1&is24x7=1" },
  { label: "Dogs", href: "/search?species=Dog" },
  { label: "Cats", href: "/search?species=Cat" },
  { label: "Boarding", href: "/search?category=boarding-daycare" },
];

export default function PractoHome() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height, 64px))]">
      {/* Hero */}
      <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-practo-primary/15 rounded-full blur-[120px] pointer-events-none"
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-practo-primary/10 rounded-full blur-[100px] pointer-events-none"
          />
        </div>

        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-practo-border/50 bg-practo-sage px-3 py-1 text-[10px] font-bold text-practo-amber uppercase tracking-wider">
                Sample directory · demo data
              </span>
              <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold text-practo-text leading-[1.15] tracking-tight max-w-lg">
                Find the right care for your{" "}
                <span className="text-practo-primary">furry family member</span>
              </h1>
              <p className="text-lg text-practo-text-muted leading-relaxed max-w-prose">
                Discover veterinary clinics, hospitals, boarding, diagnostics,
                ambulances and rescue NGOs &mdash; all clearly listed, verified
                and sample-labelled for this demo.
              </p>

              <SearchBar className="mt-6" />

              <div className="mt-5 flex flex-wrap gap-2">
                {QUICK_PICKS.map((q) => (
                  <a
                    key={q.label}
                    href={q.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-practo-border/50 bg-practo-surface px-3 py-2 text-xs font-medium text-practo-text hover:bg-practo-primary-light hover:border-practo-primary/30 transition-colors min-h-[44px]"
                  >
                    {q.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 items-center text-sm text-practo-text-muted">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-practo-open" />
                    <span>
                      {i === 1 ? "Verified listings" : i === 2 ? "24×7 emergency" : "Community corrections"}
                    </span>
                    {i < 3 && <span className="mx-1">·</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block flex items-center justify-center">
              {/* Hero product mock */}
              <div className="relative w-full max-w-sm">
                {/* Floating map card */}
                <div className="absolute -top-4 left-4 w-48 h-40 rounded-xl border border-practo-border bg-practo-surface shadow-card p-3">
                  <MapPin className="absolute top-2 left-2 w-3 h-3 text-practo-emergency" />
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-practo-emergency" />
                    <span className="text-[10px] font-medium text-practo-text">24×7</span>
                  </div>
                  <div className="h-1 bg-practo-border/40 rounded w-1/3" />
                  <div className="h-1 bg-practo-border/40 rounded w-1/2" />
                </div>
                {/* Main card stack */}
                <div className="relative w-full h-[320px] rounded-xl border border-practo-border bg-practo-surface shadow-card p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <Stethoscope className="w-5 h-5 text-practo-primary" />
                    <span className="text-[10px] font-bold text-practo-emergency">24×7</span>
                  </div>
                  <h4 className="font-bold text-practo-text text-sm mb-2 line-clamp-1">
                    Green Paws Animal Hospital
                  </h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                    <span className="text-xs font-bold text-practo-text">4.8</span>
                    <span className="text-[10px] text-practo-text-muted">(210)</span>
                  </div>
                  <div className="h-2 bg-practo-border/40 rounded w-1/2 mb-2" />
                  <div className="h-2 bg-practo-border/40 rounded w-1/3 mb-3" />
                  <div className="flex items-center gap-2 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 shrink-0" />
                      Call
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      Directions
                    </Button>
                  </div>
                </div>
                {/* Floating emergency chip */}
                <div className="absolute bottom-6 right-6 rounded-xl border border-practo-emergency bg-practo-emergency text-white px-3 py-2 text-xs font-bold shadow-card">
                  24×7 Emergency
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <Section className="mt-12 sm:mt-16" background="surface">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-practo-border rounded-xl p-4 sm:p-6 bg-practo-surface">
              {STATS.map((s) => (
                <div
                  key={s.value}
                  className="text-center border-r border-practo-border/30 last:border-r-0 py-2"
                >
                  <div className="text-2xl font-bold text-practo-text">{s.value}</div>
                  <div className="text-[10px] text-practo-text-muted">
                    {s.label}{s.note ? ` · ${s.note}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* Category tiles */}
      <Section background="sage">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Explore by service"
            viewAll="/search"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {Object.values(CATEGORIES).map((cat) => {
              const Comp = ICON_MAP[cat.icon];
              const count = providersByCategory(cat.id as CategoryId).length;
              return (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.id}`}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-practo-border bg-practo-surface p-4 shadow-soft hover:shadow-card hover:border-practo-primary/40 transition-all duration-200"
                  aria-label={cat.name}
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow">
                    <Comp className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-practo-text leading-snug text-center">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-practo-text-muted">
                    {count} providers
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Emergency strip */}
      <Section className="mt-0">
        <Container>
          <div className="rounded-2xl border border-practo-emergency/30 bg-practo-emergency-tint p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-practo-emergency flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-practo-text text-sm sm:text-base">
                Need help now?
              </h2>
              <p className="text-xs sm:text-sm text-practo-text-muted mt-0.5">
                24x7 clinics and ambulances ready for urgent care.
              </p>
            </div>
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-0">
              <Link
                href="/search?openNow=1&is24x7=1"
                className={cn(
                  "flex-1 bg-practo-emergency text-white text-center px-4 py-3 rounded-xl font-semibold text-sm hover:bg-practo-emergency/90 transition-colors min-h-[44px]"
                )}
              >
                24x7 hospitals
              </Link>
              <Link
                href="/search?category=ambulances"
                className={cn(
                  "flex-1 border border-practo-emergency text-practo-emergency text-center px-4 py-3 rounded-xl font-semibold text-sm hover:bg-practo-emergency/50 transition-colors min-h-[44px]"
                )}
              >
                Find an ambulance
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured providers */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Featured"
            title="Featured nearby"
            viewAll="/search"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                userLat={DEFAULT_LAT}
                userLng={DEFAULT_LNG}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section background="surface">
        <Container>
          <SectionHeader eyebrow="How it works" title="Simple steps to care" />
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-practo-border/30 hidden md:block" />
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex flex-col items-center gap-3 relative z-10 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-practo-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {n}
                </div>
                <h3 className="font-bold text-practo-text">
                  {n === 1 ? "Search" : n === 2 ? "Compare" : "Call or visit"}
                </h3>
                <p className="text-sm text-practo-text-muted leading-relaxed max-w-xs">
                  {n === 1
                    ? "Filter by category, species, hours and distance."
                    : n === 2
                      ? "Check ratings, services and verified status."
                      : "Call directly or get directions from the card."}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust and data quality */}
      <Section>
        <Container>
          <div className="rounded-2xl border border-practo-border bg-practo-surface p-6 sm:p-8 grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-practo-text">Trust &amp; data quality</h2>
              <ul className="space-y-4 text-practo-text-muted text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-practo-open shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-practo-text">Verified badge:</strong> contact and
                    hours confirmed by our team. All listings in this demo are fictional.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-practo-text-muted shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-practo-text">Last verified:</strong> every provider
                    card shows when its details were last checked.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-practo-text-muted shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-practo-text">Community corrections:</strong> spot
                    outdated info? Submit a correction from any profile or the footer.
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                href="/submit-correction"
                className="w-full sm:w-auto min-h-[52px]"
              >
                Submit a Correction
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* List Your Business banner */}
      <Section>
        <Container>
          <div className={cn(
            "rounded-2xl relative overflow-hidden p-6 sm:p-10",
            "bg-gradient-to-r from-practo-primary to-practo-primary-hover text-white"
          )}>
            <div className="absolute top-0 right-0 -bottom-px w-1/3 bg-white/10" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Are you a pet-care provider?
            </h2>
            <p className="text-practo-primary-light max-w-xl text-sm sm:text-base mb-6 sm:mb-8">
              List your clinic, hospital or service &mdash; free for this demo.
            </p>
            <Link
              href="/list-your-business"
              className={cn(
                "inline-flex items-center justify-center gap-2 bg-white text-practo-primary px-6 py-3 rounded-xl font-semibold hover:bg-practo-primary-light transition-colors min-h-[52px]"
              )}
            >
              List Your Business
            </Link>
          </div>
        </Container>
      </Section>

      {/* NGO spotlight */}
      <Section background="sage">
        <Container>
          <div className="rounded-2xl border border-practo-border bg-practo-surface p-6 sm:p-8 grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-practo-sage flex items-center justify-center shadow-sm">
                <HandHeart className="w-10 h-10 text-practo-emergency" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold text-practo-text mb-2">
                Adopt, don&rsquo;t shop &mdash; {ngo.name}
              </h2>
              <p className="text-practo-text-muted text-sm leading-relaxed mb-4">
                {ngo.about}
              </p>
              <ul className="space-y-2 text-sm text-practo-text-muted mb-6">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-practo-text-muted" />
                  <span>{ngo.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-practo-text-muted" />
                  <span>
                    {ngo.address.split(",").slice(0, 2).join(",")}
                  </span>
                </li>
              </ul>
              <div className="flex gap-3">
                <Link
                  href={`/provider/${ngo.id}`}
                  className={cn(
                    "flex-1 bg-practo-primary text-white text-center px-4 py-3 rounded-xl font-semibold text-sm hover:bg-practo-primary-hover transition-colors min-h-[44px]"
                  )}
                >
                  Visit profile
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  Donate (sample)
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
