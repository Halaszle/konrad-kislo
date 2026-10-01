import type { MetadataRoute } from "next";

import { site } from "@/content/site";

// Generated once at build time (also required for the static GitHub Pages export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/photography`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
