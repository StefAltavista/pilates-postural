import { FeaturedPage } from "@/components/public/featured/FeaturedPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Featured",
  subtitle: "Selected projects and creative work.",
  excerpt: "Explore a curated selection of featured projects, ideas, and visual stories.",
  path: "/featured",
});

export default function Featured() {
  return <FeaturedPage />;
}
