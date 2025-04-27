'use client'

import { useMemo } from 'react'
import { Howl } from 'howler'

export function useSound(src: string, volume = 1.0) {
  const sound = useMemo(() => {
    return new Howl({
      src: [src],
      volume,
    })
  }, [src, volume])

  const play = () => {
    sound.play()
  }

  return play
}
