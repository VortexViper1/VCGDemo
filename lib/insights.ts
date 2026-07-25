export interface Insight {
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
}

export const FEATURED_INSIGHT: Insight = {
  category: "Strategy",
  title: "The Next Decade of Business Transformation",
  description:
    "How leadership, technology, and capital are redefining enterprise success across industries.",
  date: "July 2026",
  readTime: "8 min read",
  image: "/insights/featured.jpg",
};

export const INSIGHTS: Insight[] = [
  {
    category: "Capital",
    title: "Investment Readiness in Uncertain Markets",
    description:
      "Preparing organizations for investment opportunities during market volatility.",
    date: "June 2026",
    readTime: "5 min read",
    image: "/insights/capital.jpg",
  },
  {
    category: "Leadership",
    title: "Building Organizations Ready for Change",
    description:
      "Creating agile leadership teams capable of navigating uncertainty.",
    date: "June 2026",
    readTime: "6 min read",
    image: "/insights/leadership.jpg",
  },
  {
    category: "Digital",
    title: "AI Beyond Automation",
    description:
      "How enterprises are leveraging AI for strategic transformation rather than simple efficiency gains.",
    date: "May 2026",
    readTime: "7 min read",
    image: "/insights/ai.jpg",
  },
];