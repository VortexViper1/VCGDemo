import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import HashScroll from "@/components/shared/HashScroll";
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
  metadataBase: new URL("https://viswaas.com"),

  title: {
    default: "Viswaas Consulting Group",
    template: "%s | Viswaas Consulting Group",
  },

  description:
    "Viswaas Consulting Group provides strategy, capital advisory, business transformation, and digital consulting services.",

  keywords: [
    "Consulting",
    "",
    "Capital Advisory",
    "Transformation",
    "Viswaas",
    "Corporate Consulting",
  ],

  authors: [
    {
      name: "Viswaas Consulting Group",
    },
  ],

  creator: "Viswaas Consulting Group",

  publisher: "Viswaas Consulting Group",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viswaas.com",
    title: "Viswaas Consulting Group",
    description:
      "Strategy • Capital • Transformation",
    siteName: "Viswaas Consulting Group",
  },

  twitter: {
    card: "summary_large_image",
    title: "Viswaas Consulting Group",
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


  <CursorGlow />



  <main className="overflow-x-hidden">
    {children}
  </main>

</body>
    </html>
  );
}