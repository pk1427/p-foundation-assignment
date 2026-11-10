# Architecture

Three independent pieces plus one write-up. Each has its own structure, user flow and tool stack.

---

## Part 1: Practo for Animals (MVP)

### Product concept
A discovery platform where pet owners find and trust animal-care providers, and providers get listed and keep their information accurate.

### Provider categories
Veterinary clinics, animal hospitals, boarding and daycare, diagnostics and labs, ambulances, NGOs and rescue organisations.

### Information architecture

```
Home
 |- Search / results (list + map)
 |   |- Provider profile
 |- Category pages (Vets, Hospitals, Boarding, Diagnostics, Ambulance, NGOs)
 |- Emergency (24x7 + ambulance quick access)
 |- List Your Business (provider onboarding form)
 |- Submit a Correction (on every profile)
 |- About / Contact
```

### Homepage sections (top to bottom)
1. **Header:** logo, location selector, "List Your Business", "Emergency".
2. **Hero + search:** headline, search bar (what + where), pet type selector, primary CTA **Find a Vet**.
3. **Category tiles:** six categories with icons; secondary CTA **Explore Services**.
4. **Emergency strip:** "Need help now?" with 24x7 clinics and ambulances near me.
5. **Featured / nearby providers:** cards with trust signals.
6. **How it works:** search, compare, call/book.
7. **Trust and data quality:** verified badge explanation, last-verified date, **Submit a Correction**.
8. **For providers:** **List Your Business** banner.
9. **NGO and adoption/donation spotlight** (ties in with Pawzz's mission).
10. **Footer.**

### Search / results page
- **Filters:** category, species treated (dog, cat, birds, exotic, livestock), open now / 24x7, distance, home visit, emergency, ambulance available, price range, rating, verified only, languages spoken, boarding type (AC, CCTV, vet on site).
- **Sort:** nearest, rating, open now, price.
- **Provider card:** name, category, photo, rating, distance, open/closed status, key services, price indicator, verified badge, buttons **Call**, **Directions**, **View profile**.
- **Layout:** list with map toggle; on mobile, a bottom sheet with filters and a sticky "Map / List" switch.

### Provider profile fields
Name, category, address, map pin, phone/WhatsApp, opening hours, 24x7 flag, services and indicative prices, species treated, doctors/specialities, facilities, photos, reviews, last verified date, **Submit a Correction**.

### CTA map

| CTA | Where | Purpose | Next step |
|-----|-------|---------|-----------|
| Find a Vet | Hero | Core search intent | Results page |
| Explore Services | Hero / tiles | Browsing intent | Category page |
| Call now / Directions | Cards, profile | Conversion for owners | tel: / maps link |
| Emergency | Header, strip | Urgent need | 24x7 filtered results |
| List Your Business | Header, footer, banner | Supply growth | Provider onboarding form |
| Submit a Correction | Profile, footer | Data quality, community trust | Short form to the admin queue |

### Mobile-first principles
Thumb-reachable primary actions, sticky search and call buttons, large tap targets, collapsible filters, fast load, readable type, minimal form fields.

### Data model (conceptual)

```
Provider(id, name, category, address, lat, lng, phone, hours, is_24x7,
         species[], services[], price_band, verified, last_verified_at)
Review(id, provider_id, rating, text, created_at)
Correction(id, provider_id, field, suggested_value, contact, status)
Lead/Listing(id, business_name, category, contact, status)
```

### Prototype stack

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, zod-validated Route Handlers forwarding to env webhook URLs (`LEAD_WEBHOOK_URL`, `CORRECTION_WEBHOOK_URL`, `LISTING_WEBHOOK_URL`); deployed to Vercel with zero config. A production MVP would add Postgres with PostGIS, Google Maps API, and an admin panel.

---

## Part 2: AI Education Landing Page

### Audience
Students and young professionals who want practical, job-relevant AI and digital skills.

### Value proposition
Learn by building: real projects, AI tools used in real workflows, and a portfolio you can show employers.

### Page structure
1. **Hero:** outcome-led headline, subhead, primary CTA **Register Now** / **Reserve your seat**, secondary **Download Syllabus**, social proof strip.
2. **Problem and promise:** why generic courses fail; what is different here.
3. **What you will learn:** modules (prompting, AI tools, automation, building with AI, content and design).
4. **Outcomes and projects:** portfolio pieces learners ship.
5. **Who it is for:** students, early professionals, career switchers.
6. **Curriculum timeline:** week-by-week.
7. **Mentor / instructor and credibility.**
8. **Testimonials / sample outcomes** (clearly marked placeholders if no real ones exist).
9. **Pricing / batch dates and scarcity** (honest seat limits only).
10. **FAQ.**
11. **Final CTA with the registration form.**
12. **Sticky mobile CTA bar.**

### Lead-capture journey

```
Visitor -> Landing page -> CTA click -> Short form (name, email, phone/WhatsApp,
  status: student/professional, interest) -> Submit
  -> Thank-you page (next step: join WhatsApp group / book a call)
  -> Lead stored in Google Sheet / Airtable (via webhook)
  -> Automation: instant email + WhatsApp confirmation, notification to founder
  -> Nurture: reminder sequence, then enrolment or call
```

Two tiers of intent: a low-friction "Download Syllabus" (email only) and a high-intent "Register" (full form).

### Stack
HTML + Tailwind (or Lovable), a form posting to a webhook (Make/n8n or Google Apps Script), Google Sheets as the CRM for the MVP, Vercel/Netlify hosting.

---

## Part 3: AI Content Creation System (Carousels)

### Goal
The founder types a raw idea and receives a reviewed, editable, ready-to-publish Instagram/LinkedIn carousel with minimal manual design.

### Workflow

```
[1] Founder idea (form / Telegram / Notion / Google Sheet row)
        |
[2] Trigger (Make or n8n watches the input)
        |
[3] Research + structure (Claude, with web search)
        -> outline, key facts with sources, angle, audience
        |
[4] Copywriting (Claude)
        -> 3 hook options, slide-by-slide copy (<=25 words/slide), caption, hashtags
        |
[5] Visual direction (Claude)
        -> palette, fonts from the brand kit, image prompts/layout per slide
        |
[6] Design generation
        -> Canva (Bulk Create / brand template + autofill) or Figma template
        -> optional AI imagery (Gemini/Imagen, Ideogram)
        |
[7] Founder review (Slack/WhatsApp/email with preview link)
        -> approve or request edits in Canva (minor edits only)
        |
[8] Export + publish
        -> PNG/PDF export, saved to Google Drive
        -> scheduling via Buffer / LinkedIn / Meta Business Suite
        |
[9] Log (Google Sheet): idea, status, links, publish date
```

### Tool choices and reasons

| Step | Tool | Why |
|------|------|-----|
| Orchestration | Make (or n8n) | Visual, cheap, many integrations |
| Research and copy | Claude | Strong structured writing and reasoning; one reusable system prompt |
| Design | Canva with a Brand Kit and carousel templates | Editable, familiar for a non-designer, bulk create from data |
| Imagery | Gemini / Ideogram | Text-aware images when needed |
| Storage and tracking | Google Drive and Sheets | Free, shareable |
| Publishing | Buffer or native schedulers | Reliable scheduling |

### Design safeguards
- Fixed brand kit (colours, fonts, logo) and 2-3 locked slide templates (hook, content, CTA) so outputs always look consistent.
- A human review gate before anything is published.
- Every factual claim carries a source in the research step; the founder can check it before approval.

### Sample output
One carousel produced through steps 1-7, with screenshots of the prompt, the structured output, the template, and the final export.

---

## Deployment and repo layout

Single Next.js app (App Router) deployed to one Vercel project with two routes:

```
/                     Practo for Animals (homepage, /search, /provider/[id], /list-your-business, /submit-correction)
/ai-course            AI course landing page

Repo layout:
|- plan.md
|- architecture.md
|- implementation.md
|- README.md          (final write-up with links)
|- .env.example
|- next.config.ts
|- package.json
|- src/
|  |- app/(practo)/...   Practo for Animals routes
|  |- app/(course)/ai-course/  AI course route
|  |- app/api/lead, /api/correction, /api/listing  Route Handlers
|  |- components/, data/, lib/
|- public/syllabus.pdf
|- docs/              (assignment docs)
```

Deploy to Vercel (zero config, Next.js preset). Env vars: `LEAD_WEBHOOK_URL`, `CORRECTION_WEBHOOK_URL`, `LISTING_WEBHOOK_URL`. The carousel workflow (Part 3) lives outside this codebase.
