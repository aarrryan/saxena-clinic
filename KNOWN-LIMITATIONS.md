# Known limitations — GitHub Pages build

## Appointment enquiry form does not send on GitHub Pages

**Status:** known, deliberately unchanged (client decision, 25 Nov 2026 — to be handled as a separate task, e.g. Formspree).

- The form (`src/components/EnquiryForm.astro`) posts to the site's own server endpoint `/api/enquiry/` (`src/pages/api/enquiry.ts`).
- GitHub Pages serves static files only. `npm run build:github-pages` (`scripts/build-github-pages.mjs`) temporarily sets the API route aside so the static build succeeds, then restores it — so **on GitHub Pages there is no endpoint**: a visitor who submits the form gets the form's "couldn't send" error and is shown the clinic's phone details instead. No enquiry reaches the clinic from the GitHub Pages site.
- The form and its API work unchanged on a Node deployment (`npm run build` + `npm start`), with `ENQUIRY_WEBHOOK_URL` or `ENQUIRY_MODE=log` configured as described in `README.md`.
- Until fixed, patients should be directed to call the clinic.

Options when this is picked up: a hosted form service (Formspree, Basin, Getform) posting from the browser; a serverless function (Cloudflare Workers / Netlify / Vercel) that keeps the existing validation and webhook; or hosting the site on a Node-capable host.

## Other notes

- `404.html` declares its own address as `/saxena-clinic/404/` (canonical/OG URL), which is not a real page. Harmless — the 404 page is not indexed — and left as is.
- The homepage runs two pinned scroll sections back to back (four-video centrepiece, about 3 screens, then the scroll-controlled identity film, about 14 screens), by client request. The identity film also remains on the About page as a compact player.
