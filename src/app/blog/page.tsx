'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">

      {/* Interactive dots background */}
      <InteractiveDotsBackground />      {/* 🧩 Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col justify-center">
        
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">blog</span>
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <div className="mb-12">
            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                blog <span className="emoji-primary">📰</span>
              </h1>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              this is where i will post my blog, if i have any.
            </p>
          </div>

          {/* Enhanced iframe container */}
          <div className="w-full group">
            <div className="relative">
              <iframe
                src="https://miiyuh.blogspot.com/"
                className="w-full h-[1000px] rounded-lg border border-[#FAF3E0]/20 transition-all duration-500 group-hover:border-[#FAF3E0]/40 group-hover:shadow-2xl group-hover:shadow-[#FAF3E0]/10"
                loading="lazy"
                title="miiyuh's blog"
              ></iframe>
              
              {/* Subtle overlay for better integration */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#1A1A1A]/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>


      </section>

    </main>
  )
}
