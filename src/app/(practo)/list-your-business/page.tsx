import { ShieldCheck, Clock, Users } from "lucide-react";
import { ListingForm } from "@/components/practo/listing-form";

export default function ListYourBusinessPage() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height, 64px))]">
      <main className="flex-grow">
        <div className="px-4 lg:px-6 py-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-practo-text mb-3">
            List Your Business
          </h1>
          <p className="text-lg text-practo-text-muted mb-10 max-w-2xl">
            Join our network of animal-care providers. Listing is free for this
            demo, and your details will be shown to pet owners searching in your
            area. All submissions are clearly sample data.
          </p>

          {/* Benefits section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-practo-text mb-6">
              Why list with us?
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6 text-practo-primary" />,
                  title: "Verified badge",
                  body: "Get a verified badge once we confirm your contact and hours.",
                },
                {
                  icon: <Clock className="w-6 h-6 text-practo-primary" />,
                  title: "24×7 support",
                  "24x7": true,
                  body: "Mark your clinic as 24×7 so owners can reach you in emergencies.",
                },
                {
                  icon: <Users className="w-6 h-6 text-practo-primary" />,
                  title: "Reach pet owners",
                  body: "Be discovered by pet owners searching by category, species and location.",
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-practo-border bg-practo-surface p-5"
                >
                  <div className="mb-3">{b.icon}</div>
                  <h3 className="font-bold text-practo-text mb-1">{b.title}</h3>
                  <p className="text-sm text-practo-text-muted">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-practo-border bg-practo-surface p-8 md:p-12">
            <h2 className="text-xl font-bold text-practo-text mb-6">
              Get listed
            </h2>
            <ListingForm />
          </section>
        </div>
      </main>
    </div>
  );
}
