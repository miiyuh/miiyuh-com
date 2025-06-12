export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(metric)
    // You can send to analytics service here
  }
}

export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    return window.performance.now()
  }
  return 0
}

export const logPageRenderTime = (startTime: number, pageName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const endTime = window.performance.now()
    const renderTime = endTime - startTime
    console.log(`${pageName} rendered in ${renderTime.toFixed(2)}ms`)
  }
}
