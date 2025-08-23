'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false)
  const [isOnlineMode, setIsOnlineMode] = useState(true)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    setIsOnlineMode(!isOnlineMode)
    playClick()
  }

  // Content for online mode
  const onlineContent = {
    description: "i am rather a not-so-interesting person. very basic to be honest. when i have free time, i usually play games and maybe sometimes draw, depends on my mood. also, i sleep a LOT. any time i see fit, i would sleep. sleeping is the best, could not argue about it :>",
    image: "/assets/img/kazuha.png",
    imageAlt: "Kazuha character illustration",
    subtitle: "digital wanderer",
    highlights: [
      { icon: "🎮", title: "Gaming Enthusiast", desc: "RPGs, strategy games, and indie titles" },
      { icon: "🎨", title: "Digital Artist", desc: "Occasional sketches and digital art" },
      { icon: "😴", title: "Sleep Connoisseur", desc: "Professional at finding cozy spots" },
      { icon: "🌙", title: "Night Owl", desc: "Most productive during late hours" }
    ]
  }

  // Content for real life mode
  const realLifeContent = {
    description: "Starting fresh with a commitment to health, growth, and showing up for people who matter. I'm a computer forensics student at MSU Malaysia who believes in trying things, learning from failures, and keeping moving forward. I care deeply about Malaysia's development—better public transport, people-first policies, cleaner air, and fairer opportunities. In tech, I use AI as a tool with transparency and human oversight, contribute to open-source, and share learnings publicly. My philosophy centers on ethics, meaning, and how we live together.",
    image: "/assets/img/personal-profile-pic.png",
    imageAlt: "Professional profile",
    subtitle: "student, thinker, builder",
    highlights: [
      { icon: "🎓", title: "Computer Forensics Student", desc: "MSU Malaysia - learning tech, security, and digital investigation" },
      { icon: "🇲🇾", title: "Malaysia Advocate", desc: "Working toward better transport, policies, and environment" },
      { icon: "💻", title: "Ethical Tech Builder", desc: "AI as a tool, open-source contributor, transparency first" },
      { icon: "📚", title: "Philosophy Explorer", desc: "Ethics, meaning, responsibility - influenced by Attack on Titan & Vinland Saga" }
    ]
  }

  const currentContent = isOnlineMode ? onlineContent : realLifeContent

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      
      {/* Interactive dots background */}
      <InteractiveDotsBackground />
      
      {/* Page Content */}
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

          {/* Header Section */}
          <div className="mb-16 text-left">
            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                about me <span className="emoji-primary">🍁</span>
              </h1>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
            
            {/* Subtitle and Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-serif text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300">
                {currentContent.subtitle}
              </div>
              
              {/* Minimalist Toggle */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono uppercase tracking-wider text-[#FAF3E0] font-bold">
                  [{isOnlineMode ? 'online' : 'real life'}]
                </span>
                <button
                  onClick={handleToggle}
                  className="relative w-16 h-8 border-2 border-[#FAF3E0]/30 transition-all duration-300 hover:border-[#FAF3E0]/60 focus:outline-none focus:border-[#FAF3E0]"
                  aria-label={`Switch to ${isOnlineMode ? 'real life' : 'online'} mode`}
                >
                  <div className={`absolute top-0 left-0 w-6 h-6 bg-[#FAF3E0] transition-transform duration-300 ${
                    isOnlineMode ? 'translate-x-0' : 'translate-x-8'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Image Section */}
            <div className={`transition-all duration-700 ${
              isOnlineMode ? 'lg:order-1' : 'lg:order-1'
            }`}>
              <div className="border border-[#FAF3E0]/20 p-4 lg:p-6 h-full flex flex-col justify-center">
                {isOnlineMode ? (
                  <div className="w-full max-w-48 mx-auto lg:max-w-56">
                    <Image
                      src={currentContent.image}
                      alt={currentContent.imageAlt}
                      width={200}
                      height={200}
                      loading="lazy"
                      quality={90}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="aspect-square overflow-hidden w-full max-w-48 mx-auto lg:max-w-56">
                    <Image
                      src={currentContent.image}
                      alt={currentContent.imageAlt}
                      width={200}
                      height={200}
                      loading="lazy"
                      quality={90}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className={`space-y-6 lg:space-y-8 transition-all duration-700 ${
              isOnlineMode ? 'lg:order-2' : 'lg:order-2'
            }`}>
              
              {/* Description */}
              <div className="border border-[#FAF3E0]/20 p-6">
                <p className="font-serif text-base leading-relaxed text-[#FAF3E0]/90">
                  {currentContent.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#FAF3E0]/90">
                  Details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentContent.highlights.map((highlight, index) => (
                    <div
                      key={`${isOnlineMode ? 'online' : 'reallife'}-${index}`}
                      className="border border-[#FAF3E0]/20 p-4 transition-all duration-300 hover:bg-[#FAF3E0]/5 hover:border-[#FAF3E0]/40"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-xl font-emoji flex-shrink-0 mt-0.5">
                          {highlight.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-2 text-[#FAF3E0] leading-tight">
                            {highlight.title}
                          </h4>
                          <p className="text-xs text-[#FAF3E0]/70 font-serif leading-relaxed">
                            {highlight.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
