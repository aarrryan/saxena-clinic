# Content verification checklist

This is for the clinic's approval. Nothing on the site is invented. Every item below is either **supplied, but awaiting the clinic's confirmation**, or **missing**.

`npm run build:launch` refuses to build while anything in §1, §3 or §5 is unconfirmed, and lists exactly what is left. When an item is approved, change its status in the file named, from `'supplied'` or `'pending'` to `'confirmed'` or `'approved'`.

## 1. Clinic facts (`src/config/site.ts`)

| Fact | Current value | Source | Status | Action |
|---|---|---|---|---|
| Address | 1 Kushi Plaza, Krishna Hotel Road, Near Bhavartal Garden, Napier Town, Jabalpur, MP 482002 | Pasted markdown.md | supplied | Confirm the exact wording and spelling ("Kushi" or "Khushi"?), and that it matches the Google Business Profile exactly. |
| Phone 1 | 0761-2450122 | Pasted markdown.md | supplied | Confirm. Already click-to-call on the site (requested 22 Nov 2026), so please check it rings the clinic. |
| Phone 2 | 8349255492 | Pasted markdown.md | supplied | Confirm (also click-to-call), and say whether it is also the WhatsApp number. |
| WhatsApp | — | "Existing WhatsApp link was unable to load" | missing | Supply a verified number. Until then there is no WhatsApp button. |
| Email | — | "Not available" | missing | Supply, or leave it off the site. |
| Clinic hours | — | not supplied | missing | Supply exact hours for each day. Until then the site says "Please call the clinic for consultation timings". |
| Map pin / coordinates | — | not supplied | missing | Supply the Google Maps place link. The current map searches by the supplied address and loads only on click. |
| Instagram | @saxena_skin_and_cosmetic | Burned into the clinic's own reels | supplied | Confirm it's the official account. Supply any other social profiles. |
| Domain | — | not supplied | missing | Set `SITE_URL`. |
| Dr. Rajeev Saxena: 40+ years | 40 | Client brief §3A | supplied | Confirm the figure and wording ("more than 40 years of dermatological experience"). It appears on the homepage hero badge, the trust strip, his card and his profile, and is never attributed to the clinic as a whole. |

## 2. Consultants — the briefs and the signboard differ

The signboard screenshot shows titles and qualifications that differ from the written brief. They have **not** been reconciled silently. Qualifications are stored, but **not shown** until confirmed (`src/data/doctors.ts`).

| Consultant | Written brief | Signboard | Discrepancy to resolve |
|---|---|---|---|
| Dr. Rajeev Saxena | Senior Consultant Dermatologist; 40+ years | "D.V.D. (A.F.M.C) – Dermatologist" | The notes also say "Senior Dermatologist and **Cosmetologist**". Confirm the qualification as it should be published (D.V.D., A.F.M.C.), the title, and his medical council registration. |
| Dr. Akshay Saxena | Consultant Dermatologist – Clinical and Laser Dermatology | "M.D. Dermatology" | Confirm the qualification, institution and registration. No experience details were supplied. |
| Dr. Nischay Saxena | Dermatologist / Hair Transplantation and Hair Restoration | **Not on the signboard** | Confirm his qualifications, registration and current role at the clinic. The brief says surgical techniques and qualifications must be verified. |
| Dr. Amita Saxena | Consultant Gynaecologist and Cosmetic Gynaecology Specialist | "D.G.O. Cosmetic Gynecologist" | The notes say "Senior Consultant, OBG", "27+ years at Marble City Hospital" and "15–20 years in Cosmetic Gynaecology at the clinic". The range needs an exact figure, and permission is needed to name another hospital. None of this is published. |
| Dr. Jigisha Chhangani | Cranio-Maxillofacial Surgeon and Facial Aesthetics Specialist | "Dr. Jigisha **Chhangani Saxena**, M.D.S – **Oral** & Maxillofacial Surgery" | Two points: (a) which name to publish, and (b) "Cranio-Maxillofacial" (the brief) or "Oral & Maxillofacial" (the signboard). The site currently follows the brief. |

For each doctor, the clinic needs to supply or approve:

- [ ] an approved professional photograph (monogram placeholders are shown until then)
- [ ] qualifications and institutions, exactly as they should appear
- [ ] medical or dental council registration number, if it is to be published
- [ ] a biography approved by the doctor; the current two-paragraph summaries are built only from the brief
- [ ] consultation days and times
- [ ] approval of the whole profile: set `profileStatus: 'confirmed'`. Physician structured data is only emitted after this.

Areas described in the brief but **held back** until confirmed (`heldAreas` in `doctors.ts`, never rendered):

- **Dr. Akshay Saxena:** Q-switched Nd:YAG laser, Pico laser, regenerative and injectable treatments, and the scope of "advanced dermatological procedures"
- **Dr. Nischay Saxena:** the FUE technique, and specific surgical techniques
- **Dr. Amita Saxena:** vaginal rejuvenation, PRP and regenerative therapies, injectable and aesthetic therapies
- **Dr. Jigisha Chhangani:** the scope of facial contouring, and non-surgical facial aesthetic procedures

## 3. Medical content review (`src/data/topics.ts`)

All 19 speciality, condition and treatment pages were written as balanced patient education. They contain no outcome guarantees, statistics or device specifications. Each page needs a **named consultant reviewer and a review date** before launch. Set `review: { status: 'approved', reviewer: 'Dr. …, qualification', date: 'YYYY-MM-DD' }`.

- [ ] /dermatology/ · /dermatology/acne/ · /dermatology/acne-scars/ · /dermatology/psoriasis/ · /dermatology/vitiligo/ · /dermatology/melasma-pigmentation/ · /dermatology/eczema/
- [ ] /hair-clinic/ · /hair-clinic/hair-loss/ · /hair-clinic/hair-transplantation/ · /hair-clinic/prp-hair-treatment/
- [ ] /laser-treatments/ · /laser-treatments/fractional-co2-laser/ · /laser-treatments/laser-hair-reduction/
- [ ] /cosmetic-dermatology/ · /gynaecology/ · /cosmetic-gynaecology/ · /facial-aesthetics/ · /cranio-maxillofacial-surgery/

Reviewers should check especially:

- **Medicines named only generically.** Pages say "topical treatments", "systemic medicines", "newer targeted medicines". Specific drug names, biologics or JAK inhibitors should only be added if the clinic offers and wants to name them.
- **The emergency wording** on the gynaecology and maxillofacial pages.
- **The vitiligo, psoriasis and eczema treatment lists:** do they reflect what the clinic actually provides (phototherapy, grafting, patch testing)?

## 4. Treatment availability — confirm each one

These are shown as **"ask the clinic"**. They are explained in general terms and never claimed as offered:

| Treatment | Where it appears | Confirm offered? |
|---|---|---|
| PRP for hair loss | /hair-clinic/prp-hair-treatment/ (dedicated page), hair clinic list | [ ] |
| Laser hair reduction | /laser-treatments/laser-hair-reduction/ (dedicated page), laser list | [ ] |
| Q-switched Nd:YAG laser | laser list | [ ] |
| Pico laser | laser list | [ ] |
| Tattoo removal | laser list | [ ] |
| Chemical peels | cosmetic dermatology list | [ ] |
| Botox / neuromodulators | cosmetic dermatology list | [ ] |
| Dermal fillers | cosmetic dermatology list | [ ] |
| Skin boosters | cosmetic dermatology list | [ ] |
| PRP and regenerative (aesthetic) | cosmetic dermatology list | [ ] |
| Exosomes | not on site; legal and regulatory status must be checked first | [ ] |
| FUE hair transplantation | not mentioned anywhere | [ ] |
| Vaginal rejuvenation, PRP and injectable gynaecological therapies | cosmetic gynaecology list | [ ] |
| Facial contouring; non-surgical facial aesthetics | facial aesthetics list | [ ] |
| Biological therapies and JAK inhibitors | not named; described generically | [ ] |

Once one is confirmed, change its `availability` to `'clinic-stated'` in `topics.ts`. The "ask the clinic" tag and note disappear, and the page title can then target "… in Jabalpur".

**Stated by the clinic and shown as offered:** consultations in dermatology, hair (evaluation and transplantation), gynaecology and cosmetic gynaecology, cranio-maxillofacial surgery and facial aesthetics; and the **fractional CO2 laser using Italian DEKA technology for acne scars, stretch marks and post-traumatic injury scars**, using exactly the brief's wording.

## 5. DEKA laser

- Published wording, verbatim from the brief: "Fractional CO2 laser treatment using Italian DEKA technology, offered for selected concerns including acne scars, stretch marks and post-traumatic injury scars, following specialist assessment."
- **Visible in the supplied footage, not published:** "DEKA" on the cabinet and "SmartXIDE Punto" on the screen and side panel. Should the clinic want the model named, please confirm it.
- No wavelength, power, regulatory status, session numbers, downtime figures, success rates or other indications are published, and none should be added without documentation.

## 6. Patient education articles (`src/data/articles.ts`)

Two **draft** articles exist: "Why does acne keep coming back?" and "Understanding fractional CO2 laser". Drafts are visible only in preview builds, carry a "Draft" banner and are noindexed. Launch builds exclude them entirely.

To publish one, the clinic must provide:

- [ ] a named author, with credentials
- [ ] a named clinical reviewer, with credentials (not invented)
- [ ] publication and update dates
- [ ] at least one reputable reference (for example NICE, AAD, BAD, DermNet or peer-reviewed sources)

The remaining topics from the brief are listed on /patient-education/ as "Coming next".

## 7. Privacy and data handling

- [ ] Enquiry retention period. This is a placeholder on /privacy-policy/ and the launch guard fails until it's filled in.
- [ ] Who receives enquiries, and through which system (`ENQUIRY_WEBHOOK_URL`). Does the clinic have an existing appointment system to integrate with?
- [ ] A grievance or contact person for data requests, as applicable under India's Digital Personal Data Protection Act 2023. A legal review of the policy text is recommended.
- [ ] Whether Google Analytics may be used, and on what consent basis.

## 8. Media

- [ ] The vector logo (SVG or AI) and a horizontal lockup. The site currently uses a raster crop of the Instagram profile image.
- [ ] Professional photography of the consultants, reception, consultation rooms, laser room, equipment and interiors.
- [ ] Written patient consent for any clinic footage that shows patients, if the clinic ever wants to use it.
- [ ] Confirm the identity film (`public/media/identity-film.html`) is approved for the website.
