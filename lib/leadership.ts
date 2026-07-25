export interface Leader {
  name: string;
  designation: string;
  image: string;
  bio: string;
}

export const LEADERSHIP: Leader[] = [
  {
    name: "Leadership Member",
    designation: "Founder & Managing Director",
    image: "/team/founder.jpg",
    bio:
      "Leading strategic consulting engagements focused on transformation, investment, and sustainable growth.",
  },
  {
    name: "Senior Partner",
    designation: "Strategy Consulting",
    image: "/team/partner-1.jpg",
    bio:
      "Advises enterprises on long-term business strategy and organizational transformation.",
  },
  {
    name: "Partner",
    designation: "Capital Advisory",
    image: "/team/partner-2.jpg",
    bio:
      "Specializes in fundraising, valuation, financial planning, and investment strategy.",
  },
];