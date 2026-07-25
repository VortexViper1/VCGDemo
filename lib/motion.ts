import { Variants, Transition } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DEFAULT_TRANSITION: Transition = {
  duration: 0.8,
  ease: EASE,
};

export const FAST_TRANSITION: Transition = {
  duration: 0.45,
  ease: EASE,
};

export const SLOW_TRANSITION: Transition = {
  duration: 1.2,
  ease: EASE,
};

export const fadeUp = (
  delay = 0,
  distance = 40
): Variants => ({
  hidden: {
    opacity: 0,
    y: distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const fadeDown = (
  delay = 0,
  distance = 40
): Variants => ({
  hidden: {
    opacity: 0,
    y: -distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const fadeLeft = (
  delay = 0,
  distance = 40
): Variants => ({
  hidden: {
    opacity: 0,
    x: distance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const fadeRight = (
  delay = 0,
  distance = 40
): Variants => ({
  hidden: {
    opacity: 0,
    x: -distance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const scaleIn = (
  delay = 0
): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const blurReveal = (
  delay = 0
): Variants => ({
  hidden: {
    opacity: 0,
    filter: "blur(18px)",
    y: 30,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      ...DEFAULT_TRANSITION,
      delay,
    },
  },
});

export const staggerContainer = (
  stagger = 0.12,
  delay = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const cardHover = {
  y: -8,
  transition: FAST_TRANSITION,
};

export const buttonHover = {
  scale: 1.04,
  transition: FAST_TRANSITION,
};

export const buttonTap = {
  scale: 0.98,
};

export const floatingAnimation = {
  y: [-8, 8, -8],
  transition: {
    duration: 6,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

export const rotateSlow = {
  rotate: 360,
  transition: {
    duration: 30,
    repeat: Infinity,
    ease: "linear",
  },
};