"use client";

interface Props {
  stage: string;
  headline: string;
  description: string;
  index: number;
  total: number;
  accent: string;
}

export default function StageHeadline({ stage, headline, description, index, total, accent }: Props) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-3 font-[var(--font-sans)] text-xs tabular-nums tracking-[0.15em] text-[#173F38]/40">
        <span style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>

      <h3 className="mt-6 font-[var(--font-display)] text-[clamp(2.6rem,5.4vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-[#173F38]">
        {headline}
      </h3>

      <p className="mt-7 max-w-xl font-[var(--font-sans)] text-[17px] leading-[1.85] text-[#5C6E6A] sm:text-[18px]">
        {description}
      </p>
    </div>
  );
}