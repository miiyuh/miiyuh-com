import { Spinner as SpinnerIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon
      aria-label="Loading"
      weight="bold"
      className={cn("size-4 animate-spin text-amber-400", className)}
      role="status"
      {...props}
    />
  );
}

export { Spinner };
