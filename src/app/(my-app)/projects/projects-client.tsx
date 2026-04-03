'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, remove, set } from 'animejs'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { useWebHaptics } from 'web-haptics/react'
import {
  Dialog,
  DialogPopup,
} from '@/components/ui/dialog'
import {
  ArrowUpRight,
  Rocket,
  GraduationCap,
  GithubLogo,
  ArrowSquareOut,
  Calendar,
  X,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  id: string
  name: string
  slug: string
  category: 'side-project' | 'university-project'
  description: string
  icon?: { id: string; url?: string; alt?: string }
  image?: { url?: string; alt?: string }
  order: number
  externalLink?: string
  projectDetails?: {
    techStack?: { tech: string }[]
    status?: 'active' | 'in-development' | 'archived'
    githubUrl?: string
    liveUrl?: string
  }
  universityDetails?: {
    course?: string
    semester?: string
    grade?: string
  }
}

interface ProjectsClientProps {
  projects: Project[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  },
  'in-development': {
    label: 'In Development',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  },
  archived: {
    label: 'Archived',
    className: 'bg-white/8 text-text-muted border-white/12',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSubtitle(project: Project): string | null {
  if (project.category === 'university-project') return project.universityDetails?.course || null
  return null
}

function getCategoryIcon(category: Project['category']) {
  switch (category) {
    case 'side-project': return Rocket
    case 'university-project': return GraduationCap
  }
}

// ---------------------------------------------------------------------------
// Card (grid tile)
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<Project['category'], string> = {
  'side-project': 'Side Project',
  'university-project': 'University',
}

function ProjectCard({
  project,
  onSelect,
  priority,
}: {
  project: Project
  onSelect: () => void
  priority: boolean
}) {
  const haptic = useWebHaptics()
  const status = project.projectDetails?.status ? STATUS_STYLES[project.projectDetails.status] : null
  const subtitle = getSubtitle(project)

  function renderCategoryIcon(className: string) {
    switch (project.category) {
      case 'side-project': return <Rocket className={className} />
      case 'university-project': return <GraduationCap className={className} />
    }
  }

  return (
    <article
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0e] hover:border-white/20 hover:bg-white/3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => { haptic.trigger('medium'); onSelect() }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); haptic.trigger('medium'); onSelect() } }}
      aria-label={`View details for ${project.name}`}
    >
      {/* Cover image */}
      {project.image?.url ? (
        <div className="relative aspect-video overflow-hidden bg-black/20 shrink-0">
          <Image
            src={project.image.url}
            alt={project.image.alt || project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
        <div className="relative aspect-video overflow-hidden bg-white/5 shrink-0 flex items-center justify-center">
          {renderCategoryIcon('w-8 h-8 text-white/10')}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      <div className="p-6 flex flex-col grow gap-4">
        {/* Category + status row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-text-muted/60">
            {renderCategoryIcon('w-3.5 h-3.5')}
            {CATEGORY_LABELS[project.category]}
          </span>
          {status && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${status.className}`}>
              {status.label}
            </span>
          )}
        </div>

        {/* Icon + title */}
        <div className="flex items-start gap-4 min-w-0">
          {project.icon?.url && (
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/5 mt-0.5">
              <Image
                src={project.icon.url}
                alt={project.icon.alt || `${project.name} icon`}
                width={44}
                height={44}
                className="w-11 h-11 object-cover"
                quality={75}
              />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-xl md:text-2xl font-serif text-text-primary group-hover:text-accent-primary transition-colors duration-200 leading-tight">
              {project.name}
            </h3>
            {subtitle && (
              <p className="text-xs font-mono text-text-muted/70 mt-1 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-text-secondary/85 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Bottom row: pills + arrow */}
        <div className="flex items-end justify-between gap-3 mt-auto pt-2">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {project.category === 'side-project' && project.projectDetails?.techStack?.slice(0, 3).map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md text-xs bg-white/4 text-text-muted/75 border border-white/8 font-mono">
                {t.tech}
              </span>
            ))}
            {project.category === 'university-project' && (
              <>
                {project.universityDetails?.semester && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-white/4 text-text-muted/75 border border-white/8">
                    <Calendar className="w-3 h-3" />
                    {project.universityDetails.semester}
                  </span>
                )}
                {project.universityDetails?.grade && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-emerald-500/10 text-emerald-400/85 border border-emerald-500/15">
                    {project.universityDetails.grade}
                  </span>
                )}
              </>
            )}
          </div>
          <ArrowUpRight className="w-5 h-5 shrink-0 text-text-muted/50 group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </div>
    </article>
  )
}

function UniversityProjectRow({
  project,
  onSelect,
}: {
  project: Project
  onSelect: () => void
}) {
  const haptic = useWebHaptics()
  const subtitle = getSubtitle(project)

  return (
    <article
      className="group rounded-2xl border border-white/10 bg-[#0c0c0e] p-5 md:p-6 hover:border-white/20 hover:bg-white/3 transition-all duration-300 cursor-pointer"
      onClick={() => { haptic.trigger('medium'); onSelect() }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          haptic.trigger('medium')
          onSelect()
        }
      }}
      aria-label={`View details for ${project.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-serif text-text-primary group-hover:text-accent-primary transition-colors duration-200 leading-tight">
            {project.name}
          </h3>
          {subtitle && (
            <p className="text-xs font-mono text-text-muted/70 mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <ArrowUpRight className="w-5 h-5 shrink-0 text-text-muted/50 group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </div>

      <p className="text-base text-text-secondary/85 leading-relaxed mt-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-5">
        {project.universityDetails?.semester && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-white/4 text-text-muted/75 border border-white/8">
            <Calendar className="w-3 h-3" />
            {project.universityDetails.semester}
          </span>
        )}
        {project.universityDetails?.grade && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-emerald-500/10 text-emerald-400/85 border border-emerald-500/15">
            {project.universityDetails.grade}
          </span>
        )}
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// [ProjectDetail removed - now integrated into modal content]
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selected, setSelected] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalShellRef = useRef<HTMLDivElement | null>(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    return () => {
      isClosingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!isModalOpen || !selected) return

    const shell = modalShellRef.current
    if (!shell) return

    isClosingRef.current = false
    remove(shell)
    set(shell, { opacity: 0, scale: 0.965 })

    animate(shell, {
      opacity: 1,
      scale: 1,
      duration: 170,
      easing: 'easeOutQuad',
    })
  }, [isModalOpen, selected])

  const openProjectModal = (project: Project) => {
    isClosingRef.current = false
    setSelected(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    if (isClosingRef.current) return

    const shell = modalShellRef.current

    if (!shell) {
      setIsModalOpen(false)
      setSelected(null)
      return
    }

    isClosingRef.current = true
    remove(shell)

    animate(shell, {
      opacity: 0,
      scale: 0.965,
      duration: 140,
      easing: 'easeInQuad',
    })
      .then(() => {
        setIsModalOpen(false)
        setSelected(null)
        isClosingRef.current = false
      })
      .catch(() => {
        setIsModalOpen(false)
        setSelected(null)
        isClosingRef.current = false
      })
  }

  const handleModalOpenChange = ({ open }: { open: boolean }) => {
    if (open) {
      setIsModalOpen(true)
      return
    }

    closeProjectModal()
  }

  const sideProjects = projects
    .filter((project) => project.category === 'side-project')
    .sort((a, b) => a.order - b.order)
  const universityProjects = projects
    .filter((project) => project.category === 'university-project')
    .sort((a, b) => a.order - b.order)

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        {/* Breadcrumb + heading */}
        <div className="px-8 md:px-32 lg:px-56 xl:px-80">
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'projects' },
              ]}
              className="mb-0"
            />
          </div>

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary text-balance">
              projects
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
              side projects, university work, and research papers - the collection
            </p>
          </div>
        </div>

        {/* Content layout */}
        <div className="px-8 md:px-32 lg:px-56 xl:px-80 space-y-12">
          <div className="content-auto">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted/55 shrink-0">
                Side Projects
              </span>
              <div className="flex-1 border-t border-white/6" />
              <span className="text-[11px] font-mono text-text-muted/40 tabular-nums shrink-0">
                {sideProjects.length} {sideProjects.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sideProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={() => openProjectModal(project)}
                  priority={idx < 2}
                />
              ))}
            </div>
          </div>

          <div className="content-auto">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted/55 shrink-0">
                University Projects
              </span>
              <div className="flex-1 border-t border-white/6" />
              <span className="text-[11px] font-mono text-text-muted/40 tabular-nums shrink-0">
                {universityProjects.length} {universityProjects.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {universityProjects.map((project) => (
                <UniversityProjectRow
                  key={project.id}
                  project={project}
                  onSelect={() => openProjectModal(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detail popup */}
      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogPopup className="sm:max-w-5xl p-0 border border-white/10 bg-[#070707] max-h-[90vh] [clip-path:inset(0_round_1rem)]" showCloseButton={false}>
          {selected && (() => {
            const Icon = getCategoryIcon(selected.category)
            return (
              <div ref={modalShellRef} className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] overflow-hidden will-change-transform">
                {/* Left: Image */}
                <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-0 lg:aspect-4/3 bg-[#faf3e0] border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
                  {selected.image?.url ? (
                    <Image
                      src={selected.image.url}
                      alt={selected.image.alt || selected.name}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#faf3e0] text-black/20">
                      <Icon className="w-24 h-24" />
                    </div>
                  )}
                </div>

                {/* Right: Content */}
                <div className="relative bg-[#070707] p-4 sm:p-5 lg:p-6 xl:p-7 flex flex-col gap-5 sm:gap-6 overflow-y-auto">
                  {/* Close button */}
                  <button
                    onClick={closeProjectModal}
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 text-[#faf3e0] hover:text-[#faf3e0]/60 transition-[color,transform] duration-200 hover:-translate-y-0.5 z-10"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Icon + Title */}
                  <div className="pr-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 bg-[#faf3e0] flex items-center justify-center mb-4 sm:mb-5">
                      {selected.icon?.url ? (
                        <Image
                          src={selected.icon.url}
                          alt={selected.icon.alt || `${selected.name} icon`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <Icon className="w-6 h-6 text-[#070707]" />
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#faf3e0] mb-3 sm:mb-4 leading-tight">
                      {selected.name}
                    </h2>

                    {/* Label */}
                    <span className="text-[10px] font-mono text-[#faf3e0]/40 uppercase tracking-widest mb-3 block">
                      {CATEGORY_LABELS[selected.category]}
                    </span>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#faf3e0]/80 leading-relaxed">
                      {selected.description}
                    </p>
                  </div>

                  {/* Tech Stack / Details section */}
                  {selected.category === 'side-project' && selected.projectDetails?.techStack && selected.projectDetails.techStack.length > 0 && (
                    <div className="pr-10">
                      <p className="text-[10px] font-mono text-[#faf3e0]/40 uppercase tracking-widest mb-2 block">
                        Tech
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selected.projectDetails.techStack.slice(0, 4).map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 sm:px-3 py-1 border border-[#faf3e0]/30 text-[#faf3e0]/70 text-xs rounded-full font-mono"
                          >
                            {t.tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pr-10 pt-1 sm:pt-2">
                    {selected.projectDetails?.githubUrl && (
                      <a
                        href={selected.projectDetails.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#faf3e0] hover:text-[#faf3e0]/60 transition-[color,transform] duration-200 hover:-translate-y-0.5"
                        aria-label="View on GitHub"
                      >
                        <GithubLogo weight="fill" className="w-5 h-5" />
                      </a>
                    )}
                    {selected.projectDetails?.liveUrl && (
                      <a
                        href={selected.projectDetails.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#faf3e0] hover:text-[#faf3e0]/60 transition-[color,transform] duration-200 hover:-translate-y-0.5"
                        aria-label="View live project"
                      >
                        <ArrowSquareOut className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}
        </DialogPopup>
      </Dialog>
    </main>
  )
}
