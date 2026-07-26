"use client";

import { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPos({
      x: x * strength,
      y: y * strength,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.4,
      }}
      className={className}
      {...props}
    >
      <motion.span
        animate={{
          x: pos.x * 0.4,
          y: pos.y * 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 12,
        }}
        className="inline-flex items-center gap-3"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}