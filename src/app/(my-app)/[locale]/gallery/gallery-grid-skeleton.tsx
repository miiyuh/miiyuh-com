function GalleryCardSkeleton({ index }: { index: number }) {
  return (
    <div className="h-full p-6 border-r border-b border-white/8 flex flex-col relative">
      {/* Stacked cover image placeholder */}
      <div
        className="w-full aspect-square rounded-2xl bg-white/5 animate-pulse mb-6"
        style={{ animationDelay: `${index * 50}ms` }}
      />

      {/* Content */}
      <div className="px-2 pb-2 flex flex-col relative">
        <div className="flex items-start justify-between mb-2 gap-3">
          <div
            className="h-8 w-2/3 bg-white/5 rounded-lg animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
          />
          <div
            className="w-5 h-5 shrink-0 rounded bg-white/5 animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        </div>

        <div className="space-y-2">
          <div
            className="h-4 w-full bg-white/5 rounded animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
          />
          <div
            className="h-4 w-3/4 bg-white/5 rounded animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        </div>
      </div>
    </div>
  )
}

export function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-white/8">
      {Array.from({ length: 8 }).map((_, index) => (
        <GalleryCardSkeleton key={index} index={index} />
      ))}
    </div>
  )
}
