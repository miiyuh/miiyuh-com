# Copilot Instructions for miiyuh.com

This is a Next.js 15 personal portfolio website with a focus on photography, artwork, and interactive animations. Built with App Router, TypeScript, and Tailwind CSS 4.

## Architecture Overview

### Core Design System
- **Theme**: Dark aesthetic with `#1A1A1A` background and `#FAF3E0` cream text
- **Fonts**: Inter (primary) + Noto family (Sans, Serif, Mono, Color Emoji) with emoji fallback support
- **Component Organization**: Categorized by purpose (`layout/`, `ui/`, `effects/`, `debug/`)
- **Constants**: Centralized in `src/constants/index.ts` for navigation links and social platforms

### Key Architectural Patterns

1. **Client-First Interactivity**: Most components use `'use client'` for animations and sound effects
2. **Sound Integration**: Custom `useSound` hook with iOS compatibility and graceful fallbacks
3. **Gallery System**: LightGallery integration with JSON-driven configuration (`public/gallery.json`)
4. **Hash Navigation**: `HeadingWithHash` component provides GitHub-style section linking with copy-to-clipboard

## Development Workflows

### Scripts & Commands
```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # TypeScript validation
```

### Font Loading Strategy
- Inter font loaded via external CSS link (rsms.me) with preconnect
- Noto fonts via Next.js Google Fonts with `display: 'swap'`
- Emoji fallback hierarchy: Apple → Noto → Segoe UI

## Project-Specific Conventions

### Component Patterns
```typescript
// All interactive components start with 'use client'
'use client'

// Sound integration pattern
const playClick = useSound('/sounds/click.mp3', 0.7)

// Mouse interaction with state management
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
```

### Gallery Implementation
- Images stored in `public/assets/img/` with organized subdirectories
- Gallery data in `public/gallery.json` with `src`, `title`, `description` structure
- LightGallery initialization via `src/utils/gallery-loader.ts` with plugin management

### Animation System
- `InteractiveDotsBackground`: Canvas-based mouse-following dot grid
- `TypewriterText`: Character-by-character text animation
- `ScrollAnimation`: Intersection Observer-based reveal animations
- 3D logo parallax with mouse tracking and tilt limitations (±15 degrees)

## Critical Integration Points

### External Dependencies
- **Vercel Analytics & Speed Insights**: Integrated in root layout
- **LightGallery**: Comprehensive plugin loading (zoom, thumbnail, fullscreen, rotate, share)
- **Howler.js**: Audio with iOS/mobile compatibility handling
- **Tailwindcss-motion**: Animation utilities plugin

### Asset Management
- Images optimized with WebP/AVIF formats and 1-year cache TTL
- PDF storage in `public/papers/` for academic showcase
- Sound effects from `/sounds/` directory with preload strategies

### SEO & Meta
- Comprehensive OpenGraph implementation in layout
- Social media integration with 15+ platforms via constants mapping
- Sitemap and robots.txt for search engine optimization

## File Structure Significance

- `src/app/projects/`: Nested routes for personal organizations (shingeki, 2alpha, miyabi) and academic work
- `src/components/index.ts`: Centralized exports for clean imports
- `public/gallery.json`: Single source of truth for all gallery collections
- Legal pages use sticky TOC and hash navigation patterns

## Development Notes

- All component exports centralized through `src/components/index.ts`
- iOS audio handling requires user gesture acknowledgment (graceful degradation)
- Gallery reinitializes on navigation to prevent memory leaks
- Custom cursor implementation with DOM manipulation
- Emoji components handle cross-platform compatibility issues

## Testing & Debugging

- Font debugging component available at `/font-debug` route
- Performance monitoring via `src/utils/performance.ts`
- Error boundaries implemented for graceful failure handling
- Console debugging for audio failures (common on iOS)