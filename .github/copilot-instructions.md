# Copilot Instructions for miiyuh.com

This repository is a **Next.js 16** personal portfolio powered by **Payload CMS 3**, **MongoDB**, and **Tailwind CSS v4**. It uses **TypeScript**, the **App Router**, and is managed with **Bun**.

## Project Structure
- `src/app/(my-app)/` – Public routes (blog, projects, gallery, surveys, about, legal)
- `src/app/(payload)/` – CMS admin, API, GraphQL
- `src/components/` – UI components:
  - `layout/` – Header, ClientHeader, Footer, PageLayout, AppProvider
  - `ui/` – ~60 reusable primitives (shadcn/ui style via @ark-ui/react)
  - `forms/` – FormRenderer, FormBlock (Payload form builder)
  - `gallery/` – OptimizedGalleryImage
  - `live-preview/` – Payload live preview helpers
  - `debug/` – Development helpers
- `src/collections/` – Payload CMS collections (Users, Media, BlogPosts, Projects, GalleryCollections, AboutPage, Papers)
- `src/globals/` – Global configs (PrivacyPolicy, TermsOfService)
- `src/blocks/` – Payload editor blocks (FormBlock)
- `src/editor/` – Rich text editor configs (lexical with multiple feature presets)
- `src/config/` – App config (breadcrumbs, dev-pages)
- `src/constants/` – Centralized navigation links, social platform list
- `src/types/` – TypeScript type definitions per domain
- `src/hooks/` – Custom hooks (use-intersection-observer, use-focus-trap)
- `src/utils/` – Utilities (lexical-renderer, media resolvers, slugify, extract-toc, forms)
- `src/lib/` – Shared library (cn via clsx + tailwind-merge)
- `src/access/` – Payload access control (is-admin)
- `src/payload-admin/` – Custom admin UI (Logo, BeforeLogin)
- `src/fonts/inter/` – Self-hosted InterVariable woff2 files

## Core Design System
- **Theme**: Dark aesthetic (`#070707` bg, `#FAF3E0` text), subtle glass‑morphism panels.
- **Typography**: InterVariable (self-hosted via woff2), Instrument Serif, Noto Serif/Serif JP, Noto Sans Mono, Noto Color Emoji — loaded via next/font/google (Inter uses local files).
- **Colors**: Defined as CSS custom properties in `src/app/(my-app)/globals.css` (not a separate theme.css).
- **Spacing**: Tailwind v4 spacing scale. Standard container padding: `px-8 md:px-32 lg:px-56 xl:px-80`.
- **Design details**: See `DESIGN.md` for color tokens, typography hierarchy, component specs, and do's/don'ts.

## Development Workflow
```bash
# Install dependencies
bun install

# Development server (Turbopack — Next.js 16 default)
bun run dev
[Note: Do not run unless told to do so.]

# Production build (webpack — due to Payload CMS compatibility)
bun run build
[Note: Do not run unless told to do so.]

# Lint (ESLint flat config)
bun run lint
bun run lint:fix

# TypeScript check
bun run type-check

# Clean build artifacts
bun run clean
```

### `package.json` scripts (relevant excerpt)
```json
"scripts": {
  "dev": "next dev --turbopack --hostname 0.0.0.0",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "type-check": "tsc --noEmit",
  "analyze": "ANALYZE=true bun run build",
  "clean": "bun run --bun ./node_modules/.bin/rimraf .next",
  "payload": "payload",
  "create:admin": "tsx scripts/create-admin.ts",
  "seed:gallery": "tsx scripts/seed-gallery.ts",
  "seed:projects": "tsx scripts/seed-projects.ts",
  "seed:about": "tsx scripts/seed-about.ts",
  "clear:gallery": "tsx scripts/clear-gallery.ts",
  "clean:projects": "tsx scripts/clean-projects.ts",
  "clean:project-papers": "tsx scripts/remove-project-papers.ts"
}
```

## Key Architectural Patterns
1. **Server/Client Split** – Server components (`page.tsx`) fetch from Payload CMS → pass props to client wrappers (`*-client.tsx`). Never fetch data in client components.
2. **Two Route Groups** – `(my-app)/` for the public site, `(payload)/` for admin/API/GraphQL.
3. **Route Slugs** – blog: `/blog/:year/:month/:slug`, projects: `/projects/:slug`, gallery: `/gallery/:slug`, surveys: `/surveys/:slug`.
4. **Component Exports** – Via `src/components/index.ts`; import from `@/components`.
5. **Hash Navigation** – `HeadingWithHash` for GitHub‑style anchor links with copy‑to‑clipboard.
6. **Live Preview** – Payload CMS live preview configured for blog posts, projects, gallery, surveys, and legal globals.
7. **Localization** – English (`en`) and Malay (`ms`) with fallback to default locale.
8. **Haptics** – `web-haptics/react` for haptic feedback on interactive elements.

## Component Conventions
```tsx
// Example pattern for interactive components
'use client'
import { useState, useEffect } from 'react'

export default function ComponentName() {
  const [state, setState] = useState(initialValue)
  // ...component logic
}
```
- Export components from `src/components/index.ts` for clean imports via `@/components`.
- Use `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge).
- Prefer Tailwind utility classes over custom CSS; add bespoke styles in `globals.css` when necessary.
- All interactive components need `'use client'`.
- **Layout & Skeleton Sync**: When making layout changes, always update the corresponding `loading.tsx` to match the new structure, spacing, and padding.

## Responsive Spacing Scale
- **Horizontal margins/padding**: `px-8 md:px-32 lg:px-56 xl:px-80` for all main content containers.
- **Top padding on sections**: `pt-24` for consistency across loaded and loading states.
- New pages should default to this scale unless explicitly styled otherwise.

## Server vs. Client Component Placement
- **Server components** (`page.tsx`): Handle all data fetching from Payload CMS, revalidation strategy (ISR windows), and `generateMetadata`.
- **Client components** (`*-client.tsx`): Handle interactivity, state management, event listeners, and hooks.
- Pattern: Server page queries data and passes props to a client wrapper.

## Payload CMS Conventions
- **Database**: MongoDB (Mongoose adapter). Requires `DATABASE_URI` env var.
- **Media storage**: Cloudflare R2 (S3-compatible). Enabled when `R2_BUCKET_NAME` is set.
- **Admin UI**: `/admin` route, user slug `users`. Admin access guarded by `src/access/is-admin.ts`.
- **Type generation**: `payload-types.ts` is gitignored (generated). Regenerate with `bun run payload generate:types`.
- **Seed scripts**: `scripts/` dir is gitignored; always run dev server first before seeding.
- **Rich text**: Lexical editor with multiple presets (`fullFeaturedEditor`, `blogEditor`, `projectEditor`, `legalEditor`, `simpleEditor`).
- **Collections**: Users, Media, GalleryCollections, BlogPosts, Projects, Papers, AboutPage.
- **Globals**: PrivacyPolicy, TermsOfService (both use `legalEditor`).
- **Blocks**: FormBlock (for embedding surveys/polls into content).
- **Form Builder**: `@payloadcms/plugin-form-builder` — surveys via the `surveys` collection slug.
- **Slug fields**: Auto-generated from title via `src/collections/shared/slug.ts`.
- **Revalidation**: Hooks in `src/collections/shared/revalidate.ts` call `revalidatePath` on change/delete.
- **Indexes**: Define on fields used for queries (published date, tags, slug, type, category) to avoid full table scans.

## Rich Text Editors
Multiple Lexical presets in `src/editor/richTextEditor.ts`:
- `fullFeaturedEditor` – Full feature set (h1–h6, tables, code blocks, callouts, banners, uploads, relations)
- `blogEditor` – Blog‑focused (h2–h4, limited code block languages)
- `projectEditor` – Project docs (h2–h4, callouts, code blocks, uploads)
- `legalEditor` – Legal pages (h2–h5, blockquotes, lists)
- `simpleEditor` – Minimal (bold, italic, underline, inline code, links, lists)

## Icons
- **Primary**: `@phosphor-icons/react` — import specific icons by name, use `weight` prop for visual weight.
- **Legacy UI icons**: Lucide (via shadcn/ui defaults in `components.json`).

## Animation System
- CSS keyframe animations in `globals.css` (`smoothFadeIn`, `smoothSlideUp`, `smoothSlideDown`, `smoothScale`, `popupIn`).
- `useIntersectionObserver` hook for lazy/eager element reveal.
- `tailwindcss-motion` plugin available as a Tailwind plugin.
- `prefers-reduced-motion` respected globally (durations reduced to 0.01ms).

## SEO & Analytics
- Metadata defined in `src/app/(my-app)/layout.tsx` (OpenGraph, keywords, robots).
- Each page exports `generateMetadata` for dynamic titles/descriptions.
- Sitemap generated via `src/app/sitemap.ts` (custom implementation).
- Vercel SpeedInsights + Analytics (`@vercel/speed-insights`, `@vercel/analytics`).
- Rybbit analytics script for self-hosted page views.
- `robots.txt` is implicit via Next.js defaults.
- Security headers (CSP, HSTS, etc.) configured in `next.config.mjs`.

## Testing & Debugging
- No test framework exists in this repo.
- Debug/dev routes: `/dev-components`, `/dev-fonts`, `/font-test`.
- Global error boundaries in `src/components/ui/error-boundary.tsx`.
- `dev-page-shell.tsx` component for building dev route pages.

## CI / GitHub Actions
- Lint, type‑check, and build run on each PR.
- Deploy to Vercel on merge to `main`.

## Emoji Usage Policy
- **NEVER** use emojis in comments, commit messages, code, documentation, or responses unless the user explicitly instructs you to do so.

## Versioning
- **Current version**: `"version"` field in `package.json` (currently 7.0.0).
- Before any deploy or significant release, **bump the version** following semver (`major.minor.patch`).
- No automated versioning — bump manually when you ship.

---
*This file is kept up‑to‑date to guide Copilot and contributors on the project's conventions and tooling.*
