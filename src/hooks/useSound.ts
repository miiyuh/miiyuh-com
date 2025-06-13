'use client'

import { useCallback, useRef } from 'react'

export function useSound(src: string, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    try {
      // Only attempt to create and play audio if we're in a browser environment
      if (typeof window === 'undefined') return

      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.volume = volume
        audioRef.current.preload = 'none' // Don't preload on mobile to avoid errors
        audioRef.current.src = src
      }
      
      // Reset playback position
      audioRef.current.currentTime = 0
      
      // Play with proper error handling for iOS
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Silently handle play failures (common on iOS without user gesture)
          console.debug('Audio play prevented:', error.name)
        })
      }
    } catch (error) {
      // Silently handle audio creation failures
      console.debug('Audio not available:', error)
    }
  }, [src, volume])

  return play
}
