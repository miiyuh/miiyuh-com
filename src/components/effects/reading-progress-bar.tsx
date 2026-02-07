'use client'

import { useEffect, useRef, useState } from 'react'

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight - windowHeight
        const scrolled = window.scrollY
        const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0
        setProgress(progress)
        rafRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed top-[72px] left-0 right-0 h-1 bg-[#FAF3E0]/10 z-50">
      <div
        className="h-full bg-linear-to-r from-[#FAF3E0] to-[#FAF3E0]/60 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
