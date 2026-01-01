'use client'

import { useEffect, useState } from 'react'

type FontStackKey =
  | 'html'
  | 'body'
  | 'sans'
  | 'headingSerif'
  | 'paragraphSerif'
  | 'mono'
  | 'emoji'

type FontStacks = Record<FontStackKey, string>

type FontInfo = {
  stacks: FontStacks | null
  vars: Record<string, string>
}

const FONT_VARIABLES = [
  '--font-noto-sans',
  '--font-noto-serif',
  '--font-noto-serif-jp',
  '--font-instrument-serif',
  '--font-noto-mono',
  '--font-noto-color-emoji',
] as const

const STACK_LABELS: Record<FontStackKey, string> = {
  html: 'HTML root (Inter)',
  body: 'Body element',
  sans: 'font-sans utility (Inter)',
  headingSerif: 'font-serif utility (Instrument Serif)',
  paragraphSerif: 'p.font-serif (Noto Serif JP)',
  mono: 'font-mono (Noto Sans Mono)',
  emoji: 'font-emoji (Emoji stack)',
}

export default function FontDebugPage() {
  const [fontInfo, setFontInfo] = useState<FontInfo>({ stacks: null, vars: {} })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sampleFont = (className: string, tag: keyof HTMLElementTagNameMap = 'span') => {
      const element = document.createElement(tag)
      element.className = className
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.top = '-9999px'
      element.textContent = 'font-sample'
      document.body.appendChild(element)
      const family = getComputedStyle(element).fontFamily
      document.body.removeChild(element)
      return family
    }

    try {
      const rootStyle = getComputedStyle(document.documentElement)
      const bodyStyle = getComputedStyle(document.body)

      const stacks: FontStacks = {
        html: rootStyle.fontFamily,
        body: bodyStyle.fontFamily,
        sans: sampleFont('font-sans'),
        headingSerif: sampleFont('font-serif'),
        paragraphSerif: sampleFont('font-serif', 'p'),
        mono: sampleFont('font-mono'),
        emoji: sampleFont('font-emoji'),
      }

      const vars = FONT_VARIABLES.reduce<Record<string, string>>((acc, variable) => {
        const value = rootStyle.getPropertyValue(variable).trim()
        if (value) {
          acc[variable] = value
        }
        return acc
      }, {})

      setFontInfo({ stacks, vars })
    } catch (error) {
      console.error('Font debug error:', error)
    }
  }, [])

  const renderSample = (key: FontStackKey) => {
    switch (key) {
      case 'headingSerif':
        return (
          <div className="font-serif text-2xl tracking-tight">
            Instrument Serif · Cosmic Headlines & Midnight Essays
          </div>
        )
      case 'paragraphSerif':
        return (
          <p className="font-serif text-base leading-relaxed">
            Body copy switches to Noto Serif JP for bilingual text. 静かな夜明けとともに、街が目を覚ます。
          </p>
        )
      case 'mono':
        return (
          <pre className="font-mono text-sm bg-white/5 border border-white/10 p-3 overflow-auto">
{`const lens = {
  focalLength: 35,
  aperture: 'f/1.4',
}`}
          </pre>
        )
      case 'emoji':
        return (
          <p className="font-emoji text-2xl">🍁✨📷🎨🗼🧠🌌</p>
        )
      case 'sans':
        return (
          <p className="font-sans text-base">
            Inter drives all interface elements, nav, and small UI annotations.
          </p>
        )
      case 'body':
        return <p>The body inherits the same Inter stack for consistency.</p>
      case 'html':
        return <p>The html element defines the global Inter stack.</p>
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-[#070707] text-[#FAF3E0] px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-text-muted">debug tools</p>
          <h1 className="text-4xl font-bold">Font telemetry</h1>
          <p className="text-text-secondary max-w-2xl">
            Snapshot of every font stack currently wired into the site. Useful for verifying Inter, Instrument Serif,
            Noto Serif JP, Noto Sans Mono, and the emoji fallbacks in one place.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Computed font stacks</h2>
            {!fontInfo.stacks && <span className="text-sm text-text-muted">Collecting metrics…</span>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(STACK_LABELS) as FontStackKey[]).map((key) => {
              const value = fontInfo.stacks?.[key]
              return (
                <article key={key} className="border border-white/10 bg-white/5 p-5 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-text-muted">{STACK_LABELS[key]}</p>
                    <pre className="font-mono text-xs bg-black/40 border border-white/5 px-3 py-2 mt-2 overflow-x-auto">
                      {value || '—'}
                    </pre>
                  </div>
                  <div className="text-sm text-text-primary">{renderSample(key)}</div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">CSS font variables</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {FONT_VARIABLES.map((variable) => (
              <div key={variable} className="border border-white/10 p-4 bg-white/5">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{variable}</p>
                <p className="font-mono text-sm mt-2 break-all">
                  {fontInfo.vars[variable] || 'NOT FOUND'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Live specimens</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="border border-white/10 p-5">
              <h3 className="text-sm uppercase tracking-[0.4em] text-text-muted mb-2">Inter UI copy</h3>
              <p>
                Buttons, inputs, and navigation rely on Inter. If this line does not match the rest of the UI, the
                rsms Inter stylesheet failed to load.
              </p>
            </article>
            <article className="border border-white/10 p-5">
              <h3 className="text-sm uppercase tracking-[0.4em] text-text-muted mb-2">Instrument Serif display</h3>
              <div className="font-serif text-3xl leading-[1.1]">
                Ghosted headlines float above the gallery grid.
              </div>
            </article>
            <article className="border border-white/10 p-5 md:col-span-2">
              <h3 className="text-sm uppercase tracking-[0.4em] text-text-muted mb-2">Noto Serif JP paragraph</h3>
              <p className="font-serif text-lg leading-relaxed">
                Mixed-language copy like 日本の都市風景と late-night code sessions rely on Noto Serif JP to keep kanji and
                Latin glyphs consistent.
              </p>
            </article>
            <article className="border border-white/10 p-5">
              <h3 className="text-sm uppercase tracking-[0.4em] text-text-muted mb-2">Noto Sans Mono</h3>
              <pre className="font-mono text-sm bg-white/5 border border-white/10 p-3">
{`function hydrate() {
  return 'glow';
}`}
              </pre>
            </article>
            <article className="border border-white/10 p-5">
              <h3 className="text-sm uppercase tracking-[0.4em] text-text-muted mb-2">Emoji stack</h3>
              <p className="font-emoji text-2xl">🎞️ 📷 🌃 🛫 🗺️ ✨ 🐉</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
