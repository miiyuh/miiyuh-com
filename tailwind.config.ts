import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'var(--font-noto-sans)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'serif'],
        mono: ['var(--font-noto-mono)', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'monospace'],
        emoji: ['Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'var(--font-noto-color-emoji)', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
}

export default config
