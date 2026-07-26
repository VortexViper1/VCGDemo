"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ParallaxParticles from "./ParallaxParticles";

export default function HeroBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 80);
      yTo((e.clientY / window.innerHeight - 0.5) * 80);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-x-0 top-32 bottom-0 overflow-hidden -z-10">
      {/* Gold Blob */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-16 h-80 w-80 rounded-full bg-[#C9A35F]/18 blur-[120px]"
      />

      {/* Blue Blob */}
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 h-[32rem] w-[32rem] rounded-full bg-[#173F38]/8 blur-[150px]"
      />

      {/* Center Glow — reacts to mouse via GSAP */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[58%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="h-full w-full rounded-full bg-[#FFFFFF]/70 blur-[150px]"
        />
      </div>

      {/* Parallax Particles */}
      <ParallaxParticles />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(23,63,56,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,63,56,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#071F2D]/12 via-[#071F2D]/6 to-transparent" />
    </div>
  );
}