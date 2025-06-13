'use client'

import React from 'react'

/**
 * Emoji fallback utilities for better cross-platform compatibility.
 * 
 * These components provide graceful fallbacks for emoji that may not 
 * display properly on all devices, particularly older iOS devices 
 * or devices with limited emoji support.
 * 
 * Flag emojis are particularly problematic as they consist of 
 * Regional Indicator Symbol pairs that may not render correctly.
 */

interface EmojiProps {
  emoji: string
  fallback?: string
  className?: string
}

export const EmojiWithFallback: React.FC<EmojiProps> = ({ 
  emoji, 
  fallback, 
  className = "" 
}) => {
  return (
    <span className={`emoji-fallback ${className}`}>
      <span 
        className="emoji-primary" 
        style={{ 
          fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' 
        }}
      >
        {emoji}
      </span>
      {fallback && (
        <span 
          className="emoji-fallback-text" 
          style={{ display: 'none' }}
        >
          {fallback}
        </span>
      )}
    </span>
  )
}

// Flag components with better fallbacks
export const MalaysiaFlag: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <EmojiWithFallback 
      emoji="🇲🇾" 
      fallback="MY" 
      className={`malaysia-flag ${className}`}
    />
  )
}

export const JapanFlag: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <EmojiWithFallback 
      emoji="🇯🇵" 
      fallback="JP" 
      className={`japan-flag ${className}`}
    />
  )
}

// General flag component
export const FlagEmoji: React.FC<{ 
  emoji: string
  countryCode: string
  className?: string 
}> = ({ emoji, countryCode, className = "" }) => {
  return (
    <EmojiWithFallback 
      emoji={emoji} 
      fallback={countryCode} 
      className={`flag-emoji ${className}`}
    />
  )
}