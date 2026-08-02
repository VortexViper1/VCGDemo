export interface Capability {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
}

export interface JourneyStageType {
  id: string;
  stage: string;
  headline: string;
  description: string;

  image: string;

  challenges: string[];

  services: Capability[];

  accent: string;
}

export const JOURNEY: JourneyStageType[] = [
  {
    id: "start",
    stage: "START",
    headline: "Every great business begins with conviction.",
    description:
      "Transform an idea into a structured business with strategic planning, market validation and investment readiness.",
    image: "/journey/starts.jpg",
    challenges: [
      "Business Model",
      "Validation",
      "Funding",
      "Legal Setup",
      "Market Entry",
    ],
    services: [
      {
        id: "market-research",
        title: "Market Research",
        description:
          "We map demand, competitive positioning and pricing dynamics before you commit capital. Early decisions rest on evidence, not instinct.",
        bullets: [
          "Total addressable market sizing",
          "Competitive landscape mapping",
          "Customer discovery interviews",
          "Pricing and positioning analysis",
          "Go-to-market risk assessment",
        ],
        image: "/journey/capabilities/market-research.jpg",
      },
      {
        id: "company-registration",
        title: "Company Registration",
        description:
          "From entity structure to statutory filings, we build the legal foundation your business will stand on for years to come.",
        bullets: [
          "Entity structure advisory",
          "Incorporation and statutory filings",
          "Shareholder agreement drafting",
          "Regulatory licensing support",
          "Compliance calendar setup",
        ],
        image: "/journey/capabilities/company-registration.jpg",
      },
      {
        id: "fund-raising",
        title: "Fund Raising",
        description:
          "We prepare founders for the room, from investor narrative to term sheet negotiation, so capital arrives on the right terms.",
        bullets: [
          "Investor-ready financial models",
          "Pitch narrative and materials",
          "Cap table structuring",
          "Term sheet negotiation support",
          "Investor outreach strategy",
        ],
        image: "/journey/capabilities/fund-raising.jpg",
      },
      {
        id: "business-planning",
        title: "Business Planning",
        description:
          "A disciplined plan that translates ambition into milestones, resourcing and a realistic path to profitability.",
        bullets: [
          "Strategic roadmap development",
          "Financial projections and modeling",
          "Operational milestone planning",
          "Risk and contingency mapping",
        ],
        image: "/journey/capabilities/business-planning.jpg",
      },
    ],
    accent: "#C9A35F",
  },

  {
    id: "gear",
    stage: "GEAR",
    headline: "Growth deserves structure.",
    description:
      "Prepare your organization with scalable systems, financial clarity and operational excellence.",
    image: "/journey/gear.jpg",
    challenges: ["Cash Flow", "Hiring", "Compliance", "Operations", "Processes"],
    services: [
      {
        id: "financial-advisory",
        title: "Financial Advisory",
        description:
          "We bring discipline to your numbers, building the reporting, forecasting and treasury practices that let leadership make decisions with confidence.",
        bullets: [
          "Cash flow forecasting and treasury design",
          "Management reporting frameworks",
          "Working capital optimization",
          "Financial controls and audit readiness",
          "Budgeting and variance analysis",
          "CFO-level advisory on demand",
        ],
        image: "/journey/capabilities/financial-advisory.jpg",
      },
      {
        id: "process-design",
        title: "Process Design",
        description:
          "As teams grow, informal processes break. We design operating systems that scale without adding friction.",
        bullets: [
          "End-to-end process mapping",
          "Standard operating procedures",
          "Workflow automation opportunities",
          "Cross-functional handoff design",
          "Performance and quality benchmarks",
        ],
        image: "/journey/capabilities/process-design.jpg",
      },
      {
        id: "tax-planning",
        title: "Tax Planning",
        description:
          "Proactive structuring that keeps you compliant across jurisdictions while protecting margin.",
        bullets: [
          "Corporate tax structuring",
          "Cross-border tax planning",
          "Indirect tax and compliance filings",
          "Transfer pricing strategy",
          "Tax risk and exposure review",
        ],
        image: "/journey/capabilities/tax-planning.jpg",
      },
      {
        id: "governance",
        title: "Governance",
        description:
          "We build the boardroom infrastructure, the policies, controls and reporting rhythms that earn investor and regulator trust.",
        bullets: [
          "Board charter and committee design",
          "Policy and controls framework",
          "Regulatory reporting cadence",
          "Risk management structures",
          "Stakeholder governance advisory",
        ],
        image: "/journey/capabilities/governance.jpg",
      },
    ],
    accent: "#173F38",
  },

  {
    id: "scale",
    stage: "SCALE",
    headline: "Expansion without compromise.",
    description:
      "Accelerate sustainable growth through capital strategy, transformation and technology.",
    image: "/journey/scale.jpg",
    challenges: ["Expansion", "Technology", "Leadership", "Capital", "Transformation"],
    services: [
      {
        id: "capital-advisory",
        title: "Capital Advisory",
        description:
          "We structure the capital stack that funds expansion without diluting control or straining the balance sheet.",
        bullets: [
          "Debt and equity structuring",
          "Growth capital raise strategy",
          "Investor and lender negotiations",
          "Capital allocation modeling",
          "Valuation advisory",
        ],
        image: "/journey/capabilities/capital-advisory.jpg",
      },
      {
        id: "digital-transformation",
        title: "Digital Transformation",
        description:
          "Technology should compound your advantage, not complicate it. We modernize systems around real operational needs.",
        bullets: [
          "Technology stack assessment",
          "Systems integration roadmap",
          "Data infrastructure design",
          "Automation and AI readiness",
          "Change management planning",
        ],
        image: "/journey/capabilities/digital-transformation.jpg",
      },
      {
        id: "strategy",
        title: "Strategy",
        description:
          "Clear strategic choices, tested against market reality, that align leadership around where to compete and win.",
        bullets: [
          "Market expansion strategy",
          "Competitive positioning review",
          "Portfolio and business unit strategy",
          "Scenario planning and stress testing",
        ],
        image: "/journey/capabilities/strategy.jpg",
      },
      {
        id: "growth-consulting",
        title: "Growth Consulting",
        description:
          "Hands-on advisory that turns strategic intent into measurable commercial momentum.",
        bullets: [
          "Revenue growth diagnostics",
          "Go-to-market optimization",
          "Customer retention strategy",
          "Pricing and monetization review",
          "Leadership alignment sessions",
        ],
        image: "/journey/capabilities/growth-consulting.jpg",
      },
    ],
    accent: "#C9A35F",
  },

  {
    id: "transform",
    stage: "TRANSFORM",
    headline: "Build an enduring legacy.",
    description:
      "Position your organization for long-term value creation through governance, innovation and strategic leadership.",
    image: "/journey/transform.jpg",
    challenges: ["Innovation", "Succession", "Governance", "Global Expansion", "ESG"],
    services: [
      {
        id: "board-advisory",
        title: "Board Advisory",
        description:
          "We advise boards navigating succession, complexity and scrutiny, bringing structure to the organization's most consequential decisions.",
        bullets: [
          "Board composition and succession planning",
          "Governance framework review",
          "Executive compensation advisory",
          "Stakeholder and investor relations",
          "Crisis and risk governance",
        ],
        image: "/journey/capabilities/board-advisory.jpg",
      },
      {
        id: "corporate-strategy",
        title: "Corporate Strategy",
        description:
          "Long-horizon strategy that balances legacy with reinvention, guiding capital and leadership toward durable value.",
        bullets: [
          "Long-term value creation planning",
          "M&A and portfolio strategy",
          "Organizational design review",
          "Strategic partnership development",
          "Legacy and succession alignment",
        ],
        image: "/journey/capabilities/corporate-strategy.jpg",
      },
      {
        id: "transformation",
        title: "Transformation",
        description:
          "Enterprise-wide change, sequenced and governed so innovation takes hold without destabilizing the core business.",
        bullets: [
          "Enterprise transformation roadmaps",
          "Operating model redesign",
          "ESG and sustainability integration",
          "Innovation pipeline governance",
          "Global expansion structuring",
          "Culture and change enablement",
        ],
        image: "/journey/capabilities/transformation.jpg",
      },
      {
        id: "investment-planning",
        title: "Investment Planning",
        description:
          "Disciplined capital deployment aligned to a multi-generational view of the business.",
        bullets: [
          "Long-term capital allocation strategy",
          "Legacy and wealth structuring",
          "Investment portfolio governance",
          "Succession-linked financial planning",
        ],
        image: "/journey/capabilities/investment-planning.jpg",
      },
    ],
    accent: "#173F38",
  },
];