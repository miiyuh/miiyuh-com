'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import {
  ArrowLeft,
  ArrowUpRight,
  Rocket,
  GraduationCap,
  GithubLogo,
  ArrowSquareOut,
  Calendar,
  BookOpen,
} from '@phosphor-icons/react'

interface ProjectDetailProps {
  project: {
    id: string
    name: string
    slug: string
    category: 'side-project' | 'university-project'
    description: string
    icon?: string
    image?: {
      url?: string
      alt?: string
    }
    content?: unknown
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
}

export default function ProjectDetailClient({ project }: ProjectDetailProps) {
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'side-project':
        return <Rocket className="w-5 h-5 text-accent-primary" />
      case 'university-project':
        return <GraduationCap className="w-5 h-5 text-blue-400" />
    }
  }

  const getCategoryLabel = () => {
    switch (project.category) {
      case 'side-project':
        return 'Side Project'
      case 'university-project':
        return 'University Project'
    }
  }

  const getCategoryTheme = () => {
    switch (project.category) {
      case 'side-project':
        return {
          badge: 'bg-accent-primary/10 border-accent-primary/20',
          text: 'text-accent-primary',
        }
      case 'university-project':
        return {
          badge: 'bg-blue-400/10 border-blue-400/20',
          text: 'text-blue-400',
        }
    }
  }

  const categoryTheme = getCategoryTheme()

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-xs font-mono bg-green-500/20 text-green-400 rounded-full border border-green-500/30">ACTIVE</span>
      case 'in-development':
        return <span className="px-3 py-1 text-xs font-mono bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">IN DEVELOPMENT</span>
      case 'archived':
        return <span className="px-3 py-1 text-xs font-mono bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/30">ARCHIVED</span>
      default:
        return null
    }
  }

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div>
          
          <div className="px-6 md:px-12 lg:px-24 xl:px-32">
            {/* Breadcrumb Navigation */}
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'projects', href: '/projects' },
                { label: project.name },
              ]}
              className="mb-8"
            />

            {/* Back button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              back to projects
            </Link>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${categoryTheme.badge}`}>
                  {getCategoryIcon()}
                </div>
                <span className={`text-xs font-mono uppercase tracking-wider ${categoryTheme.text}`}>
                  {getCategoryLabel()}
                </span>
                {project.projectDetails?.status && getStatusBadge(project.projectDetails.status)}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 text-text-primary">
                {project.name}
              </h1>

              <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* ============================================ */}
            {/* SIDE PROJECT CONTENT */}
            {/* ============================================ */}
            {project.category === 'side-project' && (
              <div className="space-y-8">
                {/* Cover Image */}
                {project.image?.url && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/8">
                    <Image
                      src={project.image.url}
                      alt={project.image.alt || project.name}
                      fill
                      className="object-cover"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    />
                  </div>
                )}

                {/* Tech Stack */}
                {project.projectDetails?.techStack && project.projectDetails.techStack.length > 0 && (
                  <div className="glass-panel-pro rounded-2xl p-6">
                    <h3 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.projectDetails.techStack.map((t, i) => (
                        <span key={i} className="px-3 py-1.5 text-sm font-mono bg-white/5 text-text-primary rounded-lg border border-white/8">
                          {t.tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.projectDetails?.githubUrl && (
                    <a
                      href={project.projectDetails.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/8 transition-colors"
                    >
                      <GithubLogo weight="fill" className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                  {project.projectDetails?.liveUrl && (
                    <a
                      href={project.projectDetails.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-xl border border-accent-primary/20 transition-colors"
                    >
                      <ArrowSquareOut className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* UNIVERSITY PROJECT CONTENT */}
            {/* ============================================ */}
            {project.category === 'university-project' && (
              <div className="space-y-8">
                {/* Cover Image */}
                {project.image?.url && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/8">
                    <Image
                      src={project.image.url}
                      alt={project.image.alt || project.name}
                      fill
                      className="object-cover"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    />
                  </div>
                )}

                {/* Course Details */}
                <div className="glass-panel-pro rounded-2xl p-6">
                  <h3 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">Course Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.universityDetails?.course && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-text-secondary">{project.universityDetails.course}</span>
                      </div>
                    )}
                    {project.universityDetails?.semester && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-text-secondary">{project.universityDetails.semester}</span>
                      </div>
                    )}
                    {project.universityDetails?.grade && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-mono bg-green-500/20 text-green-400 rounded border border-green-500/30">
                          Grade: {project.universityDetails.grade}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* External Link */}
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/20 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    View Project
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  )
}
