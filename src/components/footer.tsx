'use client'

import Link from 'next/link'
import { ScrollAnimation } from './scroll-animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#FAF3E0]/5 backdrop-blur-sm border-t border-[#FAF3E0]/10 mt-auto">
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeUp" className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="font-serif text-lg text-[#8B5A2B] mb-4">About miiyuh</h3>
              <p className="text-[#FAF3E0]/70 text-sm leading-relaxed">
                A creative space featuring photography, digital artwork, and personal musings. 
                Welcome to my little corner of the internet! 🌟
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg text-[#8B5A2B] mb-4">Quick Links</h3>              <nav className="space-y-2">
                <Link href="/aboutme" className="block text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors text-sm">
                  About Me
                </Link>
                <Link href="/gallery" className="block text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors text-sm">
                  Gallery
                </Link>
                <Link href="/blog" className="block text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors text-sm">
                  Blog
                </Link>
                <Link href="/site-map" className="block text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors text-sm">
                  Site Map
                </Link>
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-serif text-lg text-[#8B5A2B] mb-4">Connect</h3>
              <p className="text-[#FAF3E0]/70 text-sm leading-relaxed mb-4">
                Find me on various social platforms and stay updated with my latest work.
              </p>
              <Link 
                href="/socials" 
                className="inline-flex items-center gap-2 text-[#8B5A2B] hover:text-[#A0662F] transition-colors text-sm font-medium"
              >
                View All Socials <span>→</span>
              </Link>
            </div>
          </ScrollAnimation>

          {/* Bottom Bar */}
          <ScrollAnimation animation="fadeUp" delay={0.2} className="pt-8 border-t border-[#FAF3E0]/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="font-serif text-sm text-[#FAF3E0]/70">
                  © {currentYear} miiyuh 🍁 | made with ❤️ in malaysia! 🇲🇾
                </p>
                <p className="text-xs text-[#FAF3E0]/50 mt-1">
                  Built with Next.js, Tailwind CSS, and lots of coffee ☕
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs">
                <Link 
                  href="/privacy-policy" 
                  className="text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-[#FAF3E0]/30">•</span>
                <Link 
                  href="/terms-of-service" 
                  className="text-[#FAF3E0]/70 hover:text-[#8B5A2B] transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-[#FAF3E0]/30">•</span>
                <span className="text-[#FAF3E0]/50">
                  v1.0.0
                </span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </footer>
  )
}
