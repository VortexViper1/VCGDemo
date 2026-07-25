import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import CursorGlow from "@/components/shared/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viswasconsulting.com"),

  title: {
    default: "VISWAS Consulting Group",
    template: "%s | VISWAS Consulting Group",
  },

  description:
    "VISWAS Consulting Group provides strategy, capital advisory, business transformation, and digital consulting services.",

  keywords: [
    "Consulting",
    "Business Strategy",
    "Capital Advisory",
    "Transformation",
    "VISWAS",
    "Corporate Consulting",
  ],

  authors: [
    {
      name: "VISWAS Consulting Group",
    },
  ],

  creator: "VISWAS Consulting Group",

  publisher: "VISWAS Consulting Group",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viswasconsulting.com",
    title: "VISWAS Consulting Group",
    description:
      "Strategy • Capital • Transformation",
    siteName: "VISWAS Consulting Group",
  },

  twitter: {
    card: "summary_large_image",
    title: "VISWAS Consulting Group",
    description:
      "Strategy • Capital • Transformation",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ScrollProgress />

        <CursorGlow />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}