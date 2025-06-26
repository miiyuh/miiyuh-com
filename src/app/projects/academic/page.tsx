'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const academicProjects = [
  {
    id: 'library-management',
    title: 'Library Management System',
    course: 'Final Year Project (FYP) - Diploma',
    year: '2023',
    semester: 'September',
    description: 'Comprehensive library management system with book cataloging, member management, and loan tracking functionality. Developed as the capstone project for Diploma in Computer Forensic at Management and Science University (MSU), Malaysia.',
    technologies: ['Java', 'MySQL', 'JDBC', 'Swing GUI'],
    status: 'Completed',
    grade: 'A+',
    hasDetailPage: true,
    program: 'Diploma in Computer Forensic',
    university: 'Management and Science University (MSU), Malaysia'
  },
  {
    id: 'lockme-encryption',
    title: 'LockMe: Secure File Encryption and Decryption Desktop Application',
    course: 'Final Year Project (FYP1 & FYP2) - Bachelor',
    year: '2024-2025',
    semester: 'Sep 2024 - Feb 2025',
    description: 'Advanced desktop application for secure file encryption and decryption using military-grade cryptographic algorithms. Implements AES-256 CBC encryption, RSA-2048 key exchange, PBKDF2 key derivation, and SHA-256 hashing with comprehensive GUI built in Python/Tkinter. Developed as the capstone project for Bachelor in Computer Forensic (Hons.) at Management and Science University (MSU), Malaysia.',
    technologies: ['Python 3.x', 'Tkinter GUI', 'PyCryptodome', 'AES-256', 'RSA-2048', 'SHA-256', 'PBKDF2'],
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
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              Final Year Projects completed during my studies in Computer Forensic at Management and Science University (MSU), Malaysia. These capstone projects showcase the culmination of my academic journey in both Diploma and Bachelor programs.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {academicProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  animationDelay: mounted ? `${index * 200}ms` : '0ms'
                }}
              >
                <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-xl p-8 hover:bg-[#FAF3E0]/10 transition-all duration-300 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 group">
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">
                          {project.id === 'library-management' ? '📚' : '🔐'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-[#FAF3E0] leading-tight mb-2 group-hover:text-[#FAF3E0] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#FAF3E0]/60 font-serif">
                          {project.course} • {project.semester} {project.year}
                        </p>
                        <p className="text-xs text-[#FAF3E0]/50 font-serif mt-1">
                          {project.program} • {project.university}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-mono flex-shrink-0 ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Project Description */}
                  <p className="text-[#FAF3E0]/80 font-serif mb-6 leading-relaxed text-base">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-[#FAF3E0]/80 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs px-3 py-1.5 bg-[#FAF3E0]/10 rounded-full text-[#FAF3E0]/70 font-mono border border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/20 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#FAF3E0]/10">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#FAF3E0]/60 font-serif">
                        Grade: <span className="font-bold text-[#FAF3E0]">{project.grade}</span>
                      </span>
                    </div>
                    
                    {project.hasDetailPage && (
                      <Link
                        href={`/projects/academic/${project.id}`}
                        onClick={playClick}
                        className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300 font-serif bg-[#FAF3E0]/5 hover:bg-[#FAF3E0]/10 px-4 py-2 rounded-lg border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40"
                      >
                        <span>View Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            learning never stops 📚
          </p>
        </div>
      </section>
    </main>
  )
}
