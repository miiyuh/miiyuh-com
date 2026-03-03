// Components index - organized exports for easier imports

// Layout components
export { default as Header } from './layout/header'
export { default as ClientHeader } from './layout/client-header'
export { default as Footer } from './layout/footer'
export { default as PageLayout } from './layout/page-layout'

// UI components
export { default as ErrorBoundary } from './ui/error-boundary'
export { default as ScrollToTopButton } from './ui/scroll-to-top-button'
export { HeadingWithHash } from './ui/heading-with-hash'
export { PageTOC } from './ui/page-toc'

// Forms components
export { FormRenderer } from './forms/form-renderer'
export { FormBlock, FormBlockServer } from './forms/form-block'

// Debug components (only for development)
export { default as FontDebug } from './debug/font-debug'
