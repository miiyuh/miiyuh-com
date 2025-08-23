'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const researchPapers = [
  {
    id: 'malaysia-digital-transformation',
    title: 'Digital Infrastructure for Malaysia: Towards People-First Technology Policies',
    author: 'miiyuh',
    year: '2024',
    abstract: 'This paper examines Malaysia\'s digital transformation landscape and proposes technology policies that prioritize citizen welfare over corporate interests. It explores how reliable public transport systems can be enhanced through smart city technologies, how digital platforms can enable more responsive governance, and how technology can address environmental challenges like air quality and urban safety. The study advocates for institutional reform that leverages technology for transparency and accountability.',
    keywords: ['Malaysia', 'Digital Policy', 'Smart Cities', 'Public Transport', 'Governance', 'Environmental Technology'],
    pages: 28,
    pdfPath: '/papers/malaysia-digital-transformation.pdf'
  },
  {
    id: 'ethical-ai-open-source',
    title: 'AI as a Tool, Not a Shortcut: Building Transparent and Human-Centered AI Systems',
    author: 'miiyuh',
    year: '2024',
    abstract: 'This research explores ethical AI development practices that maintain human agency and transparency. It examines how AI can augment human capabilities without replacing human judgment, the importance of consent and attribution in AI systems, and strategies for fact-checking AI outputs. The paper emphasizes open-source contributions as a means of democratizing AI technology and enabling collective improvement. Case studies demonstrate practical implementations of human-in-the-loop AI systems.',
    keywords: ['Ethical AI', 'Human-Centered Design', 'Open Source', 'Transparency', 'AI Governance', 'Technology Ethics'],
    pages: 32,
    pdfPath: '/papers/ethical-ai-open-source.pdf'
  },
  {
    id: 'community-responsibility-philosophy',
    title: 'Individual Growth and Collective Responsibility: A Philosophy for Modern Community Building',
    author: 'miiyuh',
    year: '2024',
    abstract: 'Drawing inspiration from philosophical works and narratives like Attack on Titan and Vinland Saga, this paper explores the tension between personal autonomy and community responsibility. It examines how individuals can maintain their independence while supporting those around them, the ethics of change and adaptation, and the philosophical foundations of building better communities. The research addresses questions of meaning, responsibility, and growth in the context of modern social challenges.',
    keywords: ['Philosophy', 'Community Ethics', 'Personal Growth', 'Social Responsibility', 'Meaning', 'Collective Action'],
    pages: 24,
    pdfPath: '/papers/community-responsibility-philosophy.pdf'
  },
  {
    id: 'health-technology-wellbeing',
    title: 'Technology for Human Wellbeing: Designing Systems that Support Physical and Mental Health',
    author: 'miiyuh',
    year: '2023',
    abstract: 'This study investigates how technology can be designed to genuinely support human health and wellbeing rather than exploit attention or create dependency. It explores digital wellness principles, the importance of taking care of personal health to serve others effectively, and how technology can facilitate rather than hinder real-world connections and activities. The research includes practical guidelines for creating technology that encourages healthy boundaries and sustainable habits.',
    keywords: ['Digital Wellbeing', 'Health Technology', 'Sustainable Design', 'Mental Health', 'Human-Computer Interaction', 'Technology Ethics'],
    pages: 22,
    pdfPath: '/papers/health-technology-wellbeing.pdf'
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
