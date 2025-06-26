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

// Social platform usernames/handles
export const SOCIAL_USERNAMES: Record<string, string> = {
  anilist: '@miiyuh',
  bsky: '@miiyuh.com',
  github: '@miiyuh',
  instagram: '@miiyuh.co',
  'ko-fi': '@miiyuh',
  linkedin: '@miiyuh',
  myanimelist: '@miiyuh',
  pinterest: '@miiyuh_',
  spacehey: '@miiyuh',
  spotify: '@miiyuh',
  steam: '@miiyuh',
  tiktok: '@muhamad_azri.my',
  twitch: '@miiyuh_',
  twitter: '@miiyuh_',
  youtube: '@miiyuh_'
} as const
