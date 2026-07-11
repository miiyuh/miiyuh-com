'use client'

import { useEffect } from 'react'

/**
 * next/font/local scopes its font-family CSS custom properties to the
 * wrapper <div> in layout.tsx (Payload-generated, not editable — see its
 * "DO NOT MODIFY" header), not to <html>/<body>. Popovers and menus render
 * in a portal appended directly to <body>, a sibling of that div, so they
 * can't inherit the variables through normal cascade — Payload's
 * --font-body token then falls back to the browser default.
 *
 * Rather than hardcoding the generated font-family strings in custom.scss
 * (which would silently go stale if the font source files or variable
 * names in layout.tsx ever change), read the actual computed values off
 * the wrapper div at runtime and copy them onto :root, where every portal
 * can reach them.
 */
const FONT_VARIABLES = ['--font-stack-sans-text', '--font-stack-sans-notch', '--font-noto-sans']

export default function SyncAdminFontVariables() {
  useEffect(() => {
    const source = document.querySelector<HTMLElement>('[style*="--font-stack-sans-text"]')
    if (!source) return

    const computed = getComputedStyle(source)
    FONT_VARIABLES.forEach((name) => {
      const value = computed.getPropertyValue(name).trim()
      if (value) {
        document.documentElement.style.setProperty(name, value)
      }
    })
  }, [])

  return null
}
