# Copilot Instructions for miiyuh.com

This repository is a **Next.js 16** personal portfolio focused on photography, artwork, and interactive animations. It uses **TypeScript**, **Tailwind CSS v4**, and the **App Router**.

## Project Structure
- `src/app/(my-app)/` – All route folders (blog, projects, socials, etc.)
- `src/components/` – UI components, split into sub‑folders:
  - `layout/` – Header, Footer, RootLayout
  - `ui/` – Reusable UI primitives (Button, Card, Combobox, etc.)
  - `effects/` – Animation and visual effects (ScrollAnimation, InteractiveDotsBackground, EncryptedText)
  - `debug/` – Development helpers
- `src/constants/` – Centralised navigation links, social platform list, theme colors
- `public/` – Static assets (images, sounds, PDFs)
- `.github/` – CI/CD and Copilot configuration

## Core Design System
- **Theme**: Dark aesthetic with `#070707` primary background and subtle glass‑morphism panels.
- **Typography**: Inter (primary), Instrument Serif, and Noto families loaded via Next.js Google Fonts with `display: 'swap'`. Emoji fallback hierarchy: Apple → Noto → Segoe UI.
- **Colors**: Defined in `src/styles/theme.css` using HSL variables for easy theming.
- **Spacing**: Tailwind spacing scale, with custom utilities for glass panels (`glass-panel-pro`).

## Development Workflow
```bash
# Install dependencies
bun install

# Development server (Turbopack - Next.js 16 default)
bun run dev
[Note: Do not run unless told to do so.]

# Production build (webpack - due to Payload CMS compatibility)
bun run build
[Note: Do not run unless told to do so.]

# Lint and auto‑fix
bun run lint:fix

# TypeScript check
bun run type-check

# Clean build artifacts
bun run clean
```

### `package.json` scripts (relevant excerpt)
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  "clean": "bun run --bun ./node_modules/.bin/rimraf .next"
}
```
> **Note**: Using `bun` as the package manager provides faster installations and native TypeScript support.

## Key Architectural Patterns
1. **Client‑First Interactivity** – All interactive components start with `'use client'`.
2. **Sound Integration** – `useSound` hook wraps Howler.js with iOS gesture handling.
3. **Gallery System** – LightGallery initialized via `src/utils/gallery-loader.ts` using data from `public/gallery.json`.
4. **Hash Navigation** – `HeadingWithHash` provides GitHub‑style anchors with copy‑to‑clipboard.

## Component Conventions
```tsx
// Example pattern for interactive components
'use client'
import { useState, useEffect } from 'react'
import useSound from '@/hooks/useSound'

export default function ComponentName() {
  const playClick = useSound('/sounds/click.mp3', 0.7)
  const [state, setState] = useState(initialValue)

  // ...component logic
}
```
- Export components from `src/components/index.ts` for clean imports.
- Prefer Tailwind utility classes over custom CSS; only add bespoke styles when necessary.
- When refining or changing layout components, do not alter the existing configuration for the breadcrumb navigation, the heading that follows it, or the descriptive text underneath them—they should stay as-is unless explicitly requested.
- **Layout & Skeleton Sync**: When making layout changes to any page, always ensure the corresponding skeleton loading component (e.g., `loading.tsx` or `*-skeleton.tsx`) is updated to match the new layout structure, spacing, and padding. This prevents visual layout shifts and ensures consistency between loading and loaded states.

## Responsive Spacing Scale
- **Horizontal margins/padding standard**: `px-16 md:px-32 lg:px-56 xl:px-80` for all main content containers (header, footer, pages).
- **Top padding on sections**: `pt-24` for consistency across loaded and loading states.
- **Gallery pages**: `pt-24 pb-24` to match other page sections.
- New pages should default to this scale unless explicitly styled otherwise.

## Server vs. Client Component Placement
- **Server components** in `src/app/(my-app)/[route]/page.tsx`: Handle all data fetching from Payload CMS (posts, projects, gallery), revalidation strategy (ISR windows), and `generateMetadata`.
- **Client components** (e.g., `[route]-client.tsx`): Handle interactivity, state management, event listeners, and hooks like `useSound`.
- Pattern: Server page queries data and passes props to a client wrapper; avoid data fetching in client components.

## Query Optimization & Caching Patterns
- **Blog posts**: Use `revalidatePath` with ISR window (currently 300s); parallelize post fetch + tag options with `Promise.all`.
- **Sorting & filtering**: Always add MongoDB indexes for fields used in queries (published date, tags, slug) to avoid full table scans.
- **Related data**: Fetch media and relations efficiently; avoid N+1 queries by using Payload's built-in field relations.
- Cache static tag options separately from dynamic post lists to reduce redundant queries.

## Database Indexing Strategy
- **BlogPosts collection**: Index on `published` (sort) and `tags` fields (filter).
- **Projects collection**: Index on `published` and any primary filter fields.
- **GalleryCollections**: Index on slug and published fields for fast album lookups.
- Pattern: Define indexes in collection configs (`src/collections/[CollectionName].ts`) using Payload's `indexes` array to ensure MongoDB uses optimal query plans.

## Payload CMS Field Conventions
- **Slug fields**: Used for URL routes; ensure unique and auto-generated from title.
- **Published field**: Boolean or date; use for visibility control and sorted queries.
- **Status or visibility**: Document which field controls draft vs. published (e.g., `published: true/false`).
- **Relations**: Use Payload's relation fields for media, tags, and categories; avoid manual ref strings.
- **Rich text**: Use `lexical` editor; render via `src/utils/lexical-renderer.tsx`.
- **Ordering**: Explicit `position` or `order` field when manual ordering is needed.

## Animation System
- **ScrollAnimation** – IntersectionObserver wrapper for reveal animations.
- **EncryptedText** – Typing‑like decryption effect (no unused state variables).

## SEO & Meta
- OpenGraph and Twitter cards are defined in `src/app/layout.tsx`.
- Each page exports a `generateMetadata` function for dynamic titles/descriptions.
- Sitemap and `robots.txt` are generated via `next-sitemap`.

## Testing & Debugging
- Font debugging route at `/font-debug`.
- Performance utilities in `src/utils/performance.ts`.
- Global error boundaries in `src/components/debug/ErrorBoundary.tsx`.

## CI / GitHub Actions
- Lint, type‑check, and build run on each PR.
- Deploy to Vercel on merge to `main`.

## Emoji Usage Policy
- **NEVER** use emojis in comments, commit messages, code, documentation, or responses unless the user explicitly instructs you to do so.
- Emojis are only allowed when explicitly requested.

---
*This file is kept up‑to‑date to guide Copilot and contributors on the project's conventions and tooling.*