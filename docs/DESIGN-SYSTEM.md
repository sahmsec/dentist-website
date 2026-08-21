# Design System — extracted from Smiliz demo-01 (reference)

Source measured live at https://smiliz-demo.pbminfotech.com/demo-01/ on 2026-08-21.
These are *measured design tokens* (colours, type scale, radii, spacing) used to build an
original site in the same visual language. No theme source code, licensed photography or
brand marks are copied.

## Colour
| Token | Value | Use |
|---|---|---|
| `--accent`            | `#ffd152` | primary yellow — CTAs, eyebrow dots, bands, icon tiles |
| `--accent-rgb`        | `255,209,82` | |
| `--navy`              | `#09243c` | secondary / blackish — dark sections, buttons, icon circles |
| `--navy-rgb`          | `9,36,60` | |
| `--ink`               | `#081b38` | headings + link normal |
| `--ink-hover`         | `rgba(8,27,56,.7)` | link hover |
| `--menu`              | `#001837` | main menu text |
| `--body`              | `#696f6f` | body copy |
| `--surface`           | `#f1f5f9` | page background / light section |
| `--white`             | `#ffffff` | cards, nav bar, footer |
| `--hairline`          | `rgba(9,36,60,.15)` | input borders, dividers |

## Type
- Headings / UI: **Onest**, weight 600 (Google Fonts)
- Body: **DM Sans**, weight 400 (Google Fonts)

| Role | Size / line-height | Weight | Notes |
|---|---|---|---|
| Page title (inner) | 72px | 600 | white over image titlebar |
| H1 hero | 46–58px / 1.05 | 600 | accent-coloured span for highlight words |
| H2 section | 58px / 60px | 600 | |
| H3 card | 26px / 32px | 600 | |
| Team/blog title | 20px / 26px | 600 | |
| Eyebrow | 13–14px / 23px | 600 | uppercase, letter-spacing 1px |
| Nav | 14px / 24px | 600 | uppercase, Onest |
| Body | 17px / 28.9px (1.7) | 400 | DM Sans |
| Small/meta | 16px / 26px | 400 | |
| Counter numeral | 125px / 1 | 600 | white, accent suffix |

## Geometry
- Content container: **1320px** max-width, 30px gutters
- Header: topbar auto + nav bar 80px (sticky 90px)
- Inner page titlebar: 450px tall
- Inputs: height 60px, radius 30px, padding 10px 30px, border .8px `--hairline`, 16px DM Sans
- Radii in use: `10px 20px 25px 30px 50px 60px` and signature asymmetric shapes:
  - `30px 30px 150px 150px`  (service card — huge bottom rounding)
  - `0 0 150px 150px`        (section base cut)
  - `10px 170px 170px`       (media block)
  - `0 0 0 30px`             (panel notch)
- Section corner treatment: light sections overlap dark/image bands with ~150px bottom radii

## Component signatures (to reproduce, originally authored)
1. **Topbar** — logo | 3 info blocks (navy 44px circle icon + uppercase 12px grey label + navy value)
2. **Nav bar** — white, uppercase Onest menu, active item yellow underline, search, 4 social circles, yellow pill CTA with white circular arrow badge on the left
3. **Hero** — full-bleed image, bottom corners ~60px; overlaid ~480px **white circle card** holding eyebrow pill, H1 with accent spans, lede; navy circle button straddling the circle edge
4. **Eyebrow pill** — white rounded pill, half-filled yellow dot glyph, uppercase 13px/1px tracking
5. **Yellow band** — accent bg, large asymmetric radii, cut-out figure on the left
6. **Service card** — white, `30px 30px 150px 150px`, H3 + copy + circular photo with yellow circular icon badge pinned top-right
7. **Feature tabs** — 3-pane block: yellow tab rail (active = navy pill + white circle arrow), white content pane, image pane; whole block ~40px radius
8. **Process row** — hairline-flanked eyebrow, 4 numbered white circles with partial navy ring, dotted arrow connectors
9. **Stat band** — full-bleed image, eyebrow pill + big white H2, translucent navy **Schedule hours** card (radius 20px) with rows + yellow pill CTA; 4 counters on hairline-split columns
10. **Team card** — circular portrait overlapping a white card top, uppercase role, name, social row, full-width yellow footer strip with navy circle arrow
11. **CTA band** — yellow, avatar stack + `4.6 ★★★★★`, eyebrow + 2-line H2, navy pill button, line-art tooth watermark
12. **Contact tiles** — 64px yellow rounded-square icon tile + uppercase label + navy value (this row carries the click-to-call links)
13. **Footer** — white, logo + blurb + social circles | link columns | newsletter pill input with yellow circular send button; bottom hairline bar
14. **Inner titlebar** — full-bleed image, 72px white H1, navy pill breadcrumb
