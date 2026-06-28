# Nature's Portrait — Project Context

This is a personal photography website for an artist who photographs nature (landscapes, wilderness, light). It is **not** a photography service or booking site — it is an artist's portfolio and journal. The tone is intimate, unhurried, and editorial. Think gallery, not agency.

The site is built with **Next.js** (latest) and **Sanity CMS** using the `nextjs-sanity-clean` starter template.

---

## Palette

```ts
export const palette = {
  luxeNoir:    { title: 'Luxe Noir',    value: '#060D0C' },
  coastalPine: { title: 'Coastal Pine', value: '#3E5954' },
  dustySage:   { title: 'Dusty Sage',   value: '#758886' },
  linenClay:   { title: 'Linen Clay',   value: '#C6C2BB' },
  softOat:     { title: 'Soft Oat',     value: '#F0EDE5' },
}
```

**How the palette is used:**
- `luxeNoir` — hero bg, pull quote bg, footer bg, deep shadow tones, primary text on light surfaces
- `coastalPine` — body text, image placeholder fills, newsletter section bg, supporting UI
- `dustySage` — eyebrows, captions, muted nav links, section labels, placeholder text
- `linenClay` — journal section bg, dividers, secondary borders, linen-toned mid-surfaces
- `softOat` — page background, hero title text, newsletter CTA button, light surfaces

There is **no accent colour** (no blue, no orange). All interactive states use contrast (dark-on-light or light-on-dark) rather than colour pops. This is intentional — preserve it.

---

## Typography

- **Display / headings:** Cormorant Garamond — weight 300, with italic variants. Used for all titles, pull quotes, series names, journal headlines, newsletter headline.
- **Body / UI:** Inter — weight 300 (body copy), weight 400 (buttons, labels). Used for captions, eyebrows, nav links, body paragraphs.
- **No other typefaces.**

Type scale conventions:
- Hero title: `clamp(56px, 8vw, 96px)`, weight 300
- Section titles (editorial): `clamp(28px, 3vw, 40px)`, weight 300
- Pull quote: `clamp(22px, 3vw, 32px)`, weight 300, italic
- Series/journal titles: 18–22px, weight 300
- Eyebrows / labels / captions: 10px, `letter-spacing: 0.22–0.28em`, uppercase
- Body copy: 13–14px, `line-height: 1.85–1.9`

---

## Homepage Block Inventory

These are the agreed content blocks for the homepage, in order:

1. **Hero** — full-viewport, parallax background, transparent-to-solid sticky nav, artist name + tagline + location strip. No CTA button.
2. **Editorial Feature** — two-column (image left, text right at 50/50), large portrait-format image with caption, title in Cormorant Garamond, 2 paragraphs of artist voice, quiet text link.
3. **Two-Column Split Block** — configurable splits: 40/60, 50/50, 60/40. Image on left or right depending on split. Used across the site for flexible storytelling layouts.
4. **Pull Quote** — full-width, `luxeNoir` background, large italic Cormorant Garamond quote, attribution in dustySage.
5. **Series Grid** — 3-column grid of portrait-format cards. Each: image (3/4 aspect ratio), series name, photo count. Subtle scale-up hover on image.
6. **Journal Strip** — 2-column, `linenClay` background. Each card: 16/9 image, date, title, excerpt. Subtle scale-up hover on image.
7. **Newsletter** — `coastalPine` background, italic headline, subdued subtext, inline email input + `softOat` button.
8. **Footer** — `luxeNoir` background, artist name + year left, nav links (Instagram, Prints, Contact) right.

---

## Behaviours

### Sticky Nav — Transparent to Solid
- Nav is `position: fixed`, always visible.
- Starts transparent (over the hero image).
- Transitions to `rgba(6, 13, 12, 0.96)` with `backdrop-filter: blur(8px)` after scrolling ~15% of the hero height.
- Padding compresses slightly when solid (`1.5rem` → `1rem` vertical).
- Transition: `0.4s ease` on background, backdrop-filter, and padding.
- Logo and links are always `softOat` / `linenClay` — no colour change needed since both states are dark.

### Hero Parallax
- The hero background image/SVG moves at `0.4×` scroll speed (i.e. `translateY(scrollY * 0.4)`).
- The bg element is sized to `130%` height and offset `-15%` from top to give parallax room without revealing edges.
- Use `{ passive: true }` scroll listeners.
- On mobile, consider disabling or reducing the effect (`@media (prefers-reduced-motion: reduce)` should always disable it).

---

## Design Principles — Do Not Deviate From These

- **No accent colour.** Do not introduce blues, oranges, or any hue not in the palette above.
- **No border-radius on structural elements.** Buttons, image blocks, section containers: sharp edges only. `border-radius: 0`.
- **Whitespace is generous.** Sections breathe. Do not compress padding to fit more content.
- **Typography carries the identity.** Cormorant Garamond at large sizes, weight 300, is the signature. Do not swap it out or add weights above 400.
- **Images are the content.** UI chrome should be invisible. The design exists to frame photographs, not to express itself.
- **No CTAs with filled colour backgrounds** (except the newsletter subscribe button which uses `softOat`). Links are underlined text or bare uppercase labels.
- **Section labels** are always: 10px, `letter-spacing: 0.25–0.28em`, uppercase, `dustySage` colour, with a hairline rule extending to the right via `::after`.

---

## Sanity Schema Notes

- Block types are configured in Sanity and rendered as React components.
- The two-column block has a `split` field with options: `40/60`, `50/50`, `60/40`.
- Image fields should use Sanity's image type with `hotspot: true`.
- Series and journal entries are separate document types in Sanity.

---

## Reference

A full static HTML mockup of the homepage (with working parallax, sticky nav, and split toggle) is saved at:
`natures-portrait-mockup.html`

Open it in a browser to see the intended design. All palette values, typography, spacing, and layout decisions in that file are the source of truth for visual implementation.
