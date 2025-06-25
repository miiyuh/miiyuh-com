// Shared constants and navigation items
export const NAVIGATION_LINKS = [
  { href: '/aboutme', label: 'about me' },
  { href: '/socials', label: 'socials' },
  { href: '/gallery', label: 'gallery' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
] as const

export const SOCIAL_PLATFORMS = [
  'anilist', 'bsky', 'github', 'instagram', 'ko-fi', 'linkedin',
  'myanimelist', 'pinterest', 'spacehey', 'spotify', 'steam',
  'tiktok', 'twitch', 'twitter', 'youtube'
] as const

export const THEME = {
  colors: {
    primary: '#1A1A1A',
    text: '#FAF3E0',
    textSecondary: 'rgba(250, 243, 224, 0.7)',
    textMuted: 'rgba(250, 243, 224, 0.9)',
  },
  animation: {
    duration: '300ms',
    easing: 'ease-in-out',
  },
} as const
