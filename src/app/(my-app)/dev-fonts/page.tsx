'use client'

import { useEffect, useState } from 'react'
import { Card, CardPanel } from "@/components/ui/card"
import { DevPageShell } from "@/components/ui/dev-page-shell"
import { SECTION_TITLE } from "@/config/dev-pages"

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

    let rafId: number | null = null
    let cancelled = false

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

        rafId = window.requestAnimationFrame(() => {
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

            // Font variables are set on <body> by Next.js font classes, not on <html>
            const bodyComputed = getComputedStyle(document.body)
            const vars = FONT_VARIABLES.reduce<Record<string, string>>((acc, variable) => {
              const value = bodyComputed.getPropertyValue(variable).trim()
              if (value) {
                acc[variable] = value
              }
              return acc
            }, {})

        if (!cancelled) {
          setFontInfo({ stacks, vars })
        }
      } catch (error) {
        console.error('Font debug error:', error)
      }
    })

    return () => {
      cancelled = true
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
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
          <pre className="font-mono text-sm bg-white/4 border border-white/8 p-3 overflow-auto">
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
    <DevPageShell>
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Font telemetry</h1>
          <p className="text-text-secondary max-w-2xl">
            Snapshot of every font stack currently wired into the site. Useful for verifying Inter, Instrument Serif,
            Noto Serif JP, Noto Sans Mono, and the emoji fallbacks in one place.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className={SECTION_TITLE}>Computed font stacks</h2>
          {!fontInfo.stacks && <span className="text-sm text-text-muted">Collecting metrics…</span>}
          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(STACK_LABELS) as FontStackKey[]).map((key) => {
              const value = fontInfo.stacks?.[key]
              return (
                <Card key={key} className="gap-0">
                  <CardPanel className="space-y-3">
                    <div>
                      <p className="text-sm text-text-secondary">{STACK_LABELS[key]}</p>
                      <pre className="font-mono text-xs bg-bg-primary/60 border border-white/8 px-3 py-2 mt-2 overflow-x-auto">
                        {value || '—'}
                      </pre>
                    </div>
                    <div className="text-sm text-text-primary">{renderSample(key)}</div>
                  </CardPanel>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={SECTION_TITLE}>CSS font variables</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {FONT_VARIABLES.map((variable) => (
              <Card key={variable} className="gap-0">
                <CardPanel>
                  <p className="text-sm text-text-secondary">{variable}</p>
                  <p className="font-mono text-sm mt-2 break-all">
                    {fontInfo.vars[variable] || 'NOT FOUND'}
                  </p>
                </CardPanel>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={SECTION_TITLE}>Live specimens</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="gap-0">
              <CardPanel>
                <p className="text-sm text-text-secondary mb-2">Inter UI copy</p>
                <p>
                  Buttons, inputs, and navigation rely on Inter. If this line does not match the rest of the UI, the
                  rsms Inter stylesheet failed to load.
                </p>
              </CardPanel>
            </Card>
            <Card className="gap-0">
              <CardPanel>
                <p className="text-sm text-text-secondary mb-2">Instrument Serif display</p>
                <div className="font-serif text-3xl leading-[1.1]">
                  Ghosted headlines float above the gallery grid.
                </div>
              </CardPanel>
            </Card>
            <Card className="gap-0 md:col-span-2">
              <CardPanel>
                <p className="text-sm text-text-secondary mb-2">Noto Serif JP paragraph</p>
                <p className="font-serif text-lg leading-relaxed">
                  Mixed-language copy like 日本の都市風景と late-night code sessions rely on Noto Serif JP to keep kanji and
                  Latin glyphs consistent.
                </p>
              </CardPanel>
            </Card>
            <Card className="gap-0">
              <CardPanel>
                <p className="text-sm text-text-secondary mb-2">Noto Sans Mono</p>
                <pre className="font-mono text-sm bg-white/4 border border-white/8 p-3">
{`function hydrate() {
  return 'glow';
}`}
                </pre>
              </CardPanel>
            </Card>
            <Card className="gap-0">
              <CardPanel>
                <p className="text-sm text-text-secondary mb-2">Emoji stack</p>
                <p className="font-emoji text-2xl">🎞️ 📷 🌃 🛫 🗺️ ✨ 🐉</p>
              </CardPanel>
            </Card>
          </div>
        </section>
      </div>
    </DevPageShell>
  )
}
