import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-noto-sans)', 'EmojiOverride', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'EmojiOverride', 'serif'],
        mono: ['var(--font-noto-mono)', 'EmojiOverride', 'monospace'],
        emoji: ['var(--font-noto-color-emoji)', 'EmojiOverride'],
      },
    },
  },
  plugins: [],
}

export default config
