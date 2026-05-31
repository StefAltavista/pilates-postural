import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/components/public/PostList";
import { getPublishedPostsByCategorySlug } from "@/lib/data/posts";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getPublishedPostsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-10 border-b pb-6">
        <Link href="/posts" className="text-sm font-medium underline">
          Posts
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">{category.name}</h1>
      </header>
      <PostList posts={category.posts} emptyMessage="No published posts in this category." />
    </main>
  );
}
