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
} from 'lucide-react'
import { EntryCard } from '@/components/ui/entry-card'
import type { AboutEntry } from '@/types/about'
import { useWebHaptics } from 'web-haptics/react'

interface HomeClientProps {
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}

export default function HomeClient({ education, experience, volunteering }: HomeClientProps) {
  const haptic = useWebHaptics()

  const formatPlatformName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')
  }

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <div className="px-6 md:px-12 lg:px-24 xl:px-48 py-12 flex flex-col gap-16">

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
                quality={75}
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
                  onClick={() => haptic.trigger('light')}
                >
                  <Image
                    src={`/assets/img/social_media_icons/${social}.png`}
                    alt={formatPlatformName(social)}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                    quality={80}
                    sizes="24px"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col h-full p-6 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all duration-300"
                onClick={() => haptic.trigger('medium')}
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
