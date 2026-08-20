export type WorkItem = {
  num: string;
  slug: string;
  title: string;
  tag: string;
  desc: string;
  href?: string;
};

export const work: WorkItem[] = [
  {
    num: "01",
    slug: "nuur-ai",
    title: "Nuur AI: from zero to 300,000 users",
    tag: "AI · Growth",
    desc: "Building the product was only the beginning. The harder bit was deciding what deserved to be built as real users arrived and an early-stage AI product had to grow up quickly.",
    href: "/portfolio#nuur-ai",
  },
  {
    num: "02",
    slug: "clinical-registries",
    title: "Clinical registries: complexity without the chaos",
    tag: "Health-tech",
    desc: "Healthcare products don't get to choose between flexibility and control. This is how I managed product across registry platforms used in multiple regions without turning every request into a bespoke product.",
    href: "/portfolio#clinical-registries",
  },
  {
    num: "03",
    slug: "fyn",
    title: "Fyn: building an AI concierge in public",
    tag: "AI · Founder",
    desc: "Fyn started with a simple irritation: getting a small service sorted takes far too much work. I built the product to remove that admin, then changed it as real use showed where the original idea was right, and where it absolutely wasn't.",
    href: "/portfolio#fyn",
  },
  {
    num: "04",
    slug: "aeromedical-app",
    title: "Award-winning aeromedical app",
    tag: "Delivery",
    desc: "Real-time air-resource coordination for rapid patient transport. When 'time-critical' means lives, delivery discipline matters.",
  },
  {
    num: "05",
    slug: "adapt-to-ai",
    title: "Helped teams adapt to AI",
    tag: "AI · Teams",
    desc: "I helped teams put AI to productive use in startups, large corporations, and small businesses: Jira MCPs, coding agents, and the working habits that actually stick.",
  },
  {
    num: "06",
    slug: "enterprise-data",
    title: "Enterprise data & BI, from eBay to the RTA",
    tag: "Data",
    desc: "ETL pipelines, MicroStrategy migrations and BI reporting that turned raw client data into decision-ready analytics, including managing COVID analytics for the Irish health services, used by the Ministry of Health to drive national decisions.",
  },
];
