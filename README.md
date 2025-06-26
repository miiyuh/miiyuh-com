<img src="https://miiyuh.com/assets/img/logo_miiyuh_v4-white_with-border.png" alt="resume on the web" height="80px" />

A modern personal portfolio website featuring photography, artwork, and blog content with interactive animations and effects.

## 🛠 Built With

- **Next.js 15** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first modern styling
- **Howler.js** - Sound library for interactive click effects
- **LightGallery** - Advanced gallery viewer with zoom, fullscreen, and thumbnails
- **Vercel Analytics & Speed Insights** - Performance monitoring
- **Google Fonts** - Inter, Noto Sans, Noto Serif, Noto Mono, and Noto Color Emoji

## ✨ Features

### 🎨 Design & UX

- **Dark Theme Aesthetic** - Deep dark (#1A1A1A) background with warm cream (#FAF3E0) text
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Interactive 3D Logo** - Mouse-following parallax effect on homepage logo
- **Smooth Animations** - Scroll-triggered animations, typewriter effects, and transitions
- **Background Effects** - Animated floating elements with blur and pulse effects

### 🖼️ Gallery System

- **Advanced Photo Gallery** - Built with LightGallery for enhanced viewing experience
- **Multiple Collections** - 2025 Japan trip photos, 2022-2023 artwork collections
- **Gallery Features** - Zoom, fullscreen, thumbnails, rotation, autoplay, and sharing
- **Optimized Images** - WebP/AVIF formats with lazy loading and caching

### 🔊 Interactive Audio

- **Click Sound Effects** - Custom audio feedback on navigation and interactions
- **Volume Control** - Configurable sound levels (70% default)
- **Performance Optimized** - Preloaded audio assets for instant playback

### 🧭 Navigation & Layout

- **Sticky Header/Footer** - Consistent navigation across all pages
- **Mobile-First Menu** - Responsive hamburger menu for mobile devices
- **Scroll-to-Top Button** - Enhanced UX for long content pages
- **Social Media Links** - 15+ platform integrations with custom icons
- **Interactive Dots Background** - Minimalistic animated dots that respond to mouse movement

### ⚡ Performance & SEO

- **Optimized Assets** - Image compression, lazy loading, and CDN delivery
- **SEO Meta Tags** - Comprehensive OpenGraph and meta tag implementation
- **Analytics Integration** - Vercel Analytics and Speed Insights
- **TypeScript Strict Mode** - Type safety and better developer experience

### 📄 Academic Features

- **PDF Viewer Integration** - Embedded PDF viewing with browser compatibility
- **Research Paper Showcase** - Dedicated pages for academic publications
- **Split Layout Design** - Information panel alongside PDF viewer
- **Download Functionality** - Direct PDF download with fallback support
- **Academic Organization** - Separate sections for university and personal projects

### 🔗 Social Integration

- **Redirect System** - Custom miiyuh.com/ short links for social platforms
- **Platform Coverage** - 15+ social media platforms with custom icons
- **Hover Effects** - Interactive animations on social media buttons
- **External Links** - Proper handling of external navigation

### 📚 Documentation Features

- **Hash Link Navigation** - Professional documentation-style section linking
- **Click-to-Copy URLs** - Users can copy direct links to specific sections
- **Visual Feedback** - Hash symbols (# → ✓) with hover states
- **Smooth Scrolling** - Enhanced navigation within long-form content

## 📖 Pages

- **Homepage** (`/`) - Interactive landing page with 3D logo and dynamic greetings
- **About Me** (`/aboutme`) - Personal introduction with character illustration
- **Projects** (`/projects`) - Showcase of personal and academic work
  - **Personal Organizations** - studio shingeki, 2alpha, miyabi creative projects
  - **Academic Work** (`/projects/academic`) - University projects and coursework
  - **Research Papers** (`/projects/papers`) - Academic papers with PDF viewer
    - Individual paper pages with split layout (info left, PDF viewer right)
    - PDF download functionality with fallback for unsupported browsers
    - Sample papers: AI Ethics, Web Accessibility, Sustainable Technology
- **Gallery** (`/gallery`) - Photography and artwork collections with advanced viewer
- **Blog** (`/blog`) - Embedded Blogspot integration
- **Socials** (`/socials`) - Social media platform links with hover effects and redirects
- **Legal Pages** - Privacy Policy and Terms of Service (Malaysia-specific)
  - Sticky table of contents sidebar
  - Smooth scroll navigation
  - **Hash Link Functionality** - Click-to-copy section links with # symbols (like GitHub docs)
  - Comprehensive legal coverage for Malaysian users

## 🏗️ Project Structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── projects/        # Project showcase pages
│   │   ├── academic/    # University and academic work
│   │   ├── papers/      # Research papers with PDF viewer
│   │   ├── shingeki/    # studio shingeki projects
│   │   ├── 2alpha/      # 2alpha organization projects
│   │   └── miyabi/      # miyabi creative projects
│   ├── gallery/         # Photography collections
│   ├── socials/         # Social media links
│   ├── aboutme/         # Personal introduction
│   ├── blog/            # Blog integration
│   ├── privacy-policy/  # Privacy policy (Malaysia)
│   └── terms-of-service/ # Terms of service (Malaysia)
├── components/          # Organized React components
│   ├── effects/         # Animation and background components
│   ├── layout/          # Header, footer, page layouts
│   ├── ui/              # Reusable UI components (HeadingWithHash, etc.)
│   └── debug/           # Development utilities
├── constants/           # Application constants and navigation
├── hooks/               # Custom React hooks (sound, etc.)
└── utils/               # Utility functions and helpers
public/
├── papers/              # Research papers PDF storage
├── assets/img/          # Images, artwork, photography
└── sounds/              # Audio files for interactions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/miiyuh-com.git
cd miiyuh-com
```

1. Install dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Run TypeScript type checking

## 🎛️ Configuration

### Environment Setup

- **Fonts** - Configured for Inter (primary), Noto font family (secondary)
- **Images** - WebP/AVIF optimization with 1-year cache TTL
- **Gallery Data** - JSON-based configuration in `public/gallery.json`

### Key Files

- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js optimization settings
- `src/constants/index.ts` - Navigation and theme constants
- `public/gallery.json` - Gallery collections data
- `public/papers/` - Research papers PDF storage directory
- `src/components/effects/interactive-dots-background.tsx` - Animated background component
- `src/components/ui/heading-with-hash.tsx` - Hash link component for documentation-style navigation

## 📱 Social Platforms

Integrated social media platforms with custom icons:

- GitHub, Instagram, LinkedIn, Twitter/X
- Spotify, YouTube, Twitch, TikTok
- AniList, MyAnimeList, Steam
- Ko-fi, Pinterest, SpaceHey, Bluesky

## 📜 License

- **Source Code** - Open for personal learning and portfolio inspiration
- **Original Content** - All artwork, photography, logos, and media assets are copyrighted to miiyuh
- **Third-party Assets** - Sound effects from Zapsplat (free license)

## 🔗 Links

- **Live Website** - [miiyuh.com](https://miiyuh.com) (Hosted on Vercel)
- **Blog** - [miiyuh.blogspot.com](https://miiyuh.blogspot.com)

## 🙋‍♀️ Connect

Feel free to explore the code, star ⭐ the repository, or reach out through any of the social platforms listed on the website!
