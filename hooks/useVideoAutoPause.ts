"use client";

import { useEffect, RefObject } from "react";

/**
 * Pauses the video when its parent section leaves the viewport and
 * resumes it when the section re-enters — WITHOUT ever touching
 * currentTime, so playback always continues from where it left off.
 *
 * Watches `sectionRef` rather than the <video> itself because video
 * elements can report zero/late layout dimensions on first paint on
 * mobile, which makes IntersectionObserver fire unreliably.
 */
export function useVideoAutoPause(
  videoRef: RefObject<HTMLVideoElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  prefersReducedMotion = false
) {
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || prefersReducedMotion) return;

    let cancelled = false;

    const safePlay = () => {
      if (cancelled) return;
      video.play().catch(() => {
        /* autoplay may still be blocked pre-interaction; harmless */
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(section);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      const rect = section.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) safePlay();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef, sectionRef, prefersReducedMotion]);
}