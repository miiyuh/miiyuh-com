'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import * as lucideIcons from 'lucide-react'
import { 
  ArrowUpRight, 
  Rocket, 
  GraduationCap, 
  FileText,
  Github,
  ExternalLink,
  Calendar,
  BookOpen,
  Code,
  Download
} from 'lucide-react'

// Map icon names to lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  GraduationCap,
  FileText,
  Github,
  ExternalLink,
  Calendar,
  BookOpen,
  Code,
  Download,
  ArrowUpRight,
}

interface Project {
  id: string
  name: string
  slug: string
  category: 'side-project' | 'university-project' | 'research-paper'
  description: string
  icon?: string
  image?: {
    url?: string
    alt?: string
  }
  order: number
  externalLink?: string
  // Side project specific
  projectDetails?: {
    techStack?: { tech: string }[]
    status?: 'active' | 'in-development' | 'archived'
    githubUrl?: string
    liveUrl?: string
  }
  // University project specific
  universityDetails?: {
    course?: string
    semester?: string
    grade?: string
  }
  // Research paper specific
  paperDetails?: {
    author?: string
    year?: string
    abstract?: string
    keywords?: { keyword: string }[]
    pages?: number
    pdfFile?: {
      url?: string
      filename?: string
    }
  }
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

  // Helper function to render icon from name
  const renderIcon = (iconName?: string) => {
    if (!iconName) return '🚀'
    const IconComponent = iconMap[iconName]
    if (IconComponent) {
      return <IconComponent className="w-6 h-6" />
    }
    return iconName
  }

  // Separate projects by category and sort by order
  const sideProjects = projects
    .filter(p => p.category === 'side-project')
    .sort((a, b) => a.order - b.order)

  const universityProjects = projects
    .filter(p => p.category === 'university-project')
    .sort((a, b) => a.order - b.order)

  const researchPapers = projects
    .filter(p => p.category === 'research-paper')
    .sort((a, b) => a.order - b.order)

  const getProjectHref = (project: Project) => {
    if (project.externalLink) return project.externalLink
    return `/projects/${project.slug}`
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 text-[10px] font-mono bg-green-500/20 text-green-400 rounded-full border border-green-500/30">ACTIVE</span>
      case 'in-development':
        return <span className="px-2 py-0.5 text-[10px] font-mono bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">IN DEV</span>
      case 'archived':
        return <span className="px-2 py-0.5 text-[10px] font-mono bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/30">ARCHIVED</span>
      default:
        return null
    }
  }

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-12">
            {/* Breadcrumb Navigation */}
            <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
              <SimpleBreadcrumb
                items={[
                  { label: 'home', href: '/' },
                  { label: 'projects' },
                ]}
                className="mb-0"
              />
            </div>

            {/* Header Section */}
            <div className="mb-16 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-8 text-text-primary leading-[0.9]">
                projects.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light">
                Side projects, university work, and research papers — a collection of things I&apos;ve built and written.
              </p>
            </div>
          </div>

          {/* ============================================ */}
          {/* SIDE PROJECTS SECTION */}
          {/* ============================================ */}
          {sideProjects.length > 0 && (
            <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-20">
              <ScrollAnimation animation="fadeUp">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Rocket className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-text-primary">Side Projects</h2>
                    <p className="text-sm text-text-muted">Websites and utilities I&apos;ve built</p>
                  </div>
                </div>
              </ScrollAnimation>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sideProjects.map((project, index) => (
                  <ScrollAnimation
                    key={project.id}
                    animation="fadeUp"
                    delay={0.1 + (0.1 * index)}
                  >
                    <Link
                      href={getProjectHref(project)}
                      onClick={playClick}
                      className="group block h-full"
                      target={project.externalLink ? '_blank' : undefined}
                      rel={project.externalLink ? 'noopener noreferrer' : undefined}
                    >
                      <article className="h-full glass-panel-pro rounded-3xl overflow-hidden hover:border-accent-primary/30 transition-all duration-500 group-hover:-translate-y-2">
                        {/* Cover Image */}
                        {project.image?.url && (
                          <div className="relative aspect-video overflow-hidden bg-white/5">
                            <Image
                              src={project.image.url}
                              alt={project.image.alt || project.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#070707] via-transparent to-transparent" />
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {!project.image?.url && (
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                                  {renderIcon(project.icon)}
                                </div>
                              )}
                              <div>
                                <h3 className="text-xl font-serif font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                  {project.name}
                                </h3>
                                {project.projectDetails?.status && (
                                  <div className="mt-1">
                                    {getStatusBadge(project.projectDetails.status)}
                                  </div>
                                )}
                              </div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                          </div>
                          
                          <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          {project.projectDetails?.techStack && project.projectDetails.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.projectDetails.techStack.slice(0, 4).map((t, i) => (
                                <span key={i} className="px-2 py-1 text-xs font-mono bg-white/5 text-text-muted rounded border border-white/10">
                                  {t.tech}
                                </span>
                              ))}
                              {project.projectDetails.techStack.length > 4 && (
                                <span className="px-2 py-1 text-xs font-mono text-text-muted">
                                  +{project.projectDetails.techStack.length - 4} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Links */}
                          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            {project.projectDetails?.githubUrl && (
                              <span className="flex items-center gap-1 text-xs text-text-muted">
                                <Github className="w-3 h-3" />
                                Source
                              </span>
                            )}
                            {project.projectDetails?.liveUrl && (
                              <span className="flex items-center gap-1 text-xs text-text-muted">
                                <ExternalLink className="w-3 h-3" />
                                Live
                              </span>
                            )}
                            <span className="ml-auto text-xs text-text-muted group-hover:text-accent-primary transition-colors flex items-center gap-1">
                              View Project <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* UNIVERSITY PROJECTS SECTION */}
          {/* ============================================ */}
          {universityProjects.length > 0 && (
            <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-20">
              <ScrollAnimation animation="fadeUp">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-text-primary">University Projects</h2>
                    <p className="text-sm text-text-muted">Final year and coursework projects</p>
                  </div>
                </div>
              </ScrollAnimation>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {universityProjects.map((project, index) => (
                  <ScrollAnimation
                    key={project.id}
                    animation="fadeUp"
                    delay={0.1 + (0.1 * index)}
                  >
                    <Link
                      href={getProjectHref(project)}
                      onClick={playClick}
                      className="group block h-full"
                      target={project.externalLink ? '_blank' : undefined}
                      rel={project.externalLink ? 'noopener noreferrer' : undefined}
                    >
                      <article className="h-full p-6 glass-panel-pro rounded-3xl hover:border-blue-500/30 transition-all duration-300 group-hover:-translate-y-2 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl border border-blue-500/20">
                            {renderIcon(project.icon)}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {project.universityDetails?.semester && (
                              <span className="text-[10px] font-mono text-blue-400/80 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {project.universityDetails.semester}
                              </span>
                            )}
                            {project.universityDetails?.grade && (
                              <span className="px-2 py-0.5 text-[10px] font-mono bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                                {project.universityDetails.grade}
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-lg font-serif font-bold text-text-primary mb-2 group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        
                        {project.universityDetails?.course && (
                          <p className="text-xs text-text-muted mb-3 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {project.universityDetails.course}
                          </p>
                        )}
                        
                        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed mb-4 grow">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors pt-4 border-t border-white/5 mt-auto">
                          <Code className="w-3 h-3" />
                          <span>View Project</span>
                          <ArrowUpRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </article>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* RESEARCH PAPERS SECTION */}
          {/* ============================================ */}
          {researchPapers.length > 0 && (
            <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-20">
              <ScrollAnimation animation="fadeUp">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-text-primary">Research Papers</h2>
                    <p className="text-sm text-text-muted">Academic writings and research</p>
                  </div>
                </div>
              </ScrollAnimation>

              <div className="space-y-4">
                {researchPapers.map((project, index) => (
                  <ScrollAnimation
                    key={project.id}
                    animation="fadeUp"
                    delay={0.1 + (0.05 * index)}
                  >
                    <Link
                      href={getProjectHref(project)}
                      onClick={playClick}
                      className="group block"
                    >
                      <article className="glass-panel-pro rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group-hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          {/* Paper Icon/Thumbnail */}
                          <div className="shrink-0">
                            <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                              {project.icon ? (
                                <div className="text-3xl lg:text-4xl">
                                  {renderIcon(project.icon)}
                                </div>
                              ) : (
                                <FileText className="w-8 h-8 text-purple-400" />
                              )}
                            </div>
                          </div>

                          {/* Paper Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-lg font-serif font-bold text-text-primary group-hover:text-purple-400 transition-colors line-clamp-2">
                                {project.name}
                              </h3>
                              <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-3">
                              {project.paperDetails?.author && (
                                <span>by {project.paperDetails.author}</span>
                              )}
                              {project.paperDetails?.year && (
                                <>
                                  <span className="text-white/20">•</span>
                                  <span>{project.paperDetails.year}</span>
                                </>
                              )}
                              {project.paperDetails?.pages && (
                                <>
                                  <span className="text-white/20">•</span>
                                  <span>{project.paperDetails.pages} pages</span>
                                </>
                              )}
                            </div>

                            {/* Abstract preview */}
                            {project.paperDetails?.abstract && (
                              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-3">
                                {project.paperDetails.abstract}
                              </p>
                            )}

                            {/* Keywords */}
                            {project.paperDetails?.keywords && project.paperDetails.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.paperDetails.keywords.slice(0, 5).map((k, i) => (
                                  <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/10 text-purple-400/80 rounded border border-purple-500/20">
                                    {k.keyword}
                                  </span>
                                ))}
                                {project.paperDetails.keywords.length > 5 && (
                                  <span className="text-[10px] text-text-muted">
                                    +{project.paperDetails.keywords.length - 5} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex lg:flex-col gap-2 lg:items-end">
                            <span className="px-3 py-1.5 text-xs font-mono bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 flex items-center gap-1.5 group-hover:bg-purple-500/20 transition-colors">
                              <Download className="w-3 h-3" />
                              Read Paper
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {sideProjects.length === 0 && universityProjects.length === 0 && researchPapers.length === 0 && (
            <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-20 text-center">
              <p className="text-text-muted font-serif text-lg">No projects yet...</p>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}
