# Design System: CLICK

## 1. Visual Theme & Atmosphere

A market-floor energy distilled into dark glass — zinc-black surfaces that recede so products and status information can dominate. The atmosphere is confident and dense without being cluttered: a street vendor's intelligence wrapped in a premium shell. Think the interior of a high-end convenience store at night — everything visible, purposeful, and slightly theatrical. Not a sterile fintech UI. Not a loud Latam startup template.

- **Density:** 6/10 — commerce-productive. Product grids breathe; the screen is always doing work.
- **Variance:** 6/10 — asymmetric section headers, offset category chips, left-anchored hierarchy. Nothing is centered without intent.
- **Motion:** 6/10 — spring-physics for cart and transitions, smooth rider marker interpolation, staggered grid reveals. Motion communicates state, never decorates.

Dark-mode first. Zinc-950 canvas everywhere. One accent: Electric Blue `#1D6FF2` — trust, velocity, and Honduras's equatorial sky at dusk.

---

## 2. Color Palette & Roles

```css
:root {
  /* ── Canvas & Surfaces ────────────────────────────────────── */
  --color-canvas:           #09090B;  /* Zinc-950 — app background */
  --color-surface:          #18181B;  /* Zinc-900 — cards, sheets, bottom nav */
  --color-surface-raised:   #27272A;  /* Zinc-800 — inputs, nested surfaces */
  --color-surface-overlay:  rgba(9,9,11,0.85); /* modal backdrops, map panel */

  /* ── Text ────────────────────────────────────────────────── */
  --color-text-primary:     #FAFAFA;  /* Zinc-50 — product names, prices, headings */
  --color-text-secondary:   #A1A1AA;  /* Zinc-400 — descriptions, metadata, labels */
  --color-text-muted:       #52525B;  /* Zinc-600 — disabled states, placeholders */

  /* ── Borders ─────────────────────────────────────────────── */
  --color-border:           rgba(63,63,70,0.60);  /* Zinc-700 60% — card edges, dividers */
  --color-border-subtle:    rgba(63,63,70,0.25);  /* Zinc-700 25% — section separators */

  /* ── Single Accent ───────────────────────────────────────── */
  --color-accent:           #1D6FF2;  /* Electric Blue — CTAs, active nav, live dot, focus rings */
  --color-accent-hover:     #1A5FD4;  /* 10% darker for hover */
  --color-accent-subtle:    rgba(29,111,242,0.12); /* tag backgrounds, hover fills */
  --color-accent-ring:      rgba(29,111,242,0.40); /* focus rings, card hover border */

  /* ── Semantic (status only, never decorative) ────────────── */
  --color-success:          #16A34A;  /* Green-700 — DELIVERED */
  --color-success-subtle:   rgba(22,163,74,0.12);
  --color-warning:          #CA8A04;  /* Yellow-600 — MIAMI_WAREHOUSE, IN_TRANSIT_HN, CUSTOMS */
  --color-warning-subtle:   rgba(202,138,4,0.12);
  --color-neutral-badge:    #3F3F46;  /* Zinc-700 fill — ORDERED badge */

  /* ── Map ──────────────────────────────────────────────────── */
  --color-rider-dot:        #1D6FF2;
  --color-route-line:       rgba(29,111,242,0.35);
  --color-map-panel:        rgba(9,9,11,0.80); /* timeline panel over map */
}
```

**Accent discipline:** `--color-accent` appears on: primary CTA buttons, active bottom-nav icon + pill, price USD amounts, live rider dot, focus rings, cart badge count. Nowhere else. Zero exceptions.

---

## 3. Typography Rules

### Font Stack
```css
--font-sans: 'Geist', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Menlo', monospace;
```

Geist ships natively with Next.js 16 via `next/font/local` — zero CLS risk, no external CDN. `Inter` is banned. Generic system fonts are banned for product-facing surfaces.

### Scale
| Token | Size | Weight | Line-height | Tracking | Usage |
|---|---|---|---|---|---|
| `--text-hero` | `clamp(1.75rem, 5vw, 2.5rem)` | 700 | 1.1 | `-0.03em` | App name, section hero |
| `--text-xl` | `clamp(1.2rem, 3vw, 1.4rem)` | 600 | 1.2 | `-0.02em` | Page titles, product name on detail |
| `--text-lg` | `1.125rem` (18px) | 600 | 1.3 | `-0.01em` | Section headers |
| `--text-base` | `1rem` (16px) | 400 | 1.55 | `0` | Body, descriptions |
| `--text-sm` | `0.875rem` (14px) | 400 | 1.4 | `0` | Labels, metadata, card product name |
| `--text-xs` | `0.75rem` (12px) | 500 | 1.3 | `0.04em` | Badges, chips, bottom-nav labels |
| `--text-mono` | `0.8125rem` (13px) | 400 | 1.4 | `0` | Order IDs, prices, ETA countdown |

### Rules
- Prices: always `--font-mono`, weight 600. HNL in `--color-text-primary`, USD in `--color-text-secondary` below it.
- Badge text: uppercase, `0.06em` tracking.
- Body max-width: `65ch`.
- `--color-text-secondary` for all descriptions, merchant names, and metadata — never `--color-text-primary`.

---

## 4. Component Stylings

### Product Card
```
Surface:        --color-surface
Border:         1px solid --color-border
Border-radius:  1rem (16px)
Image:          aspect-ratio 1/1, object-fit cover, border-radius 0.75rem top corners
Padding:        0.75rem
Shadow:         0 2px 12px rgba(0,0,0,0.45)
```
- Product name: `--text-sm`, weight 500, 2-line clamp, `--color-text-primary`
- Price HNL: `--text-base`, weight 700, `--font-mono`, `--color-text-primary`
- Price USD: `--text-xs`, `--font-mono`, `--color-text-secondary`, immediately below HNL
- **AMAZON badge:** absolute top-left, `--color-accent-subtle` fill, `--color-accent` text, `--text-xs` uppercase, `border-radius: 0.375rem`, padding `0.2rem 0.5rem`
- **LOCAL badge (Super Coop / Diunsa):** same geometry, `--color-neutral-badge` fill, `--color-text-secondary` text
- Add-to-cart: icon button bottom-right, `--color-accent` fill, 2.75rem tap target, `border-radius: 0.5rem`
- **Active/press:** `transform: scale(0.97)`, `transition: 60ms ease` — no shadow explosion, no glow
- **Hover (desktop):** border transitions to `--color-accent-ring`

### Order Status Badges
Geometry for all: `border-radius: 9999px`, `padding: 0.2rem 0.65rem`, `--text-xs`, uppercase, weight 600, `letter-spacing: 0.06em`.

| Status | Fill | Text |
|---|---|---|
| `ORDERED` | `--color-neutral-badge` | `--color-text-secondary` |
| `MIAMI_WAREHOUSE` | `--color-warning-subtle` | `#EAB308` |
| `IN_TRANSIT_HN` | `--color-warning-subtle` | `#EAB308` |
| `CUSTOMS` | `--color-warning-subtle` | `#EAB308` |
| `OUT_FOR_DELIVERY` | `--color-accent-subtle` | `--color-accent` |
| `DELIVERED` | `--color-success-subtle` | `#22C55E` |
| `RIDER_ASSIGNED` | `--color-accent-subtle` | `--color-accent` |
| `PICKING_UP` | `--color-accent-subtle` | `--color-accent` |
| `ON_THE_WAY` | `--color-accent-subtle` | `--color-accent` |

Active statuses (anything not ORDERED or DELIVERED) prefix a `●` dot that pulses: `opacity 0.4→1→0.4`, `1.6s ease-in-out infinite alternate`.

### Primary Button
```
Background:     --color-accent
Text:           #FFFFFF, --text-base, weight 600
Border-radius:  0.75rem (12px)
Padding:        0.875rem 1.5rem
Min-height:     3rem (48px)
```
- **Hover:** `--color-accent-hover`, no shadow
- **Active:** `transform: scale(0.97) translateY(1px)`, `transition: 60ms ease` — tactile push
- **Disabled:** `opacity: 0.35`, `cursor: not-allowed`
- **Loading:** same dimensions, content replaced by shimmer skeleton. No spinner.
- No outer glow. No `box-shadow` with color. Ever.

### Ghost / Secondary Button
```
Background:     transparent
Border:         1px solid --color-border
Text:           --color-text-primary
Border-radius:  0.75rem
```
Same press physics. Hover shifts border to `--color-accent-ring`.

### Form Inputs
```
Background:     --color-surface-raised
Border:         1px solid --color-border
Border-radius:  0.625rem (10px)
Padding:        0.75rem 1rem
Text:           --color-text-primary, --text-base
```
- Label above, `--text-sm`, weight 500, `--color-text-secondary`, `margin-bottom: 0.375rem`
- Focus ring: `outline: 2px solid --color-accent`, `outline-offset: 2px`
- Error: border `#EF4444`, error text below in `#EF4444`, `--text-xs`
- Card number field: `--font-mono`, auto-space every 4 digits visually — value never transmitted to server

### Cart Totals Panel
```
Surface:        --color-surface
Border-top:     1px solid --color-border
Padding:        1.25rem 1rem
```
Row layout: label left (`--color-text-secondary`, `--text-sm`), amount right (`--font-mono`, `--text-sm`, `--color-text-primary`). Total row: both weight 700, `--text-base`. Separated by a 1px `--color-border` above. FX disclaimer: `--text-xs`, `--color-text-muted`, centered, `margin-top: 0.5rem`.

### Realtime Tracking Map Overlay
Mapbox fills ~55% of screen height (top). Status timeline panel slides up from below.

```
Map container:  border-radius: 0 0 1.5rem 1.5rem (softens bottom into panel)
ETA Pill:       absolute top-3, centered
  Background:   --color-surface-overlay, backdrop-filter: blur(8px)
  Border:       1px solid --color-border
  Border-radius:9999px
  Text:         --text-sm, weight 600, --color-text-primary
Rider Dot:      14px circle, --color-rider-dot fill, 3px white ring
  Pulse ring:   --color-accent 30%, scale 1→2.2, opacity 1→0, 2s ease-out infinite
```

Mapbox style: always `mapbox://styles/mapbox/dark-v11`. Never the light style.

### Status Timeline (below map)
Vertical list, left-aligned dots with connector line.

```
Leading dot:
  Active/current: --color-accent, pulse animation
  Completed:      #22C55E (success green)
  Pending:        --color-neutral-badge
Connector:      1px, --color-border-subtle, left-aligned
```
Status label: `--text-sm`, weight 600. Active: `--color-text-primary`. Pending: `--color-text-muted`.
Timestamp: `--text-xs`, `--font-mono`, `--color-text-muted`.
Message: `--text-sm`, `--color-text-secondary`.
New entry animation: `translateY(8px) + opacity(0) → translateY(0) + opacity(1)`, `300ms spring`.

### Bottom Navigation
```
Surface:        --color-surface
Border-top:     1px solid --color-border
Height:         4rem (64px) + env(safe-area-inset-bottom)
Padding-bottom: env(safe-area-inset-bottom)
```
5 tabs: Inicio, Categorías, Carrito, Pedidos, Perfil.
Icon: 24px Lucide. Label: `--text-xs`, weight 500.
- **Inactive:** icon + label `--color-text-muted`
- **Active:** icon + label `--color-accent`. Icon gets `--color-accent-subtle` pill behind it (36×28px, `border-radius: 0.5rem`)
- **Cart badge:** `--color-accent` fill, white text, `--text-xs`, absolute top-right of icon. Mounts with `scale(0→1)` spring on first item.
- Tab press: icon `scale(1→0.88→1)`, fast spring.

### Skeleton Loaders
Base: `--color-surface-raised`. Shimmer wave: `background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)`, `1.5s linear infinite`. Skeleton dimensions must exactly match real component geometry — no generic rectangle blocks.

---

## 5. Layout Principles

- **Mobile-first.** Single column below 768px. Design for 375px (iPhone SE) as minimum viewport.
- **Max-width:** `480px` for main app shell (mobile PWA). Content centered, `padding: 0 1rem`.
- **Product grid:** `grid-cols-2`, gap `0.75rem`. 3 columns only at `lg+` breakpoints.
- **Section headers:** `justify-between` row — title left, "Ver todo" link right. Never centered.
- **Category chips:** horizontal scroll row, `overflow-x: auto`, `scrollbar-width: none`. No equal-width grid of chips.
- **Spacing rhythm:** base unit `0.25rem` (4px). Section vertical separation `1.5rem`. Card grid gap `0.75rem`. Page horizontal padding `1rem`.
- **Safe areas:** fixed bottom elements use `padding-bottom: env(safe-area-inset-bottom)`. Use `min-h-[100dvh]` — never `h-screen` (iOS Safari viewport jump).
- **No overlapping elements.** Every element occupies its own clean spatial zone.
- **No absolute-positioned text over images.** Merchant badge is on the card container, not floating over the image center.

---

## 6. Motion & Interaction

### Spring Physics Defaults
```js
// For all interactive springs
spring:      { type: "spring", stiffness: 100, damping: 20 }
// For immediate-feedback UI (button press, badge pop)
fastSpring:  { type: "spring", stiffness: 300, damping: 25 }
```

### Page Transitions
`opacity: 0→1` + `translateY: 8px→0`, `200ms`, `cubic-bezier(0.16, 1, 0.3, 1)`. Vertical fade-up only. No slide-left/right.

### Cart Interactions
- Add to cart: card `scale(1→0.95→1)`, fast spring. Badge count `scale(1.3→1)`.
- Remove item: height collapses `current→0`, `opacity: 1→0`, `200ms` — no layout jump.
- Qty change: number flips `rotateX(90deg→0)`, `100ms ease`.

### Rider Marker (Mapbox)
Position interpolated with `lerp(current, target, 0.1)` on `requestAnimationFrame`. 60fps smooth movement. Heading rotation: `transform: rotate(${heading}deg)`, spring-damped. Never teleports.

### Staggered Grid Reveals
Each card: `opacity: 0→1` + `translateY: 12px→0`. Delay: `index × 40ms`. Cap at 8 items (320ms max) — items beyond 8 mount instantly.

### Perpetual Micro-Interactions
- Active status badge `●` dot: `opacity 0.4→1`, `1.6s ease-in-out infinite alternate`
- Rider dot pulse ring: `scale 1→2.2`, `opacity 1→0`, `2s ease-out infinite`
- Skeleton shimmer: left-to-right wave, `1.5s linear infinite`

### Payment Success Sequence
1. SVG checkmark `stroke-dashoffset` draws in, `400ms ease-out`
2. Green ring `scale(0.6→1)`, `400ms spring`
3. "Pago aprobado" text fades up, `200ms delay`
4. CTA button springs up from below, `300ms delay`, spring physics

No confetti. No particles. Restrained, premium satisfaction.

### Performance Rules
- Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- `will-change: transform` only on actively animating elements — remove after animation ends.
- Heavy animation components (`RiderMap`, `StatusTimeline`) are isolated `'use client'` components to avoid RSC re-renders.
- `prefers-reduced-motion`: all spring animations collapse to instant opacity crossfades.

---

## 7. Anti-Patterns (Banned)

- No emojis anywhere in the UI
- No `Inter` font — Geist only
- No pure black `#000000` — minimum `#09090B` (Zinc-950)
- No neon glow `box-shadow` — shadows are depth (dark, tinted), never color halos
- No purple accent — `--color-accent` is Electric Blue and only Electric Blue
- No gradient text on headlines
- No oversaturated colors — accent saturation is calibrated (~72%), not maxed
- No custom mouse cursors
- No overlapping elements — clean spatial zones always
- No 3-column equal-width card grids — 2-column product grid on mobile
- No centered section headers — always `justify-between` or left-aligned
- No AI copywriting — no "Experiencia Perfecta", "Empodera tu compra", "Sin Interrupciones", "Next-Gen"
- No filler UI text — no "Desliza para explorar", no bouncing scroll arrows
- No fabricated metrics — no invented delivery times, fake ratings counts, or made-up statistics
- No generic placeholder names in seed data — use real Honduran product names and real category names
- No `h-screen` — always `min-h-[100dvh]`
- No horizontal scroll on mobile — test with browser overflow detection
- No circular spinners — skeletal loaders match real component shape exactly
- No Mapbox light map style — always `dark-v11`
- No text overlapping product images — merchant badge is on the card frame, not the image
- No stock shadcn component appearance — all primitives are restyled to CLICK identity before use
