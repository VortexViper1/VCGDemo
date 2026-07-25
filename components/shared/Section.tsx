"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({
  children,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-24 md:py-36",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}
