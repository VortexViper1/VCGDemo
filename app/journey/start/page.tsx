import type { Metadata } from "next";
import StartExperience from "@/components/stages/StartExperience";

export const metadata: Metadata = {
  title: "Start Up | VISWAAS Consulting Group",
  description: "From idea to a credible, investable business.",
};

export default function StartPage() {
  return <StartExperience />;
}