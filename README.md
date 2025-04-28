<img src="https://miiyuh.my/assets/img/logo_miiyuh_text_white_v2.png" alt="miiyuh.com logo" height="64px" /> <b>.com</b>


welcome to the official source code for miiyuh.com.


## 🛠 Built With

- Next.js 15 — React framework for production-grade sites

- Tailwind CSS 4 — Utility-first modern styling

- Payload CMS — Headless CMS for blog and gallery management

- Howler.js — Sound library for interactive click sound effects

- Vercel — Deployment and hosting

- Zapsplat — Free sounds (button clicks, UI sounds)

## 🚀 Features

- Responsive design (desktop, tablet, mobile)

- Dark theme aesthetic (#1A1A1A background, #FAF3E0 text)

- Centered homepage logo and navigation

- Sound effects on click events (buttons, navigation, menu toggles)

- Light, optimized assets (next/image lazy loading)

- Sticky footer and header layout

- Scroll-to-top button for long pages

- SEO optimized meta tags

- Deployed via Vercel (CI/CD ready)

## 📂 Project Structure

/public/
  /assets/
    /img/            # Images (logos, illustrations)
    /sounds/         # UI sound effects

/src/
  /app/              # Next.js App Router (pages)
  /components/       # Header, Footer, ScrollToTopButton, LanguageSwitcher
  /hooks/            # useSound.ts (custom Howler hook)
  /styles/           # globals.css

/tailwind.config.ts  # Tailwind configuration
/postcss.config.mjs  # PostCSS setup
/next.config.mjs     # Next.js configuration

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

## 📜 License

- All source code is open for personal learning and portfolio use.However, all original artwork, logos, and media assets (images, sounds) are copyrighted to miiyuh.

## 📣 Credits

- Zapsplat — free sound effects

## ✨ Live Website

- 🚀 miiyuh.com (Hosted on Vercel)

## 💬 Say Hi!

- If you find this project inspiring or helpful, feel free to star ⭐ the repository or connect with me!
