import {
  Building2,
  Factory,
  HeartPulse,
  Landmark,
  Leaf,
  Plane,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

export interface Industry {
  title: string;
  description: string;
  icon: any;
}

export const INDUSTRIES: Industry[] = [
  {
    title: "Financial Services",
    description:
      "Banking, fintech, insurance, and investment organizations.",
    icon: Landmark,
  },
  {
    title: "Healthcare",
    description:
      "Hospitals, diagnostics, pharmaceuticals, and healthcare innovators.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description:
      "Operational transformation for modern industrial enterprises.",
    icon: Factory,
  },
  {
    title: "Technology",
    description:
      "Digital businesses, SaaS companies, and AI-first organizations.",
    icon: Smartphone,
  },
  {
    title: "Retail & Consumer",
    description:
      "Customer-centric growth strategies for modern retail businesses.",
    icon: ShoppingBag,
  },
  {
    title: "Infrastructure",
    description:
      "Large-scale infrastructure planning and investment advisory.",
    icon: Building2,
  },
  {
    title: "Energy",
    description:
      "Renewable energy and sustainable industrial transformation.",
    icon: Leaf,
  },
  {
    title: "Transportation",
    description:
      "Mobility, logistics, aviation, and supply chain modernization.",
    icon: Plane,
  },
];