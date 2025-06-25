'use client'

import { useEffect, useRef, useState } from 'react'

interface InteractiveDotsBackgroundProps {
  dotSize?: number
  spacing?: number
  baseOpacity?: number
  hoverOpacity?: number
  hoverRadius?: number
  color?: string
}

export function InteractiveDotsBackground({
  dotSize = 2,
  spacing = 40,
  baseOpacity = 0.1,
  hoverOpacity = 0.4,
  hoverRadius = 80,
  color = '#FAF3E0'
}: InteractiveDotsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 })
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing
          const y = j * spacing
          
          // Calculate distance from mouse
          const distance = Math.sqrt(
            Math.pow(x - mousePos.x, 2) + Math.pow(y - mousePos.y, 2)
          )
          
          // Calculate opacity based on distance
          let opacity = baseOpacity
          if (distance < hoverRadius) {
            const factor = 1 - (distance / hoverRadius)
            opacity = baseOpacity + (hoverOpacity - baseOpacity) * factor
          }
          
          // Draw dot
          ctx.fillStyle = `${color}`
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      
      animationRef.current = requestAnimationFrame(drawDots)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    drawDots()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, dotSize, spacing, baseOpacity, hoverOpacity, hoverRadius, color])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
