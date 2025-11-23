import Link from 'next/link'

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface SimpleBreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function SimpleBreadcrumb({ items, className = '' }: SimpleBreadcrumbProps) {
    return (
        <nav className={`mb-8 flex items-center gap-2 text-sm font-sans font-semibold text-[#FAF3E0]/60 overflow-hidden ${className}`}>
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:text-[#FAF3E0] transition-colors whitespace-nowrap">
                            {item.label}
                        </Link>
                    ) : (
                        <span className={index === items.length - 1 ? "text-[#FAF3E0] truncate" : "flex-shrink-0"}>
                            {item.label}
                        </span>
                    )}
                    {index < items.length - 1 && <span className="flex-shrink-0">/</span>}
                </span>
            ))}
        </nav>
    )
}
