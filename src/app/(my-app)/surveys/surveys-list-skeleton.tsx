function SurveyCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="p-5 rounded-lg border border-white/8 bg-white/2 animate-pulse"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-5 w-1/2 bg-white/5 rounded-lg" />
          <div className="h-3 w-1/3 bg-white/5 rounded" />
        </div>
        <div className="shrink-0 w-5 h-5 rounded bg-white/5" />
      </div>
    </div>
  )
}

export function SurveysListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <SurveyCardSkeleton key={index} index={index} />
      ))}
    </div>
  )
}
