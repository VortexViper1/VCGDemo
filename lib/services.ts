import {
  ArrowRightLeft,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Globe2,
  Handshake,
  Landmark,
  LineChart,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: any;
  href: string;
}

export const SERVICES: Service[] = [
  {
    title: "Business ",
    description:
      "Define Long term strategies that create sustainable competitive advantage and measurable business growth.",
    icon: TrendingUp,
    href: "/services/strategy",
  },
  {
    title: "Capital Advisory",
    description:
      "Investment planning, fundraising support, financial structuring, and strategic capital allocation.",
    icon: Landmark,
    href: "/services/capital",
  },
  {
    title: "Governance, Compliance & Regulatory Advisory",
    description:
      "Modernize operations using AI, automation, cloud technologies, and enterprise digital solutions.",
    icon: Globe2,
    href: "/services/digital",
  },
  {
    title: "Operational Excellence",
    description:
      "Improve productivity, optimize workflows, and streamline enterprise operations.",
    icon: ChartNoAxesCombined,
    href: "/services/operations",
  },
  {
    title: "Corporate Finance",
    description:
      "Financial analysis, valuation, restructuring, and transaction advisory for growing organizations.",
    icon: BarChart3,
    href: "/services/finance",
  },
  {
    title: "Risk & Compliance",
    description:
      "Strengthen governance, enterprise risk management, and regulatory compliance.",
    icon: ShieldCheck,
    href: "/services/risk",
  },
  {
    title: "Mergers & Acquisitions",
    description:
      "End-to-end support across acquisitions, mergers, due diligence, and integration.",
    icon: ArrowRightLeft,
    href: "/services/ma",
  },
  {
    title: "Leadership Consulting",
    description:
      "Executive coaching, organizational transformation, and leadership development.",
    icon: BriefcaseBusiness,
    href: "/services/leadership",
  },
];