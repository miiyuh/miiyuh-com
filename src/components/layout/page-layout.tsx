import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
  className?: string
}

export default function PageLayout({ 
  children, 
  title, 
  description, 
  className = '' 
}: PageLayoutProps) {
  return (
    <main className={`flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans ${className}`}>
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">
        <div className="mb-6">
          <h1 className="text-5xl font-bold tracking-[-0.03em] mb-2">{title}</h1>
          {description && (
            <p className="text-lg text-[#FAF3E0]/90">{description}</p>
          )}
        </div>
        {children}
      </section>
    </main>
  )
}
