# SEO implementation

## Principles

- **One page per real search intent.** Specialities, conditions and treatments each have their own substantive page: what it is, signs, causes, assessment, treatment approaches, risks, aftercare, and realistic expectations.
- **No doorway or city pages.** Katni, Narsinghpur, Seoni and the other nearby districts don't get duplicate location pages. Regional reach comes from strong local signals for Jabalpur, consistent NAP (name, address, phone) and a Google Business Profile.
- **No keyword stuffing.** "Jabalpur" appears where it's natural: titles, H1s on service pages, lede text and structured data.
- **Treatments not yet confirmed as offered** (PRP, laser hair reduction) don't use "… in Jabalpur" titles. Their titles describe the treatment ("PRP for Hair Loss — What to Know") so the clinic doesn't claim an unconfirmed service. Once a treatment is confirmed, switch it to a local title.

## Routes (31 indexable at launch, plus 404)

```
/                                  Dermatologist & Skin Clinic in Jabalpur
/about-us/                         /our-doctors/  + 5 profiles (/our-doctors/dr-…/)
/dermatology/                      /dermatology/{acne,acne-scars,psoriasis,vitiligo,melasma-pigmentation,eczema}/
/hair-clinic/                      /hair-clinic/{hair-loss,hair-transplantation,prp-hair-treatment}/
/laser-treatments/                 /laser-treatments/{fractional-co2-laser,laser-hair-reduction}/
/cosmetic-dermatology/  /gynaecology/  /cosmetic-gynaecology/  /facial-aesthetics/  /cranio-maxillofacial-surgery/
/conditions-we-treat/  /patient-education/  /contact-us/  /privacy-policy/
/patient-education/<slug>/         articles: generated at launch only when fully approved
```

All URLs are lowercase, hyphenated and end with a trailing slash. `server.mjs` 301-redirects the slashless form, and anything unknown returns a real 404 status with `404.html`.

## On-page (every indexable page)

The end-to-end tests check all of the following at 1440px:

- a unique `<title>` (≤ 80 characters; titles end with the clinic name)
- a unique meta description (50–175 characters)
- exactly one `<h1>`, with no skipped heading levels
- `<link rel="canonical">` built as an absolute URL from `SITE_URL`
- Open Graph and Twitter card metadata, with the default share image at `/og-default.png`
- `lang="en-IN"`, breadcrumbs (visible and `BreadcrumbList` JSON-LD), and meaningful alt text on every image
- internal links: every speciality links to its sub-pages, its consultants and related pages; doctor profiles link to their treatments; footer navigation is complete

## Indexing control

| | Preview (`npm run build`) | Launch (`npm run build:launch`) |
|---|---|---|
| `<meta name="robots">` | `noindex, nofollow` on every page | `index, follow, max-image-preview:large` (drafts and 404 stay noindex) |
| `/robots.txt` | `Disallow: /` | `Allow: /`, `Disallow: /api/`, plus `Sitemap:` line |
| `/sitemap-index.xml` | generated | generated with absolute URLs from `SITE_URL` |

## Structured data (JSON-LD)

Built in `src/lib/schema.ts`, and only from facts that are visible on the page and permitted by `site.ts`:

- **`MedicalClinic` / `MedicalBusiness`**, on the home and contact pages: name, URL, logo, description, specialities and area served. `address` and `telephone` are added only when confirmed (launch) or supplied (preview). `sameAs` (Instagram) is added only when permitted.
- **`WebSite`**, home page.
- **`Physician`**, each doctor profile. Emitted **only** once the clinic sets `profileStatus: 'confirmed'`.
- **`MedicalWebPage`**, on speciality, condition and treatment pages, with `about: MedicalCondition` on condition guides.
- **`MedicalWebPage`** with author, `reviewedBy` and `lastReviewed`, on articles. Emitted only when the article is fully approved.
- **`BreadcrumbList`**, every inner page.

**Deliberately absent:** reviews and ratings, opening hours, geo coordinates, price ranges, credentials and accreditations. None were supplied, and inventing them breaches Google's guidelines and the brief. Add opening hours and geo only once the clinic confirms them, and only alongside the visible text.

## Performance (Core Web Vitals)

- Static HTML with no client framework. One small bundled script handles menus, reveals, embeds and the form.
- Self-hosted Geist fonts (latin subset) with `font-display: swap`.
- Images converted at build time to **AVIF and WebP** in three widths, with JPEG fallback. Explicit dimensions prevent layout shift, and below-the-fold images lazy-load.
- Third-party content (Google Maps, the identity film) **loads only on click**.
- Long-lived caching for hashed assets.
- `inlineStylesheets: 'auto'` inlines small CSS, so there are fewer render-blocking requests.

## Google Analytics 4 (integration point; not set up)

1. The clinic creates a GA4 property **in its own Google account** and copies the Measurement ID (`G-…`).
2. Set `PUBLIC_GA4_ID=G-…` in the build environment and run `npm run build:launch`. The tag is only included in launch builds.
3. Consent: the tag defaults `ad_storage`, `ad_user_data` and `ad_personalization` to *denied* and anonymises IP. Confirm the consent approach with the clinic (DPDP Act); a consent banner may be required before enabling analytics storage.
4. Suggested conversions: enquiry form success, tel: clicks and directions clicks. Add events in `src/scripts/site.ts` once GA4 exists. No IDs are invented here.

## Google Search Console (integration point; not verified)

1. In Search Console, add a **Domain property** for the clinic's domain. DNS TXT verification is preferred, because it covers all subdomains and protocols.
2. Alternatively, choose the "HTML tag" method and set `PUBLIC_GSC_VERIFICATION=<content value>`. The meta tag is then output on every page.
3. After launch, submit `https://<domain>/sitemap-index.xml` and use URL Inspection on the home page and key service pages.
4. Verification is **not** complete until the clinic does this in its own account.

## Local SEO (outside the codebase)

- The Google Business Profile name, address and phone must match the website **exactly**, once confirmed in `site.ts`.
- Suggested primary category: *Dermatologist*. Secondary categories might include *Skin care clinic*, *Hair transplantation clinic*, *Gynaecologist* and *Oral and maxillofacial surgeon*, depending on what the clinic confirms.
- Use real photos (premises, team, equipment) and gather reviews only by asking real patients. Never incentivise or fabricate reviews.
- Build citations on reputable directories and professional bodies with identical NAP. Don't buy links.
