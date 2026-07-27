"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-16 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
mb-5
inline-block
font-[var(--font-sans)]
text-[13px]
font-semibold
uppercase
tracking-[0.28em]
text-[#C9A35F]
"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
  style={{ color: "#173F38" }}
  className="
font-[var(--font-display)]
text-[clamp(2.8rem,5vw,4.8rem)]
font-semibold
leading-[1.05]
tracking-[-0.04em]
text-balance
"
>
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
mt-8
max-w-2xl
font-[var(--font-sans)]
text-[19px]
leading-[1.9]
tracking-[0.01em]
text-[#44665F]
"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}