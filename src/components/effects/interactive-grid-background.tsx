'use client'

import { useEffect, useMemo, useState } from 'react'

interface InteractiveGridBackgroundProps {
  belowHeader?: boolean
}

export function InteractiveGridBackground({ belowHeader = false }: InteractiveGridBackgroundProps) {
  const headerHeight = useMemo(() => belowHeader ? 72 : 0, [belowHeader])
  const [gridPadding, setGridPadding] = useState({ left: 32, right: 32 })

  useEffect(() => {
    const computeOffset = () => {
      const width = window.innerWidth
      if (width < 640) return { left: 32, right: 32 }
      return { left: 128, right: 128 }
    }

    const handleResize = () => setGridPadding(computeOffset())
    setGridPadding(computeOffset())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const gridSize = 64

  const gridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat'
  } as const

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ top: headerHeight, bottom: 0 }}
    >
      <div className="absolute inset-0 bg-[#070707]" />

      <div className="absolute inset-y-0" style={{ left: gridPadding.left, right: gridPadding.right }}>
        <div className="relative h-full w-full" style={{ backgroundAttachment: 'local' }}>
          <div className="absolute inset-0 opacity-60" style={gridStyle} />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_75%)]" />

          <div className="absolute inset-y-0 left-0 right-0 border-l border-r border-white/15" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b0b0b,transparent_80%)] opacity-50" />
    </div>
  )
}
