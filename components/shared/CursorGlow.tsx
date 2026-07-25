"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const x = useSpring(mouseX, {
    damping: 30,
    stiffness: 180,
  });

  const y = useSpring(mouseY, {
    damping: 30,
    stiffness: 180,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 180);
      mouseY.set(e.clientY - 180);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] rounded-full bg-[#B7964A]/[0.08] blur-[140px] mix-blend-screen"
    />
  );
}
