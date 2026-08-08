import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { TERMS_OF_USE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the VISWAS Consulting Group website.",
};

export default function TermsOfUsePage() {
  return <LegalDocument content={TERMS_OF_USE} />;
}