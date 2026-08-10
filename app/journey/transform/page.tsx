import type { Metadata } from "next";
import TransformExperience from "@/components/stages/TransformExperience";

export const metadata: Metadata = {
  title: "Mature & Transform | VISWAAS Consulting Group",
  description: "From established success to renewed relevance.",
};

export default function TransformPage() {
  return <TransformExperience />;
}