import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function initializeGSAP() {
  if (typeof window === "undefined") return;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export { gsap, ScrollTrigger };

export const refreshScrollTrigger = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
};

export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) =>
    trigger.kill()
  );
};