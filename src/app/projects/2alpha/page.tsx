'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'

export default function TwoAlphaPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#FAF3E0]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-2/3 left-1/5 w-40 h-40 bg-[#FAF3E0]/2 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex items-center justify-start">

        <div className={`flex flex-col items-start text-left transition-all duration-1000 max-w-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Back button */}
          <div className="w-full mb-8">
            <Link
              href="/projects"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to projects
            </Link>
          </div>

          {/* Project Logo/Image */}
          <div className="w-48 h-48 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center mb-8 group hover:bg-[#FAF3E0]/15 transition-all duration-300">
            <div className="text-center">
              <span className="text-3xl font-bold text-[#FAF3E0]/70 group-hover:text-[#FAF3E0] transition-colors duration-300 block">
                2α
              </span>
            </div>
          </div>

          {/* Project Info */}
          <h1 className="text-4xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
            2Alpha
          </h1>
          
          <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
            A cutting-edge development project in its alpha phase. Exploring new technologies and 
            innovative solutions with a focus on performance and user experience.
          </p>

          {/* Project Status */}
          <div className="flex flex-wrap gap-4 mb-8 justify-start">
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Status: Alpha Phase
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Type: Web Application
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Year: 2025
            </span>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10">
            <p className="text-[#FAF3E0]/80 font-serif text-left">
              🧪 Currently in alpha testing phase. Stay tuned for updates and beta releases!
            </p>
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            alpha phase active 🔬
          </p>
        </div>
      </section>

    </main>
  )
}
