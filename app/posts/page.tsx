import Link from "next/link";
import { PostList } from "@/components/public/PostList";
import { getPublishedPosts } from "@/lib/data/posts";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-10 border-b pb-6">
        <Link href="/" className="text-sm font-medium underline">
          Home
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Posts</h1>
      </header>
      <PostList posts={posts} emptyMessage="No published posts found." />
    </main>
  );
}
