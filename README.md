# Pawzz Foundation — Intern Assignment

Two live prototypes in a single Next.js app, deployed to one Vercel project:

- **Practo for Animals** — `/` (provider discovery marketplace)
- **AI course landing page** — `/ai-course`

## Tech stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ESLint
- Package manager: **pnpm**
- Icons: lucide-react; Fonts: next/font/google (Inter, Plus Jakarta Sans)
- Forms: Next.js Route Handlers with zod validation, forwarding to webhook URLs from env vars (`LEAD_WEBHOOK_URL`, `CORRECTION_WEBHOOK_URL`, `LISTING_WEBHOOK_URL`). Falls back to server console logging when env vars are missing.
- No database, no auth, no external images (inline SVG, emoji, lucide icons only)

## How to run locally

```bash
pnpm install        # or npm install
cp .env.example .env.local  # optional; webhook URLs only needed for real submissions
pnpm dev            # dev server at http://localhost:3000
```

Visit:
- `http://localhost:3000/` — Practo for Animals homepage
- `http://localhost:3000/search` — search results with filters
- `http://localhost:3000/provider/[id]` — provider profile
- `http://localhost:3000/list-your-business` — provider onboarding
- `http://localhost:3000/submit-correction` — correction form
- `http://localhost:3000/ai-course` — AI course landing page

## Verification

```bash
pnpm run build   # typecheck + production build
pnpm run lint    # ESLint
```

## Notes

- Both products share one codebase via route groups: `src/app/(practo)` and `src/app/(course)`.
- All provider data is fictional sample data in `src/data/providers.ts`.
- The carousel workflow (Stage 3 of the assignment) lives outside this codebase per the implementation guide.
