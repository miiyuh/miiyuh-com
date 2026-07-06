import { useEffect, useRef, useState } from 'react'

export function useStuckObserver<T extends HTMLElement = HTMLDivElement>() {
  const sentinelRef = useRef<T>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return { sentinelRef, isStuck }
}
