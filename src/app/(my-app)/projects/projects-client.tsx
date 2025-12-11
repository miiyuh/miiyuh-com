'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import {
  ArrowUpRight,
  Rocket,
  GraduationCap,
  FileText,
  Github,
  ExternalLink,
  Calendar,
  BookOpen,
  Download,
} from 'lucide-react'

interface Project {
  id: string
  name: string
  slug: string
  category: 'side-project' | 'university-project' | 'research-paper'
  description: string
  icon?: {
    id: string
    url?: string
    alt?: string
  }
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

  // Separate projects by category and sort by order
  const sideProjects = projects
    .filter((p) => p.category === 'side-project')
    .sort((a, b) => a.order - b.order)

  const universityProjects = projects
    .filter((p) => p.category === 'university-project')
    .sort((a, b) => a.order - b.order)

  const researchPapers = projects
    .filter((p) => p.category === 'research-paper')
    .sort((a, b) => a.order - b.order)

  const sections = [
    {
      key: 'side-projects',
      title: 'Side Projects',
      subtitle: 'web apps, tools, and experiments',
      icon: Rocket,
      items: sideProjects,
    },
    {
      key: 'university-projects',
      title: 'University Projects',
      subtitle: 'coursework, assignments, and labs',
      icon: GraduationCap,
      items: universityProjects,
    },
    {
      key: 'research-papers',
      title: 'Research Papers',
      subtitle: 'writing, abstracts, and findings',
      icon: FileText,
      items: researchPapers,
    },
  ]

  const getProjectHref = (project: Project) => {
    if (project.externalLink) return project.externalLink
    return `/projects/${project.slug}`
  }

  // Solid (non-transparent) gradient presets inspired by socials
  const gradientPresets = [
    'linear-gradient(135deg, hsl(220 70% 18%), hsl(255 70% 28%))',
    'linear-gradient(135deg, hsl(280 70% 20%), hsl(320 70% 32%))',
    'linear-gradient(135deg, hsl(190 70% 18%), hsl(150 70% 30%))',
    'linear-gradient(135deg, hsl(30 80% 26%), hsl(0 75% 22%))',
  ]

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
                projects
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed font-light">
                side projects, university work, and research papers - the collection
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 xl:px-32 space-y-20">
          {sections.filter((s) => s.items.length > 0).map((section, sectionIndex) => (
            <div key={section.key} className={sectionIndex > 0 ? 'border-t border-white/10 pt-12' : ''}>
              <ScrollAnimation animation="fadeUp" delay={sectionIndex * 0.05}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner shadow-black/30">
                    <section.icon className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-text-primary">{section.title}</h2>
                    <p className="text-sm text-text-muted">{section.subtitle}</p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* Grid with gaps filled by hatched pattern */}
              <div className="relative border-t border-white/10">
                {/* 45-degree diagonal hatched pattern */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 8px,
                        rgba(255, 255, 255, 0.08) 8px,
                        rgba(255, 255, 255, 0.08) 10px
                      )
                    `,
                    opacity: 0.7
                  }}
                />
                <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {section.items.map((project, index) => (
                  <ScrollAnimation key={project.id} animation="fadeUp" delay={0.08 + 0.06 * index}>
                    <article
                      className="relative h-full overflow-hidden border border-white/10 transition-all duration-500 hover:z-10"
                      style={{ backgroundImage: gradientPresets[index % gradientPresets.length] }}
                      data-cursor="link"
                    >
                      {/* make whole card clickable via overlay link */}
                      <Link
                        href={getProjectHref(project)}
                        onClick={playClick}
                        className="absolute inset-0"
                        target={project.externalLink ? '_blank' : undefined}
                        rel={project.externalLink ? 'noopener noreferrer' : undefined}
                        aria-label={`Open ${project.name}`}
                      />

                      {/* Cover Image (kept above gradient) */}
                      {project.image?.url && (
                        <div className="relative aspect-4/3 overflow-hidden bg-black/20">
                          <Image
                            src={project.image.url}
                            alt={project.image.alt || project.name}
                            fill
                            className="object-cover"
                            priority={index < 2}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                          <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[11px] font-semibold uppercase tracking-wide text-white z-10">
                            {section.title}
                          </div>
                        </div>
                      )}

                      <div className="relative z-10 p-6 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {!project.image?.url && project.icon?.url && (
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-black/20 shadow-inner shadow-black/30">
                                <Image
                                  src={project.icon.url}
                                  alt={project.icon.alt || `${project.name} icon`}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="text-xl font-serif font-bold text-white group-hover:text-accent-primary transition-colors">
                                {project.name}
                              </h3>
                              <p className="text-xs text-white/70">
                                {project.category === 'university-project'
                                  ? project.universityDetails?.course || 'Course project'
                                  : project.category === 'research-paper'
                                    ? `${project.paperDetails?.author || 'miiyuh'}${project.paperDetails?.year ? ` • ${project.paperDetails.year}` : ''}`
                                    : project.projectDetails?.status
                                      ? project.projectDetails.status.replace('-', ' ')
                                      : 'Side project'}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                        </div>

                        <p className="text-sm text-white/85 leading-relaxed line-clamp-3">
                          {project.category === 'research-paper' && project.paperDetails?.abstract
                            ? project.paperDetails.abstract
                            : project.description}
                        </p>

                        {/* Meta rows */}
                        <div className="flex flex-wrap gap-2 text-xs text-white/80">
                          {project.category === 'side-project' && project.projectDetails?.techStack?.slice(0, 4).map((t, i) => (
                            <span key={i} className="px-2 py-1 rounded border border-white/15 bg-black/25 font-mono">
                              {t.tech}
                            </span>
                          ))}
                          {project.category === 'university-project' && (
                            <>
                              {project.universityDetails?.semester && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-white/15 bg-black/25">
                                  <Calendar className="w-4 h-4" />
                                  {project.universityDetails.semester}
                                </span>
                              )}
                              {project.universityDetails?.grade && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-white/15 bg-black/25">
                                  <BookOpen className="w-4 h-4" />
                                  {project.universityDetails.grade}
                                </span>
                              )}
                            </>
                          )}
                          {project.category === 'research-paper' && project.paperDetails?.keywords?.slice(0, 3).map((k, i) => (
                            <span key={i} className="px-2 py-1 rounded border border-white/15 bg-black/25 font-mono">
                              {k.keyword}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-3 text-sm text-white/85">
                          {project.projectDetails?.githubUrl && (
                            <a
                              href={project.projectDetails.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 hover:text-white transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          )}
                          {project.projectDetails?.liveUrl && (
                            <a
                              href={project.projectDetails.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live
                            </a>
                          )}
                          {project.paperDetails?.pdfFile?.url && (
                            <a
                              href={project.paperDetails.pdfFile.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 hover:text-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollAnimation>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
