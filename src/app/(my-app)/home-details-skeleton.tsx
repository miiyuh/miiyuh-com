function EntryCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="p-5 rounded-xl border border-white/8 bg-white/2 animate-in fade-in duration-500"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 shrink-0 rounded-md bg-white/5 animate-pulse"
          style={{ animationDelay: `${index * 50}ms` }}
        />
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
            <div
              className="h-5 w-1/2 bg-white/5 rounded animate-pulse"
              style={{ animationDelay: `${index * 50}ms` }}
            />
            <div
              className="h-4 w-24 bg-white/5 rounded animate-pulse"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          </div>
          <div className="space-y-2">
            <div
              className="h-4 w-full bg-white/5 rounded animate-pulse"
              style={{ animationDelay: `${index * 50}ms` }}
            />
            <div
              className="h-4 w-2/3 bg-white/5 rounded animate-pulse"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeaderSkeleton({ widthClass }: { widthClass: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="w-6 h-6 rounded bg-white/5 animate-pulse" />
      <div className={`h-8 ${widthClass} bg-white/5 rounded-lg animate-pulse`} />
    </div>
  )
}

export default function HomeDetailsSkeleton() {
  return (
    <>
      {/* Experience */}
      <section>
        <SectionHeaderSkeleton widthClass="w-40" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <EntryCardSkeleton key={i} index={i} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionHeaderSkeleton widthClass="w-36" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <EntryCardSkeleton key={i} index={i} />
          ))}
        </div>
      </section>

      {/* Resume */}
      <section>
        <SectionHeaderSkeleton widthClass="w-28" />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-12">
          <div className="space-y-2 w-full max-w-lg">
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <div className="h-11 w-44 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </>
  )
}
