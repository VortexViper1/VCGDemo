"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TRANSFORM_CONTENT } from "@/lib/stages";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TransformExperience() {
  const content = TRANSFORM_CONTENT;

  return (
    <section
      id={content.id}
      className="
      relative
      overflow-hidden
      bg-[#F7F4EC]
      py-16
      sm:py-20
      md:py-24
      lg:py-28
      xl:py-36
      2xl:py-44
      "
    >
      <div
        className="
        mx-auto
        w-full
        max-w-[1720px]
        px-5
        sm:px-8
        md:px-10
        lg:px-12
        xl:px-16
        2xl:px-20
        "
      >
        {/* ===============================
              HEAD BAND
        =============================== */}

        <div
          className="
          grid
          grid-cols-1
          gap-10

          lg:grid-cols-[1.15fr_0.85fr]
          lg:items-end
          lg:gap-16

          xl:gap-24
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.65,
              ease: EASE,
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="h-px w-10 lg:w-14"
                style={{
                  backgroundColor: content.accent,
                }}
              />

              <span
                className="
                font-[var(--font-sans)]
                text-[11px]
                uppercase
                tracking-[0.35em]
                "
                style={{
                  color: content.accent,
                }}
              >
                {content.kicker}
              </span>
            </div>

            <h2
              className="
              mt-6
              max-w-[13ch]

              font-[var(--font-display)]
              font-normal

              text-[clamp(2.6rem,4vw,5.8rem)]

              leading-[1.02]
              tracking-[-0.04em]

              text-[#062f35]
              "
            >
              {content.headline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: EASE,
            }}
            className="
            flex
            items-end
            justify-start

            lg:justify-end
            "
          >
            <p
              className="
              max-w-lg
              xl:max-w-xl
              2xl:max-w-2xl

              text-[15px]
              leading-8

              text-[#607274]

              sm:text-[16px]
              lg:text-[17px]
              xl:text-[18px]

              lg:text-right
              "
            >
              {content.intro}
            </p>
          </motion.div>
        </div>

        {/* ==========================================
                SYSTEMS SCHEMATIC
        ========================================== */}

        <div
          className="
          relative
          mt-16
          border-t
          border-[#062f35]/10

          sm:mt-20
          lg:mt-24
          xl:mt-28
          "
        >
          {/* Desktop headings */}

          <div
            className="
            hidden
            lg:grid
            lg:grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)]
            xl:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]
            "
          >
            <span className="pt-8 font-[var(--font-sans)] text-[11px] uppercase tracking-[0.35em] text-[#6D7B7D]">
              Where it breaks
            </span>

            <span />

            <span
              className="pt-8 font-[var(--font-sans)] text-[11px] uppercase tracking-[0.35em]"
              style={{ color: content.accent }}
            >
              How VISWAAS responds
            </span>
          </div>

          {content.problems.map((problem, i) => {
            const solution = content.solutions[i];

            return (
              <div
                key={problem.title}
                className="
                grid
                grid-cols-1

                border-b
                border-[#062f35]/10

                py-8

                transition-all
                duration-300

                hover:bg-white/40

                lg:grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)]
                xl:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]

                lg:items-center
                lg:py-12
                xl:py-14
                "
              >
                {/* -------------------- */}
                {/* PROBLEM */}
                {/* -------------------- */}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: EASE,
                  }}
                  className="pr-0 lg:pr-8"
                >
                  <span className="font-[var(--font-sans)] text-xs tracking-[0.15em] text-[#062f35]/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className="
                    mt-3

                    max-w-md
                    xl:max-w-lg

                    font-[var(--font-display)]

                    text-[20px]
                    leading-tight

                    xl:text-[24px]

                    text-[#062f35]
                    "
                  >
                    {problem.title}
                  </h3>

                  <p
                    className="
                    mt-3

                    max-w-md
                    xl:max-w-xl

                    text-[15px]
                    leading-8

                    text-[#687779]

                    xl:text-base
                    "
                  >
                    {problem.description}
                  </p>
                </motion.div>

                {/* -------------------- */}
                {/* CONNECTOR */}
                {/* -------------------- */}

                <div
                  className="
                  hidden

                  lg:flex

                  items-center
                  justify-center
                  "
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + i * 0.08,
                      ease: EASE,
                    }}
                    className="origin-left"
                  >
                    <div
                      className="
                      h-px
                      w-20
                      xl:w-28
                      "
                      style={{
                        backgroundColor: content.accent,
                      }}
                    />
                  </motion.div>
                </div>

                {/* -------------------- */}
                {/* SOLUTION */}
                {/* -------------------- */}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                  className="
                  mt-8

                  lg:mt-0
                  lg:pl-8
                  "
                >
                  {/* Mobile label */}

                  <span
                    className="
                    mb-3
                    inline-block

                    text-[11px]
                    uppercase
                    tracking-[0.25em]

                    lg:hidden
                    "
                    style={{
                      color: content.accent,
                    }}
                  >
                    VISWAAS Response
                  </span>

                  <h3
                    className="
                    max-w-md
                    xl:max-w-lg

                    font-[var(--font-display)]

                    text-[20px]
                    leading-tight

                    xl:text-[24px]

                    text-[#062f35]
                    "
                  >
                    {solution.title}
                  </h3>

                  <p
                    className="
                    mt-3

                    max-w-md
                    xl:max-w-xl

                    text-[15px]
                    leading-8

                    text-[#607274]

                    xl:text-base
                    "
                  >
                    {solution.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ==========================================
              VISUAL + OUTCOME
        ========================================== */}

        <div
          className="
          mt-16

          grid
          grid-cols-1

          gap-8

          sm:mt-20
          md:gap-10

          lg:mt-24
          lg:grid-cols-[58%_42%]
          lg:items-stretch

          xl:mt-28
          xl:gap-12
          "
        >
          {/* ---------------- IMAGE ---------------- */}

          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.75,
              ease: EASE,
            }}
            className="
            relative
            overflow-hidden

            rounded-[24px]

            h-[240px]

            sm:h-[320px]

            md:h-[420px]

            lg:h-[520px]

            xl:h-[620px]

            2xl:h-[720px]
            "
          >
            <Image
              src={content.images.primary}
              alt="VISWAAS Founder"
              fill
              loading="lazy"
              sizes="(min-width: 1536px) 60vw, (min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#062f35]/30 via-transparent to-transparent" />
          </motion.div>

          {/* ---------------- CARD ---------------- */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.7,
              ease: EASE,
            }}
            className="
            flex
            flex-col
            justify-between

            rounded-[24px]

            border
            border-[#062f35]/10

            bg-[#062f35]

            p-7

            text-white

            sm:p-10

            lg:p-12

            xl:p-14

            2xl:p-16
            "
          >
            <div>
              <span
                className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-white/55
                "
              >
                Desired Outcome
              </span>

              <p
                className="
                mt-6

                max-w-[22ch]

                font-[var(--font-display)]

                text-[clamp(1.7rem,2.4vw,3.3rem)]

                leading-[1.25]

                tracking-[-0.03em]
                "
              >
                {content.outcome}
              </p>
            </div>

            {/* ---------------- TAGS ---------------- */}

            <div
              className="
              relative

              mt-10

              overflow-hidden

              border-t

              border-white/10

              pt-6
              "
            >
              <motion.div
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                flex
                w-max

                gap-10

                whitespace-nowrap

                text-[11px]

                uppercase

                tracking-[0.25em]

                text-white/65

                xl:text-[12px]
                "
              >
                {[...content.tags, ...content.tags].map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="flex items-center gap-10"
                  >
                    {tag}

                    <span
                      style={{
                        color: content.accent,
                      }}
                    >
                      •
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}