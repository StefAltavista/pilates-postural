import { HomePage } from "@/components/public/home/HomePage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "My CMS — Showcase & Stories",
  subtitle: "Selected projects, ideas, and stories.",
  description: "Discover the latest projects, stories, and creative work from My CMS.",
  excerpt: "A curated collection of featured work and recent stories.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
