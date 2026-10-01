import type { StaticImageData } from "next/image";

import portrait from "@/assets/images/konrad-portrait.jpg";
import historyOfDecay from "@/assets/images/the-history-of-decay-collapse.jpg";
import mineValley from "@/assets/images/red-pine-mushroom-mine-valley.jpg";
import enki from "@/assets/images/red-pine-mushroom-enki.jpg";
import vagrant from "@/assets/images/red-pine-mushroom-vagrant.jpg";
import studio from "@/assets/images/recording-studio.jpg";
import foggyLake from "@/assets/images/photo-foggy-lake.jpg";
import liveGuitar from "@/assets/images/photo-live-guitar.jpg";
import forestPath from "@/assets/images/photo-forest-path.jpg";
import clockTower from "@/assets/images/photo-clock-tower.jpg";
import abandonedBuilding from "@/assets/images/photo-abandoned-building.jpg";
import oldLetters from "@/assets/images/photo-old-letters.jpg";
import dunes from "@/assets/images/photo-dunes.jpg";

export type Release = {
  id: string;
  artist: string;
  title: string;
  description: string;
  cover: StaticImageData;
  /** Streaming / shop link. Leave undefined to hide the "Listen" link. */
  listenUrl?: string;
};

export type Photo = {
  id: string;
  src: StaticImageData;
  alt: string;
  /** Short caption shown on hover, e.g. place and year ("Tilburg, 2024"). Leave undefined for none. */
  caption?: string;
};

export const site = {
  name: "Konrad Kislo",
  tagline: ["Music", "Recordings", "Photography"],
  description:
    "Konrad Kislo — musician, producer and photographer based in Tilburg (NL), with roots in Głogów (PL). Drummer in Red Pine Mushroom, recording engineer and photographer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Search engines are kept out until launch (noindex + robots.txt disallow).
   * Set NEXT_PUBLIC_ALLOW_INDEXING=true in the production environment to go public.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  heroImage: forestPath,
} as const;

export const navigation = [
  { label: "Bio", href: "/#bio" },
  { label: "Music", href: "/#music" },
  { label: "Recordings", href: "/#recordings" },
  { label: "Photography", href: "/#photography" },
  { label: "Contact", href: "/#contact" },
] as const;

export const bio = {
  portrait,
  portraitAlt: "Konrad Kislo standing in front of an old stone wall",
  paragraphs: [
    "I’m Konrad, a musician, producer and photographer based in Tilburg, with roots in Głogów, Poland.",
    "As the drummer in Red Pine Mushroom, I explore heavy grooves, psychedelic textures and the wide-open spaces of post-rock. My own music follows that same curiosity, moving between instruments, electronic sounds and experiments with recording.",
    "Through sound and photography, I’m drawn to atmosphere — the way a song fills a room, a landscape holds your attention, or a fleeting moment stays with you.",
  ],
};

export const featuredRelease: Release = {
  id: "the-history-of-decay-collapse",
  artist: "The History of Decay",
  title: "Collapse",
  description: "First own album. Psychedelic, post-metal with only drums and synths.",
  cover: historyOfDecay,
  // TODO: replace with the real Bandcamp / Spotify link
  listenUrl: "#",
};

export const bandReleases: Release[] = [
  {
    id: "red-pine-mushroom-mine-valley",
    artist: "Red Pine Mushroom",
    title: "Mine Valley",
    description:
      "Mine Valley is a raw, post-rock expedition into the depths of the Ore Mine – to a place where daylight does not reach and sound bounces off the rock walls.",
    cover: mineValley,
    listenUrl: "https://redpinemushroom.bandcamp.com/album/mine-valley",
  },
  {
    id: "red-pine-mushroom-enki",
    artist: "Red Pine Mushroom",
    title: "Enki",
    description:
      "Progressive, desert rock album inspired by the myths of Enki’s salty underwater waters.",
    cover: enki,
    listenUrl: "https://redpinemushroom.bandcamp.com/album/enki",
  },
  {
    id: "red-pine-mushroom-vagrant",
    artist: "Red Pine Mushroom",
    title: "Vagrant",
    description: "First EP from post-rock, instrumental trio with a western feel.",
    cover: vagrant,
    listenUrl: "https://redpinemushroom.bandcamp.com/album/vagrant",
  },
];

export const recordings = {
  image: studio,
  imageAlt: "Sound engineer working at a large analogue mixing console in a recording studio",
  paragraphs: [
    "Every recording starts with listening — to the music, the people behind it and the sound they want to create.",
    "I work with independent artists and bands on recording, production and mixing, with an approach shaped by my own experience as a musician. My focus is on capturing the energy of a performance and giving each instrument room to speak.",
    "With a mobile setup, I can bring the recording process into a rehearsal room or another suitable space. Together, we can shape a session around your music and the way you feel comfortable playing.",
  ],
};

export const photography = {
  intro: [
    "A collection of places, people and passing moments",
    "I’m drawn to quiet landscapes, changing light and the movement of live music",
  ],
  /**
   * Rows of the gallery grid on the home page. Photos in a row share the same height.
   * TODO: replace the placeholder captions with the real place and year, e.g. "Tilburg, 2024".
   */
  rows: [
    [
      {
        id: "foggy-lake",
        src: foggyLake,
        alt: "Misty lake shore with a sandy beach and trees fading into fog",
        caption: "Morning fog",
      },
    ],
    [
      {
        id: "live-guitar",
        src: liveGuitar,
        alt: "Long-exposure shot of a guitarist on stage in pink and red light",
        caption: "Live in motion",
      },
      {
        id: "forest-path",
        src: forestPath,
        alt: "Dirt path leading along a pine forest on a foggy morning",
        caption: "Forest path",
      },
    ],
    [
      {
        id: "clock-tower",
        src: clockTower,
        alt: "Black and white photo of a brick building, clock tower and bare trees",
        caption: "Clock tower",
      },
      {
        id: "abandoned-building",
        src: abandonedBuilding,
        alt: "Abandoned concrete building overgrown with bushes",
        caption: "Abandoned",
      },
    ],
    [
      {
        id: "old-letters",
        src: oldLetters,
        alt: "Decaying handwritten notebook lying among rubble",
        caption: "Forgotten letters",
      },
      {
        id: "dunes",
        src: dunes,
        alt: "Two people walking across wide sand dunes under a grey sky",
        caption: "Dunes",
      },
    ],
  ] satisfies Photo[][],
};

export type SocialLink = {
  platform: "Instagram";
  /** What the account is about, shown next to the icon. */
  label: string;
  /** Profile URL. Leave undefined to hide the link. */
  url?: string;
};

export const contact = {
  heading: "Contact",
  lead: ["Have a project in mind?", "Let’s talk!"],
  location: "Głogów (PL) & Tilburg (NL)",
  phone: "+31 612459605",
  email: "konhalaszle@gmail.com",
  socials: [
    {
      platform: "Instagram",
      label: "Recording & Mixing",
      // TODO: replace with the studio account, e.g. "https://www.instagram.com/<handle>/"
      url: "#",
    },
    {
      platform: "Instagram",
      label: "Photography",
      // TODO: replace with the photography account, e.g. "https://www.instagram.com/<handle>/"
      url: "#",
    },
  ] satisfies SocialLink[],
};
