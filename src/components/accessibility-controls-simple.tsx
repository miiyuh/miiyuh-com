'use client'

import { useEffect, useState } from 'react'

interface AccessibilityControlsProps {
  className?: string
}

export function AccessibilityControls({ className = '' }: AccessibilityControlsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Skip Links - Only visible when focused */}
      <div className={`sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 z-50 ${className}`}>
        <a
          href="#main-content"
          className="bg-[#FAF3E0] text-[#1A1A1A] px-4 py-2 rounded-br-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
        >
          Skip to main content
        </a>
      </div>
    </>
  )
}

export default AccessibilityControls
