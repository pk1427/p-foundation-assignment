# Pawzz Foundation — Intern Assignment

Two live prototypes in a single Next.js app, deployed to one Vercel project:

- **Practo for Animals** — `/` (provider discovery marketplace)
- **AI course landing page** — `/ai-course`

## Routes

| Route | Product | Purpose |
|-------|---------|---------|
| `/` | Practo for Animals | Homepage: hero search, category tiles, emergency strip, featured providers |
| `/search` | Practo for Animals | Filterable results (category, species, open now, 24x7, emergency, ambulance, home visit, verified, distance, q) with sort, list/map toggle, mobile bottom-sheet filters |
| `/provider/[id]` | Practo for Animals | Provider profile (SSG): badges, hours, services, facilities, doctors, sample reviews, Call/WhatsApp/Directions, Submit a Correction |
| `/list-your-business` | Practo for Animals | Provider onboarding form → `/api/listing` |
| `/submit-correction` | Practo for Animals | Correction form (standalone, `?provider=` preselect) → `/api/correction` |
| `/ai-course` | AI course | Landing page: all 12 sections, registration form → `/api/lead`, syllabus download capture → `/api/lead` |

## How to run locally

```bash
pnpm install        # or npm install
cp .env.example .env.local  # optional; webhook URLs only needed for real submissions
pnpm dev            # dev server at http://localhost:3000
```

Visit the routes above at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in webhook URLs for real form submissions. If left unset, submissions log to the server console and still return success (demo mode).

```
LEAD_WEBHOOK_URL=
CORRECTION_WEBHOOK_URL=
LISTING_WEBHOOK_URL=
```

## Verification

```bash
pnpm run build   # typecheck + production build
pnpm run lint    # ESLint
pnpm start       # production server after build
```

## Tools and tech stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework, routing, Route Handlers, SSR/SSG |
| TypeScript | Type safety (data models, schemas, page props) |
| Tailwind CSS v4 | Styling + theme tokens (`@theme`) |
| zod | Form validation in Route Handlers |
| framer-motion | Reveal animations + mobile bottom sheet |
| lucide-react | Icons |
| next/font/google | Fonts (Inter, Plus Jakarta Sans) |
| pnpm | Package manager |
| Vercel | Deployment (zero config) |

## Notes

- Both products share one codebase via route groups: `src/app/(practo)` and `src/app/(course)`.
- All provider data is fictional sample data in `src/data/providers.ts`. Testimonials, mentor details, batch dates and pricing are clearly labelled "Sample".
- The carousel workflow (Stage 3 of the assignment) lives outside this codebase per the implementation guide.
