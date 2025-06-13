'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ReactNode } from 'react'

interface TypewriterTextProps {
  text: string | string[]
  className?: string
  speed?: number
  delay?: number
  repeat?: boolean
}

interface AnimatedHeadingProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'fade' | 'slide' | 'scale'
}

export const TypewriterText = ({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 0,
  repeat = false
}: TypewriterTextProps) => {
  const sequence = Array.isArray(text) 
    ? text.flatMap(t => [t, 2000])
    : [text]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        speed={speed as 1 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 99}
        className={className}
        repeat={repeat ? Infinity : 0}
        style={{ display: 'inline-block' }}
        cursor={true}
        deletionSpeed={Math.min(99, speed * 2) as 1 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 99}
      />
    </motion.div>
  )
}

export const AnimatedHeading = ({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'fade'
}: AnimatedHeadingProps) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slide: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    }
  }
  return (
    <motion.div
      initial={variants[variant].initial}
      animate={variants[variant].animate}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggeredText = ({ 
  text, 
  className = '', 
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number 
}) => {
  const words = text.split(' ')

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
