'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MalaysiaFlag } from '@/utils'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      
      {/* Interactive dots background */}
      <InteractiveDotsBackground />
      {/* 🧩 Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">

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
                <span className="text-[#FAF3E0]/90">about me</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 flex justify-center group">
              <Image
                src="/assets/img/kazuha.png"
                alt="Kazuha character illustration"
                width={300}
                height={300}
                loading="lazy"
                quality={85}
              />
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                  about me 🍁
                </h1>
                
                {/* Decorative line */}
                <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mx-auto lg:mx-0 mb-6"></div>
              </div>
              
              <div className="space-y-6">
                <p className="font-serif text-xl leading-relaxed tracking-tight text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300">
                  i am rather a not-so-interesting person. very basic to be honest. when i have free time, i usually play games and maybe sometimes draw, depends on my mood. also, i sleep a LOT. any time i see fit, i would sleep. sleeping is the best, could not argue about it :&gt;
                </p>
                
                {/* Fun stats cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105">
                    <div className="text-lg mb-1 font-emoji">🎮</div>
                    <p className="text-xs font-serif text-[#FAF3E0]/70">gaming enthusiast</p>
                  </div>
                  
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105">
                    <div className="text-lg mb-1 font-emoji">🎨</div>
                    <p className="text-xs font-serif text-[#FAF3E0]/70">occasional artist</p>
                  </div>
                  
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105">
                    <div className="text-lg mb-1 font-emoji">😴</div>
                    <p className="text-xs font-serif text-[#FAF3E0]/70">sleep lover</p>
                  </div>
                  
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105">
                    <div className="text-lg mb-1 font-emoji">
                      <MalaysiaFlag />
                    </div>
                    <p className="text-xs font-serif text-[#FAF3E0]/70">from malaysia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            just being me ✨
          </p>
        </div>
      </section>

    </main>
  )
}
