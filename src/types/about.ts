export interface AboutEntry {
  id: string
  type: 'education' | 'experience' | 'volunteering'
  title: string
  subtitle?: string
  description?: string
  logo?: { id: string; url: string; alt?: string }
  startDate?: string
  endDate?: string
  isCurrent?: boolean
  tags?: { tag: string }[]
  link?: string
  order?: number
}

export interface AboutPageData {
  education: AboutEntry[]
  experience: AboutEntry[]
  volunteering: AboutEntry[]
}
