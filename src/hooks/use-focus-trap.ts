"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape?: () => void,
) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      previousFocus.current = null;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    previousFocus.current = document.activeElement as HTMLElement | null;

    const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = elements[0];

    if (first) first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== "Tab") return;

      const currentFocusable = container.querySelectorAll<HTMLElement>(FOCUSABLE);
      const firstFocusable = currentFocusable[0];
      const lastFocusable = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus.current && previousFocus.current !== document.body) {
        previousFocus.current.focus();
      }
    };
  }, [containerRef, active, onEscape]);
}
