'use client'

import Link from 'next/link'
import { ScrollAnimation } from './scroll-animations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (    <footer className="bg-[#FAF3E0]/5 backdrop-blur-sm border-t border-[#FAF3E0]/10 mt-auto">
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Bottom Bar */}
          <ScrollAnimation animation="fadeUp">
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
                  className="text-[#FAF3E0]/70 hover:text-[#F59E0B] transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-[#FAF3E0]/30">•</span>
                <Link 
                  href="/terms-of-service" 
                  className="text-[#FAF3E0]/70 hover:text-[#F59E0B] transition-colors"
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
