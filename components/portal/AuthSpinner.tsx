"use client";

/** Amber-on-transparent arc, used inside buttons and inline loading rows.
 * Deliberately not a generic <Spinner/> dropped in the page center —
 * always paired with a status word ("Signing in…", "Sending link…"). */
export function ButtonSpinner({ light = true }: { light?: boolean }) {
  return (
    <svg
      className="btn-spinner h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={light ? "rgba(255,255,255,0.28)" : "rgba(35,39,43,0.15)"}
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke={light ? "#fff" : "#23272B"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <style jsx>{`
        .btn-spinner {
          animation: spin 0.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .btn-spinner {
            animation-duration: 1.6s;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </svg>
  );
}

/** Full-viewport "preparing your secure workspace" state — a thin amber
 * line sweeping under the wordmark, not a spinner glued to the middle
 * of the screen. */
export function SecureSessionLoader({
  headline = "Preparing your secure workspace",
}: {
  headline?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FCFBF8] px-6">
      <p className="text-sm font-semibold tracking-[0.28em] text-[#23272B]">
        VISWAAS
      </p>
      <div className="relative mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-[#E8E2D9]">
        <div className="sweep absolute inset-y-0 left-0 w-1/3 rounded-full bg-[#D9822B]" />
      </div>
      <p className="mt-5 text-sm text-[#77736D]">{headline}</p>

      <style jsx>{`
        .sweep {
          animation: sweep 1.3s ease-in-out infinite;
        }
        @keyframes sweep {
          0% {
            left: -33%;
          }
          100% {
            left: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sweep {
            animation: none;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}