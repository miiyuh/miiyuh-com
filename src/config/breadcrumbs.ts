export type { BreadcrumbItem } from '@/components/ui/simple-breadcrumb'

import type { BreadcrumbItem } from '@/components/ui/simple-breadcrumb'

export const breadcrumbs = {
  home: (label: string): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label },
  ],

  blog: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'blog' },
  ],

  blogPost: (year: string, month: string, title: string): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'blog', href: '/blog' },
    { label: year, href: `/blog/${year}` },
    { label: month, href: `/blog/${year}/${month}` },
    { label: title },
  ],

  gallery: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'gallery' },
  ],

  galleryAlbum: (title: string): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'gallery', href: '/gallery' },
    { label: title },
  ],

  projects: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'projects' },
  ],

  projectDetail: (name: string): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'projects', href: '/projects' },
    { label: name },
  ],

  surveys: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'surveys' },
  ],

  surveyDetail: (title: string): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'surveys', href: '/surveys' },
    { label: title },
  ],

  privacyPolicy: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'privacy policy' },
  ],

  termsOfService: (): BreadcrumbItem[] => [
    { label: 'home', href: '/' },
    { label: 'terms of service' },
  ],
}
