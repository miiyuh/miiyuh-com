import "../globals.css";
import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "@/components/layout/app-provider";
import { LOCALE_CODES, isValidLocale } from "@/lib/locale";
import { LocaleProvider } from "@/lib/locale-context";
import { JsonLd } from "@/components/seo/json-ld";
import { SOCIAL_LINKS } from "@/constants";

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
        className={`${fontVariables} antialiased relative flex flex-col min-h-screen`}
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
