import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { ImageDotCarousel } from "@/components/public/ImageDotCarousel";
import { PostModalImage, type PostDisplayImage } from "@/components/public/posts/PostModalImage";
import { formatDate } from "@/lib/format";
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

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPublishedPostByPath(category, slug);

  if (!post) return createSeoMetadata({ title: "Articolo non trovato", noIndex: true });
  return createPostSeoMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = await getPublishedPostByPath(category, slug);
  if (!post) notFound();

  const images: PostDisplayImage[] = post.images.map(({ id, title, media }: PublishedPostImage) => ({
    id,
    title,
    mediumUrl: media.mediumUrl,
    largeUrl: media.largeUrl,
    width: media.width,
    height: media.height,
  }));
  const firstImage = images[0];
  const remainingImages = images.slice(1);

  return (
    <AppSection>
      <AppContainer maxWidth="lg">
        <Link href="/news" className="text-sm font-medium underline">Novita</Link>
        <Box component="article" sx={{ mt: 3 }}>
          <Box component="header" sx={{ mb: 4 }}>
            <Typography component="h1" variant="h2">{post.title}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              {formatDate(post.postDate)}
            </Typography>
            {post.excerpt ? (
              <Typography component="p" color="text.secondary" sx={{ mt: 2, mb: 0, maxWidth: 900 }} variant="secondarySubtitle">
                {post.excerpt}
              </Typography>
            ) : null}
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: { xs: 4, sm: 5 },
              gridTemplateAreas: { xs: '"image" "content"', lg: '"content image"' },
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 3fr)" },
              alignItems: "start",
            }}
          >
            <Box sx={{ gridArea: "content" }}>
              <Typography component="div" sx={{ whiteSpace: "pre-wrap" }} variant="body1">
                {post.content}
              </Typography>
            </Box>

            <Box sx={{ gridArea: "image", minWidth: 0 }}>
              {firstImage ? (
                <PostModalImage image={firstImage} priority />
              ) : null}
            </Box>
          </Box>

          {remainingImages.length ? (
            <Box component="section" aria-label="Altre immagini dell'articolo" sx={{ mt: 5, mx: { lg: "auto" }, width: { xs: "100%", lg: "70%" } }}>
              <ImageDotCarousel images={remainingImages} showActiveTitle />
            </Box>
          ) : null}
        </Box>
      </AppContainer>
    </AppSection>
  );
}
