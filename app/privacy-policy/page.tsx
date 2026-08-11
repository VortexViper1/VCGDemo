import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { PRIVACY_POLICY } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Viswaas Consulting Group collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument content={PRIVACY_POLICY} />;
}