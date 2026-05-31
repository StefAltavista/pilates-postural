import Link from "next/link";
import { PostList } from "@/components/public/PostList";
import { getLatestPublishedPosts } from "@/lib/data/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getLatestPublishedPosts(6);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-10 flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-semibold">My CMS</h1>
          <p className="mt-2 text-zinc-600">Latest published posts.</p>
        </div>
        <Link href="/posts" className="text-sm font-medium underline">
          All posts
        </Link>
      </header>
      <PostList posts={posts} emptyMessage="No posts have been published yet." />
    </main>
  );
}
