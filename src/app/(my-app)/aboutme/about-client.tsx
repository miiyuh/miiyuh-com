'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, useRef } from 'react'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { EncryptedText } from '@/components/effects/encrypted-text'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import CircularText from '@/components/ui/shadcn-io/circular-text'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import type { AboutEntry } from '@/types/about'
import {
  MapPin,
  Code2,
  Camera,
  GraduationCap,
  Briefcase,
  Heart,
  Compass,
  Layers,
  ExternalLink,
} from 'lucide-react'

const buildIridescentGradient = (xPercent: number, yPercent: number) =>
  `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255, 255, 255, 0.35), transparent 55%) , conic-gradient(from 0deg at ${xPercent}% ${yPercent}%, rgba(255, 94, 246, 0.45), rgba(94, 252, 255, 0.35), rgba(255, 215, 94, 0.45), rgba(255, 94, 246, 0.45))`

const IRIDESCENT_BASE = buildIridescentGradient(50, 50)

interface AboutClientProps {
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}

export default function AboutClient({ education, experience, volunteering }: AboutClientProps) {
  const [mounted, setMounted] = useState(false)
  const [openTooltips, setOpenTooltips] = useState<Record<string, boolean>>({})
  const portraitRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isPointerFineRef = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetPortraitEffect = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (portraitRef.current) {
      portraitRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      portraitRef.current.style.boxShadow = '0px 20px 45px rgba(0, 0, 0, 0.35)'
    }
    // Keep the iridescent gradient at its current position, don't reset it
  }, [])

  const handlePortraitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerFineRef.current) return
    const card = portraitRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -12
    const rotateY = ((x - rect.width / 2) / rect.width) * 12
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (portraitRef.current) {
        portraitRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
        const shadowX = rotateY * -2.5
        const shadowY = rotateX * 2.5
        portraitRef.current.style.boxShadow = `${shadowX}px ${shadowY + 25}px 55px rgba(0, 0, 0, 0.45)`
      }
      if (highlightRef.current) {
        highlightRef.current.style.background = buildIridescentGradient(xPercent, yPercent)
      }
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const updatePointerCapability = (matches: boolean) => {
      isPointerFineRef.current = matches
      if (!matches) resetPortraitEffect()
    }
    updatePointerCapability(mediaQuery.matches)
    const listener = (event: MediaQueryListEvent) => updatePointerCapability(event.matches)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(listener)
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(listener)
      }
    }
  }, [resetPortraitEffect])

  useEffect(() => {
    resetPortraitEffect()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [resetPortraitEffect])

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative py-24" style={{ paddingTop: '24px' }}>
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 mb-12">
          <div
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ marginBottom: 'calc(var(--spacing) * 8)' }}
          >
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'about me' },
              ]}
              className="mb-0"
            />
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col gap-20">
          {/* SECTION 1: DETAILS - Layout preserved */}
          <section id="details" className="relative w-full flex items-center justify-center py-10 md:py-16">
            <div className="relative w-full">
              <div className={`max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Hero Text */}
                <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-center mb-8 lg:mb-0">
                  <EncryptedText
                    text="about "
                    as="h1"
                    className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-6 text-text-primary leading-[0.9]"
                    speed={5}
                  >
                    <span className="text-text-muted italic">miiyuh</span>
                  </EncryptedText>
                  <EncryptedText
                    text="Computer forensics student, creative developer, and photographer based in Malaysia. Building digital experiences that matter."
                    as="p"
                    className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed font-light mb-8 font-sans"
                    speed={15}
                  />

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-m text-text-secondary font-serif">
                      <MapPin className="w-4 h-4 text-accent-primary" />
                      Malaysia
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-m text-text-secondary font-serif">
                      <Code2 className="w-4 h-4 text-accent-primary" />
                      Developer
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-m text-text-secondary font-serif">
                      <Camera className="w-4 h-4 text-accent-primary" />
                      Photographer
                    </div>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="md:col-span-6 lg:col-span-4 h-[400px] md:h-[500px] relative" style={{ perspective: '1400px' }}>
                  <div className="absolute top-0 right-0 z-30 pointer-events-auto translate-x-1/2 -translate-y-1/2">
                    <CircularText
                      text="MALAYSIAN·DEVELOPER·"
                      spinDuration={20}
                      onHover="speedUp"
                      className="w-[140px] h-[140px] opacity-80 font-['Inter'] text-white text-sm"
                    />
                  </div>

                  <div
                    ref={portraitRef}
                    onPointerMove={handlePortraitPointerMove}
                    onPointerLeave={resetPortraitEffect}
                    className="h-full w-full rounded-3xl overflow-hidden glass-panel-pro transform-gpu transition-[transform,box-shadow] duration-200 ease-out will-change-transform cursor-default md:cursor-pointer shadow-2xl relative"
                    style={{ transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', boxShadow: '0px 20px 45px rgba(0, 0, 0, 0.35)' }}
                  >
                    <Image
                      src="/assets/img/personal-profile-pic.png"
                      alt="Profile"
                      fill
                      className="object-cover pointer-events-none select-none"
                      quality={85}
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      ref={highlightRef}
                      className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none transition-opacity duration-500"
                      style={{ background: IRIDESCENT_BASE }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-8 left-8">
                      <p className="text-white font-serif text-4xl italic mb-2">Azri</p>
                      <p className="text-white/80 text-sm uppercase tracking-widest">Creative Developer</p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack & Philosophy */}
                <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-2 justify-end self-end">
                  <div className="p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col justify-center">
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
                        <Tooltip key={tech.name} open={openTooltips[tech.name] || false} onOpenChange={(details) => setOpenTooltips(prev => ({ ...prev, [tech.name]: details.open }))}>
                          <TooltipTrigger>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/icon cursor-pointer" onClick={() => setOpenTooltips(prev => ({ ...prev, [tech.name]: !prev[tech.name] }))}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={`https://cdn.simpleicons.org/${tech.slug}/FAF3E0`}
                                alt={tech.name}
                                className="w-6 h-6 opacity-60 group-hover/icon:opacity-100 transition-opacity"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipPopup>
                            <p>{tech.name}</p>
                          </TooltipPopup>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 glass-panel-pro rounded-3xl hover:border-accent-primary/30 transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            </div>
          </section>

          {/* SECTION 2: EXPERIENCE */}
          <section id="experience" className="w-full border-t border-white/10 pt-12">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation animation="fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10">
                    <Briefcase className="w-12 h-12 text-text-primary" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-primary">Experience</h2>
                    <p className="text-sm text-text-muted">professional journey & work history</p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={0.1}>
                {/* Hatching pattern between cards */}
                <div className="relative border-y border-white/10 py-4">
                  <div className="relative flex flex-col gap-0 px-1">
                    {experience.length > 0 ? experience.map((entry, idx) => (
                      <div key={entry.id}>
                        {/* Hatching pattern between cards */}
                        {idx > 0 && (
                          <div
                            className="h-4 my-0"
                            style={{
                              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255, 255, 255, 0.08) 8px, rgba(255, 255, 255, 0.08) 10px)`,
                              opacity: 0.7,
                            }}
                          />
                        )}
                        <div
                          className="group relative p-6 glass-panel-pro overflow-hidden transition-all duration-500 flex flex-col"
                        >
                        {/* Hover gradient overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: [
                              'linear-gradient(135deg, rgba(255, 94, 246, 0.15), rgba(94, 252, 255, 0.1), transparent)',
                              'linear-gradient(135deg, rgba(94, 252, 255, 0.15), rgba(255, 215, 94, 0.1), transparent)',
                              'linear-gradient(135deg, rgba(255, 215, 94, 0.15), rgba(255, 94, 246, 0.1), transparent)',
                            ][idx % 3],
                          }}
                        />

                        <div className="relative z-10 flex items-start gap-4">
                        {/* Logo - 1:1 square */}
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/10">
                          {entry.logo?.url ? (
                            <Image
                              src={entry.logo.url}
                              alt={entry.logo.alt || entry.title}
                              width={56}
                              height={56}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          ) : (
                            <Briefcase className="w-6 h-6 text-text-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                            <div>
                              <h3 className="text-xl font-serif text-text-primary">{entry.title}</h3>
                              {entry.subtitle && (
                                <p className="text-accent-primary text-sm font-medium">{entry.subtitle}</p>
                              )}
                            </div>
                            <span className="text-xl text-text-muted whitespace-nowrap" style={{ fontFamily: 'var(--font-instrument-serif), serif' }}>
                              {entry.startDate}{entry.endDate ? ` — ${entry.endDate}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {entry.description && (
                        <p className="relative z-10 text-text-secondary text-sm leading-relaxed mt-4">{entry.description}</p>
                      )}

                      {(entry.tags && entry.tags.length > 0) && (
                        <div className="relative z-10 flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
                          {entry.tags.map((t, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/5 text-text-muted border border-white/5">
                              {t.tag}
                            </span>
                          ))}
                        </div>
                      )}

                        {entry.link && (
                          <Link
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 p-2 bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-colors z-10"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 glass-panel-pro text-center text-text-muted">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Experience entries coming soon...</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* SECTION 3: EDUCATION */}
          <section id="education" className="w-full border-t border-white/10 pt-12">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation animation="fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10">
                    <GraduationCap className="w-12 h-12 text-text-primary" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-primary">Education</h2>
                    <p className="text-sm text-text-muted">academic journey & qualifications</p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={0.1}>
                {/* Hatching pattern between cards */}
                <div className="relative border-y border-white/10 py-4">
                  <div className="relative flex flex-col gap-0 px-1">
                    {education.length > 0 ? education.map((entry, idx) => (
                      <div key={entry.id}>
                        {/* Hatching pattern between cards */}
                        {idx > 0 && (
                          <div
                            className="h-4 my-0"
                            style={{
                              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255, 255, 255, 0.08) 8px, rgba(255, 255, 255, 0.08) 10px)`,
                              opacity: 0.7,
                            }}
                          />
                        )}
                        <div
                          className="group relative p-6 glass-panel-pro overflow-hidden transition-all duration-500"
                        >
                        {/* Hover gradient overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: [
                              'linear-gradient(135deg, rgba(94, 252, 255, 0.15), rgba(255, 94, 246, 0.1), transparent)',
                              'linear-gradient(135deg, rgba(255, 215, 94, 0.15), rgba(94, 252, 255, 0.1), transparent)',
                              'linear-gradient(135deg, rgba(255, 94, 246, 0.15), rgba(255, 215, 94, 0.1), transparent)',
                            ][idx % 3],
                          }}
                        />

                        <div className="relative z-10 flex items-start gap-4">
                        {/* Logo - 1:1 square */}
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/10">
                          {entry.logo?.url ? (
                            <Image
                              src={entry.logo.url}
                              alt={entry.logo.alt || entry.title}
                              width={56}
                              height={56}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-text-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                            <div>
                              <h3 className="text-xl font-serif text-text-primary">{entry.title}</h3>
                              {entry.subtitle && (
                                <p className="text-accent-primary text-sm font-medium">{entry.subtitle}</p>
                              )}
                            </div>
                            <span className="text-xl text-text-muted whitespace-nowrap" style={{ fontFamily: 'var(--font-instrument-serif), serif' }}>
                              {entry.startDate}{entry.endDate ? ` — ${entry.endDate}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>

                      {entry.description && (
                        <p className="relative z-10 text-text-secondary text-sm leading-relaxed mt-4">{entry.description}</p>
                      )}

                        {entry.tags && entry.tags.length > 0 && (
                          <div className="relative z-10 flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                            {entry.tags.map((t, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-white/5 text-text-muted border border-white/5">
                                {t.tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    )) : (
                      <div className="p-8 glass-panel-pro text-center text-text-muted">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Education entries coming soon...</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* SECTION 4: VOLUNTEERING */}
          <section id="volunteering" className="w-full border-t border-white/10 pt-12">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation animation="fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10">
                    <Heart className="w-12 h-12 text-text-primary" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-primary">Volunteering</h2>
                    <p className="text-sm text-text-muted">giving back to the community</p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={0.1}>
                {/* Hatching pattern between cards */}
                <div className="relative border-y border-white/10 py-4">
                  <div className="relative flex flex-col gap-0 px-1">
                    {volunteering.length > 0 ? volunteering.map((entry, idx) => (
                      <div key={entry.id}>
                        {/* Hatching pattern between cards */}
                        {idx > 0 && (
                          <div
                            className="h-4 my-0"
                            style={{
                              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255, 255, 255, 0.08) 8px, rgba(255, 255, 255, 0.08) 10px)`,
                              opacity: 0.7,
                            }}
                          />
                        )}
                        <div
                          className="group relative p-6 glass-panel-pro overflow-hidden transition-all duration-500 flex flex-col"
                        >
                          {/* Hover gradient overlay */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: [
                                'linear-gradient(135deg, rgba(255, 215, 94, 0.15), rgba(255, 94, 246, 0.1), transparent)',
                                'linear-gradient(135deg, rgba(255, 94, 246, 0.15), rgba(94, 252, 255, 0.1), transparent)',
                                'linear-gradient(135deg, rgba(94, 252, 255, 0.15), rgba(255, 215, 94, 0.1), transparent)',
                              ][idx % 3],
                            }}
                          />

                          <div className="relative z-10 flex items-start gap-4">
                            {/* Logo - 1:1 square */}
                            <div className="w-14 h-14 bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/10">
                              {entry.logo?.url ? (
                                <Image
                                  src={entry.logo.url}
                                  alt={entry.logo.alt || entry.title}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-contain"
                                  unoptimized
                                />
                              ) : (
                                <Heart className="w-6 h-6 text-text-muted" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                                <div>
                                  <h3 className="text-xl font-serif text-text-primary">{entry.title}</h3>
                                  {entry.subtitle && (
                                    <p className="text-accent-primary text-sm font-medium">{entry.subtitle}</p>
                                  )}
                                </div>
                                <span className="text-xl text-text-muted whitespace-nowrap" style={{ fontFamily: 'var(--font-instrument-serif), serif' }}>
                                  {entry.startDate}{entry.endDate ? ` — ${entry.endDate}` : ''}
                                </span>
                              </div>
                            </div>
                          </div>

                          {entry.description && (
                            <p className="relative z-10 text-text-secondary text-sm leading-relaxed mt-4">{entry.description}</p>
                          )}

                          {(entry.tags && entry.tags.length > 0) && (
                            <div className="relative z-10 flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
                              {entry.tags.map((t, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white/5 text-text-muted border border-white/5">
                                  {t.tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {entry.link && (
                            <Link
                              href={entry.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-4 right-4 p-2 bg-white/5 hover:bg-accent-primary hover:text-bg-primary transition-colors z-10"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 glass-panel-pro text-center text-text-muted">
                        <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>What should I volunteer for?</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
