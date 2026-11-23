# Launch checklist

## A. Clinic approvals (see CONTENT-VERIFICATION.md)

- [ ] Address and both phone numbers confirmed. Set `status: 'confirmed'` in `src/config/site.ts`.
- [ ] WhatsApp number, email and clinic hours supplied, or left as `missing`.
- [ ] Google Maps place link supplied.
- [ ] Instagram confirmed as official, and other profiles supplied.
- [ ] Dr. Rajeev Saxena's 40+ years wording confirmed.
- [ ] All five doctor profiles approved (`profileStatus: 'confirmed'`). Signboard discrepancies resolved; qualifications, registrations and photos supplied where they are to be published.
- [ ] All 19 medical pages reviewed by a named consultant (`review.reviewer`, `review.date`).
- [ ] Every "ask the clinic" treatment either confirmed (`availability: 'clinic-stated'`) or kept as education.
- [ ] Privacy policy completed: retention period and grievance contact. Legal review done.
- [ ] Vector logo supplied, and professional photography scheduled.

## B. Technical setup

- [ ] Domain registered in the clinic's name, with DNS access held by the clinic.
- [ ] Hosting account in the clinic's name. Node 20+, behind HTTPS.
- [ ] Environment set (`.env.example`): `SITE_URL`, `ENQUIRY_WEBHOOK_URL`, optional `ENQUIRY_WEBHOOK_SECRET`, `PUBLIC_GA4_ID`, `PUBLIC_GSC_VERIFICATION`.
- [ ] Enquiry delivery tested end to end: submit the form and confirm the clinic receives it.
- [ ] `npm ci && npm test && npm run check && npm run build:launch` passes ("✓ Ready to launch").
- [ ] `npm start` running under a process manager (systemd, pm2 or the platform's own) with automatic restart.
- [ ] `E2E_MODE=launch python3 tests/e2e.py` run against the launch build (servers on 4321 and 4322).

## C. Post-launch (day 1–7)

- [ ] `https://<domain>/robots.txt` allows crawling, and the sitemap is reachable.
- [ ] Search Console verified, sitemap submitted, key URLs inspected.
- [ ] GA4 receiving data, if the clinic chose to enable it.
- [ ] Google Business Profile updated with the website URL and an identical NAP.
- [ ] Rich results test run on the home page and one doctor page. No errors, and no data that isn't visible on the page.
- [ ] Lighthouse or PageSpeed Insights checked on mobile for the home page and one treatment page.

## D. Ongoing

- [ ] Monthly: dependency updates (`npm outdated`, `npm audit`); review enquiry delivery.
- [ ] Publish patient-education articles only with a named author and reviewer, dates and references.
- [ ] Keep CONTENT-VERIFICATION.md current when services, staff or equipment change.
- [ ] Back up the repository and environment variables. Keep admin access with the clinic.
