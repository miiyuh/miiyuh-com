'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ArrowUpRight, FolderOpen, GraduationCap } from 'lucide-react'

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
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">

      {/* Main Content */}
      <section className="relative grow py-24">

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-12">
            {/* Breadcrumb Navigation */}
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'projects' },
              ]}
              className="mb-16"
            />

            {/* Header Section */}
            <div className="mb-24 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-8 text-text-primary leading-[0.9]">
                projects.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light">
                A collection of organizations, creative endeavors, and academic research.
              </p>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 px-6 md:px-12 lg:px-24 xl:px-32 pb-24">

            {/* Column 1: Organizations (Sticky Stack) */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <FolderOpen className="w-6 h-6 text-accent-primary" />
                <h2 className="text-3xl font-serif text-text-primary">Organizations</h2>
              </div>

              <div className="flex flex-col gap-8">
                {personalProjects.length > 0 ? (
                  personalProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="sticky top-32"
                      style={{
                        zIndex: index + 1,
                        marginBottom: index === personalProjects.length - 1 ? 0 : '2rem' // Reduced spacing for tighter stack
                      }}
                    >
                      <ScrollAnimation animation="fadeUp" delay={0.1}>
                        <Link
                          href={getProjectHref(project)}
                          onClick={playClick}
                          className="group block w-full"
                          target={project.externalLink ? '_blank' : undefined}
                          rel={project.externalLink ? 'noopener noreferrer' : undefined}
                        >
                          <article className="w-full min-h-[400px] p-8 glass-panel-pro rounded-4xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col gap-8 relative overflow-hidden bg-[#0A1F15]/90 backdrop-blur-xl border border-white/5 shadow-2xl">

                            {/* Content Side */}
                            <div className="flex-1 flex flex-col z-10">
                              <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden p-3 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                  {project.image?.url ? (
                                    <Image
                                      src={project.image.url}
                                      alt={project.image.alt || `${project.name} logo`}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-3xl">✨</span>
                                  )}
                                </div>
                                <ArrowUpRight className="w-8 h-8 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                              </div>

                              <div className="mt-auto">
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors">
                                  {project.name}
                                </h3>
                                <p className="text-base text-text-secondary leading-relaxed">
                                  {project.description}
                                </p>
                              </div>
                            </div>

                            {/* Background Glow */}
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] group-hover:bg-accent-primary/20 transition-all duration-700 pointer-events-none"></div>
                          </article>
                        </Link>
                      </ScrollAnimation>
                    </div>
                  ))
                ) : (
                  <p className="text-text-muted font-serif text-lg px-6">No personal projects yet...</p>
                )}
              </div>
            </div>

            {/* Column 2: Academic Work (Grid/List) */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <GraduationCap className="w-6 h-6 text-accent-primary" />
                <h2 className="text-3xl font-serif text-text-primary">Academic Work</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {academicProjects.length > 0 ? (
                  academicProjects.map((project, index) => (
                    <ScrollAnimation
                      key={project.id}
                      animation="fadeUp"
                      delay={0.2 + (0.1 * index)}
                    >
                      <Link
                        href={getProjectHref(project)}
                        onClick={playClick}
                        className="group block h-full"
                        target={project.externalLink ? '_blank' : undefined}
                        rel={project.externalLink ? 'noopener noreferrer' : undefined}
                      >
                        <article className="h-full p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-300 flex flex-col group hover:-translate-y-2">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform border border-white/5">
                              {project.icon || '📁'}
                            </div>
                            <span className="text-[10px] font-mono text-accent-primary/80 border border-accent-primary/20 px-2 py-0.5 rounded-full bg-accent-primary/5">ACADEMIC</span>
                          </div>

                          <h3 className="text-xl font-serif font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed mb-6 grow">
                            {project.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors mt-auto pt-4 border-t border-white/5">
                            <span>Read Paper</span>
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </article>
                      </Link>
                    </ScrollAnimation>
                  ))
                ) : (
                  <p className="text-text-muted font-serif text-lg">No academic projects yet...</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  )
}
