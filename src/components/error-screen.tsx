'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ArrowClockwiseIcon, HouseIcon } from '@phosphor-icons/react'
import { useWebHaptics } from 'web-haptics/react'
import Link from '@/components/locale-link'
import { Button } from '@/components/ui/button'
import { NAVIGATION_LINKS } from '@/constants'
import { useLocale } from '@/lib/locale-context'
import type { LocaleCode } from '@/lib/locale'

type Kind = 'not-found' | 'error'

// Darkroom voice, matching the site's other empty states ("nothing developed yet")
const COPY: Record<LocaleCode, Record<Kind, { title: string; body: string }> & {
  home: string
  back: string
  retry: string
  elsewhere: string
  reference: string
}> = {
  en: {
    'not-found': {
      title: 'nothing developed here',
      body: 'this frame never made it out of the darkroom. the link may be broken, or the page has moved.',
    },
    error: {
      title: 'the film got exposed',
      body: 'something went wrong while developing this page. try again in a moment.',
    },
    home: 'go home',
    back: 'go back',
    retry: 'try again',
    elsewhere: 'or wander over to',
    reference: 'reference',
  },
  ms: {
    'not-found': {
      title: 'tiada apa yang dicuci di sini',
      body: 'bingkai ini tidak pernah keluar dari bilik gelap. pautan mungkin rosak, atau halaman telah dipindahkan.',
    },
    error: {
      title: 'filem terdedah cahaya',
      body: 'ada yang tidak kena semasa memproses halaman ini. cuba lagi sebentar lagi.',
    },
    home: 'ke laman utama',
    back: 'kembali',
    retry: 'cuba lagi',
    elsewhere: 'atau singgah ke',
    reference: 'rujukan',
  },
}

type ErrorScreenProps =
  | { kind: 'not-found' }
  | { kind: 'error'; retry: () => void; digest?: string }

export function ErrorScreen(props: ErrorScreenProps) {
  const locale = useLocale()
  const router = useRouter()
  const haptic = useWebHaptics()
  const copy = COPY[locale]
  const { title, body } = copy[props.kind]
  const code = props.kind === 'not-found' ? '404' : '500'

  const goBack = () => {
    void haptic.trigger('light')
    if (window.history.length > 1) router.back()
    else router.push('/')
  }

  return (
    <main className="flex grow flex-col justify-center min-h-[70vh] px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80 py-16 animate-page-in">
      <div className="max-w-2xl">
        <p
          aria-hidden="true"
          className="font-notch leading-none tracking-tight text-text-primary/15 select-none text-[clamp(6rem,22vw,13rem)] -ml-[0.04em]"
        >
          {code}
        </p>

        <h1 className="mt-4 text-3xl md:text-4xl font-notch tracking-tight text-text-primary text-balance">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-text-secondary text-pretty max-w-prose">
          {body}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {props.kind === 'error' ? (
            <Button
              size="xl"
              onClick={() => {
                void haptic.trigger('medium')
                props.retry()
              }}
            >
              <ArrowClockwiseIcon aria-hidden="true" />
              {copy.retry}
            </Button>
          ) : (
            <Button size="xl" asChild>
              <Link href="/" onClick={() => haptic.trigger('medium')}>
                <HouseIcon aria-hidden="true" />
                {copy.home}
              </Link>
            </Button>
          )}
          <Button size="xl" variant="secondary" onClick={goBack}>
            <ArrowLeftIcon aria-hidden="true" />
            {copy.back}
          </Button>
        </div>

        <nav aria-label={copy.elsewhere} className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm text-text-muted">
          <span>{copy.elsewhere}</span>
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-notch text-base text-text-secondary hover:text-text-primary underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {props.kind === 'error' && props.digest && (
          <p className="mt-10 font-mono text-xs text-text-muted/70">
            {copy.reference}: {props.digest}
          </p>
        )}
      </div>
    </main>
  )
}
