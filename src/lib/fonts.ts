import localFont from 'next/font/local'
import { Noto_Sans_Mono, Noto_Serif, Noto_Color_Emoji } from 'next/font/google'

// Shared by the site layout, global-not-found and global-error so every
// document gets the same font variables.

// Clock in the footer (Paper Mono)
const paperMono = localFont({
  src: '../assets/fonts/PaperMono-VariableFont_wght.woff2',
  weight: '100 800',
  variable: '--font-paper-mono',
  display: 'swap',
})
const stackSansText = localFont({
  src: '../assets/fonts/StackSansText-VariableFont_wght.ttf',
  weight: '200 700',
  variable: '--font-stack-sans-text',
  display: 'swap',
})
const stackSansHeadline = localFont({
  src: '../assets/fonts/StackSansHeadline-VariableFont_wght.ttf',
  weight: '200 700',
  variable: '--font-stack-sans-headline',
  display: 'swap',
})
const stackSansNotch = localFont({
  src: '../assets/fonts/StackSansNotch-VariableFont_wght.ttf',
  weight: '200 700',
  variable: '--font-stack-sans-notch',
  display: 'swap',
})
// Body text inside blog posts and the legal pages (.lexical-content); variable weight, real italics
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
  display: 'swap',
})
const notoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-mono',
  display: 'swap',
})
const notoColorEmoji = Noto_Color_Emoji({
  weight: '400',
  subsets: ['emoji'],
  variable: '--font-noto-color-emoji',
  display: 'swap',
  // Only fetched when an emoji glyph actually renders (unicode-range), not on every page
  preload: false,
})

// Apply to <body>: exposes every --font-* variable used in globals.css
export const fontVariables = [
  paperMono,
  notoSerif,
  notoMono,
  notoColorEmoji,
  stackSansText,
  stackSansHeadline,
  stackSansNotch,
]
  .map((font) => font.variable)
  .join(' ')
