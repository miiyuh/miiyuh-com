'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'
import { useEffect, useState, useRef } from 'react'
import { TypewriterText } from '@/components/effects/animated-text'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function HomePage() {  const playClick = useSound('/sounds/click.mp3', 0.7)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasMouseMoved, setHasMouseMoved] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const logoRect = logoRef.current.getBoundingClientRect()
        const logoCenterX = logoRect.left + logoRect.width / 2
        const logoCenterY = logoRect.top + logoRect.height / 2
        
        // Calculate relative position (-1 to 1)
        const deltaX = (e.clientX - logoCenterX) / (logoRect.width / 2)
        const deltaY = (e.clientY - logoCenterY) / (logoRect.height / 2)
        
        // Limit the tilt range and convert to degrees
        const maxTilt = 15 // Reduced maximum tilt for subtler effect
        const limitedDeltaX = Math.max(-1, Math.min(1, deltaX)) // Clamp between -1 and 1
        const limitedDeltaY = Math.max(-1, Math.min(1, deltaY)) // Clamp between -1 and 1
        
        const rotateY = limitedDeltaX * maxTilt // Horizontal mouse movement = Y-axis rotation
        const rotateX = -limitedDeltaY * maxTilt // Vertical mouse movement = X-axis rotation (inverted)
        
        setMousePosition({ x: rotateX, y: rotateY })
        setHasMouseMoved(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <Head>
        <title>miiyuh&apos;s webpage</title>
        <meta
          name="description"
          content="welcome to miiyuh's webpage. explore about me, my socials, pictures taken by me, and my blog."
        />
      </Head>

      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Main full height container */}
      <main className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Inner content centered */}
        <div className={`flex flex-col items-center justify-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Logo with limited 3D mouse-following effect */}
          <ScrollAnimation animation="scale" delay={0.3} className="mb-8 group">
            <div 
              ref={logoRef}
              className="relative"
              style={{
                transform: hasMouseMoved 
                  ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
                  : `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
                transition: hasMouseMoved 
                  ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  : 'transform 0.6s ease-out',
                transformStyle: 'preserve-3d'
              }}
            >              <Image
                src="/assets/img/logo_miiyuh_v4-white_with-border.png"
                alt="miiyuh - personal webpage logo"
                width={480}
                height={120}
                className="mx-auto w-96 md:w-[30rem] transition-all duration-500 group-hover:scale-105"
                priority
                quality={90}
                style={{ backfaceVisibility: 'hidden' }}
              />
            </div>
          </ScrollAnimation>

          {/* Navigation Cards */}
          <ScrollAnimation animation="fadeUp" delay={0.8} className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl mb-8">
            {NAVIGATION_LINKS.map((link, index) => (
              <ScrollAnimation
                key={link.href}
                animation="fadeUp"
                delay={1 + index * 0.15}
              >
                <Link
                  href={link.href}
                  onClick={playClick}
                  className="group relative bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 block focus:outline-none"
                >                  <div className="text-left">
                    <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 font-emoji" style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>
                      {link.href === '/aboutme' && '🍁'}
                      {link.href === '/socials' && '✨'}
                      {link.href === '/gallery' && '📸'}
                      {link.href === '/projects' && '🚀'}
                      {link.href === '/blog' && '📰'}
                    </div>
                    <h3 className="font-bold text-sm mb-1 lowercase tracking-tighter group-hover:text-[#FAF3E0] transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif group-hover:text-[#FAF3E0]/90 transition-colors duration-300">
                      {link.href === '/aboutme' && 'get to know me better'}
                      {link.href === '/socials' && 'find me everywhere'}
                      {link.href === '/gallery' && 'photos & artwork'}
                      {link.href === '/projects' && 'creative organizations'}
                      {link.href === '/blog' && 'my thoughts & stories'}
                    </p>
                  </div>
                  
                  {/* Enhanced hover indicator */}
                  <div className="absolute bottom-2 left-4 w-0 h-0.5 bg-gradient-to-r from-[#FAF3E0]/50 to-transparent group-hover:w-6 transition-all duration-300"></div>
                </Link>
              </ScrollAnimation>
            ))}
          </ScrollAnimation>

          {/* Development disclaimer */}
          <ScrollAnimation animation="fadeIn" delay={1.3} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#FAF3E0]/20 rounded-lg px-4 py-2">
              <div className="text-sm" style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>
                🚧
              </div>
              <p className="text-xs text-[#FAF3E0]/70 font-serif">
                website is currently in heavy development
              </p>
            </div>
          </ScrollAnimation>

          {/* Fun interactive element */}
          <ScrollAnimation animation="fadeIn" delay={1.5} className="text-center">
            <TypewriterText 
              text="welcome to my little corner on the internet 💫"
              className="font-serif text-sm text-[#FAF3E0]/50 hover:text-[#FAF3E0]/80 transition-colors duration-300 cursor-default"
              speed={80}
            />
          </ScrollAnimation>
        </div>
      </main>
    </>
  )
}