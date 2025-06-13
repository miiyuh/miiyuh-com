'use client'

import { useCallback, useRef } from 'react'

export function useSound(src: string, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src)
        audioRef.current.volume = volume
      }
      
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(error => {
        console.warn('Could not play sound:', error)
      })
    } catch (error) {
      console.warn('Sound not available:', error)
    }
  }, [src, volume])

  return play
}
