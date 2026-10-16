'use client'

import { useState } from 'react'
import { BriefcaseIcon } from '@phosphor-icons/react'
import { EntryCard } from '@/components/ui/entry-card'
import { CopyLinkButton } from '@/components/ui/copy-link-button'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Button } from '@/components/ui/button'
import LocaleToggle from '@/components/layout/locale-toggle'
import { KlClock } from '@/components/layout/kl-clock'
import Link from '@/components/locale-link'
import NextLink from 'next/link'
import type { AboutEntry } from '@/types/about'

// Tokens from globals.css :root, in the order DESIGN.md describes them
const SWATCHES = [
  { name: 'bg-primary', value: 'var(--bg-primary)', note: 'canvas' },
  { name: 'surface-primary', value: 'var(--surface-primary)', note: 'popovers, menus' },
  { name: 'text-primary', value: 'var(--text-primary)', note: 'warm ivory' },
  { name: 'text-secondary', value: 'var(--text-secondary)', note: '70%' },
  { name: 'text-muted', value: 'var(--text-muted)', note: '50%' },
  { name: 'accent-primary', value: 'var(--accent-primary)', note: 'fills only' },
  { name: 'accent-hover', value: 'var(--accent-hover)', note: 'green text/icons' },
  { name: 'selection', value: '#123524', note: '::selection' },
] as const

const SAMPLE_ENTRY: AboutEntry = {
  id: 'sample',
  type: 'experience',
  title: 'Enrii IT Solutions Sdn. Bhd.',
  subtitle: 'QA & Business Analyst Intern',
  startDate: '10/2025',
  endDate: '03/2026',
  tags: [{ tag: 'Internship' }, { tag: 'Software Development' }],
}

const STAGGER_ITEMS = ['gallery', 'projects', 'blog', 'surveys', 'privacy policy']

function Block({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-text-secondary">{note}</p>
      </div>
      {children}
    </div>
  )
}

// What the live site actually uses, shown above the primitive library
export function SiteSection() {
  // Changing the key remounts the demo so the CSS animation replays
  const [pageKey, setPageKey] = useState(0)
  const [listKey, setListKey] = useState(0)

  return (
    <section aria-labelledby="site" className="space-y-4">
      <div>
        <h2 id="site" className="text-2xl">Site</h2>
        <p className="text-sm text-text-secondary">Tokens, motion and components used on the live pages.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Block title="Colour tokens" note="Use the utilities (text-text-primary, bg-bg-primary, …), never hex.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SWATCHES.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="h-12 rounded-lg border border-white/8" style={{ background: s.value }} />
                <p className="font-mono text-[11px] text-text-secondary">{s.name}</p>
                <p className="text-[11px] text-text-muted">{s.note}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Text highlight + chips" note=".text-highlight on hover (forest green fill); tags and selected chips">
          <p className="font-serif text-2xl">
            <span className="text-highlight">hover this title</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-text-muted/50 rounded-full bg-white/4 px-2 py-0.5">tag</span>
            <span className="min-h-11 inline-flex items-center px-3 text-xs rounded-full bg-white/4 text-text-muted border border-transparent">
              topic
            </span>
            <span className="min-h-11 inline-flex items-center px-3 text-xs rounded-full bg-accent-primary/20 text-accent-hover border border-accent-primary/30">
              selected topic
            </span>
          </div>
        </Block>

        <Block title="Page entrance" note="animate-page-in: 200ms fade + 6px rise, no delay">
          <div key={pageKey} className="animate-page-in rounded-lg border border-white/8 p-4">
            <p className="font-notch text-3xl tracking-tight">gallery</p>
            <p className="text-sm text-text-secondary">from the pens and lenses of mine</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setPageKey((k) => k + 1)}>
            Replay
          </Button>
        </Block>

        <Block title="List stagger" note="animate-stagger-item with --i (25ms steps, cap 9)">
          <ul key={listKey} className="space-y-1.5">
            {STAGGER_ITEMS.map((item, i) => (
              <li
                key={item}
                className="animate-stagger-item rounded-md bg-white/4 px-3 py-1.5 text-sm"
                style={{ '--i': i } as React.CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
          <Button size="sm" variant="secondary" onClick={() => setListKey((k) => k + 1)}>
            Replay
          </Button>
        </Block>

        <Block title="Breadcrumb + copy link" note="SimpleBreadcrumb with the CopyLinkButton trailing, as on blog posts">
          <SimpleBreadcrumb
            items={[{ label: 'home', href: '/' }, { label: 'blog', href: '/blog' }, { label: 'a post title' }]}
            trailing={<CopyLinkButton />}
            className="mb-0!"
          />
        </Block>

        <Block title="Footer controls" note="LocaleToggle (navigates to /ms) and the live Kuala Lumpur clock">
          <div className="flex flex-wrap items-center gap-6">
            <KlClock />
            <LocaleToggle />
          </div>
        </Block>

        <Block title="Entry card" note="EntryCard from the home page (Experience / Education / Volunteering)">
          <EntryCard entry={SAMPLE_ENTRY} fallbackIcon={<BriefcaseIcon className="size-6" />} />
        </Block>

        <Block title="Error screens" note="ErrorScreen renders a full page; open the real ones">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" asChild>
              <Link href="/this-page-does-not-exist">404 (English)</Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <NextLink href="/ms/halaman-tiada">404 (Malay)</NextLink>
            </Button>
          </div>
        </Block>
      </div>
    </section>
  )
}
