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

export interface VideoItem {
  kind: "reel";
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
    kind: "reel", title: "Instagram reel 1", reel: "DaiRQ80NDJS",
    alt: "Play Sahar Ali's Instagram reel",
  },
  {
    kind: "reel", title: "Instagram reel 2", reel: "DZrc8rGBNSc",
    alt: "Play Sahar Ali's Instagram reel",
  },
  {
    kind: "reel", title: "Instagram reel 3", reel: "DYKEbEKsIAs",
    alt: "Play Sahar Ali's Instagram reel",
  },
  {
    kind: "reel", title: "Instagram reel 4", reel: "DMYCkgPpRV-",
    alt: "Play Sahar Ali's Instagram reel",
  },
  {
    kind: "reel", title: "Instagram reel 5", reel: "DLuoIWfo_4D",
    alt: "Play Sahar Ali's Instagram reel",
  },
  {
    kind: "reel", title: "Instagram reel 6", reel: "DK66t4SpLaX",
    alt: "Play Sahar Ali's Instagram reel",
  },
  { kind: "reel", title: "Instagram reel 7", reel: "C-sJXJLop-Q", alt: "Play Sahar Ali's Instagram reel" },
  { kind: "reel", title: "Instagram reel 8", reel: "C-moTxRozMD", alt: "Play Sahar Ali's Instagram reel" },
  { kind: "reel", title: "Instagram reel 9", reel: "C-S8GPpyWE6", alt: "Play Sahar Ali's Instagram reel" },
  { kind: "reel", title: "Instagram reel 10", reel: "C-VZwRaSYek", alt: "Play Sahar Ali's Instagram reel" },
  { kind: "reel", title: "Instagram reel 11", reel: "C-Ig2POylbH", alt: "Play Sahar Ali's Instagram reel" },
  { kind: "reel", title: "Instagram reel 12", reel: "C-F_KzAyXaN", alt: "Play Sahar Ali's Instagram reel" },
];
