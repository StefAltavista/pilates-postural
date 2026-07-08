import { NewsPage as NewsPageContent } from "@/components/public/news/NewsPage";
import { getPublishedPosts } from "@/lib/data/posts";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Novita",
  subtitle: "Aggiornamenti dallo studio.",
  excerpt: "Leggi aggiornamenti, notizie e spunti su Pilates, movimento e benessere.",
  path: "/news",
});

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  return <NewsPageContent posts={posts} />;
}
