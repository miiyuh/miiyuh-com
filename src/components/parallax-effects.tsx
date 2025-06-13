'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
}

export const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up'
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])
      default:
        return useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
    }
  }

  const transform = getTransform()

  const motionStyle = direction === 'left' || direction === 'right' 
    ? { x: transform }
    : { y: transform }

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const ParallaxSection = ({ 
  children, 
  className = '',
  speed = 0.5
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
