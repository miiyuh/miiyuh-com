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
    const interval = window.setInterval(() => {
      setPortalProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 12 + 5
      })
    }, 180)

    return () => window.clearInterval(interval)
  }, [portalLoading])

  useEffect(() => {
    if (!portalLoading) return
    if (portalTarget && portalTarget !== pathname) return

    const timer = window.setTimeout(() => {
      setPortalProgress(100)
      setPortalLoading(false)
      setPortalProgress(0)
      setPortalTarget(null)
    }, 400)

    return () => window.clearTimeout(timer)
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
      className={`fixed inset-0 z-70 transition-opacity duration-500 ${
        active ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-[#020202]/80 backdrop-blur-3xl" />
      <div className="relative flex h-full flex-col items-center justify-center gap-6 text-center px-6">
        <div className="relative">
          <div className="h-48 w-48 rounded-full border border-accent-primary/10 animate-pulse" />
          <div
            className="absolute inset-4 rounded-full border border-accent-primary/60 animate-spin"
            style={{ animationDuration: '2.2s' }}
          />
          <div className="absolute inset-10 rounded-full bg-accent-primary/10 blur-3xl" />
          <div className="absolute inset-12 rounded-full border border-white/10" />
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-white/80">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
            initiating jump
          </p>
          <p className="text-sm text-white/75 font-light">
            preparing your next experience
          </p>
        </div>
      </div>
    </div>
  )
}
