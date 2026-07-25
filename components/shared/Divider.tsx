"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export default function Divider({
  className,
}: DividerProps) {
  return (
    <div
      className={cn(
        "relative h-px w-full overflow-hidden bg-white/10",
        className
      )}
    >
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-transparent via-[#C9A35F] to-transparent" />
    </div>
  );
}