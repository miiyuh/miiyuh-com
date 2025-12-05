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
    <main className={`flex flex-col bg-[#070707] text-[#FAF3E0] ${className}`}>
      <section className="grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">
        <div className="mb-12 border-b border-[#FAF3E0] pb-6">
          <h1 className="text-5xl uppercase tracking-widest mb-4">{title}_</h1>
          {description && (
            <p className="text-lg text-[#FAF3E0]/90 max-w-3xl">{description}</p>
          )}
        </div>
        {children}
      </section>
    </main>
  )
}
