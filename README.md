# Saxena Skin and Cosmetic Clinic — website

A multi-page, crawlable website for Saxena Skin and Cosmetic Clinic, Jabalpur. It's built with [Astro](https://astro.build):

- every page is prerendered to static HTML
- one small server endpoint handles appointment enquiries
- there is almost no client-side JavaScript

> **Status: preview.** Every page is built and tested. Some facts are still awaiting the clinic's confirmation, so preview builds are `noindex` and robots.txt blocks crawling. `npm run build:launch` refuses to build until everything in **CONTENT-VERIFICATION.md** is approved.

## Easiest way to view it on a Mac

Double-click **`Start website (Mac).command`** in this folder. It checks for Node.js, installs and builds on the first run, starts the site and opens it in your browser. Close the Terminal window to stop it.

- If macOS says the file "can't be opened because it is from an unidentified developer", right-click it, choose **Open**, then confirm. You only need to do this once.
- Don't open the `.html` files directly by double-clicking. The site needs its server running, otherwise the styles, links and film can't load. A page opened that way now says so.

## Quick start

```sh
npm install
npm run dev                 # http://localhost:4321 (development)
npm run build               # preview build → dist/
npm start                   # production server (node server.mjs) on PORT, default 4321
```

Requirements: Node 20.3+. For end-to-end tests you also need Python 3 with Playwright and Chrome.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload. |
| `npm run build` | **Preview build**: noindexed, robots blocked, and supplied-but-unconfirmed facts shown. |
| `npm run build:launch` | **Launch build** (`PUBLIC_SITE_MODE=launch`). Then runs `scripts/verify-launch.mjs`, which fails if anything is unconfirmed. |
| `npm start` | Serves `dist/` with security and caching headers, and routes `/api/*` to Astro. |
| `npm run check` | TypeScript and Astro diagnostics. |
| `npm test` | Unit tests (Vitest): enquiry validation, spam rules, content-safety rules. |
| `npm run test:e2e` | End-to-end tests against running servers (see `tests/e2e.py` for setup). |

## How the project is organised

```
src/
  config/site.ts         ← every clinic fact, each with a status: confirmed | supplied | missing
  data/doctors.ts        ← five consultant profiles (qualifications held until confirmed)
  data/topics.ts         ← 19 speciality / condition / treatment pages (availability + review status)
  data/articles.ts       ← patient-education articles (drafts excluded from launch)
  data/nav.ts            ← navigation
  pages/                 ← routes (see SEO-IMPLEMENTATION.md for the full list)
    [...slug].astro      ← template for every speciality/condition/treatment page
    our-doctors/[slug]   ← doctor profile template
    api/enquiry.ts       ← appointment enquiry endpoint (the only server-rendered route)
    launch-report.json.ts← verification report read by the launch guard (deleted after the build)
  components/            ← Header (glass nav), Footer, PageHeader, DoctorCard, DekaFeature, EnquiryForm, ContactPanel, FilmPlayer, TopoArt …
  layouts/Base.astro     ← <head>: title, description, canonical, robots, Open Graph, JSON-LD, analytics hook
  styles/global.css      ← design tokens, type scale, grid, buttons, glass, prose
  scripts/site.ts        ← progressive enhancement: menus, reveals, click-to-load embeds, form
  lib/enquiry.ts         ← validation shared by browser and server
  lib/schema.ts          ← structured data builders (only visible, permitted facts)
public/media/identity-film.html  ← the supplied identity film, unchanged
reference-assets/        ← original supplied files, unchanged (checksums in reference-assets.sha256)
scripts/verify-launch.mjs
server.mjs               ← production Node server (security headers, static files, API)
tests/                   ← unit + end-to-end tests
```

## Content management

There is no CMS backend yet, and no fake admin panel has been built. Content lives in **structured TypeScript files** under `src/data/` and `src/config/`. They are type-checked, so a mistake fails the build instead of breaking a page.

| Task | Where |
|---|---|
| Change phone, address, hours, WhatsApp, email | `src/config/site.ts` (set `status: 'confirmed'`) |
| Edit a doctor, add a photograph or qualifications | `src/data/doctors.ts` |
| Edit or add a treatment or condition page | `src/data/topics.ts`. A new entry creates a new route automatically. |
| Publish an article | `src/data/articles.ts` (needs author, reviewer, dates and references) |

**Future CMS path.** The data files map directly onto CMS collections (doctors, topics, articles, site settings). The recommended route is a Git-based headless CMS that writes the same files, so the clinic gets a visual editor while keeping ownership of content and code. Decap CMS or Keystatic are good options. A hosted headless CMS (Sanity, Storyblok) also works by replacing the `src/data/*` imports with API fetches at build time. Either way, choose one the clinic's own account owns.

## Appointment enquiries

The form at `/contact-us/#enquiry`, and on each doctor page, posts to `/api/enquiry/`:

- **Validation:** shared rules in browser and server (`src/lib/enquiry.ts`)
- **Spam protection:** honeypot field, minimum fill time, link filter, rate limit of 5 per 10 minutes per IP, same-origin check, 10KB body limit
- **Data minimisation:** name, phone, optional email, speciality, doctor, preferred date and time, short optional message, consent. Patients are told not to include medical details.
- **Delivery:** set `ENQUIRY_WEBHOOK_URL`, an HTTPS endpoint that receives JSON, such as the clinic's appointment system, an email relay or an automation tool. `ENQUIRY_WEBHOOK_SECRET` is sent as `X-Enquiry-Secret`.
- **Not configured?** The API returns 503 and the page tells visitors that online enquiries aren't active yet and to call. It never pretends to succeed.
- **Not a booking:** the success message says plainly that it's an enquiry, not a confirmed appointment.

## Deployment

Any Node 20+ host (VPS, Render, Railway, Fly.io, a container):

```sh
npm ci && SITE_URL=https://www.<clinic-domain> npm run build:launch
PORT=8080 ENQUIRY_WEBHOOK_URL=https://… node server.mjs
```

Put it behind HTTPS. `server.mjs` sends HSTS, CSP, nosniff, Referrer-Policy, Permissions-Policy, frame and COOP headers, long-lived caching for hashed `/_astro/` assets, a `404.html` page, trailing-slash redirects and path-traversal protection.

For a static-only host, deploy `dist/client/` and host the enquiry endpoint elsewhere. Then change the form `action` and update the CSP `connect-src`.

## Ownership

The clinic should hold, in its own name:

- the domain
- hosting
- this repository (with source and history)
- any CMS account
- Google Analytics, Search Console and the Google Business Profile

No credentials or IDs are stored in the code. Integration IDs are environment variables; see `.env.example`.

## Security and maintenance

- `npm audit` and `npm outdated` monthly. Update Astro minor versions after running `npm test && npm run check`.
- Back up the repository (Git remote) and the server environment variables. The site has no database; enquiries live wherever the webhook delivers them.
- Keep `ENQUIRY_WEBHOOK_SECRET` and analytics IDs out of the repository (`.env` is git-ignored).
- Review CONTENT-VERIFICATION.md whenever clinical services or staff change.

## Related documents

- `ASSET-MANIFEST.md`: every supplied asset, what it contains, and how it's used
- `CONTENT-VERIFICATION.md`: everything awaiting clinic confirmation
- `SEO-IMPLEMENTATION.md`: routes, metadata, schema, sitemap, analytics and Search Console setup
- `LAUNCH-CHECKLIST.md`: step-by-step launch
