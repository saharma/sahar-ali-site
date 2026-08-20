import { fynUrl } from "./links";

export type GlanceItem = { label: string; value: string; href?: string };

export type CaseSection = {
  heading: string;
  outcome?: string;
  paragraphs?: string[];
  list?: string[];
  steps?: string;
  paragraphsAfter?: string[];
};

export type CaseStudy = {
  slug: string;
  num: string;
  kicker: string;
  listingTitle: string;
  title: string;
  lede: string[];
  summary: string;
  tags: string;
  liveUrl?: string;
  liveLabel?: string;
  glance: GlanceItem[];
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nuur-ai",
    num: "01",
    kicker: "Nuur AI",
    listingTitle: "Nuur AI: from zero to 300,000 users",
    title: "From zero to 300,000 users.",
    lede: [
      "Launching an AI product from scratch is fun. Then people actually start using it.",
      "I owned product as Nuur went from an idea to a live consumer AI product and scaled to 300,000 users, making the calls on what to build, what to ignore and how the product needed to change as real market demand replaced our assumptions.",
    ],
    summary:
      "Building the product was only the beginning. The harder bit was deciding what deserved to be built as real users arrived, demand changed and an early-stage AI product had to grow up quickly.",
    tags: "0→1 · AI · Product Strategy · Growth · B2C",
    glance: [
      { label: "Role", value: "Head of Product / Product lead" },
      { label: "Product", value: "Consumer AI product" },
      { label: "Stage", value: "0→1 through growth" },
      {
        label: "Ownership",
        value: "Product strategy, roadmap, prioritisation, requirements, delivery and iteration",
      },
      { label: "Headline result", value: "0 → 300,000 users" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Early-stage products have no shortage of ideas. The problem is working out which ones are actually a product.",
          "We were building in a fast-moving AI market where user expectations were changing almost as quickly as the technology. There was pressure to move fast, but shipping everything people asked for would have created a very busy roadmap and a very confused product.",
          "My job was to keep the team focused on the user problem, turn demand into decisions and make sure speed didn't become an excuse for chaos.",
        ],
      },
      {
        heading: "Finding the signal",
        paragraphs: [
          "At the beginning, assumptions are cheap. Real behaviour is better.",
          "I used a mix of direct user feedback, market signals, product usage and the questions and friction showing up around the product to understand what people actually valued.",
          "The important part wasn't collecting feedback. It was separating three very different things:",
        ],
        list: [
          "what users said they wanted;",
          "what their behaviour suggested they needed; and",
          "what was worth building as a scalable product.",
        ],
        paragraphsAfter: ["Those aren't always the same thing."],
      },
      {
        heading: "Turning demand into a roadmap",
        paragraphs: [
          "A growing user base creates a dangerous illusion that everything is urgent.",
          "I prioritised around the product's core value, evidence of demand, expected impact, delivery effort and what we needed to learn next. Features weren't promoted because somebody asked loudly enough. They needed a reason to exist.",
          "That meant saying no, cutting scope and sometimes shipping a smaller version first so we could learn before committing more engineering time.",
        ],
      },
      {
        heading: "Making it buildable",
        paragraphs: [
          "Once we knew what deserved to exist, I turned the fuzzy version into something the team could actually build.",
          "That meant defining the user need, expected behaviour, edge cases and acceptance criteria clearly enough that engineering could challenge the solution rather than guess the problem.",
          "I stayed close to delivery, clarified requirements quickly and adjusted when technical reality gave us better information. The point wasn't to hand developers a perfect document. It was to maintain a shared understanding all the way to release.",
        ],
      },
      {
        heading: "Ship. Watch. Change it.",
        paragraphs: [
          "Launch wasn't a finish line. It was new information.",
          "As usage grew, we used what users did after release to decide what needed improving, simplifying or deprioritising. The roadmap moved with evidence rather than being protected because somebody had once put it on a slide.",
        ],
      },
      {
        heading: "The result",
        outcome: "0 → 300,000 users",
        paragraphs: [
          "The product grew from concept to a consumer platform used at scale. More importantly, the product process grew with it: from early assumptions and fast experimentation to increasingly evidence-led prioritisation as the user base expanded.",
        ],
      },
      {
        heading: "What this project taught me",
        paragraphs: [
          "Speed and product discipline aren't opposites. In an early-stage company, the discipline is what lets you move quickly without spending six months building yourself into a corner.",
          "The biggest shift is knowing when to stop treating an idea as precious. Once users arrive, their behaviour gets a vote.",
        ],
      },
    ],
  },
  {
    slug: "clinical-registries",
    num: "02",
    kicker: "Clinical Registry Platforms",
    listingTitle: "Clinical registries: complexity without the chaos",
    title: "Complex healthcare products, without making the complexity everyone else's problem.",
    lede: [
      "Clinical software has a lot of people to keep happy: clinicians, registry teams, clients, administrators, analysts, developers, governance teams and, ultimately, patients.",
      "I led product across a portfolio of clinical registry products deployed across Ireland and international markets, translating different clinical and operational needs into software that could remain controlled, supportable and useful.",
    ],
    summary:
      "Healthcare products don't get to choose between flexibility and control. Clients need different workflows, clinicians need software that makes sense, and the data still has to be trustworthy. This is how I managed product across clinical registry platforms used in multiple regions without turning every new requirement into a bespoke product.",
    tags: "Health-tech · B2B · Enterprise · Platform · Data",
    glance: [
      { label: "Role", value: "Product Owner" },
      { label: "Portfolio", value: "20+ clinical registries across multiple regions" },
      { label: "Users", value: "Clinical, administrative, registry and client teams" },
      { label: "Environment", value: "Regulated, data-heavy, multi-client healthcare" },
      {
        label: "Ownership",
        value:
          "Discovery, requirements, backlog, delivery, releases, client alignment and product evolution",
      },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "In registry software, 'the client needs one small change' is rarely one small change.",
          "Different programmes collect different data, run different workflows and operate under different governance requirements. If every request becomes bespoke functionality, the platform becomes harder to maintain with every client you win.",
          "The product problem was balancing configuration with consistency: giving registries what they genuinely needed without quietly building twenty separate products.",
        ],
      },
      {
        heading: "Understanding the real workflow",
        paragraphs: [
          "Healthcare requirements often arrive in the language of the current process: a form, a spreadsheet, a field somebody has always collected.",
          "I worked with clients and internal teams to get underneath the requested feature and understand the actual workflow, user, data requirement and consequence of getting it wrong.",
          "That distinction matters. Rebuilding a bad manual process in software just gives you a faster bad process.",
        ],
      },
      {
        heading: "From client request to product requirement",
        paragraphs: [
          "A big part of my role was translation.",
          "Clients knew the clinical or operational problem. Developers knew the system. I sat between them and turned the requirement into something both sides could interrogate.",
          "For each change, that meant getting clear on:",
        ],
        list: [
          "who needs it and why;",
          "what data is captured or changed;",
          "what the user should be able to do;",
          "what happens in the awkward cases;",
          "what is configurable versus product-wide;",
          "what existing behaviour could be affected; and",
          "what 'done' actually means.",
        ],
      },
      {
        heading: "One platform, different realities",
        paragraphs: [
          "The strongest product decisions weren't usually about adding another feature. They were about finding the reusable pattern underneath several requests.",
          "Where possible, I pushed the product toward configurable building blocks rather than client-specific branches. That let different registries behave differently while keeping the underlying product coherent.",
          "It also meant being comfortable telling a client that the solution they asked for wasn't necessarily the solution we should build.",
        ],
      },
      {
        heading: "Delivery where details matter",
        paragraphs: [
          "In regulated healthcare, 'we'll fix it after launch' has limits.",
          "I owned the path from backlog through release: requirements, sprint planning, clarification, dependencies, QA, UAT, stakeholder rollout and post-release adoption.",
          "I also worked across support, service desk, sales and client teams, because a feature isn't successfully delivered if engineering shipped it but nobody knows how to use, support or explain it.",
        ],
      },
      {
        heading: "The result",
        outcome: "20+ registries   ✦   4 regions",
        paragraphs: [
          "The portfolio supported clinical data products across Ireland, the EU, UK and US, including systems used in national healthcare environments.",
          "The work reinforced the thing I now bring to almost every complex product: don't solve each request independently. Find the model underneath them.",
        ],
      },
      {
        heading: "What this project taught me",
        paragraphs: [
          "Enterprise product management is largely the art of respecting complexity without surrendering to it.",
          "The client can be right about the problem and wrong about the feature. Engineering can be right about the technical constraint and still need to understand the business consequence. Good product work gets both into the same room, even when the room is metaphorical.",
        ],
      },
    ],
  },
  {
    slug: "fyn",
    num: "03",
    kicker: "Fyn",
    listingTitle: "Fyn: building an AI concierge in public",
    title: "Less searching. Less messaging. Just get it sorted.",
    lede: [
      "I have a problem with how much work it takes to get simple things done.",
      "Need a birthday cake? Find businesses, check whether they can make exactly what you want, message several of them, explain yourself repeatedly, wait, compare replies and somehow remember who said what.",
      "And that's for a cake.",
      "Fyn is my attempt to remove that admin: tell it what you need, let it find suitable options, contact providers and bring the useful answers back.",
    ],
    summary:
      "Fyn started with a simple irritation: getting a small service sorted takes far too much work. Search, message, wait, compare, repeat. I built the product to remove that admin, then changed it as real use showed me where the original idea was right, and where it absolutely wasn't.",
    tags: "0→1 · AI · Founder · Automation · Consumer",
    liveUrl: fynUrl,
    liveLabel: "fynhq.co",
    glance: [
      { label: "Role", value: "Founder / Product" },
      { label: "Product", value: "AI-powered local-services concierge" },
      { label: "Live site", value: "fynhq.co", href: fynUrl },
      { label: "Stage", value: "Live, early-stage and evolving" },
      {
        label: "Ownership",
        value: "Problem discovery, product strategy, UX, AI workflows, automation, build and iteration",
      },
      {
        label: "Approach",
        value: "Build quickly, put it in front of people, learn from what they actually do",
      },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Finding small businesses isn't really the problem anymore. Instagram, Google and directories are full of them.",
          "The work starts after you find them.",
          "Availability isn't clear. Services aren't standardised. Pricing often needs a conversation. Your request might be completely normal but not something that fits neatly into an 'add to cart' flow.",
          "The opportunity wasn't another directory. It was reducing the coordination.",
        ],
      },
      {
        heading: "The first idea wasn't the final product",
        paragraphs: [
          "Fyn has changed as I've built it, which is exactly what I wanted.",
          "Instead of protecting the first concept, I've treated the live product as a way to test where people actually need help. Some ideas survived. Others got removed when they added choice without reducing effort.",
          "That has affected navigation, discovery, service categories, chat flows and how much of the provider-contact process should happen automatically.",
        ],
      },
      {
        heading: "Designing around a job, not a feature",
        paragraphs: ["The core job is simple:"],
        steps: "I NEED SOMETHING  →  TELL FYN  →  FYN DOES THE LEGWORK  →  I GET USEFUL OPTIONS",
        paragraphsAfter: [
          "That became the filter for product decisions.",
          "If a feature made the user organise more, browse more or understand more of Fyn's internal process, it needed a very good reason to exist.",
        ],
      },
      {
        heading: "The AI has a job to do",
        paragraphs: [
          "I didn't want to add a chatbot because every product apparently needs a chatbot now.",
          "The AI sits inside an actual workflow. It needs to understand what the user wants, identify suitable providers, communicate the request, interpret responses and return something useful enough for the user to act on.",
          "I've built the workflow around automation with deliberate human approval points while the product is still learning. The aim is useful autonomy, not impressive-looking autonomy.",
        ],
      },
      {
        heading: "Building it changes how I manage it",
        paragraphs: [
          "Fyn is also where my product and technical work meet most directly.",
          "I can move from user problem to product decision to implementation without throwing the idea over a wall. I work hands-on with AI coding tools, the database, workflows and integrations, which means technical constraints enter the product conversation early rather than arriving as a surprise at the end.",
          "That doesn't remove the need for product discipline. It makes bad prioritisation even more dangerous because AI makes it very easy to build things you never needed.",
        ],
      },
      {
        heading: "What I'm learning",
        paragraphs: [
          "The biggest lesson so far is that convenience is a product feature.",
          "People don't necessarily need more providers, more filters or more discovery. Sometimes the better product is the one that asks fewer questions and does more of the annoying bit for them.",
          "Fyn is live, so this case study isn't finished. That's the point.",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "The next stage is about learning where automation genuinely improves the experience, where users still want control and how the model works when the provider side grows.",
          "I'll keep updating this case study as the answers change.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
