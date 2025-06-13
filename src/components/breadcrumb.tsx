'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ScrollAnimation } from './scroll-animations'

interface BreadcrumbProps {
  className?: string
}

const routeNames: Record<string, string> = {
  '': 'Home',
  'aboutme': 'About Me', 
  'socials': 'Socials',
  'gallery': 'Gallery',
  'blog': 'Blog',
  'site-map': 'Site Map'
}

const routeIcons: Record<string, string> = {
  '': '🏠',
  'aboutme': '👤',
  'socials': '🌐', 
  'gallery': '🖼️',
  'blog': '📝',
  'site-map': '🗺️'
}

export const Breadcrumb = ({ className = '' }: BreadcrumbProps) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs = [
    { name: 'Home', href: '/', icon: '🏠' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      return {
        name: routeNames[segment] || segment,
        href,
        icon: routeIcons[segment] || '📄'
      }
    })
  ]

  if (breadcrumbs.length <= 1) return null

  return (
    <ScrollAnimation animation="slideLeft" className={className}>
      <nav className="flex items-center space-x-2 text-sm text-[#8B5A2B]/70 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-[#8B5A2B]/40">→</span>
            )}
            
            {index === breadcrumbs.length - 1 ? (
              <motion.span 
                className="flex items-center gap-1 text-[#8B5A2B] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{crumb.icon}</span>
                {crumb.name}
              </motion.span>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={crumb.href}
                  className="flex items-center gap-1 hover:text-[#8B5A2B] transition-colors"
                >
                  <span>{crumb.icon}</span>
                  {crumb.name}
                </Link>
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </ScrollAnimation>
  )
}
