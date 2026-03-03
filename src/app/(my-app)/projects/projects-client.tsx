'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
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

function ProjectCard({
  project,
  onSelect,
  priority,
}: {
  project: Project
  onSelect: () => void
  priority: boolean
}) {
  const status = project.projectDetails?.status ? STATUS_STYLES[project.projectDetails.status] : null
  const subtitle = getSubtitle(project)

  return (
    <article
      className="group relative border-r border-b border-white/8 bg-transparent hover:bg-white/3 transition-all duration-500 cursor-pointer flex flex-col"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect() } }}
      aria-label={`View details for ${project.name}`}
    >
      {/* Cover image */}
      {project.image?.url && (
        <div className="relative aspect-video overflow-hidden bg-black/20">
          <Image
            src={project.image.url}
            alt={project.image.alt || project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col grow gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {project.icon?.url && (
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/5">
                <Image
                  src={project.icon.url}
                  alt={project.icon.alt || `${project.name} icon`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover"
                />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-lg font-serif text-text-primary group-hover:text-accent-primary transition-colors duration-200 truncate">
                {project.name}
              </h3>
              {subtitle && (
                <p className="text-xs text-text-muted mt-0.5 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 shrink-0 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 mt-1" />
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {project.category === 'research-paper' && project.paperDetails?.abstract
            ? project.paperDetails.abstract
            : project.description}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-auto">
          {project.category === 'side-project' && (
            <>
              {status && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${status.className}`}>
                  {status.label}
                </span>
              )}
              {project.projectDetails?.techStack?.slice(0, 3).map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-[11px] bg-white/4 text-text-muted border border-white/8 font-mono">
                  {t.tech}
                </span>
              ))}
            </>
          )}
          {project.category === 'university-project' && (
            <>
              {project.universityDetails?.semester && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-white/4 text-text-muted border border-white/8">
                  <Calendar className="w-3 h-3" />
                  {project.universityDetails.semester}
                </span>
              )}
              {project.universityDetails?.grade && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-white/4 text-text-muted border border-white/8">
                  <BookOpen className="w-3 h-3" />
                  {project.universityDetails.grade}
                </span>
              )}
            </>
          )}
          {project.category === 'research-paper' && project.paperDetails?.keywords?.slice(0, 3).map((k, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full text-[11px] bg-white/4 text-text-muted border border-white/8 font-mono">
              {k.keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Dialog detail content
// ---------------------------------------------------------------------------

function ProjectDetail({ project }: { project: Project }) {
  const hasLinks = !!(
    project.projectDetails?.githubUrl ||
    project.projectDetails?.liveUrl ||
    project.paperDetails?.pdfFile?.url ||
    project.externalLink
  )

  return (
    <div className="space-y-5">
      {/* Cover image */}
      {project.image?.url && (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/8">
          <Image src={project.image.url} alt={project.image.alt || project.name} fill className="object-cover" />
        </div>
      )}

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
            <a href={project.projectDetails.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-xl border border-white/8 transition-colors duration-200">
              <Github className="w-4 h-4" /> Source
            </a>
          )}
          {project.projectDetails?.liveUrl && (
            <a href={project.projectDetails.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-xl border border-accent-primary/20 transition-colors duration-200">
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
          {project.paperDetails?.pdfFile?.url && (
            <a href={project.paperDetails.pdfFile.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/20 transition-colors duration-200">
              <Download className="w-4 h-4" /> PDF
            </a>
          )}
          {project.externalLink && (
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-xl border border-white/8 transition-colors duration-200">
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
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 space-y-16">
          {SECTIONS.map((section, sectionIdx) => {
            const items = projects
              .filter((p) => p.category === section.category)
              .sort((a, b) => a.order - b.order)

            if (items.length === 0) return null

            const SectionIcon = section.icon

            return (
              <div key={section.key}>
                {sectionIdx > 0 && <div className="border-t border-white/8 mb-10" />}

                {/* Section header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/8">
                    <SectionIcon className="w-[18px] h-[18px] text-text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-text-primary leading-tight">{section.title}</h2>
                    <p className="text-xs text-text-muted mt-0.5">{section.subtitle}</p>
                  </div>
                </div>

                {/* Card grid */}
                <div className="rounded-2xl overflow-hidden border-t border-l border-white/8">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
              </div>
            )
          })}
        </div>
      </section>

      {/* Detail popup */}
      <Dialog open={!!selected} onOpenChange={({ open }) => { if (!open) setSelected(null) }}>
        <DialogPopup className="sm:max-w-2xl">
          {selected && (() => {
            const Icon = getCategoryIcon(selected.category)
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/5 flex items-center justify-center">
                      {selected.icon?.url ? (
                        <Image
                          src={selected.icon.url}
                          alt={selected.icon.alt || `${selected.name} icon`}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover"
                        />
                      ) : (
                        <Icon className="w-[18px] h-[18px] text-text-secondary" />
                      )}
                    </div>
                    <div className="min-w-0 text-left">
                      <DialogTitle className="font-serif text-xl">{selected.name}</DialogTitle>
                      <DialogDescription className="text-text-muted text-xs line-clamp-1 mt-0.5">
                        {getSubtitle(selected) || selected.description}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="px-6 pb-6">
                  <ProjectDetail project={selected} />
                </div>
              </>
            )
          })()}
        </DialogPopup>
      </Dialog>
    </main>
  )
}
