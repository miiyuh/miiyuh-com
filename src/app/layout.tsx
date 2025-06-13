import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans, Noto_Serif, Noto_Sans_Mono, Noto_Color_Emoji } from 'next/font/google'
import ClientHeader from '@/components/layout/client-header'
import Footer from '@/components/layout/footer'
import ScrollToTopButton from '@/components/ui/scroll-to-top-button'
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
  openGraph: {
    title: "miiyuh's webpage",
    description: 'hello, and welcome to my webpage!',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#1A1A1A] text-[#FAF3E0]">
      <head>
        {/* Preconnect to Inter font */}
        <link rel="preconnect" href="https://rsms.me/" />
        {/* Load Inter CSS */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="1007"
          defer
        ></script>
      </head>
      <body className={`${notoSans.variable} ${notoSerif.variable} ${notoMono.variable} ${notoColorEmoji.variable} flex flex-col min-h-screen`}>
        <ClientHeader />
        <main className="flex-grow">
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
