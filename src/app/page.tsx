'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { NAVIGATION_LINKS } from '@/constants'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const playClick = useSound('/sounds/click.mp3', 0.7)
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
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
      </Head>      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FAF3E0]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main full height container */}
      <main className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 xl:px-32" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Inner content centered */}
        <div className={`flex flex-col items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Dynamic greeting */}
          {mounted && (
            <div className="mb-8 text-center">
              <p className="font-serif text-lg text-[#FAF3E0]/80 mb-2">{getGreeting()}</p>
              <p className="font-mono text-sm text-[#FAF3E0]/60">current time: {timeString}</p>
            </div>
          )}          {/* Logo with enhanced styling */}
          <div className="mb-16 group">
            <Image
              src="/assets/img/logo_miiyuh_text_white_v2.png"
              alt="miiyuh - personal webpage logo"
              width={480}
              height={120}
              className="mx-auto w-96 md:w-[30rem] transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              priority
              quality={90}
            />
          </div>          {/* Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
            {NAVIGATION_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={playClick}
                className={`group bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 hover:bg-[#FAF3E0]/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                style={{
                  animationDelay: mounted ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className="text-left">
                  <div className="text-xl mb-2 group-hover:scale-110 transition-transform duration-300 font-emoji">
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
                
                {/* Subtle hover indicator */}
                <div className="absolute bottom-2 left-4 w-0 h-0.5 bg-[#FAF3E0]/50 group-hover:w-6 transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Fun interactive element */}
          <div className="mt-12 text-center">
            <p className="font-serif text-sm text-[#FAF3E0]/50 hover:text-[#FAF3E0]/80 transition-colors duration-300 cursor-default">
              welcome to my little corner on the internet 💫
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
