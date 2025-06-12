'use client'

import { useMemo, useCallback } from 'react'
import { Howl } from 'howler'

export function useSound(src: string, volume = 1.0) {
  const sound = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    return new Howl({
      src: [src],
      volume,
      preload: true,
      html5: true, // Use HTML5 Audio for better performance
    })
  }, [src, volume])

  const play = useCallback(() => {
    if (sound) {
      sound.play()
    }
  }, [sound])

  return play
}
