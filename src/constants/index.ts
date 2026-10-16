// Shared constants and navigation items
export const NAVIGATION_LINKS = [
  { href: "/gallery", label: "gallery", description: "photos & artwork" },
  { href: "/projects", label: "projects", description: "things i've built" },
  { href: "/blog", label: "blog", description: "my thoughts & stories" },
] as const;

// Social profiles. Each key is also a short redirect on this site
// (miiyuh.com/github -> GitHub) configured in vercel.json; keep the URLs
// here in sync with those redirects.
export const SOCIAL_LINKS = {
  "anilist": "https://anilist.co/user/miiyuh",
  "bsky": "https://bsky.app/profile/miiyuh.com",
  "github": "https://github.com/miiyuh",
  "instagram": "https://instagram.com/miiyuh.jpg",
  "ko-fi": "https://ko-fi.com/miiyuh",
  "linkedin": "https://linkedin.com/in/muhamad-azri",
  "myanimelist": "https://myanimelist.net/profile/miiyuh",
  "pinterest": "https://pinterest.com/miiyuh_",
  "spacehey": "https://spacehey.com/miiyuh",
  "spotify": "https://open.spotify.com/user/zttcd2713bknn5a2i4hvzoeml?si=e788dce596ab4628",
  "steam": "https://steamcommunity.com/id/miiyuh",
  "tiktok": "https://www.tiktok.com/@azri.my",
  "twitch": "https://twitch.tv/miiyuh_",
  "twitter": "https://twitter.com/miiyuh_",
  "youtube": "https://youtube.com/@miiyuh_",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;
export const SOCIAL_PLATFORMS = Object.keys(SOCIAL_LINKS) as SocialPlatform[];
