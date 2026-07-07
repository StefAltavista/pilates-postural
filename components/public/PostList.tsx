import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EmptyState } from "@/components/common/EmptyState";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { formatDate } from "@/lib/format";

type ListedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  images: Array<{
    title: string;
    media: { thumbnailUrl: string };
  }>;
  postDate: Date;
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
    return <EmptyState title="Nothing here yet" description={emptyMessage} />;
  }

  return (
    <Stack spacing={3}>
      {posts.map((post) => {
        const preview = post.images[0];
        return (
        <Box
          component="article"
          key={post.id}
          sx={{
            display: "grid",
            gap: 2,
            borderBottom: 1,
            borderColor: "divider",
            pb: 3,
            gridTemplateColumns: { sm: "180px 1fr" },
          }}
        >
          {preview?.media.thumbnailUrl ? (
            <OptimizedImage
              src={preview.media.thumbnailUrl}
              alt={preview.title}
              width={360}
              height={220}
              sizes="(max-width: 600px) 100vw, 180px"
              style={{ width: "100%", height: 112, borderRadius: 8, objectFit: "cover" }}
            />
          ) : (
            <Box sx={{ display: { xs: "none", sm: "block" }, height: 112, borderRadius: 1, bgcolor: "surfaceAlt.main" }} />
          )}
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1, color: "text.secondary", flexWrap: "wrap" }}>
              <Link href={`/category/${post.category.slug}`} className="font-medium underline">
                {post.category.name}
              </Link>
              <Typography component="span" variant="body2">{formatDate(post.postDate)}</Typography>
            </Stack>
            <Typography component="h2" variant="h5">
              <Link href={`/${post.category.slug}/${post.slug}`}>{post.title}</Link>
            </Typography>
            {post.excerpt ? <Typography color="text.secondary" sx={{ mt: 1 }}>{post.excerpt}</Typography> : null}
          </Box>
        </Box>
        );
      })}
    </Stack>
  );
}
