'use client'

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { SoundProvider as AudioSoundProvider } from '@web-kits/audio/react'
import { ensureReady } from '@web-kits/audio'
import { playClickSound } from '@/lib/sounds'
import { prefersReducedMotion } from '@/lib/reduced-motion'

const STORAGE_KEY = 'sound-enabled'
const CHANGE_EVENT = 'sound-enabled-change'

// localStorage-backed preference that renders "off" on the server and the
// stored value on the client without a hydration mismatch.
function subscribeToPreference(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}
const readPreference = () => window.localStorage.getItem(STORAGE_KEY) === 'true'
const serverPreference = () => false

type SoundPreferenceContextValue = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

const SoundPreferenceContext = createContext<SoundPreferenceContextValue>({
  enabled: false,
  setEnabled: () => {},
})

export function useSoundPreference() {
  return useContext(SoundPreferenceContext)
}

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], summary'

function ClickSoundListener() {
  const { enabled } = useSoundPreference()

  useEffect(() => {
    if (!enabled) return

    const handleClick = (event: MouseEvent) => {
      if (prefersReducedMotion()) return
      const target = event.target as HTMLElement | null
      const el = target?.closest(CLICKABLE_SELECTOR)
      if (!el) return
      if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') return
      if (el.closest('[data-no-click-sound]')) return

      // Slight per-click pitch/rate jitter so repeated clicks don't sound identical.
      ensureReady().then(() => {
        playClickSound({
          detune: (Math.random() - 0.5) * 300,
          playbackRate: 0.95 + Math.random() * 0.1,
        })
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [enabled])

  return null
}

// Wraps the app to provide click-sound feedback on buttons/links, gated
// behind an explicit, localStorage-persisted opt-in (default off).
export function SoundProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribeToPreference, readPreference, serverPreference)

  const setEnabled = (value: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, String(value))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }

  return (
    <SoundPreferenceContext.Provider value={{ enabled, setEnabled }}>
      <AudioSoundProvider enabled={enabled}>
        <ClickSoundListener />
        {children}
      </AudioSoundProvider>
    </SoundPreferenceContext.Provider>
  )
}
