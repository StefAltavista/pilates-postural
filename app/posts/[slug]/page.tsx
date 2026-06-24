import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getPublishedPostBySlug } from "@/lib/data/posts";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link href="/posts" className="text-sm font-medium underline">
        Posts
      </Link>
      <article className="mt-6">
        <header className="mb-8 border-b pb-6">
          <div className="mb-3 flex flex-wrap gap-2 text-sm text-zinc-500">
            <Link href={`/category/${post.category.slug}`} className="font-medium underline">
              {post.category.name}
            </Link>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          {post.excerpt ? <p className="mt-4 text-lg text-zinc-600">{post.excerpt}</p> : null}
        </header>
        {post.media?.largeUrl || post.coverImage ? (
          <Image
            src={post.media?.largeUrl ?? post.coverImage!}
            alt={post.media?.alt ?? ""}
            width={1200}
            height={700}
            className="mb-8 max-h-[480px] w-full rounded object-cover"
            priority
          />
        ) : null}
        <div className="whitespace-pre-wrap text-lg leading-8 text-zinc-800">{post.content}</div>
      </article>
    </main>
  );
}
