import "../globals.css";
import type { Metadata } from "next";
import { Noto_Sans_Mono, Noto_Color_Emoji } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "@/components/layout/app-provider";
import { LOCALE_CODES, isValidLocale } from "@/lib/locale";
import { LocaleProvider } from "@/lib/locale-context";
import { JsonLd } from "@/components/seo/json-ld";
import { SOCIAL_LINKS } from "@/constants";

// Body text inside blog posts and the legal pages (.lexical-content)
const paperMono = localFont({
  src: "../../../assets/fonts/PaperMono-VariableFont_wght.woff2",
  weight: "100 800",
  variable: "--font-paper-mono",
  display: "swap",
});
const stackSansText = localFont({
  weight: "200 700",
  src: "../../../assets/fonts/StackSansText-VariableFont_wght.ttf",
  variable: "--font-stack-sans-text",
  display: "swap",
});
const stackSansHeadline = localFont({
  weight: "200 700",
  src: "../../../assets/fonts/StackSansHeadline-VariableFont_wght.ttf",
  variable: "--font-stack-sans-headline",
  display: "swap",
});
const stackSansNotch = localFont({
  weight: "200 700",
  src: "../../../assets/fonts/StackSansNotch-VariableFont_wght.ttf",
  variable: "--font-stack-sans-notch",
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
  // Only fetched when an emoji glyph actually renders (unicode-range), not on every page
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miiyuh.com"),
  title: "miiyuh's webpage",
  description: "Fresh graduate, creative developer, and photographer. Advocating for better policy, governance, and urban life in Malaysia.",
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

// Locale is the first URL segment (src/proxy.ts maps unprefixed URLs to /en),
// so every locale can be prerendered and cached instead of read from a cookie.
export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

// Not `dynamicParams = false`: that is inherited by every child segment and
// would 404 blog posts/albums that weren't prebuilt. Unknown locales 404 below.

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "miiyuh",
    url: "https://miiyuh.com",
    image: "https://miiyuh.com/assets/img/personal-profile-pic.png",
    jobTitle: "Creative Developer & Photographer",
    sameAs: Object.values(SOCIAL_LINKS),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "miiyuh's webpage",
    url: "https://miiyuh.com",
  };

  return (
    <html lang={locale} className="bg-bg-primary text-text-primary">
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />

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
        className={`${paperMono.variable} ${notoMono.variable} ${notoColorEmoji.variable} ${stackSansText.variable} ${stackSansHeadline.variable} ${stackSansNotch.variable} antialiased relative flex flex-col min-h-screen`}
        style={{ fontFamily: 'var(--font-stack-sans-text), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
      >
        {/* beforeInteractive scripts must be direct children of <body> per Next.js docs — placing this in <head> triggered a dev-mode "script tag" hydration warning */}
        <Script src="/theme-favicons.js" strategy="beforeInteractive" />
        <LocaleProvider locale={locale}>
          <AppProvider>{children}</AppProvider>
        </LocaleProvider>
        <SpeedInsights />
        <Analytics />
        <Script
          src="https://rybbit.miiyuh.com/api/script.js"
          data-site-id="c7820fe075c6"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
