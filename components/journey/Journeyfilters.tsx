"use client";

/**
 * Mounts once per Journey section. Every stamp, road stroke, and the
 * paper background reference these via `filter: url(#ink-grain)` /
 * `url(#paper-grain)` — that's what keeps the ink from looking like
 * flat vector color and the ivory from looking like a flat fill.
 *
 * width/height are 0 and the wrapper is visually hidden; the <defs>
 * are still addressable by id anywhere in the document.
 */
export default function JourneyFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>
        {/* Fine ink-on-paper grain, used on stamps and the road stroke */}
        <filter id="ink-grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.5 0"
            result="softNoise"
          />
          <feComposite in="softNoise" in2="SourceGraphic" operator="in" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>

        {/* Coarser paper-stock grain for the section background */}
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            seed="14"
            stitchTiles="stitch"
            result="paperNoise"
          />
          <feColorMatrix
            in="paperNoise"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.06 0"
          />
        </filter>
      </defs>
    </svg>
  );
}