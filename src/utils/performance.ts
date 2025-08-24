interface WebVitalMetric {
  name: string
  value: number
  id: string
  delta: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const reportWebVitals = (metric: WebVitalMetric) => {
  if (process.env.NODE_ENV === 'production') {
    // You can send to analytics service here
    // For production, remove console.log to avoid performance overhead
  }
}

export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    return window.performance.now()
  }
  return 0
}

export const logPageRenderTime = (startTime: number, pageName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window && process.env.NODE_ENV === 'development') {
    const endTime = window.performance.now()
    const renderTime = endTime - startTime
    console.log(`${pageName} rendered in ${renderTime.toFixed(2)}ms`)
  }
}
