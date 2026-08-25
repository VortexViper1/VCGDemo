/* ─────────────────────────────────────────────
   SHARED NAV DROPDOWN DATA
   Used by both the desktop Navbar (hover mega-menu) and MobileMenu
   (tap-to-expand accordion) so the two stay in sync automatically —
   edit labels/hrefs here once, both surfaces update.

   Keyed by nav item label (must match NAVIGATION labels exactly,
   case and spacing included). Any label without an entry here simply
   renders without a dropdown/accordion — that's why "Home" has none.

   "Insights" is kept in sync with the real article list from the
   Insights section component (the INSIGHTS array in Insights.tsx),
   plus a trailing "View All Insights" link back to that section.
   Update both lists together if articles are added/removed/renamed.
   ───────────────────────────────────────────── */

export type DropdownLink = { label: string; href: string };

export const NAV_DROPDOWNS: Record<string, DropdownLink[]> = {
  Roadmap: [
    { label: "Start Up", href: "/journey/start" },
    { label: "Gear Up", href: "/journey/gear" },
    { label: "Scale Up", href: "/journey/scale" },
    { label: "Transform", href: "/journey/transform" },
  ],
  Capabilities: [
    { label: "Corporate & Financial Strategy", href: "/services/business-strategy" },
    { label: "Capital Advisory", href: "/services/capital-advisory" },
    { label: "M & A Transaction Advisory", href: "/services/growth-consulting" },
    {
      label: "Governance & Regulatory Advisory",
      href: "/services/digital-transformation",
    },
  ],
  "Why Viswaas": [
    { label: "One North Star", href: "/about/north-star" },
    { label: "Strategic Intelligence", href: "/about/strategic-intelligence" },
    { label: "Global Perspective", href: "/about/global-perspective" },
    { label: "Trusted Partnership", href: "/about/trusted-partnership" },
    { label: "Execution Excellence", href: "/about/execution-excellence" },
  ],
  Insights: [
    {
      label: "Digital Transformation Beyond Technology",
      href: "/insights/digital-transformation-beyond-technology",
    },
    {
      label: "High Performance Leadership Teams",
      href: "/insights/high-performance-leadership-teams",
    },
    {
      label: "Cybersecurity & Business Strategy",
      href: "/insights/cybersecurity-business-strategy",
    },
    {
      label: "Growth in Emerging Markets",
      href: "/insights/scaling-businesses-emerging-markets",
    },
    {
      label: "Operational Excellence",
      href: "/insights/operational-excellence-process-optimization",
    },
    {
      label: "ESG Leadership & Sustainable Value",
      href: "/insights/esg-sustainable-value-creation",
    },
    // Anchors back to the Insights section on the homepage (id="insights"
    // on the <Section> in Insights.tsx). Update the path if that section
    // ever moves off the root page.
    { label: "View All Insights →", href: "/insights" },
  ],
};