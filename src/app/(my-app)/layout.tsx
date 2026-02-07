import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans, Noto_Serif, Noto_Serif_JP, Instrument_Serif, Noto_Sans_Mono, Noto_Color_Emoji } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"
import { AppProvider } from '@/components/layout/app-provider'

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans', display: 'swap' })
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-noto-serif', display: 'swap' })
const notoSerifJP = Noto_Serif_JP({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-noto-serif-jp', display: 'swap' })
const instrumentSerif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-instrument-serif', display: 'swap' })
const notoMono = Noto_Sans_Mono({ subsets: ['latin'], variable: '--font-noto-mono', display: 'swap' })
const notoColorEmoji = Noto_Color_Emoji({ weight: '400', subsets: ['emoji'], variable: '--font-noto-color-emoji', display: 'swap' })

export const metadata: Metadata = {
  title: "miiyuh's webpage",
  description: 'hello, and welcome to my webpage!',
  keywords: ['miiyuh', 'photography', 'artwork', 'blog', 'portfolio'],
  authors: [{ name: 'miiyuh' }],
  creator: 'miiyuh',
  icons: {
    icon: [
      { url: '/assets/img/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/img/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/assets/img/favicons/apple-touch-icon.png',
    other: {
      rel: 'android-chrome-192x192',
      url: '/assets/img/favicons/android-chrome-192x192.png',
    },
  },
  openGraph: {
    title: "miiyuh's webpage",
    description: 'hello, and welcome to my webpage!',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#070707] text-[#FAF3E0]">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="preload" as="style" href="https://rsms.me/inter/inter.css" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        
        {/* Preload Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${notoSans.variable} ${notoSerif.variable} ${notoSerifJP.variable} ${instrumentSerif.variable} ${notoMono.variable} ${notoColorEmoji.variable} relative flex flex-col min-h-screen`}>
        <AppProvider>{children}</AppProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
