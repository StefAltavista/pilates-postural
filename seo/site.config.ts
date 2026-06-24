export const siteConfig = {
  siteName: "My CMS",
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
  defaultTitle: "My CMS — Showcase & Stories",
  defaultDescription: "A curated showcase of projects, stories, and creative work.",
  // Replace this sample asset when adapting the boilerplate for a client.
  defaultImage: "/uploads/38cb295a-41c8-493b-bfe2-c0a148ab9477.webp",
  locale: "en_US",
} as const;
