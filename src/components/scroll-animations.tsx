'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  threshold?: number
}

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 }
  }
}

export const ScrollAnimation = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}: ScrollAnimationProps) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={animations[animation].initial}
      animate={inView ? animations[animation].animate : animations[animation].initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggeredAnimation = ({
  children,
  className = '',
  staggerDelay = 0.1
}: {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
