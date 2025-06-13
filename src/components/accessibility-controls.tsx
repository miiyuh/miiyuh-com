'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface AccessibilityControlsProps {
  className?: string
}

export function AccessibilityControls({ className = '' }: AccessibilityControlsProps) {
  const [mounted, setMounted] = useState(false)
  type AccessibilitySettings = {
    fontSize: number;
    contrast: boolean;
    reducedMotion: boolean;
    focusVisible: boolean;
  };

  const [, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: false,
    reducedMotion: false,
    focusVisible: false
  })


  const applySettings = useCallback((newSettings: AccessibilitySettings) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${newSettings.fontSize}%`;

    // High contrast
    if (newSettings.contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Focus indicators
    if (newSettings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  }, []);

  useEffect(() => {
    setMounted(true)
    
    // Only run on client side
    if (typeof window === 'undefined') return

    // Load saved settings from localStorage
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved)
        setSettings(parsedSettings)
        applySettings(parsedSettings)
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error)
      }
    }

    // Check for system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }))
    }
  }, [applySettings])


  // const resetSettings = () => {
  //   const defaultSettings = {
  //     fontSize: 100,
  //     contrast: false,
  //     reducedMotion: false,
  //     focusVisible: false
  //   }
  //   setSettings(defaultSettings)
  //   applySettings(defaultSettings)
  // }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        className={`fixed bottom-4 left-4 z-50 bg-[#FAF3E0] text-[#1A1A1A] p-3 rounded-full shadow-lg hover:bg-[#FAF3E0]/90 transition-colors ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open accessibility controls"
        title="Accessibility Options"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </motion.button>
      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50">
        <a
          href="#main-content"
          className="bg-[#FAF3E0] text-[#1A1A1A] px-4 py-2 rounded-br-lg font-bold"
        >
          Skip to main content
        </a>
      </div>
    </>
  )
}

export default AccessibilityControls
