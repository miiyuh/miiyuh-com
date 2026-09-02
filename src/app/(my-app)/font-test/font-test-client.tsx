'use client'

const notoSansStack = "var(--font-noto-sans), 'Noto Sans', 'Stack Sans Text', sans-serif"

export default function FontTestPage() {
  const specimens = [
    {
      title: 'Stack Sans Text UI Sans',
      description: 'Primary interface font for navigation, controls, and body copy when no overrides are present.',
      content: (
        <p className="font-sans text-lg leading-relaxed">
          Stack Sans Text keeps dense UI layouts legible. The quick brown fox jumps over 0123456789 widgets &amp; toggles.
        </p>
      ),
    },
    {
      title: 'Stack Sans Headline',
      description: 'Applied via .font-serif on non-paragraph elements for dramatic hero typography.',
      content: (
        <div className="font-serif text-4xl tracking-tight">
          Vaporwave Chronicles · Stories that feel like late-night radio.
        </div>
      ),
    },
    {
      title: 'Noto Serif JP Paragraphs',
      description: 'Paragraph tags using .font-serif flip to the Noto Serif JP stack for bilingual content.',
      content: (
        <p className="font-serif text-lg leading-8">
          The journal entries mix English narration with 日本語のスニペット to keep the tone authentic.
        </p>
      ),
    },
    {
      title: 'Noto Sans Mono',
      description: 'Used for code samples, metadata, and caption blocks that demand strict alignment.',
      content: (
        <pre className="font-mono text-sm bg-white/5 border border-white/10 p-4 rounded">
{`export const lens = {
  brand: 'Leica',
  focal: 28,
}
`}
        </pre>
      ),
    },
    {
      title: 'Emoji Stack',
      description: 'font-emoji ensures Apple → Noto → Segoe UI fallback order.',
      content: (
        <p className="font-emoji text-3xl">🎞️ 📷 🌃 ✨ 🏮 🗼 🍁</p>
      ),
    },
    {
      title: 'Noto Sans Fallback',
      description: 'Raw CSS variable sample in case Inter fails to load.',
      content: (
        <p className="text-lg" style={{ fontFamily: notoSansStack }}>
          This sentence forces the --font-noto-sans stack for reliability tests.
        </p>
      ),
    },
  ]

  return (
    <main className="flex flex-col bg-[#070707] text-[#FAF3E0] min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-text-muted">specimens</p>
          <h1 className="text-4xl font-bold">Font test lab</h1>
          <p className="text-text-secondary max-w-2xl">
            Quick audit of every font stack currently live on miiyuh.com—from Stack Sans Text UI copy to Noto
            Sans blog content, Noto Serif JP paragraphs, and the full emoji fallback chain.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {specimens.map((specimen) => (
            <article key={specimen.title} className="border border-white/10 p-6 space-y-3">
              <div>
                <h2 className="text-lg font-semibold">{specimen.title}</h2>
                <p className="text-sm text-text-secondary">{specimen.description}</p>
              </div>
              {specimen.content}
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Mixed layout preview</h2>
          <div className="border border-white/10 p-6 space-y-4">
            <div className="font-serif text-3xl tracking-tight">A slow drip of postcards.</div>
            <p className="font-serif text-lg leading-relaxed">
              Morning light spills over the skyline, 写真の中で色が伸びる, and Inter quietly captions every frame.
            </p>
            <div className="font-mono text-xs uppercase tracking-[0.4em]">shot · 2025-11-23 · tokyo</div>
            <p>
              Default text continues in Stack Sans Text. When combined with the emoji stack <span className="font-emoji">🍁✨</span>,
              everything stays aligned.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
