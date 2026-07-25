"use client";

import { useInView } from "framer-motion";
import { RefObject } from "react";

export function useReveal(
  ref: RefObject<Element | null>,
) {
  return useInView(ref, {
    once: true,
  });
}