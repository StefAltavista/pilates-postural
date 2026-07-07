import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ImageDotCarousel } from "@/components/public/ImageDotCarousel";
import { formatDate } from "@/lib/format";

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  postDate: Date;
  category: { name: string; slug: string };
  images: Array<{
    id: string;
    title: string;
    media: { mediumUrl: string; width: number; height: number };
  }>;
};

export function NewsFeed({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) {
    return <EmptyState title="No news yet" description="Published posts will appear here." />;
  }

  return (
    <Box sx={{ display: "grid", gap: 6 }}>
      {posts.map((post) => {
        const postHref = `/${post.category.slug}/${post.slug}`;

        return (
          <AppCard
            component="article"
            key={post.id}
            variant="elevation"
            elevation={0}
            sx={{ bgcolor: "transparent", border: 0, borderRadius: 0, boxShadow: "none", overflow: "hidden", width: "100%" }}
          >
            <Box
              sx={{
                display: "grid",
                columnGap: { lg: 5 },
                rowGap: 1.5,
                gridTemplateAreas: {
                  xs: '"info" "media" "excerpt"',
                  lg: '"copy media"',
                },
                gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(240px, 3fr) minmax(0, 7fr)" },
                alignItems: "start",
              }}
            >
              <Box sx={{ display: { xs: "contents", lg: "block" }, gridArea: { lg: "copy" }, alignSelf: "start" }}>
                <Box sx={{ gridArea: "info" }}>
                  <Typography component="h2" variant="h3">
                    <Link href={postHref} className="text-inherit no-underline">
                      {post.title}
                    </Link>
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="caption">
                    {formatDate(post.postDate)}
                  </Typography>
                </Box>

                {post.excerpt ? (
                  <Typography
                    component="p"
                    color="text.secondary"
                    variant="subtitle1"
                    sx={{ gridArea: "excerpt", m: 0, mt: { lg: 2 } }}
                  >
                    {post.excerpt}
                  </Typography>
                ) : null}
              </Box>

              {post.images.length ? (
                <Box sx={{ gridArea: "media", minWidth: 0 }}>
                  <ImageDotCarousel
                    href={postHref}
                    images={post.images.map(({ id, title, media }) => ({
                      id,
                      title,
                      mediumUrl: media.mediumUrl,
                      width: media.width,
                      height: media.height,
                    }))}
                  />
                </Box>
              ) : (
                <Box aria-hidden="true" sx={{ aspectRatio: "16 / 9", bgcolor: "surfaceAlt.dark", gridArea: "media" }} />
              )}

            </Box>
          </AppCard>
        );
      })}
    </Box>
  );
}
