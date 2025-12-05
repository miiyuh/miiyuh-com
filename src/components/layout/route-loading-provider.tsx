'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import { LoadingProgressBar } from '@/components/effects/loading-progress-bar'

interface RouteLoadingContextValue {
  startHeaderLoading: () => void
  stopHeaderLoading: () => void
  startPortalLoading: (targetPath?: string) => void
  stopPortalLoading: () => void
}

const RouteLoadingContext = createContext<RouteLoadingContextValue | undefined>(undefined)

export function RouteLoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [headerLoading, setHeaderLoading] = useState(false)
  const [headerOrigin, setHeaderOrigin] = useState<string | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalTarget, setPortalTarget] = useState<string | null>(null)
  const [portalProgress, setPortalProgress] = useState(0)

  useEffect(() => {
    if (!portalLoading) {
      setPortalProgress(0)
      return
    }

    setPortalProgress(0)
    
    // Quick initial progress
    const quickStart = window.setTimeout(() => setPortalProgress(25), 50)
    
    const interval = window.setInterval(() => {
      setPortalProgress((prev) => {
        if (prev >= 85) return prev
        return prev + Math.random() * 10 + 5
      })
    }, 120)

    return () => {
      window.clearTimeout(quickStart)
      window.clearInterval(interval)
    }
  }, [portalLoading])

  // Complete portal loading quickly once pathname changes (navigation started)
  // The destination page's loading.tsx will handle the rest of the loading state
  useEffect(() => {
    if (!portalLoading) return
    
    // If we have a target and the pathname has changed to it, complete the animation
    if (portalTarget && pathname === portalTarget) {
      // Quick completion - the loading.tsx is now handling the loading state
      setPortalProgress(100)
      const timer = window.setTimeout(() => {
        setPortalLoading(false)
        setPortalProgress(0)
        setPortalTarget(null)
      }, 200)
      return () => window.clearTimeout(timer)
    }
    
    // If pathname changed to something else (navigation happened), also complete
    if (portalTarget && pathname !== portalTarget && pathname !== '/') {
      setPortalProgress(100)
      const timer = window.setTimeout(() => {
        setPortalLoading(false)
        setPortalProgress(0)
        setPortalTarget(null)
      }, 200)
      return () => window.clearTimeout(timer)
    }
    
    // Fallback: if loading takes too long, complete anyway
    const fallbackTimer = window.setTimeout(() => {
      if (portalLoading) {
        setPortalProgress(100)
        window.setTimeout(() => {
          setPortalLoading(false)
          setPortalProgress(0)
          setPortalTarget(null)
        }, 200)
      }
    }, 5000)
    
    return () => window.clearTimeout(fallbackTimer)
  }, [pathname, portalLoading, portalTarget])

  useEffect(() => {
    if (!headerLoading) return
    if (!headerOrigin) return
    if (pathname === headerOrigin) return

    const timer = window.setTimeout(() => {
      setHeaderLoading(false)
      setHeaderOrigin(null)
    }, 160)

    return () => window.clearTimeout(timer)
  }, [pathname, headerLoading, headerOrigin])

  const startHeaderLoading = useCallback(() => {
    setPortalLoading(false)
    setPortalProgress(0)
    setPortalTarget(null)
    setHeaderOrigin(pathname)
    setHeaderLoading(true)
  }, [pathname])

  const stopHeaderLoading = useCallback(() => {
    setHeaderLoading(false)
    setHeaderOrigin(null)
  }, [])

  const startPortalLoading = useCallback((targetPath?: string) => {
    setHeaderLoading(false)
    setHeaderOrigin(null)
    setPortalProgress(0)
    setPortalTarget(targetPath ?? null)
    setPortalLoading(true)
  }, [])

  const stopPortalLoading = useCallback(() => {
    setPortalProgress(100)
    window.setTimeout(() => {
      setPortalLoading(false)
      setPortalProgress(0)
      setPortalTarget(null)
    }, 220)
  }, [])

  const value = useMemo(
    () => ({
      startHeaderLoading,
      stopHeaderLoading,
      startPortalLoading,
      stopPortalLoading,
    }),
    [startHeaderLoading, stopHeaderLoading, startPortalLoading, stopPortalLoading]
  )

  return (
    <RouteLoadingContext.Provider value={value}>
      {children}
      <LoadingProgressBar isLoading={headerLoading && pathname !== '/'} />
      <PortalTransitionOverlay active={portalLoading} progress={portalProgress} />
    </RouteLoadingContext.Provider>
  )
}

export function useRouteLoading() {
  const context = useContext(RouteLoadingContext)
  if (!context) {
    throw new Error('useRouteLoading must be used within RouteLoadingProvider')
  }
  return context
}

function PortalTransitionOverlay({ active, progress }: { active: boolean; progress: number }) {
  return (
    <div
      className={`fixed inset-0 z-70 transition-opacity duration-300 ${
        active ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-[#070707]/95 backdrop-blur-sm" />
      <div className="relative flex h-full flex-col items-center justify-center gap-8">
        {/* Simple loading indicator */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div 
            className="absolute h-16 w-16 rounded-full border border-white/10"
          />
          {/* Progress ring */}
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(250, 243, 224, 0.15)"
              strokeWidth="2"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(250, 243, 224, 0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${Math.min(100, progress) * 1.76} 176`}
              className="transition-all duration-200 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(250, 243, 224, 0.5))'
              }}
            />
          </svg>
          {/* Percentage */}
          <span className="absolute text-lg font-mono text-white/90 tabular-nums">
            {Math.min(100, Math.round(progress))}
          </span>
        </div>
        
        {/* Simple text */}
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono">
          loading
        </p>
      </div>
    </div>
  )
}
