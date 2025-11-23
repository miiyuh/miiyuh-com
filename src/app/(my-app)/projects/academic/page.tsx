'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
const academicProjects = [
  {
    id: 'library-management',
    title: 'Library Management System',
    course: 'Final Year Project (FYP)',
    semester: 'September - December 2023',
    description: 'PHP-based web application designed for schools with dual modules for administrators and students.',
    technologies: ['PHP', 'MySQL', 'phpMyAdmin', 'reCAPTCHA', 'HTML/CSS', 'JavaScript', 'XAMPP'],
    status: 'Completed',
    grade: 'A+',
    hasDetailPage: true,
    program: 'Diploma in Computer Forensic',
    university: 'Management and Science University (MSU), Malaysia'
  },
  {
    id: 'lockme-encryption',
    title: 'LockMe: Secure File Encryption and Decryption Application',
    course: 'Final Year Project (FYP)',
    semester: 'September 2024 - June 2025',
    description: 'Privacy-first desktop web application for secure file encryption and decryption using AES-256-GCM encryption via Web Crypto API.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Firebase', 'Genkit', 'Gemini AI'],
    status: 'Completed',
    grade: 'A',
    hasDetailPage: true,
    program: 'Bachelor in Computer Forensic (Hons.)',
    university: 'Management and Science University (MSU), Malaysia'
  }
]

export default function AcademicProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      {/* Interactive dots background */}
            {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-screen">
        <div className={`transition-all duration-1000 max-w-8xl mx-auto ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
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
                <span className="text-[#FAF3E0]/90">academic</span>
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
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tighter hover:text-[#FAF3E0] transition-colors duration-300">
                  University Projects
                </h1>
                <p className="text-[#FAF3E0]/60 font-serif">Academic coursework and research projects</p>
              </div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-12">
              Final Year Projects completed during my studies in Computer Forensic at Management and Science University (MSU), Malaysia. These capstone projects showcase the culmination of my academic journey in both Diploma and Bachelor programs.
            </p>
          </div>

          {/* Projects Grid - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-8xl mx-auto">
            {academicProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  animationDelay: mounted ? `${index * 200}ms` : '0ms'
                }}
              >
                <Link
                  href={`/projects/academic/${project.id}`}
                  onClick={playClick}
                  className="block h-full"
                  data-cursor="view"
                >
                  <div className="border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300 group p-8 hover:scale-[1.01] hover:-translate-y-1 bg-[#1A1A1A]">
                  
                  {/* Simplified Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">
                        {project.id === 'library-management' ? '📚' : '🔐'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-[#FAF3E0] leading-tight tracking-tight mb-3 group-hover:text-[#FAF3E0] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#FAF3E0]/60 font-serif mb-2">
                        {project.course} • {project.semester}
                      </p>
                      <p className="text-sm text-[#FAF3E0]/50 font-serif">
                        {project.program}
                      </p>
                    </div>
                  </div>

                  {/* Optimized Description */}
                  <p className="text-[#FAF3E0]/80 font-serif mb-6 leading-relaxed text-base line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies with Arrow */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="text-sm px-3 py-2 text-[#FAF3E0]/60 font-mono border border-[#FAF3E0]/20 hover:text-[#FAF3E0]/80 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-sm px-3 py-2 text-[#FAF3E0]/40 font-mono">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      
                      {project.hasDetailPage && (
                        <div className="inline-flex items-center gap-1 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-200 font-serif flex-shrink-0 ml-4">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
