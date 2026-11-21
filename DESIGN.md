# Dioba design system

Dioba turns revenue into clear statements for indie game teams. The site should feel **calm, exact and trustworthy**, like a well-made ledger, with one moment of character: the **split bar** (dioba = division).

Built from the existing brand (colors and fonts already on dioba.app). Not compared against real sites (UXKIN not connected).

All values live in `assets/tokens.css`. Pages use the variable names, never raw values.

## Color

| Token | Value | Role |
|---|---|---|
| `--paper` | `#EDF0F4` | Page background |
| `--surface` | `#FFFFFF` | Cards, inputs, statements |
| `--ink` | `#1A2740` | Body text, headings, dark sections |
| `--ink-soft` | `#4A5670` | Secondary text, hints (7:1 on paper) |
| `--line` | `#C9D1DD` | Borders of cards and inputs |
| `--rule` | `#E3E8EF` | Table and statement row dividers |
| `--primary` | `#22797A` | Main buttons, links, "payable" figures (white text on it: 5.1:1) |
| `--primary-hover` | `#1A6364` | Hover and pressed state of primary |
| `--accent` | `#D99A2B` | Only the founding/beta call to action on dark, and the focus ring on dark blocks. Text on it is ink |
| `--error` | `#A3392B` | Errors and warnings (e.g. shares over 100%) |
| `--seg-1..4` | `#6E3D7C`, `#22797A`, `#D99A2B`, `#5F6C85` | Split-bar segments and chart series only. White text passes 4.5:1 on 1, 2 and 4; use ink on 3 |
| `--recoup` | `#AEB8C8` | "Paying back the advance" in charts. Light, so it differs from primary by lightness, not only hue |

Rules: one primary color for actions. The accent appears at most once per screen. No gradients. Light mode only for now.

## Typography

- **Bricolage Grotesque** (600, 800): headings, the wordmark, large figures.
- **Atkinson Hyperlegible** (400, 700): body, UI, tables. Built for legibility, numbers use tabular figures.

| Token | Size / line height | Use |
|---|---|---|
| `--t-hero` | clamp(2.6rem, 6vw, 4.5rem) / 1.02 | Hero headline only |
| `--t-h1` | 2.25rem / 1.1 | Page titles (app, legal pages) |
| `--t-h2` | clamp(1.75rem, 3.2vw, 2.4rem) / 1.12 | Section headings |
| `--t-h3` | 1.25rem / 1.25 | Card and step headings |
| `--t-lead` | 1.2rem / 1.55 | Intro paragraphs |
| `--t-body` | 1.0625rem (17px) / 1.6 | Body text |
| `--t-small` | 0.9rem / 1.5 | Hints, captions, footer |
| `--t-micro` | 0.8rem / 1.45 | Fine print on statements |

Lines stay under 70 characters (`--measure: 36rem`). Sentence case everywhere; no all-caps labels.

## Spacing

8-point scale: `--s-1` 4px, `--s-2` 8px, `--s-3` 12px, `--s-4` 16px, `--s-5` 24px, `--s-6` 32px, `--s-7` 48px, `--s-8` 64px, `--s-9` 96px.

- Section padding: `--s-9` desktop, `--s-7` mobile.
- Content width: `--width` 68rem; app width 74rem.
- Card padding: `--s-5`.

## Shape and depth

- Radius: `--r-sm` 6px (inputs), `--r-md` 10px (buttons), `--r-lg` 14px (cards), `--r-xl` 20px (feature blocks, split bar).
- No shadows. Depth comes from the surface/paper contrast and 1px borders.

## Components

- **Buttons**: primary (primary fill, white text), secondary (ink 2px outline, transparent), quiet (text with underline). Hover darkens or fills white; focus shows a 3px ink ring (accent on dark blocks, which passes 3:1 on both); disabled at 45% opacity. Labels say exactly what happens ("Open the calculator", "Reserve a founding spot"), no arrows.
- **Links**: ink with a 2px underline offset 4px; primary color on hover.
- **Inputs**: surface fill, 1px line border, `--r-sm`, 44px tall minimum for touch.
- **Cards**: surface, 1px line border, `--r-lg`, `--s-5` padding. Only used for real objects (a statement, a form), never for decoration.
- **Split bar**: the signature. Segments sized by share, `--r-xl` ends, opens with an 8px gap once on page load (respects reduced motion).
- **Statement**: label left, figure right, rule between rows; the payable row in primary, bold.
- **Navigation**: wordmark left; Calculator link and one secondary button right.
- **Footer**: links to Calculator, Privacy, Terms, Contact; the Valve disclaimer and the not-advice line.

## Imagery and icons

No stock photos, no illustrations of people. The product itself is the imagery: the split bar and real statement UI with example numbers. Icons only when they carry meaning, drawn inline as simple 1.5px-stroke SVG. No emoji.

## Logo

- `assets/logo.svg` (ink text) and `assets/logo-white.svg` (for dark backgrounds). The "d" and "a" are circles divided into three shares (saffron, teal, slate) with a plum stem: dioba means "dividing into shares".
- `assets/favicon.svg` is the icon: the divided "d" on an ink tile. `apple-touch-icon.png` is the same at 180px.
- Header height 34px (28px on phones). Never recolour, stretch or add effects. Keep clear space of at least half the logo's height around it.
