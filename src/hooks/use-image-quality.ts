import { useState, useEffect } from 'react'

interface NetworkConnection {
  effectiveType: string
  addEventListener: (event: string, handler: () => void) => void
  removeEventListener: (event: string, handler: () => void) => void
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection
  mozConnection?: NetworkConnection
  webkitConnection?: NetworkConnection
}

function getNetworkConnection(): NetworkConnection | undefined {
  const nav = navigator as NavigatorWithConnection
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

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
      
      const connection = getNetworkConnection()
      
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
    const connection = getNetworkConnection()
    
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