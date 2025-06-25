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

export const SOCIAL_LINKS = [
  {
    name: 'aniList',
    platform: 'anilist',
    icon: '🎌',
    url: 'https://anilist.co/user/miiyuh',
    username: 'miiyuh',
    description: 'anime tracking & reviews',
    category: 'social',
    isActive: true,
    lastUpdated: '1 day ago'
  },
  {
    name: 'Bluesky',
    platform: 'bsky',
    icon: '🦋',
    url: 'https://bsky.app/profile/miiyuh.bsky.social',
    username: 'miiyuh.bsky.social',
    description: 'decentralized social',
    category: 'social',
    isActive: true,
    lastUpdated: '1 day ago'
  },
  {
    name: 'GitHub',
    platform: 'github',
    icon: '�',
    url: 'https://github.com/miiyuh',
    username: 'miiyuh',
    description: 'code repositories & projects',
    category: 'professional',
    isActive: true,
    lastUpdated: '1 day ago'
  },
  {
    name: 'Instagram',
    platform: 'instagram',
    icon: '�',
    url: 'https://instagram.com/miiyuh',
    username: 'miiyuh',
    description: 'daily life & photography',
    category: 'creative',
    isActive: true,
    lastUpdated: '2 days ago'
  },
  {
    name: 'Ko-fi',
    platform: 'ko-fi',
    icon: '☕',
    url: 'https://ko-fi.com/miiyuh',
    username: 'miiyuh',
    description: 'support my work',
    category: 'professional',
    isActive: true,
    lastUpdated: '1 week ago'
  },
  {
    name: 'LinkedIn',
    platform: 'linkedin',
    icon: '💼',
    url: 'https://linkedin.com/in/miiyuh',
    username: 'miiyuh',
    description: 'professional network',
    category: 'professional',
    isActive: false,
    lastUpdated: '2 weeks ago'
  },
  {
    name: 'MyAnimeList',
    platform: 'myanimelist',
    icon: '�',
    url: 'https://myanimelist.net/profile/miiyuh',
    username: 'miiyuh',
    description: 'anime & manga lists',
    category: 'social',
    isActive: true,
    lastUpdated: '5 days ago'
  },
  {
    name: 'Pinterest',
    platform: 'pinterest',
    icon: '📌',
    url: 'https://pinterest.com/miiyuh',
    username: 'miiyuh',
    description: 'inspiration & mood boards',
    category: 'creative',
    isActive: false,
    lastUpdated: '2 months ago'
  },
  {
    name: 'SpaceHey',
    platform: 'spacehey',
    icon: '�',
    url: 'https://spacehey.com/miiyuh',
    username: 'miiyuh',
    description: 'retro social network',
    category: 'social',
    isActive: false,
    lastUpdated: '3 months ago'
  },
  {
    name: 'Spotify',
    platform: 'spotify',
    icon: '🎵',
    url: 'https://open.spotify.com/user/miiyuh',
    username: 'miiyuh',
    description: 'music playlists & listening',
    category: 'creative',
    isActive: true,
    lastUpdated: '1 day ago'
  },
  {
    name: 'Steam',
    platform: 'steam',
    icon: '�',
    url: 'https://steamcommunity.com/id/miiyuh',
    username: 'miiyuh',
    description: 'gaming profile',
    category: 'social',
    isActive: true,
    lastUpdated: '2 days ago'
  },
  {
    name: 'TikTok',
    platform: 'tiktok',
    icon: '�',
    url: 'https://tiktok.com/@miiyuh',
    username: 'miiyuh',
    description: 'short videos & trends',
    category: 'social',
    isActive: true,
    lastUpdated: '3 days ago'
  },
  {
    name: 'Twitch',
    platform: 'twitch',
    icon: '🎮',
    url: 'https://twitch.tv/miiyuh',
    username: 'miiyuh',
    description: 'gaming streams',
    category: 'creative',
    isActive: false,
    lastUpdated: '1 month ago'
  },
  {
    name: 'Twitter',
    platform: 'twitter',
    icon: '🐦',
    url: 'https://twitter.com/miiyuh',
    username: 'miiyuh',
    description: 'thoughts & random updates',
    category: 'social',
    isActive: true,
    lastUpdated: '3 hours ago'
  },
  {
    name: 'YouTube',
    platform: 'youtube',
    icon: '🎥',
    url: 'https://youtube.com/@miiyuh',
    username: 'miiyuh',
    description: 'videos & creative content',
    category: 'creative',
    isActive: true,
    lastUpdated: '1 week ago'
  }
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
