// Emoji fallback utilities for better cross-platform compatibility

export const emojiSupport = {
  // Check if the browser/device supports a specific emoji
  supportsEmoji: (emoji: string): boolean => {
    if (typeof window === 'undefined') return true // SSR fallback
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return false
    
    canvas.width = 32
    canvas.height = 32
    ctx.font = '24px Arial'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    
    // Draw the emoji
    ctx.fillText(emoji, 16, 16)
    
    // Check if anything was drawn (basic detection)
    const imageData = ctx.getImageData(0, 0, 32, 32).data
    return imageData.some(pixel => pixel !== 0)
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