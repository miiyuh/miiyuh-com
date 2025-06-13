# Components Organization

This directory contains all React components organized by their purpose and functionality.

## 📁 Structure

```text
components/
├── index.ts          # Main exports file for easier imports
├── layout/           # Layout and navigation components
├── ui/               # Reusable UI components
├── effects/          # Animation and effect components
└── debug/            # Development and debugging components
```

## 📋 Component Categories

### 🏗️ Layout (`/layout/`)

Components that handle page structure and navigation:

- `header.tsx` - Main navigation header
- `client-header.tsx` - Client-side header wrapper
- `footer.tsx` - Site footer with links and branding
- `page-layout.tsx` - Common page layout wrapper

### 🎨 UI (`/ui/`)

Reusable interface components:

- `loading-spinner.tsx` - Loading indicator component
- `error-boundary.tsx` - Error boundary for error handling
- `scroll-to-top-button.tsx` - Scroll to top functionality

### ✨ Effects (`/effects/`)

Animation and visual effect components:

- `animated-text.tsx` - Text animation components (TypewriterText, AnimatedHeading)
- `scroll-animations.tsx` - Scroll-triggered animations
- `parallax-effects.tsx` - Parallax scroll effects

### 🔧 Debug (`/debug/`)

Development and debugging utilities:

- `font-debug.tsx` - Font loading debugging component

## 📦 Usage

### Option 1: Import from organized paths

```tsx
import LoadingSpinner from '@/components/ui/loading-spinner'
import { TypewriterText } from '@/components/effects/animated-text'
import Header from '@/components/layout/header'
```

### Option 2: Import from index (recommended)

```tsx
import { LoadingSpinner, TypewriterText, Header } from '@/components'
```

## 🎯 Benefits of This Organization

1. **Clear Separation of Concerns** - Each folder has a specific purpose
2. **Better Maintainability** - Easy to find and update related components
3. **Improved Developer Experience** - Logical grouping reduces cognitive load
4. **Scalability** - Easy to add new components in appropriate categories
5. **Clean Imports** - Centralized exports through index.ts

## 📝 Adding New Components

When adding new components:

1. **Determine the category** - Which folder best fits the component's purpose?
2. **Follow naming conventions** - Use kebab-case for files, PascalCase for components
3. **Update index.ts** - Add the export to the main index file
4. **Use consistent patterns** - Follow the established export patterns in each category

## 🚀 Migration Notes

- **Flag components** moved to `@/utils` for better emoji fallback handling
- **All imports updated** to use the new organized structure
- **No breaking changes** to component APIs or functionality
- **Maintained TypeScript compliance** throughout the reorganization
