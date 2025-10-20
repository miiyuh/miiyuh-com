'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

interface Project {
  id: string
  name: string
  slug: string
  category: 'personal' | 'academic'
  description: string
  icon?: string
  image?: {
    url?: string
    alt?: string
  }
  order: number
  externalLink?: string
}

interface ProjectsClientProps {
  projects: Project[]
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Separate projects by category and sort by order
  const personalProjects = projects
    .filter(p => p.category === 'personal')
    .sort((a, b) => a.order - b.order)

  const academicProjects = projects
    .filter(p => p.category === 'academic')
    .sort((a, b) => a.order - b.order)

  const getProjectHref = (project: Project) => {
    if (project.externalLink) return project.externalLink
    return `/projects/${project.slug}`
  }

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

          {/* Grid Layout - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-8xl mx-auto">
            
            {/* Personal Organizations Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#FAF3E0]/90">
                Personal Organizations
              </h2>
              
              {personalProjects.length > 0 ? (
                <div className="space-y-4">
                  {personalProjects.map((project, index) => (
                    <ScrollAnimation
                      key={project.id}
                      animation="fadeUp"
                      delay={0.1 + (0.1 * index)}
                    >
                      <Link
                        href={getProjectHref(project)}
                        onClick={playClick}
                        className="group block"
                        target={project.externalLink ? '_blank' : undefined}
                        rel={project.externalLink ? 'noopener noreferrer' : undefined}
                      >
                        <article className="flex items-center gap-4 p-4 rounded-lg bg-[#FAF3E0]/5 hover:bg-[#FAF3E0]/8 transition-all duration-300">
                          {/* Logo */}
                          {project.image?.url && (
                            <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[#FAF3E0]/10 overflow-hidden">
                              <Image 
                                src={project.image.url} 
                                alt={project.image.alt || `${project.name} logo`}
                                width={48}
                                height={48}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-[#FAF3E0] group-hover:text-[#FAF3E0]/80 transition-colors mb-1">
                              {project.name}
                            </h3>
                            <p className="text-sm text-[#FAF3E0]/60 line-clamp-1">
                              {project.description}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <span className="text-xl text-[#FAF3E0]/40 group-hover:text-[#FAF3E0] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                            →
                          </span>
                        </article>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>
              ) : (
                <p className="text-[#FAF3E0]/60 font-serif text-sm">No personal projects yet...</p>
              )}
            </div>

            {/* Academic Work Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#FAF3E0]/90">
                Academic Work
              </h2>
              
              {academicProjects.length > 0 ? (
                <div className="space-y-4">
                  {academicProjects.map((project, index) => (
                    <ScrollAnimation
                      key={project.id}
                      animation="fadeUp"
                      delay={0.2 + (0.1 * index)}
                    >
                      <Link
                        href={getProjectHref(project)}
                        onClick={playClick}
                        className="group block"
                        target={project.externalLink ? '_blank' : undefined}
                        rel={project.externalLink ? 'noopener noreferrer' : undefined}
                      >
                        <article className="flex items-center gap-4 p-4 rounded-lg bg-[#FAF3E0]/5 hover:bg-[#FAF3E0]/8 transition-all duration-300">
                          {/* Icon */}
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[#FAF3E0]/10 flex items-center justify-center">
                            <span className="text-2xl">{project.icon || '📁'}</span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-[#FAF3E0] group-hover:text-[#FAF3E0]/80 transition-colors mb-1">
                              {project.name}
                            </h3>
                            <p className="text-sm text-[#FAF3E0]/60 line-clamp-1">
                              {project.description}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <span className="text-xl text-[#FAF3E0]/40 group-hover:text-[#FAF3E0] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                            →
                          </span>
                        </article>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>
              ) : (
                <p className="text-[#FAF3E0]/60 font-serif text-sm">No academic projects yet...</p>
              )}
            </div>
          </div>
        </div>

      </section>

    </main>
  )
}
