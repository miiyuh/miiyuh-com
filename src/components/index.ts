// Components index - organized exports for easier imports

// Layout components
export { default as Header } from './layout/header'
export { default as ClientHeader } from './layout/client-header'
export { default as Footer } from './layout/footer'
export { default as PageLayout } from './layout/page-layout'

// UI components
export { default as LoadingSpinner } from './ui/loading-spinner'
export { default as ErrorBoundary } from './ui/error-boundary'
export { default as ScrollToTopButton } from './ui/scroll-to-top-button'
export { HeadingWithHash } from './ui/heading-with-hash'

// Effects and animations
export { TypewriterText, AnimatedHeading } from './effects/animated-text'
export { ScrollAnimation } from './effects/scroll-animations'
export { ParallaxElement } from './effects/parallax-effects'
export { InteractiveDotsBackground } from './effects/interactive-dots-background'

// Blog components
export { ReadingProgress } from './blog/reading-progress'

// Gallery components
export { GalleryGrid, GallerySection } from './gallery'

// Debug components (only for development)
export { default as FontDebug } from './debug/font-debug'
