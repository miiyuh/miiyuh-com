import './globals.css'
import type { Metadata } from 'next'
import { Inter, Noto_Sans, Noto_Serif, Noto_Sans_Mono } from 'next/font/google'
import ClientHeader from '@/components/client-header'
import Footer from '@/components/footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans', display: 'swap' })
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-noto-serif', display: 'swap' })
const notoMono = Noto_Sans_Mono({ subsets: ['latin'], variable: '--font-noto-mono', display: 'swap' })

export const metadata: Metadata = {
  title: "miiyuh's webpage",
  description: 'hello, and welcome to my webpage!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#1A1A1A] text-[#FAF3E0]">
      <head>
        {/* 🛠️ Preconnect to font servers for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${notoSans.variable} ${notoSerif.variable} ${notoMono.variable} font-sans flex flex-col min-h-screen`}>
        
        <ClientHeader />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
        <ScrollToTopButton />

      </body>
    </html>
  )
}
