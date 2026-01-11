'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useSound } from '@/hooks/useSound'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { 
  ArrowLeft,
  ArrowUpRight,
  Rocket, 
  GraduationCap, 
  FileText,
  Github,
  ExternalLink,
  Calendar,
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2
} from 'lucide-react'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface ProjectDetailProps {
  project: {
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
}

export default function ProjectDetailClient({ project }: ProjectDetailProps) {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)
  
  // PDF state
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [pdfLoading, setPdfLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPdfLoading(false)
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1))
    playClick()
  }

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1))
    playClick()
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0))
    playClick()
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5))
    playClick()
  }

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'side-project':
        return <Rocket className="w-5 h-5 text-accent-primary" />
      case 'university-project':
        return <GraduationCap className="w-5 h-5 text-blue-400" />
      case 'research-paper':
        return <FileText className="w-5 h-5 text-purple-400" />
    }
  }

  const getCategoryLabel = () => {
    switch (project.category) {
      case 'side-project':
        return 'Side Project'
      case 'university-project':
        return 'University Project'
      case 'research-paper':
        return 'Research Paper'
    }
  }

  const getCategoryColor = () => {
    switch (project.category) {
      case 'side-project':
        return 'accent-primary'
      case 'university-project':
        return 'blue-400'
      case 'research-paper':
        return 'purple-400'
    }
  }

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
              onClick={playClick}
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              back to projects
            </Link>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${getCategoryColor()}/10 flex items-center justify-center border border-${getCategoryColor()}/20`}>
                  {getCategoryIcon()}
                </div>
                <span className={`text-xs font-mono text-${getCategoryColor()} uppercase tracking-wider`}>
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
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={project.image.url}
                      alt={project.image.alt || project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Tech Stack */}
                {project.projectDetails?.techStack && project.projectDetails.techStack.length > 0 && (
                  <div className="glass-panel-pro rounded-2xl p-6">
                    <h3 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.projectDetails.techStack.map((t, i) => (
                        <span key={i} className="px-3 py-1.5 text-sm font-mono bg-white/5 text-text-primary rounded-lg border border-white/10">
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
                      onClick={playClick}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                  {project.projectDetails?.liveUrl && (
                    <a
                      href={project.projectDetails.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-xl border border-accent-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
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
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={project.image.url}
                      alt={project.image.alt || project.name}
                      fill
                      className="object-cover"
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
                    onClick={playClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/20 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    View Project
                  </a>
                )}
              </div>
            )}

            {/* ============================================ */}
            {/* RESEARCH PAPER CONTENT */}
            {/* ============================================ */}
            {project.category === 'research-paper' && (
              <div className="space-y-8">
                {/* Paper Meta */}
                <div className="glass-panel-pro rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project.paperDetails?.author && (
                      <div>
                        <p className="text-xs font-mono text-text-muted mb-1 uppercase">Author</p>
                        <p className="text-text-primary">{project.paperDetails.author}</p>
                      </div>
                    )}
                    {project.paperDetails?.year && (
                      <div>
                        <p className="text-xs font-mono text-text-muted mb-1 uppercase">Year</p>
                        <p className="text-text-primary">{project.paperDetails.year}</p>
                      </div>
                    )}
                    {project.paperDetails?.pages && (
                      <div>
                        <p className="text-xs font-mono text-text-muted mb-1 uppercase">Pages</p>
                        <p className="text-text-primary">{project.paperDetails.pages} pages</p>
                      </div>
                    )}
                    {project.paperDetails?.pdfFile?.url && (
                      <div>
                        <a
                          href={project.paperDetails.pdfFile.url}
                          download
                          onClick={playClick}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/20 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Abstract */}
                {project.paperDetails?.abstract && (
                  <div className="glass-panel-pro rounded-2xl p-6">
                    <h3 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">Abstract</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {project.paperDetails.abstract}
                    </p>
                  </div>
                )}

                {/* Keywords */}
                {project.paperDetails?.keywords && project.paperDetails.keywords.length > 0 && (
                  <div className="glass-panel-pro rounded-2xl p-6">
                    <h3 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-wider">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.paperDetails.keywords.map((k, i) => (
                        <span key={i} className="px-3 py-1 text-sm font-mono bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                          {k.keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF Viewer */}
                {project.paperDetails?.pdfFile?.url && (
                  <div className="glass-panel-pro rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider">Document Preview</h3>
                      
                      {/* PDF Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={zoomOut}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Zoom out"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-mono text-text-muted px-2">
                          {Math.round(scale * 100)}%
                        </span>
                        <button
                          onClick={zoomIn}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Zoom in"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* PDF Document */}
                    <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden min-h-[600px]">
                      {pdfLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                        </div>
                      )}
                      
                      <div className="overflow-auto max-h-[80vh] flex justify-center p-4">
                        <Document
                          file={project.paperDetails.pdfFile.url}
                          onLoadSuccess={onDocumentLoadSuccess}
                          loading={
                            <div className="flex items-center justify-center p-8">
                              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                            </div>
                          }
                          error={
                            <div className="text-center p-8 text-text-muted">
                              <p>Failed to load PDF.</p>
                              <a
                                href={project.paperDetails.pdfFile.url}
                                download
                                className="text-purple-400 hover:underline mt-2 inline-block"
                              >
                                Download instead
                              </a>
                            </div>
                          }
                        >
                          <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-2xl"
                          />
                        </Document>
                      </div>

                      {/* Page Navigation */}
                      {numPages && numPages > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                          <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <span className="text-sm font-mono">
                            {pageNumber} / {numPages}
                          </span>
                          <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  )
}
