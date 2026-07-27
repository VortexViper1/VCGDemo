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
        "relative w-full overflow-hidden py-28 md:py-40",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-8 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        {children}
      </div>
    </section>
  );
}