import { useState, useEffect } from 'react'

interface UseImageQualityProps {
  baseQuality?: number
  enableAdaptiveQuality?: boolean
}

export function useImageQuality({ 
  baseQuality = 75, 
  enableAdaptiveQuality = true 
}: UseImageQualityProps = {}) {
  const [quality, setQuality] = useState(baseQuality)
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isHighDPI: false,
    isSlowConnection: false,
    viewportWidth: 1920
  })

  useEffect(() => {
    if (!enableAdaptiveQuality) {
      setQuality(baseQuality)
      return
    }

    const updateDeviceInfo = () => {
      const isMobile = window.innerWidth < 768
      const isHighDPI = window.devicePixelRatio > 1
      const viewportWidth = window.innerWidth
      
      // Check for slow connection (can be enhanced with Network Information API)
      const connection = (navigator as unknown as { 
        connection?: { effectiveType: string }
        mozConnection?: { effectiveType: string }
        webkitConnection?: { effectiveType: string }
      }).connection || 
                        (navigator as unknown as { 
                          connection?: { effectiveType: string }
                          mozConnection?: { effectiveType: string }
                          webkitConnection?: { effectiveType: string }
                        }).mozConnection || 
                        (navigator as unknown as { 
                          connection?: { effectiveType: string }
                          mozConnection?: { effectiveType: string }
                          webkitConnection?: { effectiveType: string }
                        }).webkitConnection
      
      const isSlowConnection = connection ? 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' || 
         connection.effectiveType === '3g') : 
        false

      setDeviceInfo({
        isMobile,
        isHighDPI,
        isSlowConnection,
        viewportWidth
      })

      // Calculate optimal quality - more aggressive reduction for thumbnails
      let optimalQuality = baseQuality

      // Reduce quality for mobile devices
      if (isMobile) {
        optimalQuality -= 15
      }

      // Reduce quality for slow connections
      if (isSlowConnection) {
        optimalQuality -= 20
      }

      // Small increase for high DPI displays (but not on mobile)
      if (isHighDPI && !isMobile) {
        optimalQuality += 5
      }

      // Ensure quality stays within reasonable bounds (minimum 20 for thumbnails)
      optimalQuality = Math.max(20, Math.min(80, optimalQuality))
      
      setQuality(optimalQuality)
    }

    updateDeviceInfo()
    window.addEventListener('resize', updateDeviceInfo)
    
// Listen for connection changes if available
      const connection = (navigator as unknown as { 
        connection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
        mozConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
        webkitConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
      }).connection || 
                      (navigator as unknown as { 
                        connection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                        mozConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                        webkitConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                      }).mozConnection || 
                      (navigator as unknown as { 
                        connection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                        mozConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                        webkitConnection?: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void; removeEventListener: (event: string, handler: () => void) => void }
                      }).webkitConnection
    
    if (connection) {
      connection.addEventListener('change', updateDeviceInfo)
    }

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      if (connection) {
        connection.removeEventListener('change', updateDeviceInfo)
      }
    }
  }, [baseQuality, enableAdaptiveQuality])

  return { quality, deviceInfo }
}