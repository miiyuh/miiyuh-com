'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { useWebHaptics } from 'web-haptics/react'
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  id: string
  name: string
  slug: string
  category: 'side-project' | 'university-project' | 'research-paper'
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
  paperDetails?: {
    author?: string
    year?: string
    abstract?: string
    keywords?: { keyword: string }[]
    pages?: number
    pdfFile?: { url?: string; filename?: string }
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

const SECTIONS = [
  { key: 'side-projects', title: 'Side Projects', subtitle: 'web apps, tools, and experiments', icon: Rocket, category: 'side-project' as const },
  { key: 'university-projects', title: 'University Projects', subtitle: 'coursework, assignments, and labs', icon: GraduationCap, category: 'university-project' as const },
  { key: 'research-papers', title: 'Research Papers', subtitle: 'writing, abstracts, and findings', icon: FileText, category: 'research-paper' as const },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSubtitle(project: Project): string | null {
  if (project.category === 'university-project') return project.universityDetails?.course || null
  if (project.category === 'research-paper') {
    const parts = [project.paperDetails?.author, project.paperDetails?.year].filter(Boolean)
    return parts.length > 0 ? parts.join(' / ') : null
  }
  return null
}

function getCategoryIcon(category: Project['category']) {
  switch (category) {
    case 'side-project': return Rocket
    case 'university-project': return GraduationCap
    case 'research-paper': return FileText
  }
}

// ---------------------------------------------------------------------------
// Card (grid tile)
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<Project['category'], string> = {
  'side-project': 'Side Project',
  'university-project': 'University',
  'research-paper': 'Paper',
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
      case 'research-paper': return <FileText className={className} />
    }
  }

  return (
    <article
      className="group relative rounded-xl overflow-hidden border border-white/8 bg-[#0c0c0e] hover:border-white/16 hover:bg-white/3 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 cursor-pointer flex flex-col"
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
          <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0e] via-black/20 to-transparent" />
        </div>
      ) : (
        <div className="relative aspect-video overflow-hidden bg-linear-to-br from-white/4 to-transparent shrink-0 flex items-center justify-center">
          {renderCategoryIcon('w-8 h-8 text-white/10')}
          <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0e] via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col grow gap-3">
        {/* Category + status row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-text-muted/50">
            {renderCategoryIcon('w-3 h-3')}
            {CATEGORY_LABELS[project.category]}
          </span>
          {status && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.className}`}>
              {status.label}
            </span>
          )}
        </div>

        {/* Icon + title */}
        <div className="flex items-start gap-3 min-w-0">
          {project.icon?.url && (
            <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-white/5 mt-0.5">
              <Image
                src={project.icon.url}
                alt={project.icon.alt || `${project.name} icon`}
                width={36}
                height={36}
                className="w-9 h-9 object-cover"
                quality={75}
              />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-serif text-text-primary group-hover:text-accent-primary transition-colors duration-200 leading-snug">
              {project.name}
            </h3>
            {subtitle && (
              <p className="text-[11px] font-mono text-text-muted/60 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary/80 leading-relaxed line-clamp-2">
          {project.category === 'research-paper' && project.paperDetails?.abstract
            ? project.paperDetails.abstract
            : project.description}
        </p>

        {/* Bottom row: pills + arrow */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            {project.category === 'side-project' && project.projectDetails?.techStack?.slice(0, 3).map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-[11px] bg-white/4 text-text-muted/70 border border-white/8 font-mono">
                {t.tech}
              </span>
            ))}
            {project.category === 'university-project' && (
              <>
                {project.universityDetails?.semester && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-white/4 text-text-muted/70 border border-white/8">
                    <Calendar className="w-2.5 h-2.5" />
                    {project.universityDetails.semester}
                  </span>
                )}
                {project.universityDetails?.grade && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15">
                    {project.universityDetails.grade}
                  </span>
                )}
              </>
            )}
            {project.category === 'research-paper' && project.paperDetails?.keywords?.slice(0, 3).map((k, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-[11px] bg-white/4 text-text-muted/70 border border-white/8 font-mono">
                {k.keyword}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 shrink-0 text-text-muted/40 group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Dialog detail content
// ---------------------------------------------------------------------------

function ProjectDetail({ project }: { project: Project }) {
  const haptic = useWebHaptics()
  const hasLinks = !!(
    project.projectDetails?.githubUrl ||
    project.projectDetails?.liveUrl ||
    project.paperDetails?.pdfFile?.url ||
    project.externalLink
  )

  return (
    <div className="space-y-5">
      {/* Status (side projects) */}
      {project.category === 'side-project' && project.projectDetails?.status && STATUS_STYLES[project.projectDetails.status] && (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${STATUS_STYLES[project.projectDetails.status].className}`}>
          {STATUS_STYLES[project.projectDetails.status].label}
        </span>
      )}

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {project.category === 'research-paper' && project.paperDetails?.abstract
          ? project.paperDetails.abstract
          : project.description}
      </p>

      {/* Side project: tech stack */}
      {project.category === 'side-project' && project.projectDetails?.techStack && project.projectDetails.techStack.length > 0 && (
        <div>
          <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.projectDetails.techStack.map((t, i) => (
              <span key={i} className="px-2.5 py-1 text-xs font-mono bg-white/5 text-text-primary rounded-lg border border-white/8">
                {t.tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* University: course details */}
      {project.category === 'university-project' && (
        <div className="flex flex-wrap gap-2">
          {project.universityDetails?.course && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm text-text-secondary">{project.universityDetails.course}</span>
            </div>
          )}
          {project.universityDetails?.semester && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm text-text-secondary">{project.universityDetails.semester}</span>
            </div>
          )}
          {project.universityDetails?.grade && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-sm text-emerald-400 font-medium">Grade: {project.universityDetails.grade}</span>
            </div>
          )}
        </div>
      )}

      {/* Research paper: metadata */}
      {project.category === 'research-paper' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.paperDetails?.author && (
              <div>
                <p className="text-[11px] font-mono text-text-muted uppercase mb-1">Author</p>
                <p className="text-sm text-text-primary">{project.paperDetails.author}</p>
              </div>
            )}
            {project.paperDetails?.year && (
              <div>
                <p className="text-[11px] font-mono text-text-muted uppercase mb-1">Year</p>
                <p className="text-sm text-text-primary">{project.paperDetails.year}</p>
              </div>
            )}
            {project.paperDetails?.pages && (
              <div>
                <p className="text-[11px] font-mono text-text-muted uppercase mb-1">Pages</p>
                <p className="text-sm text-text-primary">{project.paperDetails.pages}</p>
              </div>
            )}
          </div>
          {project.paperDetails?.keywords && project.paperDetails.keywords.length > 0 && (
            <div>
              <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.paperDetails.keywords.map((k, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs font-mono bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                    {k.keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action links */}
      {hasLinks && (
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/8">
          {project.projectDetails?.githubUrl && (
            <a href={project.projectDetails.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-white/6 hover:bg-white/12 rounded-xl border border-white/8 transition-colors duration-200" onClick={() => haptic.trigger('light')}>
              <Github className="w-4 h-4" /> Source
            </a>
          )}
          {project.projectDetails?.liveUrl && (
            <a href={project.projectDetails.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-xl border border-accent-primary/20 transition-colors duration-200" onClick={() => haptic.trigger('light')}>
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
          {project.paperDetails?.pdfFile?.url && (
            <a href={project.paperDetails.pdfFile.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/20 transition-colors duration-200" onClick={() => haptic.trigger('light')}>
              <Download className="w-4 h-4" /> PDF
            </a>
          )}
          {project.externalLink && (
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-white/6 hover:bg-white/12 rounded-xl border border-white/8 transition-colors duration-200" onClick={() => haptic.trigger('light')}>
              <ArrowUpRight className="w-4 h-4" /> Open
            </a>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        {/* Breadcrumb + heading */}
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'projects' },
              ]}
              className="mb-0"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary">
              projects
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              side projects, university work, and research papers - the collection
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 space-y-12">
          {SECTIONS.map((section, sectionIdx) => {
            const items = projects
              .filter((p) => p.category === section.category)
              .sort((a, b) => a.order - b.order)

            if (items.length === 0) return null

            return (
              <div key={section.key} className="content-auto">
                {/* Section header — typographic divider */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted/50 shrink-0">
                    {section.title}
                  </span>
                  <div className="flex-1 border-t border-white/6" />
                  <span className="text-[10px] font-mono text-text-muted/35 tabular-nums shrink-0">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {items.map((project, idx) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={() => setSelected(project)}
                      priority={sectionIdx === 0 && idx < 2}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Detail popup */}
      <Dialog open={!!selected} onOpenChange={({ open }) => { if (!open) setSelected(null) }}>
        <DialogPopup className="sm:max-w-3xl" showCloseButton>
          {selected && (() => {
            const Icon = getCategoryIcon(selected.category)
            return (
              <div className="animate-[popupIn_0.25s_ease-out_forwards] motion-reduce:animate-none overflow-hidden">
                {/* Banner image — full bleed at top */}
                {selected.image?.url && (
                  <div className="relative w-full aspect-16/7 overflow-hidden shrink-0">
                    <Image
                      src={selected.image.url}
                      alt={selected.image.alt || selected.name}
                      fill
                      className="object-cover"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0e18] via-black/20 to-transparent" />
                  </div>
                )}
                <DialogHeader className={selected.image?.url ? 'pt-4' : undefined}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-white/5 flex items-center justify-center">
                      {selected.icon?.url ? (
                        <Image
                          src={selected.icon.url}
                          alt={selected.icon.alt || `${selected.name} icon`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <Icon className="w-5 h-5 text-text-secondary" />
                      )}
                    </div>
                    <div className="min-w-0 text-left">
                      <DialogTitle className="font-serif text-2xl">{selected.name}</DialogTitle>
                      <DialogDescription className="text-text-muted/70 text-sm line-clamp-1 mt-0.5">
                        {getSubtitle(selected) || selected.description}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="px-6 pb-6">
                  <ProjectDetail project={selected} />
                </div>
              </div>
            )
          })()}
        </DialogPopup>
      </Dialog>
    </main>
  )
}
