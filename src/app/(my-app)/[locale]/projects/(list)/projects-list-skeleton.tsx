function EntrySeparatorSkeleton() {
  return <hr className="border-0 border-t border-white/4 my-0" />
}

function ProjectEntrySkeleton({ withSubtitle, index }: { withSubtitle: boolean; index: number }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        {/* Name */}
        <div className="h-8 sm:h-9 w-2/3 bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${index * 50}ms` }} />

        {/* Course subtitle */}
        {withSubtitle && (
          <div className="h-4 w-40 bg-white/5 rounded mt-1.5 animate-pulse" style={{ animationDelay: `${index * 50}ms` }} />
        )}

        {/* Description */}
        <div className="mt-4 space-y-2 max-w-prose">
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" style={{ animationDelay: `${index * 50}ms` }} />
          <div className="h-4 w-4/5 bg-white/5 rounded animate-pulse" style={{ animationDelay: `${index * 50}ms` }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-5 w-16 rounded-full bg-white/4 animate-pulse"
              style={{ animationDelay: `${index * 50 + i * 30}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="w-6 h-6 shrink-0 mt-2 rounded bg-white/5 animate-pulse" style={{ animationDelay: `${index * 50}ms` }} />
    </div>
  )
}

export function ProjectsListSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          {index > 0 && <EntrySeparatorSkeleton />}
          <div className="py-10 first:pt-0">
            <ProjectEntrySkeleton withSubtitle={index % 2 === 1} index={index} />
          </div>
        </div>
      ))}
    </div>
  )
}
