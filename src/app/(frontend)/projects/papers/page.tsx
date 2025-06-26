'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const researchPapers = [
  {
    id: 'ai-ethics',
    title: 'Ethical Considerations in Modern AI Development',
    author: 'miiyuh',
    year: '2024',
    abstract: 'This paper explores the critical ethical considerations that arise in the development and deployment of artificial intelligence systems. It examines current frameworks for AI ethics, discusses potential biases in machine learning algorithms, and proposes guidelines for responsible AI development. The study includes case studies of recent AI implementations and their societal impacts.',
    keywords: ['Artificial Intelligence', 'Ethics', 'Machine Learning', 'Bias', 'Responsible AI'],
    pages: 24,
    pdfPath: '/papers/ai-ethics-considerations.pdf'
  },
  {
    id: 'web-accessibility',
    title: 'Improving Web Accessibility Through Modern Development Practices',
    author: 'miiyuh',
    year: '2024',
    abstract: 'An analysis of contemporary web development practices and their impact on digital accessibility. This research examines how modern frameworks and tools can be leveraged to create more inclusive web experiences. The paper includes practical guidelines for developers and case studies of successful accessibility implementations.',
    keywords: ['Web Development', 'Accessibility', 'Inclusive Design', 'WCAG', 'User Experience'],
    pages: 18,
    pdfPath: '/papers/web-accessibility-practices.pdf'
  },
  {
    id: 'sustainable-tech',
    title: 'Sustainable Technology: Reducing the Environmental Impact of Software Development',
    author: 'miiyuh',
    year: '2023',
    abstract: 'This paper investigates the environmental impact of software development practices and proposes strategies for creating more sustainable technology solutions. It covers energy-efficient coding practices, sustainable hosting solutions, and the lifecycle impact of digital products.',
    keywords: ['Sustainable Technology', 'Green Computing', 'Environmental Impact', 'Software Development'],
    pages: 21,
    pdfPath: '/papers/sustainable-technology-development.pdf'
  }
]

export default function ResearchPapersPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-screen">
        <div className={`transition-all duration-1000 max-w-6xl mx-auto ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-6" aria-label="Breadcrumb">
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
                <Link 
                  href="/projects" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  projects
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">papers</span>
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <div className="w-full mb-8">
            <Link
              href="/projects"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to projects
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12 text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tighter hover:text-[#FAF3E0] transition-colors duration-300">
                  Research Papers
                </h1>
                <p className="text-[#FAF3E0]/60 font-serif">Personal research and academic writings</p>
              </div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              A collection of research papers I&apos;ve written on various topics in technology, ethics, and digital innovation.
            </p>
          </div>

          {/* Papers List */}
          <div className="space-y-8">
            {researchPapers.map((paper, index) => (
              <div
                key={paper.id}
                className={`transition-all duration-700`}
                style={{
                  animationDelay: mounted ? `${index * 200}ms` : '0ms'
                }}
              >
                <Link
                  href={`/projects/papers/${paper.id}`}
                  onClick={playClick}
                  className="group block"
                >
                  <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-8 hover:bg-[#FAF3E0]/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FAF3E0]/10 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20">
                    
                    {/* Paper Header */}
                    <div className="mb-6">
                      <h3 className="font-bold text-xl text-[#FAF3E0] mb-2 group-hover:text-[#FAF3E0] transition-colors duration-300">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[#FAF3E0]/60 font-serif">
                        <span>by {paper.author}</span>
                        <span>•</span>
                        <span>{paper.year}</span>
                        <span>•</span>
                        <span>{paper.pages} pages</span>
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-[#FAF3E0]/90 mb-2">Abstract</h4>
                      <p className="text-sm text-[#FAF3E0]/80 font-serif leading-relaxed">
                        {paper.abstract}
                      </p>
                    </div>

                    {/* Keywords */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#FAF3E0]/90 mb-2 text-sm">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {paper.keywords.map((keyword) => (
                          <span 
                            key={keyword}
                            className="text-xs px-2 py-1 bg-[#FAF3E0]/10 rounded text-[#FAF3E0]/70 font-mono"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Read Paper Button */}
                    <div className="flex justify-between items-center">
                      <div className="inline-flex items-center gap-2 text-xs text-[#FAF3E0]/60 group-hover:text-[#FAF3E0]/80 transition-colors duration-300">
                        <span>read paper</span>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="w-0 h-0.5 bg-gradient-to-r from-[#FAF3E0]/50 to-transparent group-hover:w-32 transition-all duration-500"></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            research & discovery 🔬
          </p>
        </div>
      </section>
    </main>
  )
}
