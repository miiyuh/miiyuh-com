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
      }, 400)
      return () => clearTimeout(timeout)
    }

    // Simulate loading progress
    setVisible(true)
    setProgress(15)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev // hold near-complete until finish
        const nextIncrement = Math.random() * 15 + 5
        return Math.min(prev + nextIncrement, 90)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!visible && progress === 0) return null

  return (
    <div className={`fixed top-[72px] left-0 right-0 h-[3px] z-50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-white/5" />
      <div className="relative h-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#FAF3E0] via-[#FAF3E0]/90 to-[#FAF3E0]/70 transition-[width] duration-150 ease-out"
          style={{ 
            width: `${progress}%`, 
            minWidth: progress > 0 ? '10%' : '0%',
            boxShadow: '0 0 20px rgba(250, 243, 224, 0.8), 0 0 40px rgba(250, 243, 224, 0.4)'
          }}
        />
      </div>
    </div>
  )
}
