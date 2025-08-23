// Emoji fallback utilities for better cross-platform compatibility

export const emojiSupport = {
  // Check if the browser/device supports a specific emoji
  supportsEmoji: (emoji: string): boolean => {
    if (typeof window === 'undefined') return true // SSR fallback
    
    // For flag emojis, use a more sophisticated approach
    if (emoji.length >= 4 && emoji.codePointAt(0) === 0x1F1E6) {
      // This is likely a flag emoji (Regional Indicator Symbols)
      return emojiSupport.supportsFlagEmoji()
    }
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return false
    
    canvas.width = 32
    canvas.height = 32
    ctx.font = '24px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    
    // Clear canvas
    ctx.clearRect(0, 0, 32, 32)
    
    // Draw the emoji
    ctx.fillText(emoji, 16, 16)
    
    // Check if anything was drawn
    const imageData = ctx.getImageData(0, 0, 32, 32).data
    return imageData.some(pixel => pixel !== 0)
  },

  // Better detection for flag emojis
  supportsFlagEmoji: (): boolean => {
    if (typeof window === 'undefined') return true
    
    // Modern browsers and devices generally support flag emojis
    const userAgent = navigator.userAgent.toLowerCase()
    
    // Known to support flag emojis well
    if (userAgent.includes('chrome') || 
        userAgent.includes('firefox') || 
        userAgent.includes('safari') ||
        userAgent.includes('edge')) {
      return true
    }
    
    // For other browsers, assume support (fail gracefully)
    return true
  },

  // Get appropriate fallback for Malaysia flag
  getMalaysiaFlag: (): string => {
    const flagEmoji = '🇲🇾'
    if (typeof window !== 'undefined' && !emojiSupport.supportsEmoji(flagEmoji)) {
      return 'MY'
    }
    return flagEmoji
  },

  // Get appropriate fallback for Japan flag
  getJapanFlag: (): string => {
    const flagEmoji = '🇯🇵'
    if (typeof window !== 'undefined' && !emojiSupport.supportsEmoji(flagEmoji)) {
      return 'JP'
    }
    return flagEmoji
  },

  // Generic flag fallback
  getFlagFallback: (flagEmoji: string, countryCode: string): string => {
    if (typeof window !== 'undefined' && !emojiSupport.supportsEmoji(flagEmoji)) {
      return countryCode
    }
    return flagEmoji
  },

  // CSS class for emoji fallback styling
  getFallbackClass: (emoji: string): string => {
    if (typeof window === 'undefined') return ''
    return emojiSupport.supportsEmoji(emoji) ? 'emoji-supported' : 'emoji-fallback'
  }
}

export default emojiSupport