'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function MiyabiPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">

      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex items-center justify-start">

        <div className={`flex flex-col items-start text-left transition-all duration-1000 max-w-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  projects
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">miyabi</span>
              </li>
            </ol>
          </nav>

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
          <div className="w-48 h-48 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center mb-8 group hover:bg-[#FAF3E0]/15 transition-all duration-300 overflow-hidden">
            <Image 
              src="/assets/img/projects/miyabi-logo.png"
              alt="miyabi logo"
              width={192}
              height={192}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Project Info */}
          <h1 className="text-4xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
            miyabi
          </h1>
          
          <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
            A collection of Minecraft builds and architectural creations that embody the Japanese aesthetic of sophisticated beauty. 
            Each build focuses on creating harmonious and graceful structures within the Minecraft world.
          </p>

          {/* Organization Info */}
          <div className="flex flex-wrap gap-4 mb-8 justify-start">
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Type: Minecraft Builds
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Focus: Architecture
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Style: Japanese Aesthetic
            </span>
          </div>

          {/* Projects Preview */}
          <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-[#FAF3E0]">Featured Builds</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#FAF3E0]/80">
                <span className="text-sm">🏯</span>
                <span className="text-sm font-serif">Traditional Castle Complex - In Progress</span>
              </div>
              <div className="flex items-center gap-3 text-[#FAF3E0]/80">
                <span className="text-sm">🌸</span>
                <span className="text-sm font-serif">Cherry Blossom Garden - Concept</span>
              </div>
              <div className="flex items-center gap-3 text-[#FAF3E0]/80">
                <span className="text-sm">⛩️</span>
                <span className="text-sm font-serif">Shrine Complex - Planning</span>
              </div>
            </div>
          </div>

          {/* Organization Description */}
          <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10">
            <p className="text-[#FAF3E0]/80 font-serif text-left">
              🌸 Embracing the art of elegant simplicity in Minecraft architecture. This organization focuses on creating refined builds that capture the essence of traditional Japanese design principles.
            </p>
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            building worlds with elegance �️
          </p>
        </div>
      </section>

    </main>
  )
}
