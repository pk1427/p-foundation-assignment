# Implementation Guide

Work top to bottom. Each step has a time box and a "done when" check.

## Step 0: Setup (15 min)
- [ ] Create a repo/folder with the layout from `architecture.md`.
- [ ] Pick a palette and fonts for each product (see below) and note them in README.md.
- [ ] Choose how to build the prototypes (recommended: single-file HTML + Tailwind CDN, or Lovable for faster iteration).
- [ ] Create free accounts if missing: Vercel/Netlify, Canva, Make or n8n, Google Sheets.

**Suggested style**
- Practo for Animals: warm teal/green primary, soft cream background, rounded cards, friendly illustration style, clear status colours (open = green, closed = grey, emergency = red).
- AI course: deep indigo or near-black base with one bright accent, bold typography, subtle gradients, high-contrast CTA.

**Done when:** tools ready and styles decided.

---

## Step 1: Practo for Animals prototype (100 min)

1. **Reference scan (10 min):** look at Practo, Zomato, and a pet-services marketplace; note patterns for search, filters and cards.
2. **Wireframe (15 min):** sketch mobile and desktop on paper or Figma: homepage, results, profile.
3. **Sample data (10 min):** create `providers.json` with 12-15 realistic, clearly fictional providers across all six categories (include a 24x7 hospital, ambulance, NGO, boarding).
4. **Build homepage (30 min):** header, hero with search and **Find a Vet**, category tiles with **Explore Services**, emergency strip, featured providers, how it works, trust section with **Submit a Correction**, **List Your Business** banner, footer.
5. **Build results page (25 min):** working filters (category, open now, 24x7, species, distance), sort, provider cards with Call/Directions, map placeholder or embedded map, mobile bottom-sheet filters.
6. **Mini flows (10 min):** a profile view, a **List Your Business** form modal, and a **Submit a Correction** form modal (non-functional or posting to a sheet).

**Done when:** the page works on a phone-width viewport, filters change the results, and every CTA leads somewhere sensible.

---

## Step 2: AI course landing page (60 min)

1. Define the course name, audience, 4-6 modules, and a headline built around the outcome (10 min).
2. Build sections in the order from `architecture.md` (35 min): hero, learn, projects, curriculum, instructor, testimonials (marked as sample), pricing and dates, FAQ, final form.
3. Wire the form (10 min): post to a Make webhook or Google Apps Script that appends to a Google Sheet; show a thank-you state with the next step.
4. Add a sticky mobile CTA and test the form once end to end (5 min).

**Done when:** a test submission shows up in the Sheet and the thank-you message appears.

---

## Step 3: Carousel workflow and sample (70 min)

1. **Brand kit in Canva (10 min):** colours, fonts, logo; create three templates: hook slide, content slide, CTA slide (1080x1350 for Instagram/LinkedIn).
2. **Master prompt in Claude (15 min):** a reusable system prompt that takes a raw idea and returns structured JSON: topic, audience, 3 hooks, 7-8 slides (title + max 25 words), caption, hashtags, visual direction, and sources. Test with the sample idea.
3. **Automation (25 min):** in Make or n8n:
   - Trigger: new row in a Google Sheet (or a form).
   - Step: send the idea to the Claude API with the master prompt.
   - Step: write the structured output back to the Sheet.
   - Step: push copy into the Canva template (Bulk Create via CSV, or manual paste if the API is not available) and notify the founder with a link.
   If a full live integration is not feasible in the time, build the first half for real and document the rest clearly as the planned extension.
4. **Make the sample carousel (15 min):** idea: "5 signs your pet needs a vet visit". Generate, pour into the templates, make small edits, export PNG/PDF.
5. **Capture evidence (5 min):** screenshots of the input row, Claude's structured output, the Canva design, and the final export.

**Done when:** one finished carousel exists plus screenshots that show how it was produced.

---

## Step 4: Workflow diagram (10 min)
Turn the workflow from `architecture.md` into a clean visual (Figma, Canva, or Mermaid rendered to PNG). Label each step with its tool and mark where the human review happens.

---

## Step 5: Deploy and QA (20 min)
- [ ] Deploy both prototypes; open each in an incognito window.
- [ ] Test on a real phone and at 375px, 768px and desktop widths.
- [ ] Check contrast, tap-target sizes, and broken links.
- [ ] Confirm form submissions land in the Sheet.
- [ ] Make shared Canva/Figma links viewable by anyone with the link.

---

## Step 6: Write-up (20 min)
Keep the README to about one page, with these sections:

1. **Links:** Practo for Animals prototype, AI course page, carousel (exported + editable), workflow diagram.
2. **Practo for Animals:** MVP features, filters, provider info, CTA table, mobile approach, what I would build next.
3. **AI course page:** value proposition, structure, CTAs, lead-capture flow.
4. **Content system:** workflow, tools and why, how it connects, how the founder uses it day to day, known limits.
5. **Tech stack summary:** one table.
6. **Assumptions and next steps:** honest about what is sample data or only partly automated.

---

## Step 7: Submit

**Before submitting:** check that every link opens without a login, and that screenshots are included in case a link breaks.

**Draft message (edit to taste):**

> Hi Akash, thank you for the assignment. I've completed all three parts: the Practo for Animals MVP homepage and search prototype, the AI course landing page, and an AI-generated carousel with the workflow behind it. Links and a short explanation of the tools, CTA strategy and automation are in the document below. I'd be glad to walk you through the decisions or iterate on any part. Thank you!

Then submit via the **Submit assignment** button on Internshala before **11 Nov 2026**.

---

## Daily schedule suggestion
- **Tonight (10 Nov):** Steps 0-2.
- **Tomorrow morning (11 Nov):** Steps 3-5.
- **Tomorrow midday:** Steps 6-7, submitting well ahead of the deadline.
