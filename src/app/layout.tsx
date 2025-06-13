import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Noto_Sans, Noto_Serif, Noto_Sans_Mono, Noto_Color_Emoji } from 'next/font/google'
import ClientHeader from '@/components/client-header'
import Footer from '@/components/footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import { AccessibilityControls } from '@/components/accessibility-controls-simple'
import { PerformanceMonitor } from '@/components/analytics'
import { StructuredData } from '@/components/structured-data'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

// Load only the specified fonts - Inter via CSS, others via Next.js
const notoSans = Noto_Sans({ 
  subsets: ['latin'], 
  variable: '--font-noto-sans', 
  display: 'swap' 
})
const notoSerif = Noto_Serif({ 
  subsets: ['latin'], 
  variable: '--font-noto-serif', 
  display: 'swap' 
})
const notoMono = Noto_Sans_Mono({ 
  subsets: ['latin'], 
  variable: '--font-noto-mono', 
  display: 'swap' 
})
const notoColorEmoji = Noto_Color_Emoji({ 
  weight: '400',
  subsets: ['emoji'], 
  variable: '--font-noto-color-emoji', 
  display: 'swap' 
})

export const metadata: Metadata = {
  title: "miiyuh's webpage",
  description: 'hello, and welcome to my webpage!',
  keywords: ['miiyuh', 'photography', 'artwork', 'blog', 'portfolio'],
  authors: [{ name: 'miiyuh' }],
  creator: 'miiyuh',
  metadataBase: new URL('https://miiyuh.com'),
  openGraph: {
    title: "miiyuh's webpage",
    description: 'hello, and welcome to my webpage!',
    type: 'website',
    siteName: "miiyuh's webpage",
    images: [
      {
        url: '/assets/img/logo_miiyuh_text_white_v2.png',
        width: 480,
        height: 120,
        alt: "miiyuh's webpage logo"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "miiyuh's webpage",
    description: 'hello, and welcome to my webpage!',
    images: ['/assets/img/logo_miiyuh_text_white_v2.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#1A1A1A] text-[#FAF3E0]">
      <head>
        {/* Preconnect to Inter font */}
        <link rel="preconnect" href="https://rsms.me/" />
        {/* Load Inter CSS */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FAF3E0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="miiyuh" />
        <link rel="apple-touch-icon" href="/assets/img/logo_miiyuh_text_white_v2.png" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/img/logo_miiyuh_text_white_v2.png" as="image" type="image/png" />
        <script src="https://app.rybbit.io/api/script.js" data-site-id="1007" defer></script>
      </head>
      <body className={`${notoSans.variable} ${notoSerif.variable} ${notoMono.variable} ${notoColorEmoji.variable} flex flex-col min-h-screen`}>
        <StructuredData type="website" />
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>        <AccessibilityControls />
        <ClientHeader />
        <main className="flex-grow relative z-10" id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
