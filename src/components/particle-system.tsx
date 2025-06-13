'use client'

import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'

interface ParticleSystemProps {
  theme?: 'light' | 'dark'
  density?: number
  interactive?: boolean
  className?: string
}

const ParticleSystem = ({ 
  theme = 'light', 
  density = 50, 
  interactive = true,
  className = '' 
}: ParticleSystemProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, [])

  if (!mounted) return null

  return (
    <Particles
      id="tsparticles"
      className={`fixed inset-0 pointer-events-none ${className}`}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: interactive,
              mode: 'push',
            },
            onHover: {
              enable: interactive,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme === 'light' ? '#8B5A2B' : '#FAF3E0',
          },
          links: {
            color: theme === 'light' ? '#8B5A2B' : '#FAF3E0',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: density,
          },
          opacity: {
            value: 0.3,
            random: {
              enable: true,
              minimumValue: 0.1
            },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
            }
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
            }
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticleSystem
