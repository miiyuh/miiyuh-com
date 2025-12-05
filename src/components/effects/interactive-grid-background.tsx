'use client'

import { useEffect, useRef, useMemo } from 'react'

interface InteractiveGridBackgroundProps {
    belowHeader?: boolean
}

export function InteractiveGridBackground({ belowHeader = false }: InteractiveGridBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const headerHeight = useMemo(() => belowHeader ? 72 : 0, [belowHeader])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let mouseX = 0
        let mouseY = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight - headerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY - headerHeight
        }

        // Grid configuration
        const gridSize = 40
        const influenceRadius = 150

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.lineWidth = 1

            const cols = Math.ceil(canvas.width / gridSize) + 2
            const rows = Math.ceil(canvas.height / gridSize) + 2

            // Center the grid - calculate offset so grid is symmetrical
            const totalGridWidth = cols * gridSize
            const totalGridHeight = rows * gridSize
            const offsetX = (canvas.width - totalGridWidth) / 2 + gridSize / 2
            const offsetY = (canvas.height - totalGridHeight) / 2 + gridSize / 2

            // Draw vertical lines
            for (let i = 0; i <= cols; i++) {
                ctx.beginPath()
                for (let j = 0; j <= rows; j++) {
                    const x = offsetX + i * gridSize
                    const y = offsetY + j * gridSize

                    // Calculate distance from mouse
                    const dx = mouseX - x
                    const dy = mouseY - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let drawX = x
                    let drawY = y

                    if (distance < influenceRadius) {
                        const force = (influenceRadius - distance) / influenceRadius
                        const angle = Math.atan2(dy, dx)
                        const pushFactor = 20 * force

                        drawX -= Math.cos(angle) * pushFactor
                        drawY -= Math.sin(angle) * pushFactor
                    }

                    if (j === 0) {
                        ctx.moveTo(drawX, drawY)
                    } else {
                        ctx.lineTo(drawX, drawY)
                    }
                }
                ctx.stroke()
            }

            // Draw horizontal lines
            for (let j = 0; j <= rows; j++) {
                ctx.beginPath()
                for (let i = 0; i <= cols; i++) {
                    const x = offsetX + i * gridSize
                    const y = offsetY + j * gridSize

                    // Calculate distance from mouse
                    const dx = mouseX - x
                    const dy = mouseY - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let drawX = x
                    let drawY = y

                    if (distance < influenceRadius) {
                        const force = (influenceRadius - distance) / influenceRadius
                        const angle = Math.atan2(dy, dx)
                        const pushFactor = 20 * force

                        drawX -= Math.cos(angle) * pushFactor
                        drawY -= Math.sin(angle) * pushFactor
                    }

                    if (i === 0) {
                        ctx.moveTo(drawX, drawY)
                    } else {
                        ctx.lineTo(drawX, drawY)
                    }
                }
                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)

        resize()
        draw()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [headerHeight])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-x-0 z-0 pointer-events-none"
            style={{ 
                opacity: 0.6,
                top: headerHeight,
                bottom: 0
            }}
        />
    )
}
