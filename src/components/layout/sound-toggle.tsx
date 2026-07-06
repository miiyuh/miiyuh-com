'use client'

import { SpeakerHighIcon, SpeakerSlashIcon } from '@phosphor-icons/react'
import { useSoundPreference } from '@/components/layout/sound-provider'

export default function SoundToggle() {
  const { enabled, setEnabled } = useSoundPreference()

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 text-xs font-sans tracking-wide" data-no-click-sound>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`group relative px-2.5 py-1.5 transition-all duration-200 rounded-full cursor-pointer ${
          enabled
            ? 'bg-[#FAF3E0] text-black font-medium'
            : 'text-text-muted hover:text-text-primary hover:bg-bg-primary/80 hover:backdrop-blur-xl'
        }`}
        aria-label={enabled ? 'Mute click sounds' : 'Enable click sounds'}
        aria-pressed={enabled}
      >
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-[#FAF3E0] text-[#070707] text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {enabled ? 'Click sounds on' : 'Click sounds off'}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#FAF3E0]" />
        </span>
        {enabled ? (
          <SpeakerHighIcon className="w-4 h-4" />
        ) : (
          <SpeakerSlashIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
