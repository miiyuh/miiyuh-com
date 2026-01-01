<img src="https://miiyuh.com/assets/img/logo_miiyuh_v4-white_with-border.png" alt="resume on the web" height="80px" />

A modern personal portfolio website featuring photography, artwork, and blog content with interactive animations and effects.

## 🛠 Built With

- **Next.js 15** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first modern styling
- **Payload CMS v3.60.0** - Headless CMS with MongoDB Atlas backend
- **anime.js v4.2.2** - Professional animation library for scroll and interactive effects
- **Howler.js** - Sound library for interactive click effects
- **LightGallery** - Advanced gallery viewer with zoom, fullscreen, and thumbnails
- **Lucide React** - Modern icon library for UI components
- **Vercel Analytics & Speed Insights** - Performance monitoring
- **Google Fonts** - Inter, Noto Sans, Noto Serif JP, Noto Mono, and Noto Color Emoji
- **Cloudflare R2** - S3-compatible object storage for media assets

## ✨ Features

### 🎨 Design & UX

- **Dark Theme Aesthetic** - Deep dark (#1A1A1A) background with warm cream (#FAF3E0) text
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Interactive 3D Logo** - Mouse-following parallax effect on homepage logo
- **Smooth Animations** - anime.js-powered scroll-triggered animations, typewriter effects, and transitions
- **Background Effects** - Animated floating elements with blur and pulse effects
- **Bento Grid Layout** - Modern grid-based design system for About Me page with Lucide icons

### 📝 Blog Features

- **Typography System** - Noto Serif JP for blog post titles and section headings, Noto Sans for body text
- **Reading Progress Bar** - Visual scroll progress indicator positioned below header
- **Table of Contents** - Sticky TOC with active section tracking for easy navigation
- **Blog Archive** - Year and month-based organization with custom sorting
- **Topic Filtering** - Sidebar filter for browsing posts by topics with ISO date formatting
- **Responsive Layout** - Optimized card layout with date-first design and thumbnail positioning

### 📚 Content Management System

- **Payload CMS v3.60.0** - MongoDB Atlas backend with Lexical editor integration
- **Projects Collection** - Full CRUD functionality for personal and academic projects
- **Gallery Collections** - Dynamic image gallery with collection relationships
- **Custom Collections** - Users, Media, GalleryCollections, GalleryImages, Posts, Projects
- **Seed Scripts** - Automated data initialization for projects and gallery content
- **S3 Storage** - Cloudflare R2 integration for media asset management

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
- **About Me** (`/aboutme`) - Bento grid layout with personal information, skills, and interests using Lucide icons
- **Projects** (`/projects`) - CMS-driven showcase of personal and academic work
  - **Personal Organizations** - studio shingeki, 2alpha, miyabi creative projects
  - **Academic Work** (`/projects/academic`) - University projects and coursework
  - **Research Papers** (`/projects/papers`) - Academic papers with PDF viewer
    - Individual paper pages with split layout (info left, PDF viewer right)
    - PDF download functionality with fallback for unsupported browsers
    - Sample papers: AI Ethics, Web Accessibility, Sustainable Technology
- **Gallery** (`/gallery`) - Dynamic photography and artwork collections with CMS management and advanced viewer
- **Blog** (`/blog`) - Complete blog system with Payload CMS integration
  - Year/month-based archive organization
  - Topic filtering sidebar
  - Reading progress bar and table of contents
  - Noto Serif typography for titles and headings
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
│   ├── (my-app)/        # Main application routes
│   │   ├── projects/    # Project showcase pages with CMS integration
│   │   │   ├── academic/    # University and academic work
│   │   │   ├── papers/      # Research papers with PDF viewer
│   │   │   ├── shingeki/    # studio shingeki projects
│   │   │   ├── 2alpha/      # 2alpha organization projects
│   │   │   └── miyabi/      # miyabi creative projects
│   │   ├── gallery/         # Dynamic photography collections with CMS
│   │   ├── blog/            # Blog system with post filtering and archive
│   │   │   └── [year]/[month]/[slug]/ # Dynamic blog post pages with Noto Serif typography
│   │   ├── socials/         # Social media links
│   │   ├── aboutme/         # Bento grid About Me page with Lucide icons
│   │   ├── privacy-policy/  # Privacy policy (Malaysia)
│   │   └── terms-of-service/ # Terms of service (Malaysia)
│   └── (payload)/       # Payload CMS admin routes
├── collections/         # Payload CMS collection definitions
│   ├── GalleryCollections.ts # Gallery collection schema
│   ├── GalleryImages.ts      # Gallery images with relationships
│   ├── Posts.ts         # Blog posts collection
│   ├── Projects.ts      # Projects collection with custom fields
│   ├── Users.ts         # User authentication
│   └── Media.ts         # Media library
├── components/          # Organized React components
│   ├── effects/         # Animation and background components
│   │   ├── scroll-animations.tsx # anime.js-powered scroll animations
│   │   ├── animated-text.tsx     # Text animation effects
│   │   └── parallax-effects.tsx  # 3D parallax components
│   ├── layout/          # Header, footer, page layouts
│   ├── ui/              # Reusable UI components (HeadingWithHash, TOC, etc.)
│   └── debug/           # Development utilities
├── constants/           # Application constants and navigation
├── hooks/               # Custom React hooks (sound, etc.)
└── utils/               # Utility functions and helpers
public/
├── papers/              # Research papers PDF storage
├── gallery.json         # Gallery collections configuration
├── assets/img/          # Images, artwork, photography
└── sounds/              # Audio files for interactions
scripts/
├── seed-gallery.ts      # Initialize gallery collections and images
├── seed-projects.ts     # Initialize projects data
└── create-admin.ts      # Create admin user
payload.config.ts        # Payload CMS configuration
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

### Database & CMS Setup

```bash
# Seed initial gallery collections and images
pnpm tsx scripts/seed-gallery.ts

# Seed projects data
pnpm tsx scripts/seed-projects.ts

# Create admin user
pnpm tsx scripts/create-admin.ts
```

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URI=your_mongodb_atlas_uri
PAYLOAD_SECRET=your_secret_key
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

## 🎛️ Configuration

### Environment Setup

- **Fonts** - Configured for Inter (primary), Noto family (secondary)
  - Noto Serif JP for blog titles and section headings
  - Noto Sans for body text and UI
  - Noto Sans Mono for code blocks
  - Noto Color Emoji for cross-platform emoji support
- **Images** - WebP/AVIF optimization with 1-year cache TTL
- **Animations** - anime.js configuration with easing functions and timing
- **CMS Data** - Payload MongoDB integration with R2 media storage

### Key Files

- `tailwind.config.ts` - Tailwind CSS configuration with custom breakpoints
- `next.config.mjs` - Next.js optimization and image remotePatterns
- `payload.config.ts` - Payload CMS setup with MongoDB and collections
- `src/constants/index.ts` - Navigation and theme constants
- `public/gallery.json` - Gallery collections data (legacy, now uses CMS)
- `src/components/effects/scroll-animations.tsx` - anime.js scroll animation component
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

## 🙋‍♀️ Connect

Feel free to explore the code, star ⭐ the repository, or reach out through any of the social platforms listed on the website!
