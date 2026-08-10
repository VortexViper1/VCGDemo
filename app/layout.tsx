import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import HashScroll from "@/components/shared/HashScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import CursorGlow from "@/components/shared/CursorGlow";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-stats",
  display: "swap",
  weight: ["600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://VISWAASconsulting.com"),

  title: {
    default: "VISWAAS Consulting Group",
    template: "%s | VISWAAS Consulting Group",
  },

  description:
    "VISWAAS Consulting Group provides strategy, capital advisory, business transformation, and digital consulting services.",

  keywords: [
    "Consulting",
    "",
    "Capital Advisory",
    "Transformation",
    "VISWAAS",
    "Corporate Consulting",
  ],

  authors: [
    {
      name: "VISWAAS Consulting Group",
    },
  ],

  creator: "VISWAAS Consulting Group",

  publisher: "VISWAAS Consulting Group",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://VISWAASconsulting.com",
    title: "VISWAAS Consulting Group",
    description:
      "Strategy • Capital • Transformation",
    siteName: "VISWAAS Consulting Group",
  },

  twitter: {
    card: "summary_large_image",
    title: "VISWAAS Consulting Group",
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
  data-scroll-behavior="smooth"
  className={`${manrope.variable} ${playfair.variable} ${cormorant.variable}`}
>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">

  <HashScroll />

  <ScrollProgress />

  <CursorGlow />

  <Navbar />

  <main className="overflow-x-hidden">
    {children}
  </main>

  <Footer />

</body>
    </html>
  );
}