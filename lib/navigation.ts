// lib/navigation.ts

import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  BriefcaseBusiness,
  Building2,
  Newspaper,
  Phone,
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
    label: "Journey",
    href: "/#journey",
    icon: Route,
  },

];

export const CTA_BUTTON = {
  label: "Let's Talk",
  href: "/#contact",
} as const;