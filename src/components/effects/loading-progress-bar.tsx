'use client'

import { useEffect, useState } from 'react'

interface LoadingProgressBarProps {
  isLoading: boolean
}

export function LoadingProgressBar({ isLoading }: LoadingProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Complete animation then fade away
      setProgress(100)
      const timeout = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 500)
      return () => clearTimeout(timeout)
    }

    // Simulate loading progress
    setVisible(true)
    setProgress(12)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev // hold near-complete until finish
        const nextIncrement = Math.random() * 12 + 4
        return Math.min(prev + nextIncrement, 92)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!visible && progress === 0) return null

  return (
    <div className={`fixed top-[72px] left-0 right-0 h-1 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative h-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-accent-primary via-accent-primary/80 to-accent-primary/60 shadow-[0_0_12px_rgba(250,243,224,0.45)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%`, minWidth: progress > 0 ? '12%' : '0%' }}
        />
      </div>
    </div>
  )
}
