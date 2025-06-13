'use client'

import Image from 'next/image'
import { SOCIAL_PLATFORMS } from '@/constants'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { ScrollAnimation } from '@/components/scroll-animations'
import { ParallaxElement } from '@/components/parallax-effects'
import { TypewriterText, AnimatedHeading } from '@/components/animated-text'

export default function SocialsPage() {
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
        <ParallaxElement speed={0.3} direction="up">
          <div className="absolute top-1/5 left-1/5 w-72 h-72 bg-[#FAF3E0]/4 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down">
          <div className="absolute bottom-1/4 right-1/5 w-56 h-56 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '5s'}}></div>
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="left">
          <div className="absolute top-2/3 left-1/2 w-40 h-40 bg-[#FAF3E0]/2 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </ParallaxElement>
      </div>      {/* Main Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header Section */}
          <ScrollAnimation animation="fadeUp" className="mb-16 text-left">
            <div className="mb-6">
              <AnimatedHeading variant="slide">
                <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                  <TypewriterText text="socials ✨" speed={100} />
                </h1>
              </AnimatedHeading>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
              <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              my accounts, duh.
            </p>
          </ScrollAnimation>

          {/* Enhanced Social Icons Grid */}
          <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 text-center">
            {SOCIAL_PLATFORMS.map((social, index) => (
              <ScrollAnimation
                key={social}
                animation="scale"
                delay={0.1 + index * 0.05}
                className="transition-all duration-500"
              >
                <a
                  href={`/${social}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative">
                    <Image
                      src={`/assets/img/social_media_icons/${social}.png`}
                      alt={social}
                      width={96}
                      height={96}
                      className="mx-auto w-24 group-hover:scale-110 transition-all duration-300 group-hover:brightness-110 group-hover:-translate-y-1"
                      loading="lazy"
                      quality={85}
                    />
                    
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-[#FAF3E0]/5 rounded-lg scale-0 group-hover:scale-125 transition-transform duration-300 -z-10"></div>
                  </div>
                  {/* Platform name on hover */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-serif text-[#FAF3E0]/80">
                      {social.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
                    </p>
                  </div>
                </a>
              </ScrollAnimation>
            ))}
          </section>
        </div>

        {/* Fun interactive element */}
        <ScrollAnimation animation="fadeIn" delay={1}>
          <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
            <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
              social butterfly mode 🦋
            </p>
          </div>
        </ScrollAnimation>
      </section>
    </main>
  )
}
