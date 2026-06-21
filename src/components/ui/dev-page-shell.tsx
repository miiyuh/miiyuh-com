import Link from 'next/link'

type DevPageShellProps = {
  children: React.ReactNode
}

export function DevPageShell({ children }: DevPageShellProps) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <main className="flex min-h-screen flex-col gap-10 bg-bg-primary px-8 py-12 text-text-primary md:px-32 lg:gap-12 lg:px-56 xl:px-80">
      <Link
        href="/"
        className="self-start text-sm text-text-muted transition-colors hover:text-text-secondary"
      >
        &larr; Home
      </Link>
      {children}
    </main>
  )
}
