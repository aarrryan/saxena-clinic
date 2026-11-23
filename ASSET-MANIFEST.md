# Asset manifest

Every supplied file was inspected visually before use: frames were extracted from each video and read, and images were viewed at full resolution. Nothing below is inferred from a filename.

The originals live in `reference-assets/` and are unchanged. `reference-assets.sha256` holds their checksums; verify them with `cd reference-assets && sha256sum -c ../reference-assets.sha256`.

## Supplied files

| File | What it actually contains | Quality | Use on the website |
|---|---|---|---|
| `Pasted text.txt` | The client's full website, branding and SEO brief: consultants, services, site structure, SEO targets, CMS and ownership requirements. | Text | Source of truth for structure and for the content the client has stated. |
| `Pasted markdown.md` | Collected clinic notes. It includes the **address** (1 Kushi Plaza, Krishna Hotel Road, Near Bhavartal Garden, Napier Town, Jabalpur 482002), **phones** (0761-2450122, 8349255492), designations, and Dr. Amita Saxena's experience notes. Email: "not available". WhatsApp: link "unable to load". | Text | Contact facts are stored in `src/config/site.ts` as **supplied (unconfirmed)**. |
| `CLAUDE_CODE_MASTER_PROMPT.md` | The build brief, identical to the copy uploaded in the conversation. | Text | Implementation requirements. |
| `original-18ef60a2771e1b80ddf0d9e5361684d3.webp` | The **OFINO** skincare website mock-up (Dribbble-style): ivory canvas, porcelain frame, oversized uppercase headline with a champagne last word, fluted-glass panel over a model photo, and a "Book Appointment" pill. | 1024×768 | **Design reference only.** The model photograph is stock imagery belonging to someone else and is not used anywhere. |
| `Screenshot 2026-11-22 at 9.27.30 PM.jpg` | The clinic's **"Our Consultants" signboard**. Heavy pink and green colour corruption, but the text is legible. It lists four doctors with qualifications. **Dr. Nischay Saxena is not on it.** | 1170×1448, colour-corrupted | Not published. Used only to compare credentials: see CONTENT-VERIFICATION.md §2. |
| `2ae4a4ef0aa84b6e99f2d2bf4d75b92b.MP4` | Clinic reel, 9.3s vertical. It shows the **DEKA laser system**, its articulated arm and handpiece, then a fractional laser treatment on an **identifiable male patient**, ending with an Instagram outro. The clinic logo watermark and handle @saxena_skin_and_cosmetic are burned in. Visible machine text: **"DEKA"** on the cabinet and **"SmartXIDE Punto"** on the screen and side panel, recorded for clinic confirmation only. The screen also shows treatment settings and a date. | 720×1280, 25fps, compressed | Two stills were cropped from the opening seconds: machine only, no patient, no overlays (see below). The model name and the settings are **not** published. |
| `7908c711ccaf40e5be25410607174d84.MP4` | Clinic reel, 13.3s. A staff member applies a facial treatment to an **identifiable female patient**. Burned-in captions: "5 Thing You Should Do Immediatly After Hydrafacial \ chemical peel", "Read Caption-". Instagram outro. | 720×1280, 25fps | **Not used.** Identifiable patient (consent unknown), plus caption overlays with typos. |
| `e607b1892ff54efe91551a8aef3f0ce9.MP4` | Clinic reel, 19.8s. A hair restoration or harvesting procedure with **visible blood** and an **identifiable patient**. Burned-in script caption: "Restoring Hair, Rebuilding Confidence". Instagram outro. | 720×1280, 30fps | **Not used.** Surgical imagery and patient identity. |
| `Video-21236.mp4` | Clinic reel, 6.2s. Gloved staff pour a serum into a bowl, then device facial treatments with LED light on an **identifiable female patient**. Emoji captions ("Confidence booster", "Time to be pampered") and the clinic logo are burned in. | 720×1280, 25fps | One still from the first second, showing hands only, with no face, patient or caption: "treatment preparation". The rest is not used, because of the patient and the salon-style captions. |
| `video.1fb88a84.mp4` | A generic **motion-design showreel**: "Motion", orange dot, "Opus 5.5 Motion designer. 0 keyframes". **Not clinic material.** | 1920×1078, 60fps | Not used. Motion-style reference only. |
| `video.2ab38476.mp4` | A generic **motion-design portfolio reel**: "CLAUDE", "I MAKE IT LOUD.", "TYPE IN MOTION.", chrome 3D shapes. **Not clinic material.** | 1920×1080, 60fps | Not used. |
| `saxena-motion-film.html` and `saxena-motion-film(1).html` | **Byte-identical** (same SHA-256). An 18-second, self-contained identity film: a teal dot becomes type, contours, the five specialists and disciplines, then the clinic's S-mark logo lockup. It loops seamlessly and has synthesised sound that only plays after a click. | 230KB, deterministic | Copied unchanged to `public/media/identity-film.html`. **Homepage:** a full-screen section right after the hero that pins to the screen, where scrolling moves the film forward and back (0–16 s, ending on the logo card), at the client's request. **About Us:** plays silently when scrolled into view. Sound only ever starts on a click inside the player. |

## What the HTML film is

It's a **brand identity film**, 18 seconds long, rather than a short logo sting. Every frame is drawn from a time value (`window.FILM.seek(t)`), so the homepage can drive it directly from scroll position with no video file, and it stays sharp on any screen. The hero headline and appointment button still come first, so the film never delays the essentials. The site's static logo is the medallion, so pages never depend on the film. (Client decision, 23 Nov 2026: the film moves for every visitor, including those who have turned on reduced motion.)

## Derived assets created for the site

| File | Derived from | Notes |
|---|---|---|
| `src/assets/clinic/laser-console.png` | `2ae4a4ef…MP4`, frame at 0.95s, crop (0,420)–(720,1110) | DEKA system console. No patient, no Instagram overlay, no watermark. Model name not legible in the crop. |
| `src/assets/clinic/laser-controls.png` | same clip, frame at 0.55s, crop (0,430)–(720,890) | Hands at the key switch and emergency stop. Cropped above the "DEKA … Punto" lettering. |
| `src/assets/clinic/treatment-preparation.png` | `Video-21236.mp4`, frame at 0.6s, crop (0,270)–(720,860) | Gloved hands pouring into a glass bowl. No face, patient or caption. |
| `src/assets/brand/logo-medallion.png` | The clinic's Instagram profile image, from a screenshot supplied in conversation | Exact circular crop, proportions unaltered. **A raster stand-in.** The vector logo is still needed. |
| `src/assets/brand/identity-film-poster.png` | `saxena-motion-film.html` at t = 15 s | Poster for the click-to-play film. |
| `public/icon-*.png`, `public/favicon.ico` | logo medallion | Favicons. |
| `public/og-default.png` | logo, Geist type, generated contour art | 1200×630 social share image. |

Astro converts the stills to AVIF and WebP at 360, 540 and 720px wide with JPEG fallbacks, and lazy-loads them below the fold. The source footage is 720px wide, so these stills are soft on large retina screens. Professional photography is recommended (see LAUNCH-CHECKLIST.md).

## Imagery policy

- No stock photography of people, clinics or equipment anywhere.
- The hero and page headers use **generated contour artwork** (`src/components/TopoArt.astro`). It's abstract and deterministic, and doesn't depict any patient, treatment or result.
- No before-and-after images.
- Clinic footage showing identifiable patients is not used. It needs documented written consent and a clinical-appropriateness review before any use.
