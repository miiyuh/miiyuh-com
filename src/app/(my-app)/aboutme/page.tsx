'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useSound } from '@/hooks/useSound'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { EncryptedText } from '@/components/effects/encrypted-text'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import {
  MapPin,
  Code2,
  Camera,
  GraduationCap,
  Briefcase,
  Heart,
  Compass,
  Layers,
  ArrowDown,
  Calendar
} from 'lucide-react'

export default function AboutMePage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const playClick = useSound('/sounds/click.mp3', 0.7)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    { id: 'details', label: 'Details', icon: <Compass className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'volunteering', label: 'Volunteering', icon: <Heart className="w-4 h-4" /> },
  ]

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollPosition = e.currentTarget.scrollTop
    const windowHeight = window.innerHeight
    const currentSection = Math.round(scrollPosition / windowHeight)
    setActiveSection(currentSection)
  }

  const scrollToSection = (index: number) => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <main
      ref={mainRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-transparent text-text-primary font-sans relative no-scrollbar"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Fixed Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              playClick()
              scrollToSection(index)
            }}
            className="group flex items-center gap-3 justify-end"
          >
            <span className={`text-sm font-serif transition-all duration-300 ${activeSection === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              {section.label}
            </span>
            <div className={`p-2 rounded-full border border-white/20 transition-all duration-500 ${activeSection === index ? 'bg-accent-primary text-bg-primary border-accent-primary scale-110' : 'bg-transparent text-text-muted group-hover:bg-white/10 group-hover:text-text-primary'}`}>
              {section.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Fixed Breadcrumbs */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-24 z-40">
        <SimpleBreadcrumb
          items={[
            { label: 'home', href: '/' },
            { label: 'about me' },
            { label: sections[activeSection]?.label.toLowerCase() || 'details' }
          ]}
          className="mb-16"
        />
      </div>

      {/* SECTION 1: DETAILS */}
      <section className="h-screen w-full snap-start flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
        <div className={`max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Hero Text */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-center mb-8 lg:mb-0">
            <EncryptedText
              text="about "
              as="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9]"
              speed={30}
            >
              <span className="text-text-muted italic">miiyuh.</span>
            </EncryptedText>
            <EncryptedText
              text="Computer forensics student, creative developer, and photographer based in Malaysia. Building digital experiences that matter."
              as="p"
              className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed font-light mb-8"
              speed={20}
            />

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-primary" />
                Malaysia
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary">
                <Code2 className="w-4 h-4 text-accent-primary" />
                Developer
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary">
                <Camera className="w-4 h-4 text-accent-primary" />
                Photographer
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="md:col-span-6 lg:col-span-4 h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden glass-panel-pro group">
            <Image
              src="/assets/img/personal-profile-pic.png"
              alt="Profile"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-8 left-8">
              <p className="text-white font-serif text-4xl italic mb-2">Azri</p>
              <p className="text-white/80 text-sm uppercase tracking-widest">Creative Developer</p>
            </div>
          </div>

          {/* Tech Stack & Philosophy */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-6 h-[400px] md:h-[500px]">
            {/* Tech Stack */}
            <div className="flex-1 p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-5 h-5 text-accent-primary" />
                <h3 className="font-serif text-xl text-text-primary">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Next.js', slug: 'nextdotjs' },
                  { name: 'TypeScript', slug: 'typescript' },
                  { name: 'React', slug: 'react' },
                  { name: 'Python', slug: 'python' },
                  { name: 'Tailwind', slug: 'tailwindcss' },
                  { name: 'Node.js', slug: 'nodedotjs' }
                ].map((tech) => (
                  <div key={tech.name} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/icon" title={tech.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}/FAF3E0`}
                      alt={tech.name}
                      className="w-6 h-6 opacity-60 group-hover/icon:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="flex-1 p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-accent-primary" />
                <h3 className="font-serif text-xl text-text-primary">Philosophy</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Technology should be transparent, accountable, and serve human needs. Progress over perfection.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-text-muted/50">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* SECTION 2: EDUCATION */}
      <section className="h-screen w-full snap-start flex items-center justify-center p-6 md:p-12 lg:p-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl w-full">
          <ScrollAnimation animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <GraduationCap className="w-8 h-8 text-accent-primary" />
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-text-primary">Education</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Education */}
              <div className="p-8 glass-panel-pro rounded-[2rem] hover:border-accent-primary/30 transition-all duration-500 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-accent-primary text-bg-primary font-bold text-xs uppercase tracking-wider rounded-bl-2xl">
                  Current
                </div>

                <div className="mb-6">
                  <span className="text-6xl mb-4 block">🎓</span>
                  <h3 className="text-3xl font-serif font-bold text-text-primary mb-2">Management & Science University</h3>
                  <p className="text-accent-primary font-mono text-sm">2024 — Present</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-1">Bachelor in Computer Forensics (Hons)</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Specializing in digital investigation, cyber security, and data recovery.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h5 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Key Modules</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Digital Forensics', 'Cyber Law', 'Network Security', 'Cryptography', 'Malware Analysis'].map((module) => (
                        <span key={module} className="text-xs px-3 py-1 rounded-full bg-white/5 text-text-secondary">
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Education or Certs */}
              <div className="p-8 glass-panel-pro rounded-[2rem] hover:border-accent-primary/30 transition-all duration-500 opacity-80 hover:opacity-100">
                <div className="mb-6">
                  <span className="text-6xl mb-4 block">🏫</span>
                  <h3 className="text-3xl font-serif font-bold text-text-primary mb-2">Previous Institution</h3>
                  <p className="text-text-muted font-mono text-sm">2022 — 2024</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-1">Foundation in Technology</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Built a strong foundation in programming, mathematics, and system architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 3: EXPERIENCE */}
      <section className="h-screen w-full snap-start flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="max-w-6xl w-full">
          <ScrollAnimation animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Briefcase className="w-8 h-8 text-accent-primary" />
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-text-primary">Experience</h2>
            </div>

            <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
              {/* Experience Item 1 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-primary ring-4 ring-bg-primary group-hover:scale-125 transition-transform"></div>
                <div className="p-6 md:p-8 glass-panel-pro rounded-2xl hover:border-accent-primary/30 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-text-primary">Freelance Developer</h3>
                      <p className="text-text-secondary">Self-Employed</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3 h-3" />
                      2023 — Present
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    Developing custom web solutions for clients using Next.js and modern web technologies. Focusing on performance, accessibility, and unique design systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-white/5 text-text-muted border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Item 2 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/20 ring-4 ring-bg-primary group-hover:bg-accent-primary transition-colors"></div>
                <div className="p-6 md:p-8 glass-panel-pro rounded-2xl hover:border-accent-primary/30 transition-all duration-500 opacity-80 hover:opacity-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-text-primary">Open Source Contributor</h3>
                      <p className="text-text-secondary">Community</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-text-muted bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-3 h-3" />
                      2022 — 2023
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    Contributed to various open-source projects, fixing bugs and improving documentation. Learned the importance of code quality and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* SECTION 4: VOLUNTEERING */}
      <section className="h-screen w-full snap-start flex items-center justify-center p-6 md:p-12 lg:p-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl w-full">
          <ScrollAnimation animation="fadeUp">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Heart className="w-8 h-8 text-accent-primary" />
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-text-primary">Volunteering</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Volunteer Card 1 */}
              <div className="p-8 glass-panel-pro rounded-[2rem] hover:border-accent-primary/30 transition-all duration-500 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🤝</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary mb-2">Community Tech Support</h3>
                <p className="text-text-secondary text-sm mb-6">
                  Helping local communities bridge the digital divide through workshops and technical assistance.
                </p>
                <span className="mt-auto text-xs font-bold uppercase tracking-widest text-accent-primary">2023 — Present</span>
              </div>

              {/* Volunteer Card 2 */}
              <div className="p-8 glass-panel-pro rounded-[2rem] hover:border-accent-primary/30 transition-all duration-500 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🌱</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary mb-2">Environmental Initiatives</h3>
                <p className="text-text-secondary text-sm mb-6">
                  Participating in local clean-up drives and awareness campaigns for sustainable living.
                </p>
                <span className="mt-auto text-xs font-bold uppercase tracking-widest text-accent-primary">2022 — Present</span>
              </div>

              {/* Volunteer Card 3 */}
              <div className="p-8 glass-panel-pro rounded-[2rem] hover:border-accent-primary/30 transition-all duration-500 flex flex-col items-center text-center group border-dashed border-2 border-white/10">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <span className="text-4xl text-white/20">?</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-muted mb-2">Next Chapter</h3>
                <p className="text-text-muted text-sm mb-6">
                  Always looking for new ways to give back to the community.
                </p>
                <Link href="/socials" className="mt-auto px-6 py-2 rounded-full bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-colors text-xs font-bold uppercase tracking-widest">
                  Get in touch
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </main>
  )
}
