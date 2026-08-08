"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function JourneyLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Pull the stage id out of /journey/<stageId> (and /journey/<stageId>/<serviceId>
  // if you have nested service routes too), so "Back to Journey" returns to
  // the exact stage you came from instead of always resetting to the first one.
  const stageId = pathname.split("/")[2]; // "" | "startup" | "gearup" | ...

  const backHref = stageId ? `/?stage=${stageId}#journey` : "/#journey";

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] overflow-x-hidden">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/8 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#2A2D31]/8 blur-[140px]" />
      </div>

      {/* Back Link */}
      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 pt-32 lg:px-10 lg:pt-36">
       <Link href={backHref} className="group inline-flex focus-visible:outline-none">
  <span className="pointer-events-auto relative z-30 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[13px] font-medium text-[#23272B] transition-all duration-300 hover:scale-105 hover:bg-[#D9822B] hover:text-white sm:text-sm">
    <ArrowLeft
      size={15}
      className="transition-transform duration-300 group-hover:-translate-x-1"
    />
    Back to Journey
  </span>
</Link>
      </div>

      {/* Page Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-32 pt-14 lg:px-10">
        {children}
      </main>
    </div>
  );
}