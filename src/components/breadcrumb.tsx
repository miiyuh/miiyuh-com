'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ScrollAnimation } from './scroll-animations'
import { Home, User, Globe, Image, FileText, Map } from 'lucide-react'

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

const routeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  '': Home,
  'aboutme': User,
  'socials': Globe, 
  'gallery': Image,
  'blog': FileText,
  'site-map': Map
}

export const Breadcrumb = ({ className = '' }: BreadcrumbProps) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [
    { name: 'Home', href: '/', icon: Home },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      return {
        name: routeNames[segment] || segment,
        href,
        icon: routeIcons[segment] || FileText
      }
    })
  ]

  if (breadcrumbs.length <= 1) return null

  return (
    <ScrollAnimation animation="slideLeft" className={className}>
      <nav className="flex items-center space-x-2 text-sm text-[#FAF3E0]/70 mb-6 font-mono">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-[#FAF3E0]/40">→</span>
            )}              {index === breadcrumbs.length - 1 ? (
              <motion.span 
                className="flex items-center gap-1 text-[#FAF3E0] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <crumb.icon size={16} className="text-[#FAF3E0]" />
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
                  className="flex items-center gap-1 hover:text-[#FAF3E0] transition-colors"
                >
                  <crumb.icon size={16} className="text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors" />
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
