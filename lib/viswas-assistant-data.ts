// lib/viswaas-concierge-data.ts
//
// Content for the viswaas Digital Concierge. Add, remove, or rewrite
// entries here — viswaasConcierge.tsx never needs to change.
//
// `id` is displayed as the editorial index (01, 02, 03…) so keep the
// array in the order you want it numbered.

export interface ConciergeEntry {
  id: string;
  question: string;
  answer: string;
}

export const CONCIERGE_ENTRIES: ConciergeEntry[] = [
  {
    id: "01",
    question: "What does Viswaas help businesses achieve?",
    answer:
      "We work with leadership teams to navigate strategic complexity, unlock enterprise value, and build resilient foundations for long-term growth.",
  },
  {
    id: "02",
    question: "When does a business need strategic transformation?",
    answer:
      "Typically when growth has outpaced structure when decision-making has slowed, capital isn't reaching its best use, or the organization no longer matches the ambition of the strategy.",
  },
  {
    id: "03",
    question: "How do you approach a transformation engagement?",
    answer:
      "We begin with the structural realities of the business, then design a path that balances speed with discipline moving from diagnosis to execution without losing operational continuity.",
  },
  {
    id: "04",
    question: "How do you create long-term enterprise value?",
    answer:
      "By pairing rigorous strategic thinking with practical execution aligning leadership, capital, and operations around a small number of decisions that compound over time.",
  },
  {
    id: "05",
    question: "What makes Viswaas different from other advisors?",
    answer:
      "We stay in the work through execution, not just the diagnosis. Strategy and delivery sit with the same team, so recommendations are built to survive contact with the organization.",
  },
  {
    id: "06",
    question: "How can I speak with the Viswaas team?",
    answer:
      "Visit the Contact page and a member of our team will follow up to arrange a conversation about your organization's priorities.",
  },
];