# Copilot Instructions for miiyuh.com

This repository is a **Next.js 15** personal portfolio focused on photography, artwork, and interactive animations. It uses **TypeScript**, **Tailwind CSS v4**, and the **App Router**.

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
- **Typography**: Inter (primary) and Noto families loaded via Next.js Google Fonts with `display: 'swap'`. Emoji fallback hierarchy: Apple → Noto → Segoe UI.
- **Colors**: Defined in `src/styles/theme.css` using HSL variables for easy theming.
- **Spacing**: Tailwind spacing scale, with custom utilities for glass panels (`glass-panel-pro`).

## Development Workflow
```bash
# Install dependencies
pnpm install

# Development server (TurboPack)
pnpm run dev

# Production build
pnpm run build

# Lint and auto‑fix
pnpm run lint:fix

# TypeScript check
pnpm run type-check

# Clean build artifacts (uses npx rimraf for cross‑platform compatibility)
pnpm run clean
```

### `package.json` scripts (relevant excerpt)
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  "clean": "npx rimraf .next"
}
```
> **Note**: The original `clean` script used the global `rimraf` command, which is not available on Windows. Using `npx rimraf` ensures the command works without a global install.

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

## Animation System
- **InteractiveDotsBackground** – Canvas‑based mouse‑following dot grid.
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

---
*This file is kept up‑to‑date to guide Copilot and contributors on the project's conventions and tooling.*