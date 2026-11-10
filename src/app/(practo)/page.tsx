import Link from "next/link";
import {
  Stethoscope,
  Hospital,
  Bed,
  Microscope,
  Ambulance,
  HandHeart,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Mail,
  MapPin,
} from "lucide-react";
import { SearchBar } from "@/components/practo/search-bar";
import ProviderCard from "@/components/practo/provider-card";
import { PractoHeader, PractoFooter } from "@/components/practo/layout-components";
import { getFeatured, providersByCategory, DEFAULT_LAT, DEFAULT_LNG } from "@/lib/providers";
import { CATEGORIES } from "@/data/models";
import { Button } from "@/components/shared/button";
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
const ngo = providersByCategory("ngo-rescue")[0];

export default function PractoHome() {
  return (
    <div className="flex flex-col">
      <PractoHeader />

      {/* Hero */}
      <section className="relative overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-practo-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-practo-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/40 rounded-full blur-[120px]"></div>
        </div>

        <div className="px-4 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-practo-border/50 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-practo-text">
                <span className="w-2 h-2 rounded-full bg-practo-open animate-pulse"></span>
                Trusted by pet owners across Bengaluru
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-practo-text leading-tight tracking-tight">
                Find the right care for your <br />
                <span className="text-practo-primary">furry family member</span>
              </h1>
              <p className="text-lg text-practo-text-muted leading-relaxed max-w-md">
                Discover veterinary clinics, hospitals, boarding, diagnostics,
                ambulances and rescue NGOs &mdash; all clearly listed,
                verified and sample-labelled for this demo.
              </p>

              <SearchBar className="mt-2" />

              <div className="flex items-center gap-3 text-xs text-practo-text-muted mt-4">
                <CheckCircle2 className="w-3 h-3 text-practo-open" />
                <span>Sample data &bull; no real clinics</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              {/* Stylised inline-SVG illustration / card mockup */}
              <svg
                className="w-full h-[420px] drop-shadow-lg"
                viewBox="0 0 600 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Pet care illustration"
                role="img"
              >
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                {/* background card */}
                <rect x="20" y="20" width="520" height="380" rx="28" fill="#ffffff" stroke="#e7e5e4" strokeWidth="2" />
                {/* gradient header */}
                <rect x="20" y="20" width="520" height="110" rx="28" fill="url(#heroGrad)" />
                <rect x="20" y="20" width="520" height="110" rx="28" fill="url(#heroGrad)" />
                <path
                  d="M 20 130 Q 20 130 78 130 Q 78 130 78 400 L 462 400 Q 462 400 520 400 Q 520 400 520 130 Q 520 130 520 130 Z"
                  fill="url(#heroGrad)"
                />
                {/* icon circle */}
                <circle cx="80" cy="75" r="34" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <path d="M80 50 L95 65 L110 50 L95 85 Z" fill="white" />
                <path d="M70 75 L55 90 L70 105" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {/* provider name text block */}
                <rect x="150" y="45" width="300" height="20" rx="4" fill="rgba(255,255,255,0.35)" />
                <rect x="150" y="75" width="220" height="16" rx="3" fill="rgba(255,255,255,0.25)" />
                {/* body lines */}
                <rect x="150" y="160" width="340" height="14" rx="3" fill="#f3f4f6" />
                <rect x="150" y="185" width="260" height="14" rx="3" fill="#f3f4f6" />
                <rect x="150" y="210" width="400" height="14" rx="3" fill="#f3f4f6" />
                <rect x="150" y="235" width="300" height="14" rx="3" fill="#f3f4f6" />
                {/* rating row */}
                <rect x="150" y="280" width="60" height="14" rx="3" fill="#f3f4f6" />
                <rect x="220" y="280" width="140" height="14" rx="3" fill="#f3f4f6" />
                {/* CTA button mock */}
                <rect x="150" y="330" width="200" height="44" rx="12" fill="#0f766e" />
                <rect x="180" y="342" width="60" height="14" rx="3" fill="rgba(255,255,255,0.5)" />
                {/* paw prints */}
                <g fill="#0f766e" opacity="0.10">
                  <path d="M 420 120 L 435 135 L 450 120 L 435 155 Z" />
                  <circle cx="410" cy="145" r="8" />
                  <circle cx="440" cy="145" r="8" />
                  <circle cx="425" cy="152" r="10" />
                </g>
                <g fill="#0f766e" opacity="0.06">
                  <path d="M 480 200 L 495 215 L 510 200 L 495 235 Z" />
                  <circle cx="470" cy="225" r="6" />
                  <circle cx="500" cy="225" r="6" />
                  <circle cx="485" cy="232" r="8" />
                </g>
              </svg>
            </div>
          </div>

          {/* Trust stats */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border border-practo-border bg-practo-surface/60 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-practo-text">14+</div>
              <div className="text-xs text-practo-text-muted">sample providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-practo-text">6</div>
              <div className="text-xs text-practo-text-muted">care categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-practo-text">24x7</div>
              <div className="text-xs text-practo-text-muted">emergency hospital</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-practo-text">100%</div>
              <div className="text-xs text-practo-text-muted">fictional sample data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-practo-text">Explore by service</h2>
          <Link
            href="/search"
            className="text-sm font-semibold text-practo-primary flex items-center gap-1 hover:underline underline-offset-4"
          >
            All services <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.values(CATEGORIES).map((cat) => {
            const Comp = ICON_MAP[cat.icon];
            return (
              <Link
                key={cat.id}
                href={`/search?category=${cat.id}`}
                className={cn(
                  "group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-practo-border bg-practo-surface p-5 hover:bg-practo-primary/5 hover:border-practo-primary/30 transition-all",
                  cat.color
                )}
                aria-label={cat.name}
              >
                <div className="rounded-xl bg-white p-3 shadow-soft group-hover:shadow-card transition-shadow">
                  <Comp className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-practo-text">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Emergency strip */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-practo-emergency/20 bg-practo-emergency/5 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-practo-emergency flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-practo-text">Need help now?</h2>
            <p className="text-practo-text-muted mt-1">
              24x7 clinics and ambulances ready for urgent care.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/search?openNow=1&is24x7=1"
              className="flex-1 bg-practo-emergency text-white text-center py-3 px-4 rounded-xl font-semibold text-sm hover:bg-practo-emergency/90 transition-colors"
            >
              24x7 hospitals near me
            </Link>
            <Link
              href="/search?category=ambulances"
              className="flex-1 border border-practo-emergency/30 text-practo-emergency text-center py-3 px-4 rounded-xl font-semibold text-sm hover:bg-practo-emergency/10 transition-colors"
            >
              Find an ambulance
            </Link>
          </div>
        </div>
      </section>

      {/* Featured providers */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-practo-text">Featured nearby</h2>
          <Link
            href="/search"
            className="text-sm font-semibold text-practo-primary flex items-center gap-1 hover:underline underline-offset-4"
          >
            See all providers <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
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
      </section>

      {/* How it works */}
      <section className="px-4 lg:px-8 py-16 bg-practo-surface/40 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-practo-primary text-white flex items-center justify-center font-bold text-lg">
                {n}
              </div>
              <h3 className="font-bold text-practo-text">
                {n === 1 ? "Search" : n === 2 ? "Compare" : "Call or visit"}
              </h3>
              <p className="text-sm text-practo-text-muted">
                {n === 1
                  ? "Filter by category, species, hours and distance."
                  : n === 2
                    ? "Check ratings, services and verified status."
                    : "Call directly or get directions from the card."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust and data quality */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-practo-border bg-practo-surface p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-practo-text mb-3">Trust &amp; data quality</h2>
            <ul className="space-y-4 text-practo-text-muted text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-practo-primary mt-0.5 shrink-0" />
                <span>
                  <strong>Verified badge:</strong> contact and hours confirmed by our
                  team. All listings in this demo are fictional.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-practo-text-muted mt-0.5 shrink-0" />
                <span>
                  <strong>Last verified:</strong> every provider card shows when its
                  details were last checked.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-4 h-4 text-practo-text-muted mt-0.5 shrink-0" />
                <span>
                  <strong>Community corrections:</strong> spot outdated info? Submit a
                  correction from any profile or the footer.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              href="/submit-correction"
              className="w-full md:w-auto min-w-[200px] min-h-[52px]"
            >
              Submit a Correction
            </Button>
          </div>
        </div>
      </section>

      {/* List Your Business banner */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-practo-primary text-white p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-practo-primary/30 rounded-full blur-[100px] top-[-20%] left-[-10%]" aria-hidden="true"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Are you a pet-care provider?</h2>
          <p className="text-practo-primary-light max-w-xl mx-auto mb-8 text-sm md:text-base">
            List your clinic, hospital or service &mdash; free for this demo.
          </p>
          <Link
            href="/list-your-business"
            className="inline-block bg-white text-practo-primary px-8 py-3 rounded-xl font-semibold hover:bg-practo-primary-light transition-colors"
          >
            List Your Business
          </Link>
        </div>
      </section>

      {/* NGO and adoption spotlight */}
      <section className="px-4 lg:px-8 py-16 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-practo-border bg-practo-surface p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-practo-text mb-3">
              Adopt, don’t shop &mdash; {ngo.name}
            </h2>
            <p className="text-practo-text-muted text-sm leading-relaxed mb-6">
              {ngo.about}
            </p>
            <ul className="space-y-2 text-sm text-practo-text-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                {ngo.phone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                {ngo.address.split(",").slice(0, 2).join(",")}
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Link
              href={`/provider/${ngo.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-practo-border bg-practo-surface text-practo-text px-6 py-3 font-medium hover:bg-practo-primary-light transition-colors"
            >
              Visit profile <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <PractoFooter />
    </div>
  );
}
