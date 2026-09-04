  "use client";

  import { useEffect, useState } from "react";
  import Link from "next/link";
  import {
    motion,
    AnimatePresence,
    type Variants,
  } from "framer-motion";
  import { X, ArrowUpRight, ChevronDown } from "lucide-react";
  import { NAVIGATION, CTA_BUTTON } from "@/lib/navigation";
  import { NAV_DROPDOWNS } from "@/lib/nav-dropdowns";
  import SectionLink from "@/components/shared/SectionLink";

  interface MobileMenuProps {
    open: boolean;
    onGetStarted?: () => void;
    onClose: () => void;
  }

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants: Variants = {
    hidden: { x: "100%", opacity: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
    exit: {
      x: "100%",
      opacity: 0.8,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 35,
        mass: 0.7,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 24,
      },
    },
  };

  const ACCORDION_TRANSITION = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  /* ── Palette for this panel ──
    Panel bg: amber (#C89B3C)
    Text: graphite (#2A2D31) — matches --color-ink
    Hover: warm slate (#5C5347) — desaturated, warm-toned grey
    CTA: graphite bg / ivory text — deliberate contrast against the
    amber panel, reads as the "action" surface rather than blending in */
  const GRAPHITE = "#2A2D31";
  const WARM_SLATE = "#5C5347";
  const IVORY = "#FAF8F4";

export default function MobileMenu({
  open,
  onClose,
  onGetStarted,
}: MobileMenuProps) {
    // Which nav item's accordion (if any) is currently expanded.
    const [openLabel, setOpenLabel] = useState<string | null>(null);

    // Lock body scroll
    useEffect(() => {
      const original = document.body.style.overflow;
      if (open) document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }, [open]);

    // Close on Escape
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      if (open) window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Collapse any open accordion whenever the menu itself closes, so it
    // doesn't reopen already-expanded next time.
    useEffect(() => {
      if (!open) setOpenLabel(null);
    }, [open]);

    return (
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={onClose}
              className="fixed inset-0 z-[110] bg-[#23272B]/60 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
  className="
    fixed inset-y-0 right-0 z-[120]
    w-full max-w-[420px]
    overflow-hidden
    border-l border-[#2A2D31]/10
    bg-[#FAF8F4]/95
    shadow-[-20px_0_60px_rgba(0,0,0,0.12)]
    backdrop-blur-2xl
  "
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Decorative gradient orb */}
  <div
    className="
      pointer-events-none absolute
      -top-32 -right-32
      h-72 w-72
      rounded-full
      bg-[#D9822B]/10
      blur-3xl
    "
  />

  <div
    className="
      pointer-events-none absolute
      bottom-[-120px] left-[-120px]
      h-72 w-72
      rounded-full
      bg-[#B7964A]/8
      blur-3xl
    "
  />

              {/* overflow-hidden here keeps the scrollable nav region below
                (and its internal scrollbar) clipped to the panel's rounded
                edges; it does not affect the orb above, which is a sibling
                positioned against the outer panel instead. */}
              <div className="flex h-full flex-col overflow-hidden px-8 py-10">
                {/* Header — shrink-0 so it never gets squeezed by the
                  scrollable nav area below. */}
                <div className="flex shrink-0 items-center justify-between border-b border-[#2A2D31]/8 pb-6">
                  
  <span
    className="text-[17px] font-semibold uppercase tracking-[0.16em]"
    style={{ color: GRAPHITE }}
  >
    VISWAAS
  </span>
                  <motion.button
                    whileHover={{ borderColor: WARM_SLATE, opacity: 1, color: WARM_SLATE }}
                    whileTap={{ scale: 0.9, rotate: 90, borderColor: WARM_SLATE, color: WARM_SLATE }}
                    onClick={onClose}
  className="
    group rounded-full
    border border-[#2A2D31]/10
    bg-white/70
    p-3
    shadow-sm
    backdrop-blur-md
    transition-all duration-300
    hover:border-[#D9822B]/40
    hover:bg-[#D9822B]
    hover:text-white
  "
                    style={{ color: GRAPHITE }}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </motion.button>
                </div>

                {/* Links — this is the key fix. flex-1 + min-h-0 lets this
                  region shrink and scroll independently of the header and
                  CTA below, instead of the old `mt-auto` CTA layout where
                  a long/expanded list had nowhere to go but overlap the
                  CTA. min-h-0 is required: without it a flex child won't
                  shrink below its content size, so overflow-y-auto never
                  actually kicks in. */}
  <nav
    className="
      mt-8 min-h-0 flex-1
      overflow-y-auto
      pr-2
      scrollbar-thin
      scrollbar-track-transparent
      scrollbar-thumb-[#B7964A]/30
      hover:scrollbar-thumb-[#B7964A]/50
    "
  >
                  <div className="flex flex-col gap-1.5">
                    {NAVIGATION.map((item) => {
                      const dropdownItems = NAV_DROPDOWNS[item.label];
                      const hasDropdown = Boolean(dropdownItems?.length);
                      const isOpen = hasDropdown && openLabel === item.label;

                      return (
                        <motion.div key={item.label} variants={itemVariants}>
                          <div className="flex items-center rounded-xl transition-all duration-300 hover:bg-[#2A2D31]/5">
                            <SectionLink
                              href={item.href}
                              onNavigate={onClose}
                              className="group flex flex-1 items-center justify-between px-4 py-4"
                            >
                              <span
  className="
    text-[21px]
    font-medium
    tracking-[-0.015em]
    transition-all duration-300
    group-hover:translate-x-1
    group-hover:!text-[#D9822B]
  "
                                style={{ color: GRAPHITE }}
                              >
                                {item.label}
                              </span>

                              {!hasDropdown && (
                                <ArrowUpRight
                                  size={20}
                                  className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                  style={{ color: WARM_SLATE }}
                                />
                              )}
                            </SectionLink>

                            {/* Separate tap target from the label link, so
                              tapping the chevron expands/collapses the
                              sub-list instead of navigating. */}
                            {hasDropdown && (
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenLabel((v) => (v === item.label ? null : item.label))
                                }
                                aria-expanded={isOpen}
                                aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} submenu`}
  className="
    mr-1 shrink-0
    rounded-full
    border border-transparent
    p-3
    transition-all duration-300
    hover:border-[#D9822B]/20
    hover:bg-[#D9822B]/8
  "
                                style={{ color: GRAPHITE }}
                              >
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={ACCORDION_TRANSITION}
                                  className="inline-flex"
                                >
                                <ChevronDown
    size={19}
    strokeWidth={1.8}
  />
                                </motion.span>
                              </button>
                            )}
                          </div>

                          {hasDropdown && (
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="submenu"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={ACCORDION_TRANSITION}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="
    ml-5
    flex flex-col gap-1
    border-l
    py-3 pl-5
  "
                                    style={{ borderColor: "rgba(42,45,49,0.18)" }}
                                  >
                                    {dropdownItems!.map((sub) => (
                                      <Link
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={onClose}
                                        className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 hover:bg-[#2A2D31]/5"
                                        style={{ color: WARM_SLATE }}
                                      >
                                        {sub.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* CTA — shrink-0, sits right below the scrollable nav
                  instead of being pinned via mt-auto. Always visible,
                  never overlapped, regardless of how many items/dropdowns
                  are expanded above it. Graphite surface for deliberate
                  contrast against the amber panel. */}
<motion.div
  variants={itemVariants}
  className="shrink-0 pt-8"
>
  <motion.button
    type="button"
    onClick={() => {
      onClose();
      onGetStarted?.();
    }}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="
      group relative flex w-full items-center
      justify-center gap-3 overflow-hidden
      rounded-full border border-[#2A2D31]
      px-8 py-4 text-[15px] font-semibold
      tracking-[0.01em]
      shadow-[0_12px_30px_rgba(42,45,49,0.16)]
      transition-colors duration-200
      hover:bg-[#D9822B]
    "
    style={{
      backgroundColor: GRAPHITE,
      color: IVORY,
    }}
  >
    <span>{CTA_BUTTON.label}</span>
    <ArrowUpRight size={18} />
  </motion.button>
</motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }