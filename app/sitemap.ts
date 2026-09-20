import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://formen.cc", changeFrequency: "monthly", priority: 1 },
  ];
}
