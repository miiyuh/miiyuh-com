'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasMouseMoved, setHasMouseMoved] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect()
        const imageCenterX = imageRect.left + imageRect.width / 2
        const imageCenterY = imageRect.top + imageRect.height / 2
        
        // Calculate relative position (-1 to 1)
        const deltaX = (e.clientX - imageCenterX) / (imageRect.width / 2)
        const deltaY = (e.clientY - imageCenterY) / (imageRect.height / 2)
        
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
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FAF3E0]/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-[#FAF3E0]/2 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-32 h-32 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
        {/* 🧩 Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex items-center justify-center">

        <div className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex justify-center group">
            <div 
              ref={imageRef}
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
            >
              <Image
                src="/assets/img/kazuha.png"
                alt="Kazuha character illustration"
                width={300}
                height={300}
                loading="lazy"
                quality={85}
                className="transition-all duration-500 group-hover:scale-105"
                style={{ backfaceVisibility: 'hidden' }}
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">            <div className="mb-6">
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
                  <div className="text-lg mb-1 font-emoji">🇲🇾</div>
                  <p className="text-xs font-serif text-[#FAF3E0]/70">from malaysia</p>
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
