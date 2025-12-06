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

  // Complete portal loading quickly once pathname changes (navigation started)
  // The destination page's loading.tsx will handle the rest of the loading state
  useEffect(() => {
    if (!portalLoading) return
    
    // If we have a target and the pathname has changed to it, complete the animation
    const completeTransition = () => {
      setPortalLoading(false)
      setPortalTarget(null)
    }

    if (portalTarget && pathname === portalTarget) {
      const timer = window.setTimeout(completeTransition, 200)
      return () => window.clearTimeout(timer)
    }

    if (portalTarget && pathname !== portalTarget && pathname !== '/') {
      const timer = window.setTimeout(completeTransition, 200)
      return () => window.clearTimeout(timer)
    }

    const fallbackTimer = window.setTimeout(completeTransition, 5000)
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

  // Auto-complete header loading if on same page after a delay
  useEffect(() => {
    if (!headerLoading) return
    if (!headerOrigin) return
    if (pathname !== headerOrigin) return // Different page, handled by other effect

    const timer = window.setTimeout(() => {
      setHeaderLoading(false)
      setHeaderOrigin(null)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [headerLoading, headerOrigin, pathname])

  const startHeaderLoading = useCallback(() => {
    setPortalLoading(false)
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
    setPortalTarget(targetPath ?? null)
    setPortalLoading(true)
  }, [])

  const stopPortalLoading = useCallback(() => {
    window.setTimeout(() => {
      setPortalLoading(false)
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
      <PortalTransitionOverlay active={portalLoading} />
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

function PortalTransitionOverlay({ active }: { active: boolean }) {
  const [stage, setStage] = useState<'idle' | 'enter' | 'exit'>('idle')

  useEffect(() => {
    if (active && stage !== 'enter') {
      setStage('enter')
      return
    }

    if (!active && stage === 'enter') {
      setStage('exit')
    }
  }, [active, stage])

  useEffect(() => {
    if (stage !== 'exit') return

    const timer = window.setTimeout(() => setStage('idle'), 520)
    return () => window.clearTimeout(timer)
  }, [stage])

  const transform =
    stage === 'enter'
      ? 'translateX(0)'
      : stage === 'exit'
        ? 'translateX(100%)'
        : 'translateX(-100%)'
  const timingFunction =
    stage === 'enter'
      ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'cubic-bezier(0.16, 1, 0.3, 1)'
  const duration = stage === 'idle' ? '0ms' : '500ms'

  return (
    <div className="fixed inset-0 z-70 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform,
          transitionProperty: 'transform',
          transitionDuration: duration,
          transitionTimingFunction: timingFunction,
          backgroundImage:
            'linear-gradient(180deg, #021b0f 0%, #013321 45%, #0f775b 75%, #15463c 100%)',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.45)',
        }}
      />
    </div>
  )
}
