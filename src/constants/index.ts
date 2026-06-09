// Shared constants and navigation items
export const NAVIGATION_LINKS = [
  { href: "/gallery", label: "gallery", description: "photos & artwork" },
  { href: "/projects", label: "projects", description: "things i've built" },
  { href: "/blog", label: "blog", description: "my thoughts & stories" },
] as const;

export const SOCIAL_PLATFORMS = [
  "anilist",
  "bsky",
  "github",
  "instagram",
  "ko-fi",
  "linkedin",
  "myanimelist",
  "pinterest",
  "spacehey",
  "spotify",
  "steam",
  "tiktok",
  "twitch",
  "twitter",
  "youtube",
] as const;

// Social media usernames mapping
export const SOCIAL_USERNAMES: Record<string, string> = {
  anilist: "@miiyuh",
  bsky: "@miiyuh.com",
  github: "@miiyuh",
  instagram: "@miiyuh.co",
  "ko-fi": "@miiyuh",
  linkedin: "@miiyuh",
  myanimelist: "@miiyuh",
  pinterest: "@miiyuh_",
  spacehey: "@miiyuh",
  spotify: "@miiyuh",
  steam: "@miiyuh",
  tiktok: "@muhamad_azri.my",
  twitch: "@miiyuh_",
  twitter: "@miiyuh_",
  youtube: "@miiyuh_",
} as const;
