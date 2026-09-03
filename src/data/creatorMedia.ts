// Media for content.saharali.com.
//
// Every slot below is a labelled placeholder until the real file or link is
// added. To fill one in:
//   Photos  -> drop the file in `public/content/` and set `src` to its path.
//   Reels   -> set `kind: "reel"` and `reel` to the Instagram shortcode, i.e.
//              the part after /reel/ in the permalink.
//   Uploads -> set `kind: "file"` and `src` to the video path, `poster` to a
//              still frame. Vertical (9:16) files look right in the grid.

// Falls back to the main site's card until a dedicated 1200x630 image for this
// page is added at `public/content/og.jpg`.
export const ogImagePath = "/og.jpg";
export const ogImageAlt = "Sahar Ali, Dubai-based creator, host and storyteller";

export interface Photo {
  src?: string;
  alt: string;
  label: string;
  position?: string;
}

export const heroPortrait: Photo = {
  src: "/content/sahar-hero.webp",
  alt: "Sahar Ali smiling and holding a microphone",
  label: "Hero portrait",
  position: "center 38%",
};

export const heroSupporting: Photo[] = [
  {
    src: "/content/sahar-hosting.webp",
    alt: "Sahar Ali speaking on stage in a bright pink dress",
    label: "Supporting shot 1",
    position: "center 40%",
  },
  {
    src: "/content/sahar-experience.webp",
    alt: "Sahar Ali inside an immersive light installation",
    label: "Supporting shot 2",
    position: "center 72%",
  },
];

export const introPhoto: Photo = {
  src: "/content/sahar-on-stage.webp",
  alt: "Sahar Ali addressing an audience from the stage",
  label: "Introduction photograph",
  position: "center 38%",
};

export const categories = [
  { id: "travel", label: "Travel & Experiences" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "founder", label: "Founder Life" },
  { id: "events", label: "Events & Hosting" },
];

export interface VideoItem {
  kind: "reel" | "file" | "placeholder";
  category: (typeof categories)[number]["id"];
  title: string;
  /** Instagram shortcode, for kind: "reel". */
  reel?: string;
  /** Video file path, for kind: "file". */
  src?: string;
  poster?: string;
  alt: string;
}

export const videos: VideoItem[] = [
  {
    kind: "placeholder",
    category: "travel",
    title: "Travel video slot",
    alt: "Placeholder for a travel and experiences video",
  },
  {
    kind: "placeholder",
    category: "travel",
    title: "Hotel stay slot",
    alt: "Placeholder for a hotel stay video",
  },
  {
    kind: "placeholder",
    category: "lifestyle",
    title: "Lifestyle video slot",
    alt: "Placeholder for a lifestyle video",
  },
  {
    kind: "placeholder",
    category: "founder",
    title: "Founder life slot",
    alt: "Placeholder for a founder life video",
  },
  {
    kind: "placeholder",
    category: "events",
    title: "Event hosting slot",
    alt: "Placeholder for an event hosting video",
  },
  {
    kind: "placeholder",
    category: "events",
    title: "Presenting slot",
    alt: "Placeholder for an on-camera presenting video",
  },
];
