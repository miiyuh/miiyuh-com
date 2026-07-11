'use client'

import { useEffect } from 'react'

/**
 * CSS alone (pointer-events: none) only blocks mouse activation of the
 * sidebar nav-group toggle buttons — a focused button still responds to
 * Enter/Space natively. Strip them from the tab order so they can't be
 * keyboard-activated either, keeping groups permanently expanded.
 */
export default function DisableNavGroupToggle() {
  useEffect(() => {
    const disable = () => {
      document.querySelectorAll('.nav-group__toggle').forEach((el) => {
        el.setAttribute('tabindex', '-1')
        el.setAttribute('aria-disabled', 'true')
      })
    }

    disable()

    const observer = new MutationObserver(disable)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
