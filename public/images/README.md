# Photographs for the site

Every photograph the site uses lives in this folder. Each slot in the layout
asks for one specific filename — save the photo under exactly that name and it
appears. There is no upload screen, no code to change and no build step: drop
the file in, refresh the page, done.

**Nothing breaks while a photo is missing.** Until a file exists, the site draws
a branded placeholder in its place — a soft brand-coloured panel with the tooth
watermark and the filename printed across it. So an unfinished site still lays
out correctly, and every empty slot tells you on screen which file it is waiting
for. Photograph the chamber over several visits and fill the folder as you go.

Filenames are lowercase, with a `.jpg` extension, spelled exactly as listed.

---

## Home page

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `hero-dr-arman.jpg` | 16/9 | The main banner. Dr. Arman at the chamber, in scrubs or coat, looking towards camera. Bright, calm, plenty of room around him. |
| `dr-arman-portrait.jpg` | 3/4 | The introduction section. A relaxed standing or seated portrait, waist up. |
| `chamber-interior.jpg` | 1/1 | The small inset card that overlaps the portrait. The treatment room itself — chair, light, clean surfaces, no patient. |
| `stats-band.jpg` | 16/9 | Wide background behind the dark numbers band. It sits under a heavy navy tint, so choose something with shape rather than detail: the chair, a wide room view, hands at work. |

## Services — six cards

Each service card carries a circular photo. The filenames come from the `image`
field of each entry in `services` in `src/config/site.js`; if a service is
renamed there, rename the file to match.

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `service-general.jpg` | 1/1 | Routine care — examination, scaling, a check-up in progress. |
| `service-orthodontics.jpg` | 1/1 | Braces or a clear aligner, close up on the smile. |
| `service-implants.jpg` | 1/1 | Implant work — a model, a crown, or the placement itself. |
| `service-cosmetic.jpg` | 1/1 | A finished cosmetic result, or shade matching against a guide. |
| `service-whitening.jpg` | 1/1 | Whitening in progress, or a bright finished smile. |
| `service-surgery.jpg` | 1/1 | Surgical setup — instruments laid out, gloved hands, sterile field. |

These are cropped to a circle, so keep the subject dead centre and leave air on
all four sides.

## Why patients choose the chamber

The tall photo pane beside the tabbed panel. One image per tab; the visitor sees
only one at a time, so they should feel like a set.

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `why-qualified.jpg` | 3/4 | Dr. Arman working — concentrated, mid-procedure or reviewing an X-ray. |
| `why-painless.jpg` | 3/4 | A comfortable patient, relaxed in the chair. |
| `why-transparent.jpg` | 3/4 | The consultation moment — explaining a plan across the desk or at the screen. |
| `why-modern.jpg` | 3/4 | Equipment and sterilisation — the autoclave, sealed instrument pouches, the digital display. |

## Before and after

Three matched pairs. Both halves of a pair must be shot from the same angle, at
the same distance, under the same light — the comparison is worthless otherwise,
and a mismatch is obvious the moment the two sit side by side.

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `ba-1-before.jpg` / `ba-1-after.jpg` | 4/3 | Composite bonding — chipped upper incisors, then rebuilt. |
| `ba-2-before.jpg` / `ba-2-after.jpg` | 4/3 | Orthodontic result — crowding before, aligned after. |
| `ba-3-before.jpg` / `ba-3-after.jpg` | 4/3 | Professional whitening — shade before, shade after. |

Captions for these are written in `beforeAfter` in `src/config/site.js`.

## Testimonials

Small circular avatars beside each quote — one per entry in the `testimonials`
array in `src/config/site.js`, numbered in the order they appear there. There
are four quotes at the moment, so four files.

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `patient-1.jpg` … `patient-4.jpg` | 1/1 | A friendly head-and-shoulders photo of the patient who gave the quote. Displayed small and round, so the face should fill most of the frame. |

Use these only with the patient's permission, and only if they are happy to be
recognised. A placeholder is a perfectly good answer here — the quotes read fine
without a face attached.

## About page

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `dr-arman-about.jpg` | 3/4 | The main portrait on the About page. More formal than the home page one — this is the "meet the surgeon" photograph. |
| `team-arman.jpg` | 1/1 | Circular team portrait of Dr. Arman. Plain background, shoulders up. |
| `team-associate.jpg` | 1/1 | The associate dentist, same framing and same background as above. |
| `team-assistant.jpg` | 1/1 | The chamber assistant, same framing and same background again. |

The three team portraits sit in a row, so shoot them in one session against the
same wall. Names and roles come from `about.team` in `src/config/site.js`.

## Inner page banners

The wide strip behind the title at the top of each inner page. Text sits over
them, so they want to be simple and uncluttered — anything busy makes the title
hard to read.

| File | Ratio | What the shot should show |
| --- | --- | --- |
| `titlebar-about.jpg` | 21/9 | Wide view of the chamber or reception. |
| `titlebar-services.jpg` | 21/9 | Instruments, chair or equipment, shot wide. |
| `titlebar-contact.jpg` | 21/9 | The building entrance, the signboard, or the street outside. |
| `titlebar-default.jpg` | 21/9 | A neutral fallback used by any page without its own banner. |

## Social share card

| File | Size | What the shot should show |
| --- | --- | --- |
| `og-cover.jpg` | 1200 × 630 px | What appears when someone shares a link on Facebook, WhatsApp or Messenger. Dr. Arman plus clear space — the practice name and phone number get read off this at thumbnail size. Keep the important part in the middle; the edges are cropped differently by every app. |

---

## Preparing the files

- **Format and quality.** JPEG at roughly 80% quality. That is visually
  indistinguishable from maximum quality and a fraction of the size, which
  matters on a phone connection.
- **Size.** Longest edge 1600px is plenty for everything except the wide
  banners — `stats-band.jpg`, the four `titlebar-*.jpg` and `og-cover.jpg` —
  which want 2400px. Bigger than that only makes the page slower.
- **Keep faces away from the extreme edges.** The design cuts deep rounded
  corners into photographs, and several slots are cropped to a circle. Anything
  near a corner will be cut off. Leave a comfortable margin and shoot a little
  wider than feels necessary.
- **Respect the stated ratio.** A photo of the wrong shape is cropped to fit,
  from the centre outwards.
- **Light.** Natural light where possible, overhead chamber lighting where not.
  Avoid the on-camera flash — it flattens faces and turns the chair and
  instruments into hotspots.
- **Consent.** Get written consent from the patient before publishing any
  clinical photograph, before-and-after pair, or recognisable face. This applies
  even when the mouth alone is visible. Keep the signed form; do not publish
  first and ask afterwards.
