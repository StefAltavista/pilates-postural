import { NewsPage as NewsPageContent } from "@/components/public/news/NewsPage";
import { getPublishedPosts } from "@/lib/data/posts";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "News",
  subtitle: "The latest stories, updates, and published work.",
  excerpt: "Browse all published posts in an expanded, easy-to-read news feed.",
  path: "/news",
});

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  return <NewsPageContent posts={posts} />;
}
