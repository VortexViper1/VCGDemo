import type { Metadata } from "next";
import GearExperience from "@/components/stages/GearExperience";

export const metadata: Metadata = {
  title: "Gear Up | VISWAS Consulting Group",
  description: "From early traction to disciplined growth.",
};

export default function GearPage() {
  return <GearExperience />;
}