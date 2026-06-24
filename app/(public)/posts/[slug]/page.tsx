import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { formatDate } from "@/lib/format";
import { getPublishedPostBySlug } from "@/lib/data/posts";
import { createPostSeoMetadata, createSeoMetadata } from "@/seo/createSeoMetadata";

export const dynamic = "force-dynamic";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return createSeoMetadata({ title: "Post not found", noIndex: true });
  }

  return createPostSeoMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <AppSection>
      <AppContainer maxWidth="md" sx={{ maxWidth: 820 }}>
      <Link href="/posts" className="text-sm font-medium underline">
        Posts
      </Link>
      <Box component="article" sx={{ mt: 3 }}>
        <Box component="header" sx={{ mb: 4, borderBottom: 1, borderColor: "divider", pb: 3 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5, color: "text.secondary", flexWrap: "wrap" }}>
            <Link href={`/category/${post.category.slug}`} className="font-medium underline">
              {post.category.name}
            </Link>
            <Typography component="span" variant="body2">{formatDate(post.createdAt)}</Typography>
          </Stack>
          <Typography component="h1" variant="h2">{post.title}</Typography>
          {post.excerpt ? <Typography color="text.secondary" variant="secondarySubtitle" sx={{ mt: 2 }}>{post.excerpt}</Typography> : null}
        </Box>
        {post.media?.largeUrl || post.coverImage ? (
          <OptimizedImage
            src={post.media?.largeUrl ?? post.coverImage!}
            alt={post.media?.alt ?? ""}
            width={1200}
            height={700}
            sizes="(max-width: 900px) 100vw, 820px"
            style={{ width: "100%", maxHeight: 480, height: "auto", borderRadius: 12, objectFit: "cover", marginBottom: 32 }}
            priority
          />
        ) : null}
        <Typography component="div" sx={{ whiteSpace: "pre-wrap" }} variant="body1">{post.content}</Typography>
      </Box>
      </AppContainer>
    </AppSection>
  );
}
