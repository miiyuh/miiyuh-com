'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { TOCItemType } from 'fumadocs-core/toc'
import { PageTOC, MobileTOC } from '@/components/ui/page-toc'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react'

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
    htmlContent?: string
    toc?: TOCItemType[]
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

const CATEGORY_LABELS: Record<ProjectDetailProps['project']['category'], string> = {
  'side-project': 'side project',
  'university-project': 'university project',
}

export default function ProjectDetailClient({ project }: ProjectDetailProps) {
  const toc = project.toc ?? []
  const hasContent = Boolean(project.htmlContent?.trim())

  const techStack = project.projectDetails?.techStack ?? []
  const { course, semester, grade } = project.universityDetails ?? {}

  // One quiet row, matching the blog post header — no panels, no eyebrows.
  const meta = [CATEGORY_LABELS[project.category], course, semester, grade].filter(Boolean)

  const links = [
    { href: project.projectDetails?.githubUrl, label: 'source' },
    { href: project.projectDetails?.liveUrl, label: 'live' },
    { href: project.externalLink, label: 'view project' },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href))

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <section className="relative grow pt-6 pb-16">
        <div className="px-8 md:px-32 lg:px-56 xl:px-80">
          <SimpleBreadcrumb
            items={breadcrumbs.projectDetail(project.name)}
            className="-mx-8 px-8 md:mx-0 md:px-0"
          />

          <header className="mb-12 space-y-4">
            {/* Logo sits with the name, the way it does on the project itself.
                Aligned to the first line, not centred — titles here wrap to 3 lines. */}
            <div className="flex items-start gap-4">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 md:size-14 shrink-0 rounded-lg object-contain"
                  quality={85}
                  priority
                />
              )}
              <h1 className="text-5xl md:text-6xl font-notch tracking-tight text-text-primary text-balance">
                {project.name}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed text-pretty">
              {project.description}
            </p>

            {meta.length > 0 && (
              <p className="text-sm text-text-muted">{meta.join(' · ')}</p>
            )}

            {techStack.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {techStack.map((t, i) => (
                  <li
                    key={i}
                    className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4"
                  >
                    {t.tech}
                  </li>
                ))}
              </ul>
            )}

            {links.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                    <ArrowUpRightIcon className="w-3.5 h-3.5 text-text-muted/50 group-hover:text-text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                ))}
              </div>
            )}
          </header>

          {project.image?.url && (
            <figure className="mb-12 max-w-2xl">
              <Image
                src={project.image.url}
                alt={project.image.alt || `${project.name} screenshot`}
                width={1280}
                height={720}
                className="w-full h-auto rounded-lg border border-white/10"
                quality={75}
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </figure>
          )}

          {hasContent && (
            <>
              {toc.length > 0 && <MobileTOC toc={toc} scrollOffset={116} />}

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
                <article className="prose prose-invert max-w-none">
                  <div
                    className="lexical-content"
                    dangerouslySetInnerHTML={{ __html: project.htmlContent ?? '' }}
                  />
                </article>

                {toc.length > 0 && (
                  <div className="hidden lg:block relative h-full border-l border-white/10 pl-8">
                    <div className="sticky top-24 w-64">
                      <PageTOC toc={toc} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mirrors the blog post footer — the way back sits after the content */}
          <footer className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-text-primary hover:text-text-primary/80 transition-colors"
            >
              <ArrowLeftIcon weight="bold" className="w-4 h-4 shrink-0" />
              <span>back to projects</span>
            </Link>
          </footer>
        </div>
      </section>
    </main>
  )
}
