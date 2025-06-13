'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { InteractiveTimeline } from '@/components/interactive-timeline'
import { SkillsRadar } from '@/components/skills-radar'
import { MusicTaste } from '@/components/music-taste'
import { ScrollAnimation } from '@/components/scroll-animations'
import { ParallaxElement } from '@/components/parallax-effects'
import { TypewriterText, AnimatedHeading } from '@/components/animated-text'

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      
      {/* Breadcrumb Navigation */}
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 pt-8">
        <Breadcrumb />
      </div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParallaxElement speed={0.2} direction="up">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FAF3E0]/3 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down">
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-[#FAF3E0]/2 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}}></div>
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="right">
          <div className="absolute top-3/4 right-1/3 w-32 h-32 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </ParallaxElement>
      </div>        {/* 🧩 Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex items-center justify-center">

        <div className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left Image */}
          <ScrollAnimation animation="slideLeft" delay={0.2} className="w-full lg:w-1/2 flex justify-center group">
            <Image
              src="/assets/img/kazuha.png"
              alt="Kazuha character illustration"
              width={300}
              height={300}
              loading="lazy"
              quality={85}
              className="transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
            />
          </ScrollAnimation>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <ScrollAnimation animation="slideRight" delay={0.4}>
              <div className="mb-6">
                <AnimatedHeading variant="slide" delay={0.6}>
                  <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                    <TypewriterText text="about me 🍁" className="" speed={100} />
                  </h1>
                </AnimatedHeading>
                
                {/* Decorative line */}
                <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mx-auto lg:mx-0 mb-6"></div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fadeUp" delay={0.8} className="space-y-6">
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
                  <div className="text-lg mb-1 font-emoji">🇲🇾</div>
                  <p className="text-xs font-serif text-[#FAF3E0]/70">from malaysia</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="px-6 md:px-12 lg:px-24 xl:px-32 py-16">
        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl font-serif text-[#FAF3E0] text-center mb-12">
            <TypewriterText text="my journey so far 🗺️" speed={100} />
          </h2>
        </ScrollAnimation>        <InteractiveTimeline events={[]} />
      </section>      {/* Skills & Music Section - Side by Side */}
      <section className="px-6 md:px-12 lg:px-24 xl:px-32 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <SkillsRadar />
          <MusicTaste />
        </div>
      </section>

      {/* Fun interactive element */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
        <ScrollAnimation animation="fadeIn" delay={1.2}>
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            just being me ✨
          </p>
        </ScrollAnimation>
      </div>

    </main>
  )
}
