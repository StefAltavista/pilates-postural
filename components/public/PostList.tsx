import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";

type ListedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: Date;
  category: {
    name: string;
    slug: string;
  };
};

export function PostList({
  posts,
  emptyMessage,
}: {
  posts: ListedPost[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-zinc-600">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.id} className="grid gap-3 border-b pb-6 sm:grid-cols-[180px_1fr]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              width={360}
              height={220}
              className="h-36 w-full rounded object-cover sm:h-28"
            />
          ) : (
            <div className="hidden h-28 rounded bg-zinc-100 sm:block" />
          )}
          <div>
            <div className="mb-2 flex flex-wrap gap-2 text-sm text-zinc-500">
              <Link href={`/category/${post.category.slug}`} className="font-medium underline">
                {post.category.name}
              </Link>
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt ? <p className="mt-2 text-zinc-600">{post.excerpt}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
