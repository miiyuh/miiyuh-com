'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface LoadingSkeletonProps {
  lines?: number
  className?: string
  height?: string
}

interface SkeletonCardProps {
  className?: string
  hasImage?: boolean
}

export const LoadingSkeleton = ({ 
  lines = 3, 
  className = '',
  height = 'h-4'
}: LoadingSkeletonProps) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-[#8B5A2B]/20 rounded ${height} mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

export const SkeletonCard = ({ 
  className = '',
  hasImage = true
}: SkeletonCardProps) => {
  return (
    <div className={`animate-pulse bg-[#FAF3E0]/5 backdrop-blur-sm border border-[#8B5A2B]/20 rounded-lg p-6 ${className}`}>
      {hasImage && (
        <div className="bg-[#8B5A2B]/20 rounded h-48 mb-4" />
      )}
      <div className="space-y-3">
        <div className="bg-[#8B5A2B]/20 rounded h-6 w-3/4" />
        <div className="bg-[#8B5A2B]/20 rounded h-4 w-full" />
        <div className="bg-[#8B5A2B]/20 rounded h-4 w-5/6" />
        <div className="bg-[#8B5A2B]/20 rounded h-4 w-2/3" />
      </div>
    </div>
  )
}

export const ImageSkeleton = ({ 
  className = '',
  aspectRatio = 'aspect-video'
}: {
  className?: string
  aspectRatio?: string
}) => {
  return (
    <div className={`animate-pulse bg-[#8B5A2B]/20 rounded ${aspectRatio} ${className}`} />
  )
}

export const PageLoader = () => {
  const [progress, setProgress] = useState(0)

  // Simulate loading progress
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#FAF3E0] flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="text-6xl font-emoji mb-4">🌟</div>
          <h2 className="text-2xl font-serif text-[#8B5A2B] mb-2">Loading</h2>
          <p className="text-[#8B5A2B]/70">Preparing your experience...</p>
        </motion.div>
        
        <div className="w-64 h-2 bg-[#8B5A2B]/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B5A2B] to-[#A0662F] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#8B5A2B]/60 text-sm mt-4"
        >
          {progress < 30 ? 'Loading assets...' : 
           progress < 70 ? 'Preparing interface...' : 
           'Almost ready...'}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Fix the React import
import React from 'react'
