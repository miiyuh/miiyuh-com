'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'

const projects = [
  {
    id: 'shingeki',
    name: 'Project Shingeki',
    description: 'Attack on Titan inspired project',
    image: '/assets/img/projects/shingeki-logo.png',
    href: '/projects/shingeki'
  },
  {
    id: '2alpha',
    name: '2Alpha',
    description: 'Alpha phase development project',
    image: '/assets/img/projects/2alpha-logo.png',
    href: '/projects/2alpha'
  },
  {
    id: 'miyabi',
    name: 'Miyabi',
    description: 'Elegant and refined project',
    image: '/assets/img/projects/miyabi-logo.png',
    href: '/projects/miyabi'
  }
]

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/5 left-1/4 w-72 h-72 bg-[#FAF3E0]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-56 h-56 bg-[#FAF3E0]/3 rounded-full blur-2xl animate-bounce" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-2/3 left-1/2 w-40 h-40 bg-[#FAF3E0]/2 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Main Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 flex flex-col justify-center min-h-screen">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header Section */}
          <div className="mb-16 text-left">
            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                projects 🚀
              </h1>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              personal projects and creative endeavors that I&apos;ve been working on.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700`}
                style={{
                  animationDelay: mounted ? `${index * 200}ms` : '0ms'
                }}
              >
                <Link
                  href={project.href}
                  onClick={playClick}
                  className="group block h-full"
                >
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-8 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FAF3E0]/10 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 h-full flex flex-col">
                    
                    {/* Project Image */}
                    <div className="aspect-square mb-6 flex items-center justify-center bg-[#FAF3E0]/5 rounded-lg overflow-hidden">
                      <div className="w-20 h-20 bg-[#FAF3E0]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {/* Enhanced placeholder icons */}
                        {project.id === 'shingeki' && (
                          <span className="text-3xl font-bold text-[#FAF3E0]/70">⚔️</span>
                        )}
                        {project.id === '2alpha' && (
                          <span className="text-2xl font-bold text-[#FAF3E0]/70">2α</span>
                        )}
                        {project.id === 'miyabi' && (
                          <span className="text-3xl font-bold text-[#FAF3E0]/70">雅</span>
                        )}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="text-left flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-3 group-hover:text-[#FAF3E0] transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-sm text-[#FAF3E0]/70 font-serif group-hover:text-[#FAF3E0]/90 transition-colors duration-300 mb-4">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* View Project Button */}
                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 text-xs text-[#FAF3E0]/60 group-hover:text-[#FAF3E0]/80 transition-colors duration-300">
                          <span>view project</span>
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-[#FAF3E0]/50 to-transparent group-hover:w-full transition-all duration-500"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            building the future ✨
          </p>
        </div>
      </section>

    </main>
  )
}
