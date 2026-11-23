# CLAUDE CODE MASTER PROMPT — SAXENA SKIN AND COSMETIC CLINIC

You are a senior creative director, product designer, full-stack engineer, healthcare UX specialist and technical SEO architect. Build a complete, production-quality, multi-page website for **Saxena Skin and Cosmetic Clinic, Jabalpur, Madhya Pradesh, India**.

This is a real specialist medical clinic. The site must communicate clinical credibility, specialist expertise, precision and a premium patient experience. It must not look like a generic hospital template, beauty salon, cosmetic marketplace or AI-generated landing page.

## 1. Audit before implementation

Before changing code:
- Inspect the complete repository, framework, dependencies, routing, build scripts, components, assets and deployment setup.
- Preserve existing working functionality and avoid destructive rewrites.
- Inspect every file in `reference-assets/`, including all video clips and both motion-film HTML files.
- Review the videos visually; extract representative frames/contact sheets if useful. Identify what is actually shown. Never infer content from filenames.
- Test the supplied motion-film HTML and decide whether it is a logo sting, a longer brand film or another asset. Integrate it only where appropriate.
- Create `ASSET-MANIFEST.md` describing each asset, its contents, quality and proposed use.
- Keep all original assets unchanged.

## 2. Creative direction — OFINO-inspired

Use the supplied OFINO skincare website screenshot as the primary visual direction. Recreate its design language, not its brand or exact layout.

Desired aesthetic:
- Warm ivory / soft beige canvas.
- Large porcelain-white content surfaces.
- Oversized editorial typography and deliberate line breaks.
- Immersive, premium skin/clinical imagery.
- Spacious layouts and generous negative space.
- Selective rounded corners, fine borders and restrained shadows.
- Champagne/beige accents.
- Minimal elegant navigation.
- Subtle glassmorphism on navigation, floating controls and selected overlays.
- Refined transitions and micro-interactions.

Suggested palette:
- Warm ivory `#F3EFE7`
- Porcelain `#FBFAF7`
- Sand beige `#D8CBB8`
- Champagne `#B9A27D`
- Deep ink `#171715`
- Muted grey `#77736C`
- Deep teal may be used sparingly if it complements the actual logo.

Use a consistent high-quality sans-serif system (Geist, Inter or equivalent). Establish a proper type scale and grid.

### Homepage hero
Create an immersive editorial hero inspired by OFINO:
- Large image with elegant cropping.
- Bold multi-line headline.
- Clinic identity and Jabalpur location.
- Concise medical positioning statement.
- Prominent appointment/contact CTA.
- A restrained masking/vertical-line image treatment may echo the reference, but do not copy it literally.
- Maintain excellent contrast and accessibility.

Suggested headline: **SPECIALIST SKIN, HAIR & AESTHETIC CARE.**

Supporting copy: “A multidisciplinary team of specialist consultants bringing together dermatology, hair restoration, laser treatments, women's health and facial aesthetics in Jabalpur.”

### Glass effect
Use glass sparingly: translucent blurred navigation, subtle glass appointment pill, fine translucent borders and restrained shadows. Do not make every card frosted. Provide readable solid fallbacks when backdrop-filter is unsupported.

## 3. Clinic information — preserve accuracy

Official name: **Saxena Skin and Cosmetic Clinic**  
Location: **Jabalpur, Madhya Pradesh, India**

Positioning: multidisciplinary specialist medical practice spanning dermatology, hair transplantation/restoration, laser treatments, cosmetic dermatology, gynaecology and facial aesthetics.

Five consultants:
1. **Dr. Rajeev Saxena** — Senior Consultant Dermatologist. Client states 40+ years of dermatological experience. Areas described: clinical dermatology, psoriasis, vitiligo, pigmentation disorders, acne and chronic/inflammatory skin conditions.
2. **Dr. Akshay Saxena** — Consultant Dermatologist; Clinical and Laser Dermatology. Areas described: clinical dermatology, laser dermatology, laser hair reduction, fractional CO2, Q-switched Nd:YAG and Pico laser treatments, acne scars, pigmentation and skin rejuvenation.
3. **Dr. Nischay Saxena** — Dermatologist / Hair Transplantation and Hair Restoration. Areas described: hair loss evaluation, hair restoration, hair transplantation, PRP and scalp disorders. Specific surgical technique and qualifications require verification.
4. **Dr. Amita Saxena** — Consultant Gynaecologist and Cosmetic Gynaecology Specialist. Areas described: general gynaecology, women's health and cosmetic gynaecology.
5. **Dr. Jigisha Chhangani** — Cranio-Maxillofacial Surgeon and Facial Aesthetics Specialist.

The 40+ years claim applies only to Dr. Rajeev Saxena's dermatological practice. Never attribute it to the whole clinic or other consultants.

The supplied consultant signboard may show qualification abbreviations/titles that differ from the written brief. Compare sources and list discrepancies in `CONTENT-VERIFICATION.md`. Do not silently reconcile or invent credentials. Publish qualifications, registration details, photographs and biographies only when verified/approved.

## 4. Important equipment differentiator

The clinic states that it uses an **Italian DEKA Fractional CO2 laser machine** for:
- Acne scars.
- Stretch marks.
- Scars resulting from post-traumatic injuries.

Give this feature prominent visibility on the Laser Treatments page and relevant service pages. Suggested wording:

“Fractional CO2 laser treatment using Italian DEKA technology, offered for selected concerns including acne scars, stretch marks and post-traumatic injury scars, following specialist assessment.”

Do not invent the machine model, wavelength, technical specifications, regulatory status, success rates, guaranteed outcomes, number of sessions, downtime or additional indications. If a supplied clip shows a legible machine label, record only what is visibly readable and mark it for clinic confirmation.

## 5. Multi-page site architecture

Build real crawlable routes, not a single-page layout with dead links.

Main navigation:
Home, About Us, Our Doctors, Dermatology, Hair Clinic, Laser Treatments, Cosmetic Dermatology, Gynaecology, Facial Aesthetics, Conditions We Treat, Patient Education, Contact/Appointments.

Suggested routes:
- `/`
- `/about-us/`
- `/our-doctors/`
- `/our-doctors/dr-rajeev-saxena/`
- `/our-doctors/dr-akshay-saxena/`
- `/our-doctors/dr-nischay-saxena/`
- `/our-doctors/dr-amita-saxena/`
- `/our-doctors/dr-jigisha-chhangani/`
- `/dermatology/`
- `/dermatology/acne/`
- `/dermatology/acne-scars/`
- `/dermatology/psoriasis/`
- `/dermatology/vitiligo/`
- `/dermatology/melasma-pigmentation/`
- `/dermatology/eczema/`
- `/hair-clinic/`
- `/hair-clinic/hair-transplantation/`
- `/hair-clinic/hair-loss/`
- `/hair-clinic/prp-hair-treatment/`
- `/laser-treatments/`
- `/laser-treatments/fractional-co2-laser/`
- `/laser-treatments/laser-hair-reduction/`
- `/cosmetic-dermatology/`
- `/gynaecology/`
- `/cosmetic-gynaecology/`
- `/facial-aesthetics/`
- `/cranio-maxillofacial-surgery/`
- `/conditions-we-treat/`
- `/patient-education/`
- `/contact-us/`
- `/privacy-policy/`

Avoid thin, repetitive pages. Build substantive content templates that can scale.

## 6. Homepage sections

1. Premium navigation and logo.
2. Editorial hero with Jabalpur location and appointment CTA.
3. Trust strip: five specialist consultants; Dr. Rajeev Saxena's 40+ years of dermatological experience.
4. Clinic introduction.
5. Five consultant profiles.
6. Speciality overview.
7. Dermatology highlight.
8. Hair restoration/transplantation.
9. Laser technology feature — highlight Italian DEKA Fractional CO2 and the three confirmed indications.
10. Cosmetic dermatology.
11. Women's health/gynaecology.
12. Cranio-maxillofacial surgery/facial aesthetics.
13. Clinic/equipment gallery using actual supplied assets.
14. Patient education articles.
15. Contact/location/map panel.
16. Appointment CTA and complete footer.

Do not invent phone numbers, street address, hours, email, map coordinates, booking URL or social handles. Use a central `siteConfig` and explicit `NEEDS_CONFIRMATION` placeholders. Ensure placeholders cannot accidentally be published.

## 7. Services and medical content

The client brief includes a broad set of proposed services and conditions. Treat these as candidate content topics, not automatic proof of current availability. Confirm before describing any as an offered treatment.

Dermatology topics include acne, acne scars, rosacea, melasma, hyperpigmentation, psoriasis, vitiligo, eczema/atopic dermatitis, contact dermatitis, seborrheic dermatitis, infections, urticaria, chronic itching, lichen planus, skin allergies, pediatric dermatology, nail disorders, hair/scalp disorders, autoimmune skin diseases and genital dermatology/STIs.

Advanced topics mentioned include biological therapies, JAK inhibitors where indicated, advanced vitiligo management, difficult-to-treat psoriasis, advanced acne management and dermatological procedures/biopsies. Confirm availability.

Hair topics include male/female pattern hair loss, androgenetic alopecia, alopecia areata, telogen effluvium, scarring alopecia, scalp disorders, PRP, hair transplantation consultation, candidate evaluation, hairline planning and post-transplant care. FUE must only be mentioned if confirmed.

Laser topics include fractional CO2, laser hair reduction, Q-switched Nd:YAG, Pico laser, pigmentation, tattoo removal (if offered), acne scar treatment and resurfacing. Confirm each service.

Cosmetic dermatology topics may include neuromodulators/Botox, fillers, hyaluronic acid fillers, chemical peels, skin resurfacing, skin boosters and PRP. Confirm each service.

Gynaecology topics may include general gynaecology, menstrual health, menopause, cosmetic gynaecology, intimate health and vaginal rejuvenation/PRP only if confirmed.

Facial/maxillofacial topics may include facial deformity evaluation, facial trauma/reconstruction, facial asymmetry, facial contouring and surgical/non-surgical facial aesthetics. Clearly distinguish surgical and non-surgical care and confirm availability.

Every treatment/condition page should explain what it is, possible indications, assessment, general process, risks/side effects, aftercare and realistic expectations. Use balanced patient-friendly language; do not give individual diagnosis or guarantee results.

## 8. Medical content trust and safety

- No invented credentials, awards, registration numbers, patient results, statistics or testimonials.
- No fake before/after images.
- No fear-based or guaranteed-outcome claims.
- Clearly state educational content does not replace clinician consultation.
- Medical articles need real author/reviewer approval, credentials, publication date, update date and reputable references.
- Do not fabricate a “Reviewed by” clinician.
- Maintain a `CONTENT-VERIFICATION.md` checklist for clinic approval.

## 9. SEO — foundational requirement

Primary local search themes:
- Dermatologist in Jabalpur.
- Skin specialist / skin doctor in Jabalpur.
- Skin clinic / dermatology clinic in Jabalpur.
- Hair specialist / hair transplant in Jabalpur.
- Laser treatment in Jabalpur.
- Cosmetic dermatologist in Jabalpur.
- Psoriasis, vitiligo, acne scar treatment in Jabalpur.

Build useful, unique pages around genuine search intent. Do not keyword-stuff. Regional audiences may include Katni, Narsinghpur, Seoni, Mandla, Damoh, Sagar, Chhindwara and Satna, but do not create doorway pages or repetitive city pages.

Every indexable page needs unique title/meta description, one H1, logical H2/H3 hierarchy, clean URL, internal links, accurate image alt text, canonical URL and Open Graph metadata.

Implement:
- XML sitemap.
- robots.txt.
- Canonicals.
- Correct index/noindex rules.
- Semantic HTML and crawlable rendering.
- Breadcrumbs.
- Accurate structured data.
- Responsive images and modern formats.
- Good Core Web Vitals.
- 404 page and redirects where needed.

Use appropriate schema such as MedicalClinic/MedicalBusiness (choose a valid appropriate type), Physician for verified doctors, Article, BreadcrumbList and WebSite. Structured data must match visible facts. Never invent reviews, ratings, hours, phone, coordinates or credentials.

Provide integration points for Google Analytics 4 and Search Console. Do not invent IDs or claim verification is complete. Document setup steps.

## 10. Appointment and contact experience

Implement an accessible appointment enquiry form with:
- Patient name and contact details only as necessary.
- Doctor/speciality selection.
- Preferred date/time.
- Consent/privacy notice.
- Validation and success/error states.
- Spam protection.
- Clear statement that it is an enquiry, not a confirmed booking, unless a real booking integration is supplied.

Add click-to-call and WhatsApp CTAs only when verified numbers are supplied. Avoid collecting sensitive medical details unnecessarily. Do not send patient data to third parties without explicit integration and appropriate consent.

## 11. CMS and ownership

Choose a maintainable CMS approach compatible with the existing stack. Do not create a fake admin dashboard. If CMS credentials/backend are not supplied, use structured content files and document the future CMS integration path.

Clinic should retain ownership of domain, hosting, source code, CMS, analytics and Search Console.

## 12. Logo animation and supplied footage

Inspect `saxena-motion-film.html` and the supplied clips before integrating. If the HTML is suitable as a logo/identity animation, use it in a restrained brand moment (hero accent, short intro or About section). Do not autoplay sound. Do not make a long film delay page content. Respect reduced-motion preferences and provide a static logo fallback.

Use real clinic footage/images where suitable. Do not use stock imagery that falsely depicts clinic staff, patients, equipment or premises. Any external stock asset must be properly licensed and documented. Preserve source files. Optimise media and lazy-load below-the-fold content.

## 13. Interaction and responsive quality

Use restrained scroll reveals, polished hover states, subtle image masks, smooth navigation and carefully selected micro-interactions. Avoid scroll-jacking, excessive parallax and constant distractions. Respect `prefers-reduced-motion`.

Test 360–390px mobile, 768px tablet, 1024px laptop, 1440px desktop and 1920px wide desktop. No horizontal overflow. Ensure keyboard access, visible focus, semantic landmarks, meaningful alt text, contrast, accessible forms and mobile-specific compositions.

## 14. Performance and security

Optimise images/video, avoid unnecessary JS, lazy-load media, prevent layout shift, validate/sanitise form inputs, keep secrets out of frontend code, add security headers where supported, and document backup/update recommendations.

## 15. Execute the work — do not stop at a plan

A. Audit repository and assets.  
B. Create `ASSET-MANIFEST.md` and `CONTENT-VERIFICATION.md`.  
C. Establish design tokens, typography, layout grid and reusable components.  
D. Build homepage, all major pages, five consultant profiles, treatment/condition templates, education/blog, contact and privacy pages.  
E. Implement technical SEO, metadata, sitemap, robots, schema and internal links.  
F. Run production build, lint/type checks and tests. Test every route, CTA, form, media asset, responsive breakpoint, console and broken link. Fix issues.  
G. Create `README.md`, `SEO-IMPLEMENTATION.md`, `LAUNCH-CHECKLIST.md` and `.env.example` if needed.

Missing information to flag for client:
- Exact postal address, phone, WhatsApp, email, clinic hours and map pin.
- Verified doctor qualifications, registrations, biographies and approved photos.
- Exact DEKA machine model/specifications if they wish to publish them.
- Confirmation of all treatment offerings, including FUE, Pico, Q-switched Nd:YAG, tattoo removal, Botox, fillers, PRP, exosomes and cosmetic gynaecology services.
- Privacy/data retention and appointment handling details.
- Social links and Analytics/Search Console IDs.

## Acceptance criteria

The project is complete only when:
1. It is a working multi-page website with real navigation.
2. The design follows the OFINO-inspired warm editorial aesthetic.
3. Glass effects are subtle and purposeful.
4. All five doctors have individual profile pages.
5. The Italian DEKA Fractional CO2 laser is accurately presented for acne scars, stretch marks and post-traumatic injury scars.
6. Logo animation and video assets have been inspected before use.
7. No medical facts, credentials, services or contact details are fabricated.
8. Technical/on-page/local SEO foundations are implemented.
9. Appointment enquiry interactions work with real configuration values.
10. Mobile and desktop experiences are polished.
11. Production build succeeds and routes/interactions are tested.
12. Missing confirmations and handover instructions are documented.

**Creative standard:** Premium specialist clinic with the editorial confidence of the OFINO reference.  
**Engineering standard:** Maintainable, responsive, fast, accessible, crawlable and production-ready.

Now inspect the repository and all supplied assets, then implement the complete project.
