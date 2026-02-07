'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NAVIGATION_LINKS, SOCIAL_PLATFORMS } from '@/constants'
import { ArrowUpRight } from 'lucide-react'
import {
  MapPin,
  Code2,
  Camera,
  GraduationCap,
  Briefcase,
  Heart,
  ExternalLink,
} from 'lucide-react'
import type { AboutEntry } from '@/types/about'

interface HomeClientProps {
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}

export default function HomeClient({ education, experience, volunteering }: HomeClientProps) {
  const formatPlatformName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')
  }

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-12 flex flex-col gap-16">

        {/* Hero Section: Portrait + Bio + Social Links */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
          {/* Portrait */}
          <div className="flex justify-self-center md:justify-start">
            <div className="relative w-58 h-58 rounded-full overflow-hidden border border-white/8 shrink-0">
              <Image
                src="/assets/img/personal-profile-pic.png"
                alt="Profile"
                fill
                className="object-cover"
                quality={85}
                priority
                sizes="(max-width: 768px) 200px, 200px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bio + Tags + Socials */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-text-primary leading-[0.95]">
                Muhamad Azri
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                Computer forensics student, creative developer, and photographer based in Malaysia. Building digital experiences that matter.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary font-serif">
                <MapPin className="w-4 h-4 text-accent-primary" />
                Malaysia
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary font-serif">
                <Code2 className="w-4 h-4 text-accent-primary" />
                Developer
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-text-secondary font-serif">
                <Camera className="w-4 h-4 text-accent-primary" />
                Photographer
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {SOCIAL_PLATFORMS.map((social) => (
                <a
                  key={social}
                  href={`/${social}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                >
                  <Image
                    src={`/assets/img/social_media_icons/${social}.png`}
                    alt={formatPlatformName(social)}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                    quality={90}
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {formatPlatformName(social)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="border-t border-white/8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col h-full p-6 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-xl text-text-primary group-hover:text-accent-primary transition-colors">
                    {link.label}
                  </h3>
                  <ArrowUpRight className="w-8 h-8 text-text-muted group-hover:text-accent-primary transition-colors shrink-0" />
                </div>
                <p className="text-xs text-text-secondary">
                  {link.href === '/gallery' && 'photos & artwork'}
                  {link.href === '/projects' && "things i've built"}
                  {link.href === '/blog' && 'my thoughts & stories'}
                  {link.href === '/surveys' && 'feedback & polls'}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="border-t border-white/8 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-text-primary" />
              <h2 className="text-3xl font-serif text-text-primary">Experience</h2>
            </div>
            <div className="flex flex-col gap-4">
              {experience.map((entry) => (
                <EntryCard key={entry.id} entry={entry} fallbackIcon={<Briefcase className="w-6 h-6 text-text-muted" />} />
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="border-t border-white/8 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-text-primary" />
              <h2 className="text-3xl font-serif text-text-primary">Education</h2>
            </div>
            <div className="flex flex-col gap-4">
              {education.map((entry) => (
                <EntryCard key={entry.id} entry={entry} fallbackIcon={<GraduationCap className="w-6 h-6 text-text-muted" />} />
              ))}
            </div>
          </section>
        )}

        {/* Volunteering Section */}
        {volunteering.length > 0 && (
          <section className="border-t border-white/8 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-text-primary" />
              <h2 className="text-3xl font-serif text-text-primary">Volunteering</h2>
            </div>
            <div className="flex flex-col gap-4">
              {volunteering.map((entry) => (
                <EntryCard key={entry.id} entry={entry} fallbackIcon={<Heart className="w-6 h-6 text-text-muted" />} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function EntryCard({ entry, fallbackIcon }: { entry: AboutEntry; fallbackIcon: React.ReactNode }) {
  return (
    <div className="group relative p-5 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          {entry.logo?.url ? (
            <Image
              src={entry.logo.url}
              alt={entry.logo.alt || entry.title}
              width={48}
              height={48}
              className="w-full h-full object-contain"
              unoptimized
            />
          ) : (
            fallbackIcon
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
            <h2 className="text-base font-medium text-text-primary">{entry.title}</h2>
            <span className="font-serif text-lg text-text-muted/60 whitespace-nowrap tracking-wider">
              {entry.startDate}{entry.endDate ? ` - ${entry.endDate}` : ''}
            </span>
          </div>
          {entry.subtitle && (
            <p className="text-sm text-accent-primary/80 mt-2">{entry.subtitle}</p>
          )}
          {entry.description && (
            <p className="text-text-secondary/70 text-sm leading-relaxed mt-2">{entry.description}</p>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {entry.tags.map((t, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4">
                  {t.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {entry.link && (
        <Link
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
