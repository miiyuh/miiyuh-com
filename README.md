<img src="https://miiyuh.com/assets/img/logo_miiyuh_v4-white_with-border.png" alt="resume on the web" height="80px" />

A modern personal portfolio website featuring photography, artwork, and blog content with interactive animations.

## 🛠 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility styling
- **Payload CMS v3.68.2** - Headless CMS with MongoDB
- **anime.js** - Scroll animations and effects
- **Cloudflare R2** - Media asset storage

## ✨ Key Features

- **Dark Theme Design** - Deep dark background with warm cream text
- **Interactive Animations** - Mouse-following effects and scroll-triggered animations
- **Content Management** - Payload CMS for blog posts, projects, and gallery
- **Photo Gallery** - Advanced viewer with zoom, fullscreen, and thumbnails
- **Blog System** - Reading progress, table of contents, and topic filtering
- **Audio Effects** - Click sound effects for enhanced UX
- **Fully Responsive** - Optimized for desktop, tablet, and mobile

## 📖 Main Pages

- **Homepage** (`/`) - Landing page
- **About Me** (`/aboutme`) - Personal info
- **Socials** (`/socials`) - Social media platform links
- **Gallery** (`/gallery`) - Photography and artwork collections
- **Projects** (`/projects`) - Personal and academic work showcase
- **Blog** (`/blog`) - Complete blog system with CMS


## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/miiyuh-com.git
cd miiyuh-com

# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking

### Database Setup

```bash
# Create admin user
bun run create:admin

# Seed initial data
bun run seed:gallery
bun run seed:projects
bun run seed:about
```

### Environment Variables

Create `.env.local`:

```env
DATABASE_URI=your_mongodb_atlas_uri
PAYLOAD_SECRET=your_secret_key
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

## 📜 License

- **Source Code** - Open for personal learning and portfolio inspiration
- **Original Content** - All artwork, photography, logos, and media assets are copyrighted to me

## 🙋‍♀️ Connect

Feel free to explore the code, star ⭐ the repository, or reach out through any social platform on the website!