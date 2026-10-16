'use client'

import { useEffect, useState } from 'react'
import { DevPageShell } from '@/components/ui/dev-page-shell'

type Family = {
  name: string
  role: string
  usage: string
  variable: string
  className: string
  min: number
  max: number
  defaultWeight: number
  sample: string
}

// Every typeface the site loads (src/lib/fonts.ts), with where it is used
const FAMILIES: Family[] = [
  {
    name: 'Stack Sans Text',
    role: 'UI and body',
    usage: 'body, font-sans (weight 200)',
    variable: '--font-stack-sans-text',
    className: 'font-sans',
    min: 200,
    max: 700,
    defaultWeight: 200,
    sample: 'Fresh graduate, creative developer, and photographer.',
  },
  {
    name: 'Stack Sans Headline',
    role: 'Headings',
    usage: 'h1–h6, font-serif',
    variable: '--font-stack-sans-headline',
    className: 'font-serif',
    min: 200,
    max: 700,
    defaultWeight: 400,
    sample: 'Experience, Education, Volunteering',
  },
  {
    name: 'Stack Sans Notch',
    role: 'Display and navigation',
    usage: 'font-notch: page titles, nav, footer, 404',
    variable: '--font-stack-sans-notch',
    className: 'font-notch',
    min: 200,
    max: 700,
    defaultWeight: 400,
    sample: 'gallery projects blog',
  },
  {
    name: 'Noto Serif',
    role: 'Long-form reading',
    usage: '.lexical-content (posts, legal pages, weight 400), font-noto-serif (post excerpt)',
    variable: '--font-noto-serif',
    className: 'font-noto-serif',
    min: 100,
    max: 900,
    defaultWeight: 400,
    sample: 'This frame never made it out of the darkroom.',
  },
  {
    name: 'Paper Mono',
    role: 'Footer clock',
    usage: 'font-paper-mono (footer clock)',
    variable: '--font-paper-mono',
    className: 'font-paper-mono',
    min: 100,
    max: 800,
    defaultWeight: 400,
    sample: '21:25 GMT+8',
  },
  {
    name: 'Noto Sans Mono',
    role: 'Small metadata',
    usage: 'font-mono: course codes, error references',
    variable: '--font-noto-mono',
    className: 'font-mono',
    min: 100,
    max: 900,
    defaultWeight: 400,
    sample: 'CSF 3013 · 17:59 GMT+8 · ref 4f2a9c',
  },
]

const WEIGHT_RAMP = [100, 200, 300, 400, 450, 500, 600, 700, 800, 900]

type Diagnostics = {
  loaded: Record<string, boolean>
  resolved: Array<{ label: string; family: string; weight: string }>
}

// Elements whose computed font tells us the cascade is wired up correctly
const PROBES: Array<{ label: string; tag: keyof HTMLElementTagNameMap; className?: string }> = [
  { label: 'body text', tag: 'p' },
  { label: 'h2', tag: 'h2' },
  { label: '.font-notch', tag: 'span', className: 'font-notch' },
  { label: '.lexical-content p', tag: 'p', className: '__lexical' },
  { label: '.font-mono', tag: 'span', className: 'font-mono' },
  { label: '.font-emoji', tag: 'span', className: 'font-emoji' },
]

function readDiagnostics(): Diagnostics {
  const body = getComputedStyle(document.body)
  const loaded: Record<string, boolean> = {}
  for (const family of FAMILIES) {
    const first = body.getPropertyValue(family.variable).split(',')[0]?.trim()
    loaded[family.name] = Boolean(first) && document.fonts.check(`${family.defaultWeight} 16px ${first}`)
  }

  const resolved = PROBES.map(({ label, tag, className }) => {
    const host = document.createElement('div')
    if (className === '__lexical') host.className = 'lexical-content'
    host.style.cssText = 'position:absolute;visibility:hidden;top:-9999px'
    const el = document.createElement(tag)
    if (className && className !== '__lexical') el.className = className
    el.textContent = 'sample'
    host.appendChild(el)
    document.body.appendChild(host)
    const style = getComputedStyle(el)
    const result = { label, family: style.fontFamily.split(',')[0].replace(/["']/g, ''), weight: style.fontWeight }
    host.remove()
    return result
  })

  return { loaded, resolved }
}

export default function FontsPage() {
  const [sample, setSample] = useState('')
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(FAMILIES.map((f) => [f.name, f.defaultWeight])),
  )
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null)

  useEffect(() => {
    let cancelled = false
    void document.fonts.ready.then(() => {
      if (!cancelled) setDiagnostics(readDiagnostics())
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <DevPageShell>
      <header className="space-y-3">
        <h1 className="font-notch text-5xl md:text-6xl tracking-tight">fonts</h1>
        <p className="text-lg text-text-secondary max-w-prose">
          Every typeface the site loads, where it is used, and how it renders. Fonts are declared once in{' '}
          <code className="font-mono text-sm text-text-primary">src/lib/fonts.ts</code>.
        </p>
      </header>

      <label className="flex flex-col gap-2 max-w-xl">
        <span className="text-xs uppercase tracking-widest text-text-muted">Sample text</span>
        <input
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          placeholder="Type to preview every family"
          className="rounded-lg border border-white/8 bg-white/2 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-white/15"
        />
      </label>

      <section aria-labelledby="families" className="space-y-4">
        <h2 id="families" className="text-2xl">Families</h2>
        <div className="grid gap-4">
          {FAMILIES.map((family) => {
            const weight = weights[family.name]
            const isLoaded = diagnostics?.loaded[family.name]
            return (
              <article key={family.name} className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl">{family.name}</h3>
                    <p className="text-sm text-text-secondary">
                      {family.role} · <span className="font-mono text-xs">{family.usage}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="font-mono">{family.variable}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        isLoaded === undefined
                          ? 'bg-white/4'
                          : isLoaded
                            ? 'bg-accent-primary/20 text-accent-hover'
                            : 'bg-red-500/10 text-red-300'
                      }`}
                    >
                      {isLoaded === undefined ? 'checking' : isLoaded ? 'loaded' : 'not loaded'}
                    </span>
                  </div>
                </div>

                <p className={`${family.className} text-3xl md:text-4xl leading-tight text-text-primary`} style={{ fontWeight: weight }}>
                  {sample || family.sample}
                </p>

                <label className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="w-24 shrink-0">weight {weight}</span>
                  <input
                    type="range"
                    min={family.min}
                    max={family.max}
                    step={10}
                    value={weight}
                    onChange={(e) => setWeights((w) => ({ ...w, [family.name]: Number(e.target.value) }))}
                    className="w-full max-w-sm accent-(--accent-hover)"
                    aria-label={`${family.name} weight`}
                  />
                  <span className="font-mono text-xs">
                    {family.min}–{family.max}
                  </span>
                </label>

                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/8 pt-4">
                  {WEIGHT_RAMP.filter((w) => w >= family.min && w <= family.max).map((w) => (
                    <span key={w} className={`${family.className} text-lg text-text-secondary`} style={{ fontWeight: w }}>
                      {w}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="scale" className="space-y-4">
        <h2 id="scale" className="text-2xl">Type scale</h2>
        <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-6">
          <div>
            <p className="text-xs text-text-muted mb-1 font-mono">display · font-notch text-5xl md:text-6xl</p>
            <p className="font-notch text-5xl md:text-6xl tracking-tight">gallery</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1 font-mono">heading · h2 text-3xl</p>
            <p className="font-serif text-3xl">Experience</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1 font-mono">title · text-2xl</p>
            <p className="font-serif text-2xl">Library Management System (LMS)</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1 font-mono">body · text-base, weight 200</p>
            <p className="text-base text-text-secondary max-w-prose">
              Full-stack system for book lending with role-based access and overdue tracking designed for schools.
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1 font-mono">label · text-xs tracking-widest</p>
            <p className="text-xs uppercase tracking-widest text-text-muted">topics</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="long-form" className="space-y-4">
        <h2 id="long-form" className="text-2xl">Long-form (.lexical-content)</h2>
        <div className="rounded-xl border border-white/8 bg-white/2 p-6">
          <div className="lexical-content max-w-prose">
            <h2>Historical parallels</h2>
            <p>
              The walls were never only about keeping titans out. They were about deciding who counts as inside, and
              who gets to write the history <em>everyone</em> else has to learn. <strong>Bold</strong> and{' '}
              <a href="#long-form">linked text</a> keep the same rhythm.
            </p>
            <ul>
              <li>Propaganda and the manufacturing of truth</li>
              <li>Nationalism, patriotism, and the other</li>
            </ul>
            <blockquote>If you win, you live. If you lose, you die.</blockquote>
            <p>Malay: bingkai ini tidak pernah keluar dari bilik gelap.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="emoji" className="space-y-4">
        <h2 id="emoji" className="text-2xl">Emoji fallback</h2>
        <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-2">
          <p className="font-emoji text-3xl">🇲🇾 🇯🇵 🍁 📷 ✨</p>
          <p className="text-sm text-text-muted">
            Noto Color Emoji is not preloaded; it downloads only when a glyph like these renders.
          </p>
        </div>
      </section>

      <section aria-labelledby="diagnostics" className="space-y-4">
        <h2 id="diagnostics" className="text-2xl">Resolved fonts</h2>
        <div className="rounded-xl border border-white/8 bg-white/2 p-6">
          {diagnostics ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-text-muted">
                  <th className="pb-3 font-normal">Element</th>
                  <th className="pb-3 font-normal">First family</th>
                  <th className="pb-3 font-normal">Weight</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {diagnostics.resolved.map((row) => (
                  <tr key={row.label} className="border-t border-white/8">
                    <td className="py-2.5 text-text-secondary">{row.label}</td>
                    <td className="py-2.5 text-text-primary">{row.family}</td>
                    <td className="py-2.5 text-text-secondary">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-text-muted">Waiting for fonts to load…</p>
          )}
        </div>
      </section>
    </DevPageShell>
  )
}
