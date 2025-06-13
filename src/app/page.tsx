'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'
import { useEffect, useState, useRef } from 'react'
import { TypewriterText, AnimatedHeading } from '@/components/animated-text'
import { ParallaxElement } from '@/components/parallax-effects'
import { ScrollAnimation } from '@/components/scroll-animations'

export default function HomePage() {  const playClick = useSound('/sounds/click.mp3', 0.7)
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasMouseMoved, setHasMouseMoved] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
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

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'good morning! 🌅'
    if (hour < 17) return 'good afternoon! ☀️'
    if (hour < 21) return 'good evening! 🌆'
    return 'good night! 🌙'
  }

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <>
      <Head>
        <title>miiyuh&apos;s webpage</title>
        <meta
          name="description"
          content="welcome to miiyuh's webpage. explore about me, my socials, pictures taken by me, and my blog."
        />
      </Head>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParallaxElement speed={0.3} direction="up">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FAF3E0]/5 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.5} direction="down">
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="left">
          <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </ParallaxElement>
      </div>

      {/* Main full height container */}
      <main className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Inner content centered */}
        <div className={`flex flex-col items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Dynamic greeting with typewriter effect */}
          {mounted && (
            <ScrollAnimation animation="fadeIn" className="mt-8 md:mt-16 mb-16 text-center">
              <AnimatedHeading variant="fade" delay={0.2}>
                <TypewriterText 
                  text={[getGreeting(), "welcome to my space 💫", getGreeting()]}
                  className="font-serif text-lg text-[#FAF3E0]/80 mb-2"
                  speed={100}
                  repeat={false}
                />
              </AnimatedHeading>
              <p className="font-mono text-sm text-[#FAF3E0]/60">current time: {timeString}</p>
            </ScrollAnimation>
          )}          {/* Logo with limited 3D mouse-following effect */}
          <ScrollAnimation animation="scale" delay={0.5} className="mb-16 group">
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
                src="/assets/img/logo_miiyuh_text_white_v2.png"
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
          <ScrollAnimation animation="fadeUp" delay={0.8} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
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
                      {link.href === '/blog' && '📰'}
                    </div>
                    <h3 className="font-bold text-sm mb-1 lowercase tracking-tighter group-hover:text-[#FAF3E0] transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif group-hover:text-[#FAF3E0]/90 transition-colors duration-300">
                      {link.href === '/aboutme' && 'get to know me better'}
                      {link.href === '/socials' && 'find me everywhere'}
                      {link.href === '/gallery' && 'photos & artwork'}
                      {link.href === '/blog' && 'my thoughts & stories'}
                    </p>
                  </div>
                  
                  {/* Enhanced hover indicator */}
                  <div className="absolute bottom-2 left-4 w-0 h-0.5 bg-gradient-to-r from-[#FAF3E0]/50 to-transparent group-hover:w-6 transition-all duration-300"></div>
                </Link>
              </ScrollAnimation>
            ))}
          </ScrollAnimation>

          {/* Fun interactive element */}
          <ScrollAnimation animation="fadeIn" delay={1.5} className="mt-12 text-center mb-16">
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