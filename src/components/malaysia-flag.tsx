'use client'

import React, { useEffect, useState } from 'react'

interface MalaysiaFlagProps {
  className?: string
}

export const MalaysiaFlag: React.FC<MalaysiaFlagProps> = ({ className = "" }) => {
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    // Check if we're on a device that might have emoji issues
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isOldIOS = isIOS && /OS [1-9]_/.test(navigator.userAgent)
    
    // Simple emoji support detection
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      canvas.width = 32
      canvas.height = 32
      context.font = '24px Arial'
      context.textBaseline = 'middle'
      context.textAlign = 'center'
      context.fillText('🇲🇾', 16, 16)
      
      const imageData = context.getImageData(0, 0, 32, 32).data
      const hasRendered = imageData.some(pixel => pixel !== 0)
      
      // Show fallback if emoji didn't render or on problematic devices
      if (!hasRendered || isOldIOS) {
        setShowFallback(true)
      }
    }
  }, [])

  if (showFallback) {
    return (
      <span 
        className={`inline-block ${className}`}
        style={{
          background: 'linear-gradient(to right, #cc0000 50%, #ffffff 50%)',
          color: '#000',
          fontSize: '0.8em',
          padding: '2px 4px',
          borderRadius: '3px',
          fontWeight: '600',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          border: '1px solid #ccc',
          lineHeight: '1'
        }}
      >
        MY
      </span>
    )
  }

  return (
    <span 
      className={`inline-block ${className}`}
      style={{
        fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif',
        fontSize: 'inherit'
      }}
    >
      🇲🇾
    </span>
  )
}
