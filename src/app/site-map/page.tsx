'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Breadcrumb } from '@/components/breadcrumb'
import { TypewriterText } from '@/components/animated-text'
import { ParallaxElement } from '@/components/parallax-effects'

interface SiteMapItem {
  title: string
  url: string
  description: string
  icon: string
  category: 'main' | 'info' | 'external'
}

const siteMapItems: SiteMapItem[] = [
  {
    title: 'Home',
    url: '/',
    description: 'Welcome page and navigation hub',
    icon: '🏠',
    category: 'main'
  },
  {
    title: 'About Me',
    url: '/aboutme',
    description: 'Learn more about me, my journey, and skills',
    icon: '👤',
    category: 'main'
  },
  {
    title: 'Socials',
    url: '/socials',
    description: 'Find me on various social platforms',
    icon: '🌐',
    category: 'main'
  },
  {
    title: 'Gallery',
    url: '/gallery',
    description: 'Photography and artwork collection',
    icon: '🖼️',
    category: 'main'
  },
  {
    title: 'Blog',
    url: '/blog',
    description: 'My thoughts, stories, and updates',
    icon: '📝',
    category: 'main'
  },
  {
    title: 'Privacy Policy',
    url: '/privacy-policy',
    description: 'How I handle your privacy and data',
    icon: '🔒',
    category: 'info'
  },
  {
    title: 'Terms of Service',
    url: '/terms-of-service',
    description: 'Terms and conditions for using this site',
    icon: '📋',
    category: 'info'
  }
]

const categoryTitles = {
  main: 'Main Pages',
  info: 'Legal & Info',
  external: 'External Links'
}

const categoryColors = {
  main: 'border-[#8B5A2B]/30 hover:border-[#8B5A2B]/50',
  info: 'border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40',
  external: 'border-[#FAF3E0]/30 hover:border-[#FAF3E0]/50'
}

export default function SiteMapPage() {
  const groupedItems = siteMapItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, SiteMapItem[]>)

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-[#FAF3E0] relative">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParallaxElement speed={0.2} direction="up">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FAF3E0]/5 rounded-full blur-3xl animate-pulse"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down">
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="left">
          <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-[#FAF3E0]/4 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </ParallaxElement>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <Breadcrumb />
        
        {/* Header */}
        <ScrollAnimation animation="fadeUp" className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">
            <TypewriterText text="site map 🗺️" speed={100} />
          </h1>
          <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mx-auto mb-6"></div>
          <p className="font-serif text-xl text-[#FAF3E0]/80">
            Navigate through all available pages and sections
          </p>
        </ScrollAnimation>

        {/* Site Map Grid */}
        <div className="max-w-6xl mx-auto">
          {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
            <ScrollAnimation
              key={category}
              animation="fadeUp"
              delay={categoryIndex * 0.2}
              className="mb-12"
            >
              <h2 className="text-2xl font-serif text-[#FAF3E0] mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#8B5A2B]"></span>
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <ScrollAnimation
                    key={item.url}
                    animation="scale"
                    delay={categoryIndex * 0.2 + index * 0.1}
                  >
                    <Link href={item.url}>
                      <motion.div
                        className={`group bg-[#FAF3E0]/5 backdrop-blur-sm border rounded-lg p-6 transition-all duration-300 hover:bg-[#FAF3E0]/10 hover:scale-105 hover:-translate-y-1 cursor-pointer ${categoryColors[item.category as keyof typeof categoryColors]}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Icon and Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <span className="text-3xl font-emoji group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-[#FAF3E0] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[#FAF3E0]/70 group-hover:text-[#FAF3E0]/90 transition-colors font-serif">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* URL */}
                        <div className="mt-4 pt-4 border-t border-[#FAF3E0]/10">
                          <code className="text-xs text-[#FAF3E0]/50 font-mono">
                            {item.url}
                          </code>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[#FAF3E0]/50 text-sm">→</span>
                        </div>
                      </motion.div>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Footer Note */}
        <ScrollAnimation animation="fadeIn" delay={1} className="text-center mt-16">
          <div className="bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#FAF3E0]/20 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="font-serif text-[#FAF3E0]/70 mb-4">
              This site map provides an overview of all available pages and sections. 
              If you can't find what you're looking for, feel free to explore or contact me through my socials.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-[#8B5A2B]/20 rounded-full text-[#FAF3E0]/80">
                {siteMapItems.length} pages total
              </span>
              <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-[#FAF3E0]/80">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  )
}
