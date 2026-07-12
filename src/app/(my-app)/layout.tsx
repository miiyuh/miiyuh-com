import "./globals.css";
import type { Metadata } from "next";
import {
  Noto_Sans,
  Noto_Serif,
  Noto_Serif_JP,
  Instrument_Serif,
  Noto_Sans_Mono,
  Noto_Color_Emoji,
  Faculty_Glyphic,
} from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "@/components/layout/app-provider";
import { getServerLocale } from "@/lib/locale-server";
import { LocaleProvider } from "@/lib/locale-context";
import { JsonLd } from "@/components/seo/json-ld";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});
const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});
// Kept loaded but not applied anywhere in the UI — retained in case it's wanted again later.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const stackSansText = localFont({
  src: "../../assets/fonts/StackSansText-VariableFont_wght.ttf",
  variable: "--font-stack-sans-text",
  display: "swap",
});
const stackSansHeadline = localFont({
  src: "../../assets/fonts/StackSansHeadline-VariableFont_wght.ttf",
  variable: "--font-stack-sans-headline",
  display: "swap",
});
const stackSansNotch = localFont({
  src: "../../assets/fonts/StackSansNotch-VariableFont_wght.ttf",
  variable: "--font-stack-sans-notch",
  display: "swap",
});
const facultyGlyphic = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faculty-glyphic",
  display: "swap",
});
const notoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-mono",
  display: "swap",
});
const notoColorEmoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  variable: "--font-noto-color-emoji",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miiyuh.com"),
  title: "miiyuh's webpage",
  description: "hello, and welcome to my webpage!",
  keywords: ["miiyuh", "photography", "artwork", "blog", "portfolio"],
  authors: [{ name: "miiyuh" }],
  creator: "miiyuh",
  openGraph: {
    title: "miiyuh's webpage",
    description: "Fresh graduate, creative developer, and photographer. Advocating for better policy, governance, and urban life in Malaysia.",
    type: "website",
    url: "https://miiyuh.com",
    siteName: "miiyuh's webpage",
  },
  twitter: {
    card: "summary_large_image",
    title: "miiyuh's webpage",
    description: "Fresh graduate, creative developer, and photographer. Advocating for better policy, governance, and urban life in Malaysia.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale()
  const nonce = (await headers()).get("x-nonce") ?? undefined

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "miiyuh",
    url: "https://miiyuh.com",
    image: "https://miiyuh.com/assets/img/personal-profile-pic.png",
    jobTitle: "Creative Developer & Photographer",
    sameAs: [
      "https://github.com/miiyuh",
      "https://twitter.com/miiyuh_",
      "https://instagram.com/miiyuh.jpg",
      "https://linkedin.com/in/muhamad-azri",
      "https://bsky.app/profile/miiyuh.com",
      "https://myanimelist.net/profile/miiyuh",
      "https://anilist.co/user/miiyuh",
      "https://steamcommunity.com/id/miiyuh",
      "https://www.tiktok.com/@azri.my",
      "https://twitch.tv/miiyuh_",
      "https://youtube.com/@miiyuh_",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "miiyuh's webpage",
    url: "https://miiyuh.com",
  };

  return (
    <html lang={locale} className="bg-[#070707] text-[#FAF3E0]">
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Default to dark-mode favicon set (light icon) before script applies theme-specific variants */}
        <link
          id="theme-favicon-16"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicons/favicon-16x16.png"
        />
        <link
          id="theme-favicon-32"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicons/favicon-32x32.png"
        />
        <link
          id="theme-shortcut-icon"
          rel="shortcut icon"
          href="/assets/img/favicons/favicon-32x32.png"
        />
        <link
          id="theme-apple-touch-icon"
          rel="apple-touch-icon"
          href="/assets/img/favicons/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} ${notoSerifJP.variable} ${instrumentSerif.variable} ${notoMono.variable} ${notoColorEmoji.variable} ${stackSansText.variable} ${stackSansHeadline.variable} ${stackSansNotch.variable} ${facultyGlyphic.variable} antialiased relative flex flex-col min-h-screen`}
        style={{ fontFamily: 'var(--font-stack-sans-text), var(--font-noto-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
      >
        {/* beforeInteractive scripts must be direct children of <body> per Next.js docs — placing this in <head> triggered a dev-mode "script tag" hydration warning */}
        <Script src="/theme-favicons.js" strategy="beforeInteractive" nonce={nonce} />
        <LocaleProvider locale={locale}>
          <AppProvider>{children}</AppProvider>
        </LocaleProvider>
        <SpeedInsights />
        <Analytics />
        <Script
          src="https://rybbit.miiyuh.com/api/script.js"
          data-site-id="c7820fe075c6"
          strategy="afterInteractive"
          nonce={nonce}
        />
      </body>
    </html>
  );
}
