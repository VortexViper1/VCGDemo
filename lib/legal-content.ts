export interface LegalSection {
  id: string;
  heading: string;
  body: string[]; // paragraphs
  list?: string[]; // optional bullet list rendered after the paragraphs
}

export interface LegalDocumentContent {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocumentContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  updated: "Last updated 8 August 2026",
  intro:
    "This policy explains what information Viswaas Consulting Group collects when you visit this website or engage us for advisory services, why we collect it, and the choices available to you.",
  sections: [
    {
      id: "information-we-collect",
      heading: "Information we collect",
      body: [
        "We collect information you give us directly — for example, your name, company, role, email address, and phone number when you submit an enquiry, request a proposal, or subscribe to our insights.",
        "We also collect information automatically when you use this website, including your IP address, browser and device type, pages visited, referring URL, and the time and duration of your visit.",
      ],
      list: [
        "Contact details you provide through forms or email",
        "Company and engagement details shared during a consultation",
        "Usage data collected through cookies and similar technologies",
        "Information you choose to include in a CV or enquiry when applying to work with us",
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How we use information",
      body: [
        "We use the information we collect to respond to enquiries, prepare proposals, deliver advisory engagements, and maintain our relationship with clients and prospective clients.",
        "We also use aggregated, non-identifying usage data to understand how the website is used and to improve its content, structure, and performance over time.",
      ],
      list: [
        "Responding to enquiries and scheduling consultations",
        "Preparing and delivering client engagements",
        "Sending insights or updates you have opted in to receive",
        "Monitoring and improving website performance and security",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and similar technologies",
      body: [
        "This website uses a limited number of cookies to keep the site working correctly and to understand how visitors use it. Essential cookies are required for core functionality and cannot be switched off in our systems.",
        "You can control or disable non-essential cookies through your browser settings. Disabling cookies may affect how parts of the site behave.",
      ],
    },
    {
      id: "sharing",
      heading: "How we share information",
      body: [
        "We do not sell personal information. We share information only with service providers who help us operate this website and deliver our services — such as hosting, analytics, and email providers — under obligations to protect it.",
        "We may disclose information where required by law, to protect our legal rights, or in connection with a merger, acquisition, or sale of assets, in which case we will take reasonable steps to ensure the same level of protection continues to apply.",
      ],
    },
    {
      id: "retention",
      heading: "Data retention",
      body: [
        "We retain personal information for as long as necessary to fulfil the purposes described in this policy, including maintaining business records for legal, accounting, and reporting requirements. Engagement-related records are retained in line with our professional and contractual obligations.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights and choices",
      body: [
        "Depending on where you are located, you may have the right to access, correct, or delete your personal information, object to or restrict certain processing, or request a copy of your data in a portable format.",
        "To exercise any of these rights, contact us using the details at the end of this policy. We will respond within a reasonable timeframe and in accordance with applicable law.",
      ],
    },
    {
      id: "security",
      heading: "Data security",
      body: [
        "We use reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorised access, loss, misuse, or alteration. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      id: "children",
      heading: "Children's privacy",
      body: [
        "This website and our services are directed at businesses and professionals. We do not knowingly collect personal information from children, and any such information discovered will be deleted promptly.",
      ],
    },
    {
      id: "international-transfers",
      heading: "International data transfers",
      body: [
        "As a firm operating across multiple markets, information we collect may be transferred to, stored, and processed in countries other than your own. Where required, we put appropriate safeguards in place to protect information transferred internationally.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "We may update this policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The 'last updated' date at the top of this page indicates when it was last revised. Material changes will be communicated through this website.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      body: [
        "If you have questions about this policy or how your information is handled, contact us at privacy@viswaasconsulting.com or write to our registered office address, available on request.",
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocumentContent = {
  eyebrow: "Legal",
  title: "Terms of Use",
  updated: "Last updated 8 August 2026",
  intro:
    "These terms govern your use of this website. By accessing or using the site, you agree to be bound by them. If you do not agree, please do not use this website.",
  sections: [
    {
      id: "acceptance",
      heading: "Acceptance of terms",
      body: [
        "These Terms of Use, together with our Privacy Policy, form the agreement between you and Viswaas Consulting Group governing your access to and use of this website. We may revise these terms at any time by updating this page, and continued use of the site constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: "use-of-site",
      heading: "Use of this website",
      body: [
        "This website and its content are provided for general informational purposes about Viswaas Consulting Group and our services. You may view, download, and print content from this site for personal, non-commercial reference, provided you retain all copyright and proprietary notices.",
      ],
      list: [
        "You will not use the site for any unlawful purpose or in a way that could damage, disable, or impair it",
        "You will not attempt to gain unauthorised access to any part of the site or its systems",
        "You will not reproduce, distribute, or republish content from this site without our prior written consent",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      body: [
        "All content on this website — including text, graphics, logos, frameworks, and methodologies — is the property of Viswaas Consulting Group or its licensors and is protected by applicable intellectual property laws. Nothing on this site grants you any licence or right to use our trademarks or proprietary materials without prior written permission.",
      ],
    },
    {
      id: "no-advice",
      heading: "No professional advice",
      body: [
        "Content published on this website, including insights, articles, and commentary, is provided for general informational purposes only and does not constitute strategic, financial, legal, tax, or investment advice. Any advisory relationship is established only through a signed engagement letter with Viswaas Consulting Group, and the terms of that engagement will govern the services provided.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      body: [
        "This website may contain links to third-party websites for your convenience. We do not control and are not responsible for the content, accuracy, or practices of any third-party site, and inclusion of a link does not imply endorsement.",
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers and limitation of liability",
      body: [
        "This website is provided on an 'as is' and 'as available' basis without warranties of any kind, whether express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.",
        "To the fullest extent permitted by law, Viswaas Consulting Group will not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this website.",
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      body: [
        "You agree to indemnify and hold Viswaas Consulting Group, its partners, and employees harmless from any claims, damages, or expenses arising from your misuse of this website or violation of these terms.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      body: [
        "These terms are governed by the laws applicable in the jurisdiction in which Viswaas Consulting Group is registered, without regard to conflict-of-law principles. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        "We may suspend or restrict your access to this website at any time, without notice, for conduct that we believe violates these terms or is otherwise harmful to other users, us, or third parties.",
      ],
    },
    {
      id: "changes-to-terms",
      heading: "Changes to these terms",
      body: [
        "We may update these Terms of Use periodically to reflect changes in our practices or for legal and regulatory reasons. The 'last updated' date at the top of this page reflects the most recent revision.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      body: [
        "Questions about these terms can be directed to legal@viswaasconsulting.com or to our registered office address, available on request.",
      ],
    },
  ],
};