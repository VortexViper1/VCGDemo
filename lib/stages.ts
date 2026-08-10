export interface StagePoint {
  title: string;
  description: string;
}

export interface StageContent {
  id: string;
  number: string;
  kicker: string;
  headline: string;
  intro: string;
  problems: StagePoint[];
  solutions: StagePoint[];
  tags: string[];
  outcome: string;
  accent: string;
  images: {
    primary: string;
    secondary?: string;
  };
}

export const START_CONTENT: StageContent = {
  id: "start",
  number: "01",
  kicker: "Stage One · Start Up",
  headline: "From idea to a credible, investable business.",
  intro:
    "At the start, founders do not lack ambition. They lack clarity, structure, validation and a dependable decision system. This is where a promising idea must become a real enterprise.",
  problems: [
    {
      title: "Unclear market opportunity",
      description:
        "The product may be compelling, but the customer, market size and willingness to pay remain unvalidated.",
    },
    {
      title: "Weak business model",
      description:
        "Pricing, unit economics, revenue logic and route-to-market are often based on assumptions rather than evidence.",
    },
    {
      title: "Founder dependency",
      description:
        "Everything runs through the founder, with little role clarity, governance or repeatable process.",
    },
    {
      title: "Capital readiness gaps",
      description:
        "The business may seek funding before building an investor-ready story, model, structure and data room.",
    },
  ],
  solutions: [
    {
      title: "Opportunity validation & market entry",
      description:
        "Customer research, TAM-SAM-SOM, competitor mapping, positioning and go-to-market architecture.",
    },
    {
      title: "Business model & financial strategy",
      description:
        "Revenue model, pricing architecture, unit economics, financial projections and capital requirement planning.",
    },
    {
      title: "Corporate structuring & governance",
      description:
        "Entity design, founder agreements, cap table planning, board structures and compliance foundations.",
    },
    {
      title: "Investor readiness",
      description:
        "Valuation, pitch narrative, financial model, due diligence preparation and fund-raise strategy.",
    },
  ],
  tags: [
    "Enterprise Strategy",
    "Market Research",
    "Financial Modelling",
    "Valuation",
    "Corporate Structuring",
    "Fundraising",
  ],
  outcome:
    "A validated business with a clear market, credible economics, a sound legal and governance foundation, and a compelling path to capital.",
  accent: "#B9935A",
  images: {
    primary: "/stages/whiteboard-session.jpg",
  },
};

export const GEAR_CONTENT: StageContent = {
  id: "gearup",
  number: "02",
  kicker: "Stage Two · Gear Up",
  headline: "From early traction to disciplined growth.",
  intro:
    "Growth creates energy, and disorder. Revenue begins to rise, but systems, people, working capital and management discipline often fail to keep pace.",
  problems: [
    {
      title: "Growth without control",
      description:
        "Sales increase while margins, cash conversion, receivables and operational discipline weaken.",
    },
    {
      title: "Fragmented operations",
      description:
        "Processes remain informal, duplicated or person-dependent, limiting execution speed and accountability.",
    },
    {
      title: "Limited growth visibility",
      description:
        "Leadership lacks dashboards, forecasts and reliable management information for informed decisions.",
    },
    {
      title: "Brand and market inconsistency",
      description:
        "The business struggles to sharpen its positioning, customer proposition and repeatable acquisition engine.",
    },
  ],
  solutions: [
    {
      title: "Growth strategy & commercial acceleration",
      description:
        "Segment prioritisation, channel strategy, pricing, sales architecture, customer acquisition and retention design.",
    },
    {
      title: "Operating model & process redesign",
      description: "Organisation design, SOPs, decision rights, KPI systems and performance management.",
    },
    {
      title: "Cash flow & working capital optimisation",
      description:
        "Forecasting, receivables strategy, inventory discipline, lender readiness and financing structures.",
    },
    {
      title: "Brand, digital and customer experience",
      description:
        "Brand strategy, digital growth, performance marketing, customer journey and conversion architecture.",
    },
  ],
  tags: ["Growth Strategy", "Pricing", "Operations", "Working Capital", "Digital Growth", "Performance Management"],
  outcome:
    "A business that grows with stronger margins, clearer accountability, better cash visibility and an operating engine that can support the next level.",
  accent: "#0B4147",
  images: {
    primary: "/stages/systems-review.jpg",
  },
};

export const SCALE_CONTENT: StageContent = {
  id: "scaleup",
  number: "03",
  kicker: "Stage Three · Scale Up",
  headline: "From growth engine to institution.",
  intro:
    "At scale, complexity becomes the principal risk. Businesses must institutionalise governance, capital allocation, risk management and leadership while pursuing larger markets and transactions.",
  problems: [
    {
      title: "Complex capital requirements",
      description:
        "Expansion, acquisitions, manufacturing or infrastructure needs demand more sophisticated financing choices.",
    },
    {
      title: "Governance under strain",
      description:
        "Board effectiveness, controls, compliance and stakeholder expectations intensify as the enterprise grows.",
    },
    {
      title: "Portfolio and expansion decisions",
      description: "Leadership must decide where to invest, exit, partner, acquire or build new capabilities.",
    },
    {
      title: "Transformation execution risk",
      description:
        "Large programmes fail without a clear transformation office, milestones, ownership and benefit tracking.",
    },
  ],
  solutions: [
    {
      title: "Capital raising & transaction advisory",
      description:
        "Debt and equity strategy, investor outreach, transaction structuring, valuation and negotiation support.",
    },
    {
      title: "M&A, due diligence & integration",
      description:
        "Target assessment, commercial and financial diligence, deal structuring, synergy planning and PMI.",
    },
    {
      title: "Governance, risk & IPO readiness",
      description:
        "Board architecture, controls, reporting, ESG, compliance maturity and capital-market preparation.",
    },
    {
      title: "Transformation office",
      description:
        "Programme governance, execution cadence, KPI tracking, cross-functional alignment and value realisation.",
    },
  ],
  tags: ["Capital Raising", "M&A Advisory", "Due Diligence", "IPO Readiness", "ESG", "Transformation Office"],
  outcome:
    "A scalable institution with disciplined capital allocation, strong governance, transaction capability and the execution infrastructure to transform without losing control.",
  accent: "#B9935A",
  images: {
    primary: "/stages/boardroom.jpg",
  },
};

export const TRANSFORM_CONTENT: StageContent = {
  id: "mature",
  number: "04",
  kicker: "Stage Four · Mature & Transform",
  headline: "From established success to renewed relevance.",
  intro:
    "Mature businesses do not fail only because they decline. They fail when they stop renewing. The next challenge is reinvention: protecting the core while creating the future.",
  problems: [
    {
      title: "Stagnating growth",
      description: "Legacy products, saturated markets and slower decision cycles constrain revenue and profitability.",
    },
    {
      title: "Portfolio drag",
      description:
        "Capital remains tied to underperforming businesses, assets or channels with limited strategic relevance.",
    },
    {
      title: "Digital and organisational inertia",
      description:
        "Technology, culture and operating models lag behind changing customer and competitive expectations.",
    },
    {
      title: "Succession and legacy risk",
      description:
        "Leadership transition, family governance and ownership alignment become central to continuity and value preservation.",
    },
    {
      title: "Capital & Market Valuation",
      description:
        "Capital structures, investor expectations and market perceptions create pressure on valuation, liquidity and long-term value.",
    },
  ],
  solutions: [
    {
      title: "Enterprise and portfolio strategy",
      description:
        "Strategic review, portfolio optimisation, capital reallocation, diversification and adjacent growth.",
    },
    {
      title: "Business transformation & turnaround",
      description: "Cost transformation, operating-model reset, digital enablement and profit improvement.",
    },
    {
      title: "Restructuring, divestiture & succession",
      description: "Ownership restructuring, demerger, divestiture, family governance and succession planning.",
    },
    {
      title: "Long term value and institutional legacy",
      description: "ESG strategy, stakeholder architecture, governance renewal and Long term value creation systems.",
    },
{
  title: "IPO Readiness",
  description:
    "Legacy brand establishment, governance and institutional readiness create the foundation for market validation and long-term value creation.",
},
  ],
  tags: ["Corporate Strategy", "Portfolio Review", "Turnaround", "Restructuring", "Succession", "Institutional Governance"],
  outcome:
    "A renewed enterprise that protects its core economics, reallocates capital with purpose, modernises its operating model and remains relevant across generations.",
  accent: "#B9935A",
  images: {
    primary: "/stages/legacy-archive.jpg",
  },
};

export const STAGE_CONTENT: StageContent[] = [START_CONTENT, GEAR_CONTENT, SCALE_CONTENT, TRANSFORM_CONTENT];