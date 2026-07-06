import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
        fontFamily: {
          sans: ['var(--font-stack-sans-text)', 'Stack Sans Text', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
          serif: ['var(--font-stack-sans-headline)', 'Stack Sans Headline', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
          headline: ['var(--font-stack-sans-headline)', 'Stack Sans Headline', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
          notch: ['var(--font-stack-sans-notch)', 'Stack Sans Notch', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', 'sans-serif'],
          'faculty-glyphic': ['var(--font-faculty-glyphic)', 'Faculty Glyphic', 'serif'],
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
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
        },
        surface: {
          primary: 'var(--surface-primary)',
          glass: 'var(--surface-glass)',
          'glass-hover': 'var(--surface-glass-hover)',
        },
        status: {
          active: {
            bg: 'var(--status-active-bg)',
            text: 'var(--status-active-text)',
            border: 'var(--status-active-border)',
          },
          dev: {
            bg: 'var(--status-dev-bg)',
            text: 'var(--status-dev-text)',
            border: 'var(--status-dev-border)',
          },
          archived: {
            bg: 'var(--status-archived-bg)',
            text: 'var(--status-archived-text)',
            border: 'var(--status-archived-border)',
          },
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
        // Easing matches the --ease-out-quart motion token in globals.css
        // (Tailwind config can't reference CSS custom properties here).
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
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
        skeleton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
