import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { formatDate } from "@/lib/format";

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  createdAt: Date;
  category: { name: string };
  media: {
    largeUrl: string;
    alt: string | null;
    caption: string | null;
  } | null;
};

export function NewsFeed({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) {
    return <EmptyState title="No news yet" description="Published posts will appear here." />;
  }

  return (
    <Stack spacing={4}>
      {posts.map((post) => {
        const image = post.media?.largeUrl || post.coverImage;

        return (
          <AppCard component="article" key={post.id} sx={{ overflow: "hidden" }}>
            <Stack spacing={2.5} sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Chip label={post.category.name} size="small" />
                <Typography color="text.secondary" variant="caption">
                  {formatDate(post.createdAt)}
                </Typography>
              </Stack>

              <Box>
                <Typography component="h2" variant="h3">
                  <Link href={`/posts/${post.slug}`} className="text-inherit no-underline">
                    {post.title}
                  </Link>
                </Typography>
                {post.excerpt ? (
                  <Typography color="text.secondary" sx={{ mt: 1 }} variant="subtitle1">
                    {post.excerpt}
                  </Typography>
                ) : null}
              </Box>

              {image ? (
                <OptimizedImage
                  src={image}
                  alt={post.media?.alt ?? ""}
                  width={1200}
                  height={700}
                  sizes="(max-width: 900px) 100vw, 900px"
                  style={{ width: "100%", height: "auto", maxHeight: 520, objectFit: "cover" }}
                />
              ) : (
                <Box aria-hidden="true" sx={{ aspectRatio: "16 / 9", bgcolor: "surfaceAlt.dark" }} />
              )}

              <Typography sx={{ whiteSpace: "pre-line" }}>{post.content}</Typography>
              {post.media?.caption ? (
                <Typography color="text.secondary" variant="caption">
                  {post.media.caption}
                </Typography>
              ) : null}
              <Box>
                <AppButton href={`/posts/${post.slug}`} variant="outlined">
                  Open post
                </AppButton>
              </Box>
            </Stack>
          </AppCard>
        );
      })}
    </Stack>
  );
}
