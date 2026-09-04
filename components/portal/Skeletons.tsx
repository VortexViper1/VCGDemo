/** Warm-toned skeletons shaped like the sections they stand in for —
 * not generic gray blocks. Shimmer respects prefers-reduced-motion via
 * the .skeleton-shimmer class defined once in globals.css (see note
 * at bottom of this file if that class doesn't exist yet). */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md bg-[#E8E2D9]/70 ${className}`} />;
}

export function StatCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-[#23272B]/10 bg-white p-6">
          <Bar className="h-3.5 w-24" />
          <Bar className="mt-4 h-8 w-14" />
        </div>
      ))}
    </div>
  );
}

export function ServiceListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="divide-y divide-[#23272B]/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-6 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="w-full max-w-xs space-y-2">
              <Bar className="h-4 w-2/3" />
              <Bar className="h-3 w-full" />
            </div>
            <Bar className="h-6 w-20 shrink-0 rounded-full" />
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between">
              <Bar className="h-3 w-14" />
              <Bar className="h-3 w-8" />
            </div>
            <Bar className="h-1.5 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocumentListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="divide-y divide-[#23272B]/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-5 px-6 py-5">
          <div className="min-w-0 flex-1 space-y-2">
            <Bar className="h-4 w-1/2" />
            <Bar className="h-3 w-1/3" />
          </div>
          <Bar className="h-8 w-24 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ActivityListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="divide-y divide-[#23272B]/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <Bar className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Bar className="h-3.5 w-1/2" />
            <Bar className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeadingSkeleton() {
  return (
    <div>
      <Bar className="h-3 w-28" />
      <Bar className="mt-3 h-7 w-64" />
      <Bar className="mt-2 h-3.5 w-52" />
    </div>
  );
}

/*
Add this once to your global stylesheet if it isn't already present —
it's the shared shimmer used by every skeleton above:

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}
.skeleton-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer::after { animation: none; }
}
*/