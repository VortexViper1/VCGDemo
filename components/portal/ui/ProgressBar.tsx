export default function ProgressBar({
  value,
  showLabel = true,
  className = "",
}: {
  value: number;
  showLabel?: boolean;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value || 0));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-1.5 w-full min-w-[60px] overflow-hidden rounded-full bg-[#F0EBE2]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C49A4A] to-[#D9822B] transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>

      {showLabel && (
        <span className="w-9 shrink-0 text-right text-[11px] font-medium tabular-nums text-[#77736D]">
          {clamped}%
        </span>
      )}
    </div>
  );
}