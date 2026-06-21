'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Copy, Check } from '@phosphor-icons/react'
import { useWebHaptics } from 'web-haptics/react'

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const haptic = useWebHaptics()

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const copyToClipboard = useCallback(async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      haptic.trigger('success')
      setCopied(true)
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
      resetTimerRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [haptic])

  return (
    <button
      onClick={copyToClipboard}
      className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 -mr-1 text-text-primary/40 hover:text-text-primary"
      title={copied ? 'Copied!' : 'Copy link'}
      aria-label={copied ? 'Copied!' : 'Copy link'}
    >
      {copied ? (
        <Check className="w-4 h-4" weight="bold" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}
