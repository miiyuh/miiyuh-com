import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  /**
   * When false, the element is treated as permanently visible and no observer
   * is attached. Useful for priority/eager-loaded elements.
   * @default true
   */
  enabled?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
  enabled = true,
}: UseIntersectionObserverProps = {}) {
  // If disabled, start already-visible so consumers render immediately
  const [isVisible, setIsVisible] = useState(!enabled);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasLoaded(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasLoaded, enabled]);

  return { isVisible, elementRef, hasLoaded };
}
