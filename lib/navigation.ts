// lib/navigation.ts

import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  Building2,
  Newspaper,
  Phone,
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
    label: "About",
    href: "/#about",
    icon: Users,
  },
  {
    label: "Services",
    href: "/#services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Why Viswas",
    href: "/#why-viswas",
    icon: Building2,
  },
  {
    label: "Insights",
    href: "/#insights",
    icon: Newspaper,
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: Phone,
  },
];

export const CTA_BUTTON = {
  label: "Let's Talk",
  href: "/#contact",
} as const;