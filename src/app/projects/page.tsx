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
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">

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

          {/* Two Column Layout - Personal Organizations Left, Academic Work Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-8xl mx-auto">
            
            {/* Personal Organizations Section - Left Column */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-[#FAF3E0]/90">
                Personal Organizations
              </h2>
              <div className="space-y-6">
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
                      data-cursor="link"
                    >
                      <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/8 transition-all duration-300 group-hover:scale-[1.01] overflow-hidden">
                        
                        {/* Horizontal Layout - Image, Content, Arrow */}
                        <div className="flex items-center justify-between p-6">
                          {/* Left: Organization Image */}
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-16 h-16 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              {org.image ? (
                                <Image 
                                  src={org.image} 
                                  alt={`${org.name} logo`}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-[#FAF3E0]/30 rounded"></div>
                              )}
                            </div>

                            {/* Center: Organization Info */}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-[#FAF3E0] mb-1 leading-tight">
                                {org.name}
                              </h3>
                              <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                                {org.description}
                              </p>
                            </div>
                          </div>

                          {/* Right: Arrow Icon */}
                          <div className="flex-shrink-0 ml-4">
                            <svg 
                              className="w-6 h-6 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] group-hover:translate-x-1 transition-all duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Work Section - Right Column */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-[#FAF3E0]/90">
                Academic Work
              </h2>
              <div className="space-y-6">
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
                      data-cursor="view"
                    >
                      <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/8 transition-all duration-300 group-hover:scale-[1.01] overflow-hidden">
                        
                        {/* Horizontal Layout - Icon, Content, Arrow */}
                        <div className="flex items-center justify-between p-6">
                          {/* Left: Academic Icon */}
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-16 h-16 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl font-bold text-[#FAF3E0]/80">{project.icon}</span>
                            </div>

                            {/* Center: Academic Info */}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-[#FAF3E0] mb-1 leading-tight">
                                {project.name}
                              </h3>
                              <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Right: Arrow Icon */}
                          <div className="flex-shrink-0 ml-4">
                            <svg 
                              className="w-6 h-6 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] group-hover:translate-x-1 transition-all duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

    </main>
  )
}
