'use client'

import { useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { ScrollAnimation } from '@/components/scroll-animations'
import { ParallaxElement } from '@/components/parallax-effects'
import { TypewriterText, AnimatedHeading } from '@/components/animated-text'

export default function BlogPage() {
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
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FAF3E0]/3 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.5} direction="down">
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#FAF3E0]/2 rounded-full blur-2xl animate-bounce" style={{animationDuration: '7s'}}></div>
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left">
          <div className="absolute top-2/3 left-1/5 w-56 h-56 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </ParallaxElement>
      </div>      {/* 🧩 Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col justify-center">
        
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header Section */}
          <ScrollAnimation animation="fadeUp" className="mb-12">
            <div className="mb-6">
              <AnimatedHeading variant="slide">
                <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                  <TypewriterText text="blog 📰" speed={100} />
                </h1>
              </AnimatedHeading>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
              <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              this is where i will post my blog, if i have any.
            </p>
          </ScrollAnimation>

          {/* Enhanced iframe container */}
          <ScrollAnimation animation="scale" delay={0.3} className="w-full group">
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
          </ScrollAnimation>
        </div>

        {/* Fun interactive element */}
        <ScrollAnimation animation="fadeIn" delay={0.5}>
          <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
            <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
              words & wanderings ✍️
            </p>
          </div>
        </ScrollAnimation>
      </section>

    </main>
  )
}
