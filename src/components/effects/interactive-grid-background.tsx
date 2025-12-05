'use client'

import { useEffect, useMemo, useState } from 'react'

interface InteractiveGridBackgroundProps {
  belowHeader?: boolean
}

/**
 * Computes responsive padding matching Tailwind content padding
 */
function getPadding(width: number): number {
  if (width >= 1280) return 128 // xl: px-32
  if (width >= 1024) return 96  // lg: px-24
  if (width >= 768) return 48   // md: px-12
  return 24                      // base: px-6
}

export function InteractiveGridBackground({ belowHeader = false }: InteractiveGridBackgroundProps) {
  const headerHeight = useMemo(() => (belowHeader ? 72 : 0), [belowHeader])
  const [padding, setPadding] = useState(128)

  useEffect(() => {
    const handleResize = () => {
      setPadding(getPadding(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-0 overflow-hidden"
      style={{ top: headerHeight, bottom: 0 }}
    >
      {/* Dark background base */}
      <div className="absolute inset-0 bg-[#070707]" />

      {/* Left edge line - extends element borders to infinity */}
      <div
        className="absolute inset-y-0 w-px bg-white/15"
        style={{ left: padding }}
      />

      {/* Right edge line - extends element borders to infinity */}
      <div
        className="absolute inset-y-0 w-px bg-white/15"
        style={{ right: padding }}
      />

      {/* Subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />

      {/* Outer vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#070707_95%)] opacity-50" />
    </div>
  )
}
