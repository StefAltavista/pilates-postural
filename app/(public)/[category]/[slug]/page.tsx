import { PostHeaderSection } from "@/components/public/posts/PostHeaderSection";
import { PostContentSection } from "@/components/public/posts/PostContentSection";
import { PostGallerySection } from "@/components/public/posts/PostGallerySection";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";

import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

import { type PostDisplayImage } from "@/components/public/posts/PostModalImage";

import { getPublishedPostByPath } from "@/lib/data/posts";
import { createPostSeoMetadata, createSeoMetadata } from "@/seo/createSeoMetadata";

export const dynamic = "force-dynamic";

type PostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

type PublishedPostImage = {
  id: string;
  title: string;
  media: {
    mediumUrl: string;
    largeUrl: string;
    width: number;
    height: number;
  };
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPublishedPostByPath(category, slug);

  if (!post)
    return createSeoMetadata({ title: "Articolo non trovato", noIndex: true });
  return createPostSeoMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = await getPublishedPostByPath(category, slug);
  if (!post) notFound();

  const images: PostDisplayImage[] = post.images.map(
    ({ id, title, media }: PublishedPostImage) => ({
      id,
      title,
      mediumUrl: media.mediumUrl,
      largeUrl: media.largeUrl,
      width: media.width,
      height: media.height,
    }),
  );
  const firstImage = images[0];
  const remainingImages = images.slice(1);

  return (
    <AppSection>
      <AppContainer maxWidth="lg">
        <Link href="/news" className="text-sm font-medium underline">
          Novita
        </Link>
        <Box component="article" sx={{ mt: 3 }}>
          <PostHeaderSection title={post.title} postDate={post.postDate} excerpt={post.excerpt} />

          <PostContentSection content={post.content} firstImage={firstImage} />

          <PostGallerySection remainingImages={remainingImages} />
        </Box>
      </AppContainer>
    </AppSection>
  );
}
