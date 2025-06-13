<img src="https://miiyuh.my/assets/img/logo_miiyuh_text_white_v2.png" alt="miiyuh.com logo" height="64px" /> <b>.com</b>


welcome to the official source code for miiyuh.com.


## 🛠 Built With

- Next.js 15 - React framework for production-grade sites

- Tailwind CSS - Utility-first modern styling

- Sanity CMS - Headless CMS for blog content management

- Howler.js - Sound library for interactive click sound effects

- Vercel - Deployment and hosting

- Zapsplat - Free sounds (button clicks, UI sounds)

## 🚀 Features

- Responsive design (desktop, tablet, mobile)

- Dark theme aesthetic (#1A1A1A background, #FAF3E0 text)

- Centered homepage logo and navigation

- **Custom Blog System** with Sanity CMS
  - Support for multiple categories (Attack on Titan, Photography, Coding, Personal)
  - Rich text content with PortableText
  - Category filtering and tagging system
  - Featured posts and read time estimates
  - Dynamic blog post pages with SEO optimization

- Sound effects on click events (buttons, navigation, menu toggles)

- Light, optimized assets (next/image lazy loading)

- Sticky footer and header layout

- Scroll-to-top button for long pages

- SEO optimized meta tags

- Deployed via Vercel (CI/CD ready)

## 📦 Getting Started (Local Development)

Clone the repository:

```
git clone https://github.com/your-username/miiyuh-com.git
cd miiyuh-com
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open http://localhost:3000 to view it in your browser.

## 📝 Blog Setup

This site uses Sanity CMS for blog content management. To set up the blog:

### Prerequisites
1. Create a Sanity account at https://sanity.io
2. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Initial Setup
1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Run the setup script to create categories:
   ```bash
   node scripts/setup-categories.js
   ```
3. Access Sanity Studio at `http://localhost:3000/studio`
4. Create your first blog posts with:
   - Title and slug
   - Category (Attack on Titan, Photography, Coding, Personal)
   - Content using rich text editor
   - Published date and read time estimate

### Content Management
- **Categories**: Pre-configured for different content topics
- **Posts**: Support rich text, images, tags, and metadata
- **Studio**: Available at `/studio` route for content creation
- **Live Preview**: Changes appear immediately on the blog

Visit `/blog` to see your published posts!

## 📜 License

- All source code is open for personal learning and portfolio use. However, all original artwork, logos, and media assets (images) are copyrighted to miiyuh.

## 📣 Credits

- Zapsplat — free sound effects

## ✨ Live Website

- 🚀 miiyuh.com (Hosted on Vercel)

## 💬 Say Hi!

- If you find this project inspiring or helpful, feel free to star ⭐ the repository or connect with me!
