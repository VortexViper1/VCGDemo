"use client";

import Link from "next/link";

import Image from "next/image";
function BrandAurora() {
  return (
    <>
      <div aria-hidden="true" className="brand-aurora pointer-events-none absolute -left-8 -top-14 h-40 w-40 rounded-full" />
      <style jsx>{`
        .brand-aurora {
          background: radial-gradient(circle, rgba(196, 154, 74, 0.28) 0%, rgba(217, 130, 43, 0.12) 45%, transparent 75%);
          filter: blur(8px);
          animation: auroraDrift 16s ease-in-out infinite;
        }
        @keyframes auroraDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 8px) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-aurora { animation: none; }
        }
      `}</style>
    </>
  );
}

export default function BrandMark({ href, tagline }: { href: string; tagline: string }) {
  return (
    <Link href={href} className="relative flex items-center gap-3">
      <BrandAurora />

<span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E8E2D9] bg-white sm:h-10 sm:w-10">
  <Image
    src="/logo/MAIN LOGO.png"
    alt="Viswaas"
    width={40}
    height={40}
    className="h-full w-full object-contain p-1.5"
    priority
  />
</span>

      <span className="relative flex flex-col leading-none">
        <span className="text-[16px] font-semibold tracking-[0.16em] text-[#23272B] sm:text-[19px]">
          VISWAAS
        </span>
        <span className="mt-1 text-[9px] tracking-[0.02em] text-[#9A958D] sm:text-[10px]">
          {tagline}
        </span>
      </span>
    </Link>
  );
}