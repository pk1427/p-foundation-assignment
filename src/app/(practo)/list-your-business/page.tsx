import { ShieldCheck, Clock, Users } from "lucide-react";
import { ListingForm } from "@/components/practo/listing-form";
import { Container, Section, SectionHeader } from "@/components/practo/layout";

export default function ListYourBusinessPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height, 64px))]">
      <Section className="py-6 sm:py-8 lg:py-12">
        <Container>
          <SectionHeader
            eyebrow="For providers"
            title="List Your Business"
            subtitle="Join our network. Listing is free for this demo — all submissions are clearly sample data."
          />

          {/* Benefits section */}
          <SectionHeader
            eyebrow="Why list with us?"
            title="Benefits"
            subtitle=""
            className="mt-12 sm:mt-16"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-practo-primary" />,
                title: "Verified badge",
                body: "Get a verified badge once we confirm your contact and hours.",
              },
              {
                icon: <Clock className="w-5 h-5 text-practo-primary" />,
                title: "24×7 support",
                body:
                  "Mark your clinic as 24×7 so owners can reach you in emergencies.",
              },
              {
                icon: <Users className="w-5 h-5 text-practo-primary" />,
                title: "Reach pet owners",
                body:
                  "Be discovered by pet owners searching by category, species and location.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-practo-border bg-practo-surface p-4 shadow-soft"
              >
                <div className="mb-3">{b.icon}</div>
                <h3 className="font-bold text-practo-text mb-1">{b.title}</h3>
                <p className="text-sm text-practo-text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="sage">
        <Container>
          <SectionHeader
            eyebrow="Get listed"
            title="Submit your details"
          />
          <div className="rounded-2xl border border-practo-border bg-practo-surface p-4 sm:p-6 shadow-soft">
            <ListingForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
