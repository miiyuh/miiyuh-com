import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-lg bg-white/8 bg-size-[200%_100%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

function ImageSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "aspect-video overflow-hidden rounded-lg relative bg-white/5 animate-pulse",
        className
      )}
      {...props}
    />
  );
}

function TextSkeleton({
  lines = 1,
  className,
  ...props
}: React.ComponentProps<"div"> & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-5 bg-white/5 rounded-lg animate-pulse",
            i === lines - 1 && "w-5/6"
          )}
        />
      ))}
    </div>
  );
}

function TagSkeleton({
  count = 2,
  className,
  ...props
}: React.ComponentProps<"div"> & { count?: number }) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-6 bg-white/5 rounded-full animate-pulse"
          style={{ width: `${60 + (i * 13) % 40}px` }}
        />
      ))}
    </div>
  );
}

function MetaInfoSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)} {...props}>
      <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32" />
      <TagSkeleton count={2} />
    </div>
  );
}

export { Skeleton, ImageSkeleton, TextSkeleton, TagSkeleton, MetaInfoSkeleton };

