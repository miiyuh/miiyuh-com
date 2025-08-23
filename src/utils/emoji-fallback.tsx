'use client'

import React from 'react'

/**
 * Simple emoji components with proper font stacking for better cross-platform compatibility.
 */

interface EmojiProps {
  emoji: string
  className?: string
}

export const SimpleEmoji: React.FC<EmojiProps> = ({ emoji, className = "" }) => {
  return (
    <span 
      className={`emoji-primary ${className}`}
      style={{ 
        fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif',
        fontSize: 'inherit'
      }}
    >
      {emoji}
    </span>
  )
}

// Simple flag components without detection logic
export const MalaysiaFlag: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SimpleEmoji 
      emoji="🇲🇾" 
      className={`malaysia-flag ${className}`}
    />
  )
}

export const JapanFlag: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <SimpleEmoji 
      emoji="🇯🇵" 
      className={`japan-flag ${className}`}
    />
  )
}

// General flag component
export const FlagEmoji: React.FC<{ 
  emoji: string
  className?: string 
}> = ({ emoji, className = "" }) => {
  return (
    <SimpleEmoji 
      emoji={emoji} 
      className={`flag-emoji ${className}`}
    />
  )
}

// Keep the old EmojiWithFallback name for backward compatibility but make it simple
export const EmojiWithFallback = SimpleEmoji