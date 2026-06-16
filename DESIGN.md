---
name: miiyuh.com
description: Personal portfolio — photography, artwork, projects, blog
colors:
  pitch-black: '#070707'
  warm-ivory: '#faf3e0'
  ivory-muted: 'rgba(250, 243, 224, 0.7)'
  ivory-faded: 'rgba(250, 243, 224, 0.5)'
  ghost-border: 'rgba(255, 255, 255, 0.1)'
  terminal-green: '#4ade80'
  terminal-green-light: '#86efac'
  surface-glass: 'rgba(255, 255, 255, 0.04)'
  surface-glass-hover: 'rgba(255, 255, 255, 0.08)'
typography:
  display:
    fontFamily: '"Instrument Serif", Georgia, serif'
    fontSize: 'clamp(1.875rem, 4vw, 3rem)'
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  heading:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: 'InterVariable, Inter, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    letterSpacing: '0.05em'
  serif-body:
    fontFamily: '"Noto Serif", "Noto Serif JP", Georgia, serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.75
rounded:
  sm: '0.5rem'
  md: '0.75rem'
  lg: '1rem'
  xl: '1.5rem'
  full: '9999px'
spacing:
  section: '4rem'
  card-padding: '1.5rem'
  container: 'clamp(1rem, 5vw, 5rem)'
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

A personal portfolio that feels like a developer's darkroom — controlled, precise, and process-oriented. Every element is deliberate; nothing is decorative. Deep black backgrounds let content (photography, artwork, projects) take center stage, while a restrained green accent — borrowed from terminal UIs and code editors — adds life without shouting. The aesthetic is inspired by tools like Zed: minimal, sharp, data-driven, and built with care.

This system explicitly rejects corporate gloss, AI-generated templates, and anything that feels templated. Every component should feel hand-crafted and intentional.

### Key Characteristics:
- **Dark by conviction** — the black background is a conscious choice, not a default. It makes photographic and artistic content pop.
- **Sharp edges, soft depth** — components have defined borders and subtle glass surfaces, but the overall silhouette is crisp and deliberate.
- **Typographic hierarchy** — Instrument Serif for display/headings (warmth, personality), Inter for UI/body (clarity, speed), Noto Serif for long-form reading (comfort).
- **Restrained accent** — a single green accent is used sparingly (≤10% of any screen) to guide attention, never to decorate.
- **Motion with purpose** — entrances and transitions exist to orient, not to dazzle. Prefers-reduced-motion is always respected.

## 2. Colors

A restrained, high-contrast palette built for reading and showcasing visual work.

### Primary
- **Terminal Green** (`#4ade80`): The single accent color. Used for interactive highlights, active states, and emphasis. Never decorative. Its rarity is the point.

### Neutral
- **Pitch Black** (`#070707`): The canvas. Primary background for all surfaces. Near-true black for maximum contrast with content.
- **Warm Ivory** (`#faf3e0`): Primary text. A slight warmth (vs. pure white) to reduce eye strain on dark backgrounds.
- **Ivory Muted** (rgba 250, 243, 224 / 0.7): Secondary text for descriptions, metadata, subtitles.
- **Ivory Faded** (rgba 250, 243, 224 / 0.5): Tertiary text for placeholders, disabled states, tags.

### Surface & Border
- **Ghost Border** (rgba 255, 255, 255 / 0.1): Default container border. Subtle, present but not visible at a glance.
- **Surface Glass** (rgba 255, 255, 255 / 0.04): Base glass surface for cards, panels.
- **Surface Glass Hover** (rgba 255, 255, 255 / 0.08): Elevated glass surface on hover/focus.

### Named Rules
**The One Voice Rule.** Terminal Green appears on ≤10% of any given screen. It is a pointer, not a palette.
**The No-Gradient Rule.** Text gradients (`background-clip: text`) are forbidden. Emphasis comes from weight and size, not color effects.

## 3. Typography

**Display Font:** Instrument Serif (Georgia, serif fallback)
**Body Font:** InterVariable / Inter (system-ui, sans-serif fallback)
**Serif Body:** Noto Serif + Noto Serif JP (for long-form blog content)
**Mono Font:** Noto Sans Mono

**Character:** A sharp sans-serif / warm serif pairing. Inter brings clarity and speed — it's the UI workhorse. Instrument Serif adds personality and warmth for display moments. Noto Serif takes over for long-form reading where comfort matters.

### Hierarchy
- **Display** (400, clamp 1.875rem–3rem, 1.1, -0.02em): Section headings, hero text. Instrument Serif for character. Font-serif class.
- **Heading** (600, clamp 1.25rem–1.875rem, 1.3): Subsection titles, card titles. Inter, semibold.
- **Title** (500, 1.125rem, 1.4): Entry titles, timeline items. Inter, medium weight.
- **Body** (400, 1rem, 1.75): Descriptions, bios, metadata. Max line length 65–75ch.
- **Label** (500, 0.75rem, 0.05em): Tags, badges, small metadata. Uppercase optional.
- **Serif Body** (400, 1rem, 1.75): Blog post content, long-form reading. Noto Serif for comfortable extended reading.

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
- **Desktop:** Instrument Serif at 1.25rem. Links underline on hover. Haptic feedback.
- **Mobile:** Full-screen overlay, centered, 3rem font size. Links transition to Terminal Green on hover.

### Inputs / Fields
- **Style:** Clean, no box-shadow glow on focus. Default browser border replaced with custom styling. Focus-visible ring uses the text color for consistency.

### Selection
- **Background (#123524):** A dark forest-green, harmonizing with the green accent. Selected text is readable against the dark bg.

## 6. Do's and Don'ts

### Do:
- **Do** use Instrument Serif for display moments — it's where the site gets its personality.
- **Do** let content breathe — generous spacing between sections, tight spacing inside components.
- **Do** use the green accent sparingly — a single interactive element per viewport at most.
- **Do** respect `prefers-reduced-motion` — crossfade or instant transitions only.
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
