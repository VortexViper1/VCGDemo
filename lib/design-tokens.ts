/**
 * ============================================================
 * VCG AURORA DESIGN SYSTEM
 * Single source of truth for the complete UI.
 * ============================================================
 */

export const COLORS = {
  primary: "#23363F",
  primaryLight: "#2F4A56",
  primaryDark: "#18272E",

  accent: "#B7964A",
  accentLight: "#D3B66C",
  accentDark: "#8C6E2E",

  background: "#F4F0E8",
  surface: "#FCFAF7",
  surfaceAlt: "#F8F4ED",

  text: "#1A1C20",
  textSecondary: "#4D545A",
  textMuted: "#8A9299",

  border: "#E7E2D8",
  borderStrong: "#D7D1C6",

  white: "#FFFFFF",
  black: "#000000",

  success: "#2E8B57",
  warning: "#E4A11B",
  error: "#D94B4B",
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },

  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  lineHeight: {
    tight: 1.05,
    heading: 1.15,
    normal: 1.6,
    relaxed: 1.8,
  },
} as const;

export const SPACING = {
  sectionY: "7rem",
  container: "1440px",
  content: "1200px",

  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "5rem",
} as const;

export const RADIUS = {
  sm: "10px",
  md: "16px",
  lg: "22px",
  xl: "28px",
  full: "999px",
} as const;

export const SHADOWS = {
  soft:
    "0 8px 30px rgba(35,54,63,0.08)",

  medium:
    "0 20px 50px rgba(35,54,63,0.12)",

  large:
    "0 30px 80px rgba(35,54,63,0.18)",

  glow:
    "0 0 40px rgba(183,150,74,0.30)",

  glass:
    "0 8px 32px rgba(31,38,135,0.12)",
} as const;

export const GLASS = {
  background: "rgba(255,255,255,0.45)",
  border: "rgba(255,255,255,0.35)",
  blur: "20px",
} as const;

export const ANIMATION = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
  hero: 1.2,
} as const;

export const Z_INDEX = {
  background: -1,
  base: 1,
  dropdown: 50,
  navbar: 100,
  overlay: 500,
  modal: 1000,
  toast: 5000,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const GRADIENTS = {
  hero:
    "linear-gradient(135deg,#23363F 0%,#2F4A56 60%,#B7964A 100%)",

  light:
    "linear-gradient(180deg,#FFFFFF,#F4F0E8)",

  gold:
    "linear-gradient(135deg,#D8BE7A,#B7964A)",

  mesh:
    "radial-gradient(circle at top left,#B7964A22,transparent 45%), radial-gradient(circle at bottom right,#23363F22,transparent 45%)",
} as const;

export const BLUR = {
  xs: "6px",
  sm: "10px",
  md: "18px",
  lg: "30px",
} as const;

export const TRANSITIONS = {
  default: "all .35s cubic-bezier(.22,.61,.36,1)",
  slow: "all .6s cubic-bezier(.22,.61,.36,1)",
} as const;