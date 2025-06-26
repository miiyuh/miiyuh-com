'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const organizations = [
  {
    id: 'shingeki',
    name: 'studio shingeki',
    description: 'Attack on Titan inspired creative works and projects',
    image: '/assets/img/projects/shingeki-logo.png',
    href: '/projects/shingeki'
  },
  {
    id: '2alpha',
    name: '2alpha',
    description: 'Development and experimental projects in alpha phase',
    image: '/assets/img/projects/2alpha-logo.png',
    href: '/projects/2alpha'
  },
  {
    id: 'miyabi',
    name: 'miyabi',
    description: 'Minecraft builds and architectural creations',
    image: '/assets/img/projects/miyabi-logo.png',
    href: '/projects/miyabi'
  }
]

const academicProjects = [
  {
    id: 'university-projects',
    name: 'University Projects',
    description: 'Academic coursework and research projects from university',
    icon: '🎓',
    href: '/projects/academic'
  },
  {
    id: 'research-papers',
    name: 'Research Papers',
    description: 'Personal research papers and academic writings',
    icon: '📄',
    href: '/projects/papers'
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

      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Main Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 flex flex-col justify-center min-h-screen">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">projects</span>
              </li>
            </ol>
          </nav>

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
              creative organizations and the projects that live under them. each represents a different focus area or creative endeavor.
            </p>
          </div>

          {/* Personal Organizations Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-[#FAF3E0]/90">
              Personal Organizations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {organizations.map((org, index) => (
                <div
                  key={org.id}
                  className={`transition-all duration-700`}
                  style={{
                    animationDelay: mounted ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <Link
                    href={org.href}
                    onClick={playClick}
                    className="group block h-full"
                  >
                    <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-8 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FAF3E0]/10 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 h-full flex flex-col">
                      
                      {/* Organization Content - Logo and Info Side by Side */}
                      <div className="flex items-start gap-4 flex-grow">
                        {/* Organization Image - Height matches title + description */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-[#FAF3E0]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                            {org.image ? (
                              <Image 
                                src={org.image} 
                                alt={`${org.name} logo`}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-[#FAF3E0]/30 rounded"></div>
                            )}
                          </div>
                        </div>

                        {/* Organization Info - Fills remaining space */}
                        <div className="text-left flex-grow">
                          <h3 className="font-bold text-xl mb-1 group-hover:text-[#FAF3E0] transition-colors duration-300 leading-tight">
                            {org.name}
                          </h3>
                          <p className="text-sm text-[#FAF3E0]/70 font-serif group-hover:text-[#FAF3E0]/90 transition-colors duration-300 leading-relaxed">
                            {org.description}
                          </p>
                        </div>
                      </div>

                      {/* View Projects Button - Moved to bottom */}
                      <div className="mt-6 flex justify-between items-center">
                        <div className="inline-flex items-center gap-2 text-xs text-[#FAF3E0]/60 group-hover:text-[#FAF3E0]/80 transition-colors duration-300">
                          <span>explore projects</span>
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
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

          {/* Academic Section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-[#FAF3E0]/90">
              Academic Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {academicProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-700`}
                  style={{
                    animationDelay: mounted ? `${(index + organizations.length) * 200}ms` : '0ms'
                  }}
                >
                  <Link
                    href={project.href}
                    onClick={playClick}
                    className="group block h-full"
                  >
                    <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-8 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FAF3E0]/10 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 h-full flex flex-col">
                      
                      {/* Academic Project Icon */}
                      <div className="aspect-square mb-6 flex items-center justify-center bg-[#FAF3E0]/5 rounded-lg overflow-hidden max-w-24 max-h-24">
                        <div className="w-20 h-20 bg-[#FAF3E0]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl font-bold text-[#FAF3E0]/70">{project.icon}</span>
                        </div>
                      </div>

                      {/* Academic Project Info */}
                      <div className="text-left flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-xl mb-3 group-hover:text-[#FAF3E0] transition-colors duration-300">
                            {project.name}
                          </h3>
                          <p className="text-sm text-[#FAF3E0]/70 font-serif group-hover:text-[#FAF3E0]/90 transition-colors duration-300 mb-4">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* View Button */}
                        <div className="mt-auto">
                          <div className="inline-flex items-center gap-2 text-xs text-[#FAF3E0]/60 group-hover:text-[#FAF3E0]/80 transition-colors duration-300">
                            <span>view work</span>
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
