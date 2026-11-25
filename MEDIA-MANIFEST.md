# Clinic media manifest: photographs and videos (July 2026 walkthrough)

Source: Google Drive folder “images for clinic”, received 25 Nov 2026. It holds 24 HEIC photos and 16 MOV videos, all shot on one iPhone on 18 Jul 2026 between 13:51 and 14:12. **Originals are not committed** (about 500 MB of HEVC/HDR), so keep them in the clinic’s Drive. Each file’s size and the first 16 hex digits of its SHA-256 are listed, so any web asset can be traced back to its original.

## How the web versions were made

- **Photos:** orientation applied, resized to 2000 px on the long edge, JPEG q88, with **all metadata removed, including GPS location**. Astro generates AVIF/WebP at 360/540/720 px, plus a 1400 px WebP for the lightbox, at build time.
- **Videos:** the iPhone’s HLG HDR is tone-mapped to standard range (Hable), then converted to 30 fps, centre-cropped to 3:4 at 720 × 960, and played forward then reversed so each loop is seamless. Encoded as H.264 CRF 25 with no audio track and fast-start enabled. Each is 0.4–1.0 MB, about 3 MB in total. Poster frames are in `src/assets/clinic-media/`.

## Doctor photographs

None of the 40 files is named for a doctor, and none comes with identifying information, so **no photo has been assigned to any doctor** and the doctor cards are unchanged. Send portraits named by doctor (e.g. `dr-akshay-saxena.jpg`) to add them.

## Used

| Original | Size | SHA-256 (first 16) | Where | Web file |
|---|---:|---|---|---|
| `IMG_0397.MOV` | 45.3 MB | `dc146b7a96100382` | Homepage centrepiece, panel 01 “Laser suite” (first 4.6 s) | `public/media/clinic/laser-suite.mp4` |
| `IMG_0410.HEIC` | 2.8 MB | `3b55bf9480348e77` | About facilities gallery | `src/assets/clinic/treatment-room-3.jpg` |
| `IMG_0411.MOV` | 29.8 MB | `f05a0201b448438f` | Homepage centrepiece, panel 02 “Treatment room” | `public/media/clinic/treatment-room.mp4` |
| `IMG_0419.HEIC` | 5.8 MB | `99606f0299b78726` | About facilities gallery | `src/assets/clinic/laser-device.jpg` |
| `IMG_0434.HEIC` | 0.5 MB | `bfd4910d021a7607` | About facilities gallery | `src/assets/clinic/device-tower.jpg` |
| `IMG_0436.HEIC` | 2.7 MB | `dbab34e15e1af171` | Homepage “Inside the clinic” gallery | `src/assets/clinic/treatment-room.jpg` |
| `IMG_0437.HEIC` | 2.8 MB | `736c1a48dde24cdd` | About facilities gallery | `src/assets/clinic/treatment-room-2.jpg` |
| `IMG_0452.HEIC` | 2.6 MB | `d86063d5ed432ed3` | Homepage “Inside the clinic” gallery | `src/assets/clinic/laser-corner.jpg` |
| `IMG_0456.MOV` | 25.5 MB | `1bb23d79b3016bfe` | Homepage centrepiece, panel 03 “Fractional CO2 laser” | `public/media/clinic/co2-laser.mp4` |
| `IMG_0457(1).HEIC` | 0.6 MB | `5e3ab32ea1d7f4f7` | DEKA laser feature (homepage, About, laser topic pages) and About gallery | `src/assets/clinic/deka-co2-unit.jpg` |
| `IMG_0461.HEIC` | 2.9 MB | `6f3f4d63c39cebdc` | About facilities gallery | `src/assets/clinic/procedure-room.jpg` |
| `IMG_0462.MOV` | 35.1 MB | `579dd3f728ffea67` | Homepage centrepiece, panel 04 “Procedure room” | `public/media/clinic/procedure-room.mp4` |
| `IMG_0466.HEIC` | 2.5 MB | `365bcf9c72b92a20` | Homepage “Inside the clinic” gallery | `src/assets/clinic/procedure-room-2.jpg` |

## Not used

| Original | Size | SHA-256 (first 16) | Reason |
|---|---:|---|---|
| `IMG_0355(1).HEIC` | 0.9 MB | `4353d538a4185156` | **Patient privacy:** consultation with patients visible. Not used unless written consent for website publication is confirmed. |
| `IMG_0365.MOV` | 22.6 MB | `867199f65a3e8445` | **Patient privacy:** scalp examination, patient visible. |
| `IMG_0370.HEIC` | 1.0 MB | `91362be1eff6be02` | **Patient privacy:** a patient’s face is visible during a scalp examination. Not used unless consent is confirmed. |
| `IMG_0385.MOV` | 24.0 MB | `e828fa02b8b393f3` | **Patient privacy:** consultation, patients visible. |
| `IMG_0389.MOV` | 29.9 MB | `eef7b91df133b139` | One of the four supplied: same laser suite as IMG_0397. Replaced so the four panels show four different spaces (client chose option B). |
| `IMG_0391.MOV` | 21.8 MB | `31c3bcdcab8740c9` | One of the four supplied: same laser suite, landscape and almost static. Replaced (option B). |
| `IMG_0392.MOV` | 21.7 MB | `d05d2a2210cb5d01` | One of the four supplied: same laser suite, device close-up. Replaced (option B). |
| `IMG_0400.HEIC` | 3.4 MB | `855b86400f813e38` | Equipment shot at an awkward sideways angle. |
| `IMG_0404.HEIC` | 3.4 MB | `181e4c6852c6d615` | Device; weaker than the gallery picks. |
| `IMG_0412.MOV` | 16.5 MB | `b2242443a06f40ca` | Treatment-room devices; overlaps IMG_0411. |
| `IMG_0413.MOV` | 19.5 MB | `ee021002c137de05` | Single device close-up; little movement. |
| `IMG_0414.MOV` | 19.2 MB | `5e1eabcd73f69aca` | Single device close-up; little movement. |
| `IMG_0428.HEIC` | 2.6 MB | `9c332ae6f6dc6361` | Device on cart; weaker than the gallery picks. |
| `IMG_0429.HEIC` | 2.9 MB | `9bf01c03c722d15f` | Device; similar to IMG_0449. |
| `IMG_0432.HEIC` | 0.6 MB | `561ac682962002b4` | Handpiece close-up; reads as clutter at web sizes. |
| `IMG_0438.HEIC` | 2.4 MB | `86aed1c06f3a6b70` | Third-party advertising posters of models on the walls. |
| `IMG_0440(1).HEIC` | 0.7 MB | `6163ca1c5bac7182` | Dermapeel unit with clutter below. |
| `IMG_0441.MOV` | 23.2 MB | `99baaf84226a6ea6` | Dermapeel unit; utilitarian corner. |
| `IMG_0442.MOV` | 41.6 MB | `610bf4d7b8b5803a` | Opens on the Dermapeel unit; the laser room has third-party advertising posters of models. |
| `IMG_0444.HEIC` | 1.9 MB | `a39130bfc24adc4c` | Third-party advertising posters of models on the walls. |
| `IMG_0445.HEIC` | 3.0 MB | `1646307102228568` | Third-party advertising posters of models on the walls. |
| `IMG_0447(1).HEIC` | 0.7 MB | `1970d80d9044bf30` | Dermapeel unit; duplicate of IMG_0440. |
| `IMG_0449(1).HEIC` | 0.6 MB | `768982c802e1d19d` | Device; weaker than the gallery picks. |
| `IMG_0451(1).HEIC` | 2.1 MB | `aa642ca06aa46211` | Treatment room; near-duplicate of IMG_0436/0437. |
| `IMG_0453.MOV` | 28.1 MB | `738507500ed8bf5a` | Procedure room; overlaps IMG_0462. |
| `IMG_0455.MOV` | 24.3 MB | `5a92b16201ccad86` | DEKA unit; overlaps IMG_0456. |
| `IMG_0470.HEIC` | 2.6 MB | `5cd49b94faf66979` | Cluttered utility counter. |

**Patient consent:** the four items marked *Patient privacy* stay out unless the clinic confirms written consent for website publication.
