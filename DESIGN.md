---
name: miiyuh.com
description: Personal portfolio — photography, artwork, projects, blog
colors:
  pitch-black: '#070707'
  surface: 'rgba(12, 12, 14, 1)'
  warm-ivory: '#faf3e0'
  ivory-muted: 'rgba(250, 243, 224, 0.7)'
  ivory-faded: 'rgba(250, 243, 224, 0.5)'
  ghost-border: 'rgba(255, 255, 255, 0.08)'
  forest-green: '#035940'
  mint: '#86efac'
  selection: '#123524'
typography:
  display:
    fontFamily: '"Stack Sans Notch", sans-serif'
    fontSize: '3rem to 3.75rem (text-5xl / md:text-6xl page titles)'
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.025em'
  heading:
    fontFamily: '"Stack Sans Headline", sans-serif'
    fontSize: '1.5rem to 1.875rem'
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: '"Stack Sans Text", system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 450
    lineHeight: 1.75
  long-form:
    fontFamily: '"Paper Mono", ui-monospace, monospace'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.75
  mono:
    fontFamily: '"Noto Sans Mono", monospace'
    fontSize: '0.875rem'
    fontWeight: 400
rounded:
  sm: '0.5rem'
  md: '0.75rem'
  lg: '1rem'
  xl: '1.5rem'
  full: '9999px'
spacing:
  section: '4rem'
  card-padding: '1.5rem'
  container: 'px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80'
  reading-column: 'max-w-4xl (blog posts keep a fixed width for readability)'
motion:
  page-entrance: '200ms fade + 6px rise, ease-out-quart, no delay'
  list-stagger: '25ms per item, capped at 9 items'
components:
  button-default:
    backgroundColor: '#ffffff'
    textColor: '#000000'
    rounded: '{rounded.md}'
    padding: '0.5rem 1rem'
    border: '1px solid rgba(255, 255, 255, 0.5)'
  button-outline:
    backgroundColor: 'transparent'
    textColor: '#ffffff'
    rounded: '{rounded.md}'
    padding: '0.5rem 1rem'
    border: '1px solid rgba(255, 255, 255, 0.5)'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '#ffffff'
    rounded: '{rounded.md}'
    padding: '0.5rem 1rem'
    border: '1px solid transparent'
  card:
    backgroundColor: 'rgba(255, 255, 255, 0.04)'
    rounded: '{rounded.xl}'
    padding: '{spacing.card-padding}'
    border: '1px solid rgba(255, 255, 255, 0.1)'
  nav-link:
    typography: '{typography.display}'
    textColor: '{colors.warm-ivory}'
---

# Design System: miiyuh.com

## 1. Overview

**Creative North Star: "The Darkroom"**

A personal portfolio that feels like a developer's darkroom — controlled, precise, and process-oriented. Every element is deliberate; nothing is decorative. Deep black backgrounds let content (photography, artwork, projects) take center stage, while a restrained green accent adds life without shouting. The darkroom carries into the copy: empty and error states speak in it ("nothing developed yet", "the film got exposed"). The aesthetic is inspired by tools like Zed: minimal, sharp, data-driven, and built with care.

This system explicitly rejects corporate gloss, AI-generated templates, and anything that feels templated. Every component should feel hand-crafted and intentional.

### Key Characteristics:
- **Dark by conviction** — the black background is a conscious choice, not a default. It makes photographic and artistic content pop.
- **Sharp edges, soft depth** — components have defined borders and subtle glass surfaces, but the overall silhouette is crisp and deliberate.
- **Typographic hierarchy** — one family, three cuts: Stack Sans Notch for display and navigation (personality), Stack Sans Headline for headings, Stack Sans Text for UI and body. Paper Mono takes over for long-form reading (blog posts, legal pages).
- **Restrained accent** — a single green accent is used sparingly (≤10% of any screen) to guide attention, never to decorate.
- **Motion with purpose** — entrances and transitions exist to orient, not to dazzle. Prefers-reduced-motion is always respected.

## 2. Colors

A restrained, high-contrast palette built for reading and showcasing visual work.

### Primary
- **Forest Green** (`#035940`, `--accent-primary`): The accent as a *background* — the marker-style `.text-highlight` behind hovered titles, selected-chip fills (at 20%). Too dark to use as text on black (about 2.4:1).
- **Mint** (`#86efac`, `--accent-hover`): The accent as *text or icon* — selected chips, current page, hover arrows. Passes AA on the black canvas.

### Neutral
- **Pitch Black** (`#070707`): The canvas. Primary background for all surfaces. Near-true black for maximum contrast with content.
- **Warm Ivory** (`#faf3e0`): Primary text. A slight warmth (vs. pure white) to reduce eye strain on dark backgrounds.
- **Ivory Muted** (rgba 250, 243, 224 / 0.7): Secondary text for descriptions, metadata, subtitles.
- **Ivory Faded** (rgba 250, 243, 224 / 0.5): Tertiary text for placeholders, disabled states, tags.

### Surface & Border
- **Surface** (`#0c0c0e`, `--surface-primary`): Popovers, menus, toasts, sheets.
- **Ghost Border** (`white/8`): Default container border. Strengthens to `white/12` to `white/15` on hover.
- **Glass fills** (`white/2` at rest, `white/5` on hover): Cards and entry rows.

All colours come from the tokens in `globals.css` (`text-text-primary`, `bg-bg-primary`, `bg-surface-primary`, ...); hex values in class names are not used.

### Named Rules
**The One Voice Rule.** The green accent appears on ≤10% of any given screen. It is a pointer, not a palette.
**The Two Greens Rule.** Forest green fills, mint speaks. Never set text or icons in `#035940`.
**The No-Gradient Rule.** Text gradients (`background-clip: text`) are forbidden. Emphasis comes from weight and size, not color effects.

## 3. Typography

**Display / Nav:** Stack Sans Notch (`font-notch`)
**Headings:** Stack Sans Headline (default for `h1`–`h6`, also `font-serif`)
**UI / Body:** Stack Sans Text, weight 450
**Long-form body:** Paper Mono (`.lexical-content`, `font-paper-mono`) — blog posts, post excerpts, privacy policy, terms. Headings inside long-form content stay in Stack Sans Headline.
**Mono:** Noto Sans Mono (`font-mono`) for small metadata such as course codes
**Emoji:** Noto Color Emoji as a fallback only, loaded on demand (not preloaded)

**Character:** A single variable family keeps the UI coherent; the Notch cut gives display moments their personality. Paper Mono makes long-form reading feel like a typed draft — deliberate and slow, in contrast to the quick UI around it.

### Hierarchy
- **Display** (Notch 400, text-5xl to md:text-6xl, tight tracking): Page titles (blog, gallery, projects, album names).
- **Heading** (Headline 400, text-2xl to 3xl): Section headings (Experience, Education, ...), card titles.
- **Title** (Headline, text-lg to 2xl): Entry and list-item titles.
- **Body** (Text 450, 1rem, 1.75): Descriptions, bios, metadata. Max line length 65–75ch (`max-w-prose`).
- **Label** (Text, 0.75rem, wide tracking): Tags, chips, small metadata.
- **Long-form** (Paper Mono 400, 1rem, 1.75): Post and legal-page body. Paper Mono has no italic; italics are synthesised.

## 4. Elevation

Flat by default, with depth as a response to interaction. The system uses a hybrid approach: tonal layering (glass surfaces: `bg-white/4`, `bg-white/8`) signals hierarchy at rest; shadows appear only on hover or focus to indicate interactivity.

### Hover Vocabulary
- **Card Hover** (`box-shadow: 0 4px 16px rgba(0,0,0,0.45)`): Applied to interactive containers on hover.
- **Card Rest** (`box-shadow: 0 2px 8px rgba(0,0,0,0.3)`): Default subtle depth for interactive cards.
- **Panel Shadow** (`box-shadow: 0 25px 60px -35px rgba(0,0,0,0.8)`): Deep ambient shadow for prominent UI panels (global Card component).

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus). No decorative shadows on static elements.

## 5. Components

### Buttons
- **Shape:** Gently rounded corners (rounded-lg, 0.75rem), with a subtle inner border-radius offset via pseudo-element.
- **Default:** White background, black text, white/80 border. High contrast, confident.
- **Outline:** Transparent background, white text, white/50 border. For secondary actions.
- **Ghost:** Transparent, no visible border, white text. For tertiary/inline actions.
- **Hover / Focus:** Background lightens, border strengthens. Haptic feedback on supported devices. Focus-visible ring offset for keyboard navigation.
- **Sizes:** xs (1.5rem), sm (1.75rem), default (2rem), lg (2.25rem), xl (2.5rem), plus icon-only variants.

### Cards / Containers
- **Corner Style:** Extra-rounded (rounded-2xl, 1.5rem).
- **Background:** Glass surface (`bg-white/4`) with `backdrop-blur-xl` when appropriate.
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`, with an inner highlight pseudo-element (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`).
- **Shadow Strategy:** Deep ambient shadow at rest (`0 25px 60px -35px rgba(0,0,0,0.8)`). No hover shadow — cards that don't interact stay flat.
- **Internal Padding:** 1.5rem (p-6).

### Entry Cards (Interactive)
- **Corner Style:** Rounded (rounded-xl, 0.75rem).
- **Background:** Subtle glass (`bg-white/2`).
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`.
- **Shadow at Rest:** `0 2px 8px rgba(0,0,0,0.3)`.
- **Hover State:** Background lifts (`bg-white/5`), border strengthens (`rgba(255,255,255,0.12)`), shadow deepens (`0 4px 16px rgba(0,0,0,0.45)`). All transitions at 300ms.

### Tags / Chips
- **Style:** Fully rounded (rounded-full), low-opacity background (`bg-white/4`), faded text (`text-muted/50`), tiny (11px).
- **Use:** Metadata labels only. Never for primary navigation or CTAs.

### Navigation
- **Desktop:** Stack Sans Notch at 1.25rem. Links underline on hover. Haptic feedback.
- **Mobile:** Full-screen overlay, centered, 3rem Stack Sans Notch, focus-trapped.
- **Locale:** English at unprefixed URLs, Malay under `/ms`. The footer EN/MS toggle switches to the same page in the other language.

### Inputs / Fields
- **Style:** Clean, no box-shadow glow on focus. Default browser border replaced with custom styling. Focus-visible ring uses the text color for consistency.

### Selection
- **Background (#123524):** A dark forest-green, harmonizing with the green accent. Selected text is readable against the dark bg.

### Motion
- **Page entrance:** `animate-page-in` — 200ms opacity + 6px rise, `--ease-out-quart`, starts immediately. Pages should feel instant; motion only softens the swap.
- **Lists:** `animate-stagger-item` with `--i` (25ms steps, cap 9).
- **Hover:** colour/background/border transitions (150–300ms). Use `transition` or `transition-colors`, never `transition-all`.
- **Component enter/exit:** `tw-animate-css` (`animate-in`, `fade-in-0`, `zoom-in-95`, ...).
- **Reduced motion:** fades remain; translation, scale, rotation and shimmer are removed.

### Error states
- 404 and error pages share `ErrorScreen`: oversized faint code numeral, Notch heading in the darkroom voice, primary + secondary button, section links. Bilingual.

## 6. Do's and Don'ts

### Do:
- **Do** use Stack Sans Notch for display moments — it's where the site gets its personality.
- **Do** let content breathe — generous spacing between sections, tight spacing inside components.
- **Do** use the green accent sparingly — a single interactive element per viewport at most.
- **Do** respect `prefers-reduced-motion` — fades only, no movement.
- **Do** use the shared container padding (`px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80`) for every page, header and footer; only the blog post keeps its fixed reading width.
- **Do** test heading copy at every breakpoint; if it overflows, reduce the font-size clamp.

### Don't:
- **Don't** use gradient text (`background-clip: text`). Ever.
- **Don't** add decorative glassmorphism. Blur and glass surfaces are functional (readability over busy backgrounds), not aesthetic.
- **Don't** use corporate stock-photo vibes or generic SaaS patterns. This is a personal portfolio — it should feel human.
- **Don't** create side-stripe borders (border-left/right as colored accents on cards).
- **Don't** use identical-card grids with icon + heading + text repeated endlessly. Vary the layout.
- **Don't** add tiny uppercase tracked eyebrow text above every section ("ABOUT", "PROCESS", "GALLERY"). One deliberate kicker is voice; every section is AI grammar.
- **Don't** number section markers as default scaffolding (01 / 02 / 03) unless the content is an actual ordered sequence.
- **Don't** use AI-generated imagery or template-driven layouts. Every component should feel hand-crafted.
