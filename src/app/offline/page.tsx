'use client'

import { TypewriterText } from '@/components/animated-text'
import { ParallaxElement } from '@/components/parallax-effects'
import { ScrollAnimation } from '@/components/scroll-animations'

export default function OfflinePage() {
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF3E0] via-transparent to-[#FAF3E0]" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#FAF3E0]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-[#FAF3E0]/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#FAF3E0]/10 rounded-full animate-pulse delay-500" />
      </div>

      <ParallaxElement speed={0.3} direction="up">
        <div className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            
            <ScrollAnimation animation="fadeUp" delay={0}>
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#2A2A2A] border-2 border-[#FAF3E0]/20 flex items-center justify-center">
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-[#FAF3E0]/70"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    />
                    <path 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M8 12h8"
                    />
                  </svg>
                </div>
                
                <TypewriterText 
                  text="you're offline" 
                  className="text-4xl md:text-5xl font-bold tracking-tight font-sans mb-4"
                  speed={100}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={200}>
              <div className="bg-[#2A2A2A] rounded-lg p-8 border border-[#FAF3E0]/10">
                <p className="font-serif text-xl leading-relaxed text-[#FAF3E0]/90 mb-4">
                  looks like you&apos;ve lost your internet connection. no worries though – some parts of the site are still available!
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={400}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h3 className="font-bold text-lg mb-3 text-[#FAF3E0]">what you can do:</h3>
                  <ul className="space-y-2 text-[#FAF3E0]/80 text-left">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0] rounded-full mr-3"></span>
                      browse cached pages
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0] rounded-full mr-3"></span>
                      view saved content
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0] rounded-full mr-3"></span>
                      check connection settings
                    </li>
                  </ul>
                </div>

                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]/50">
                  <h3 className="font-bold text-lg mb-3 text-[#FAF3E0]">when you&apos;re back online:</h3>
                  <ul className="space-y-2 text-[#FAF3E0]/80 text-left">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0]/50 rounded-full mr-3"></span>
                      refresh for latest content
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0]/50 rounded-full mr-3"></span>
                      sync any pending data
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FAF3E0]/50 rounded-full mr-3"></span>
                      enjoy full functionality
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#FAF3E0] text-[#1A1A1A] px-6 py-3 rounded-lg font-semibold hover:bg-[#FAF3E0]/90 transition-colors"
                >
                  try again
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="bg-[#2A2A2A] text-[#FAF3E0] px-6 py-3 rounded-lg font-semibold hover:bg-[#333333] transition-colors border border-[#FAF3E0]/20"
                >
                  go back
                </button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={800}>
              <div className="mt-8 text-center">
                <p className="text-[#FAF3E0]/60 text-sm">
                  this page works offline thanks to service worker caching
                </p>
              </div>
            </ScrollAnimation>

          </div>
        </div>
      </ParallaxElement>
    </main>
  )
}
