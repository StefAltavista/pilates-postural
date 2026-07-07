export const siteConfig = {
  siteName: "My CMS",
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
  defaultTitle: "My CMS — Showcase & Stories",
  defaultDescription: "A curated showcase of projects, stories, and creative work.",
  defaultImage: "/images/default_img.jpg",
  locale: "en_US",
} as const;
