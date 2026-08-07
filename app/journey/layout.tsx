import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function JourneyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#C49A4A]/8 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#2A2D31]/8 blur-[140px]" />
      </div>

      {/* Back Link */}
      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 pt-32 lg:px-10 lg:pt-36">
        <Link
          href="/#journey"
          className="
            group
            inline-flex
            items-center
            gap-3
            font-[var(--font-sans)]
            text-[13px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#2A2D31]/70
            transition-all
            duration-300
            hover:text-[#C49A4A]
          "
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back to Journey</span>
        </Link>
      </div>

      {/* Page Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-32 pt-14 lg:px-10">
        {children}
      </main>
    </div>
  );
}