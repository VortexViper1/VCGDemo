import type { Metadata } from "next";
import ScaleExperience from "@/components/stages/ScaleExperience";

export const metadata: Metadata = {
  title: "Scale Up | VISWAS Consulting Group",
  description: "From growth engine to institution.",
};

export default function ScalePage() {
  return <ScaleExperience />;
}