// lib/navigation.ts

import type { LucideIcon } from "lucide-react";
import {
  Home,
  BriefcaseBusiness,
  Building2,
  Newspaper,
  Route,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAVIGATION: NavigationItem[] = [
  {
    label: "Home",
    href: "/#home",
    icon: Home,
  },
  {
    label: "Roadmap",
    href: "/#journey",
    icon: Route,
  },
  {
    label: "Capabilities",
    href: "/#services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Why VISWAAS",
    href: "/#why-VISWAAS",
    icon: Building2,
  },
  {
    label: "Insights",
    href: "/#insights",
    icon: Newspaper,
  },
];

export const CTA_BUTTON = {
  label: "Let's Talk",
  href: "/#contact",
} as const;