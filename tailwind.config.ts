import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
        fontFamily: {
          sans: ['InterVariable', 'Inter', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
          serif: ['var(--font-instrument-serif)', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'serif'],
          'noto-serif-jp': ['var(--font-noto-serif-jp)', 'serif'],
          mono: ['var(--font-noto-mono)', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'monospace'],
          emoji: ['Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'var(--font-noto-color-emoji)', 'sans-serif'],
        },
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
        },
        surface: {
          glass: 'var(--surface-glass)',
          'glass-hover': 'var(--surface-glass-hover)',
        },
        border: {
          glass: 'var(--border-glass)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/assets/img/noise.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
}

export default config
