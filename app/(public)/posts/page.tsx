import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { PostList } from "@/components/public/PostList";
import { getPublishedPosts } from "@/lib/data/posts";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Posts",
  subtitle: "Stories, updates, and featured work.",
  path: "/posts",
});

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPublishedPosts();

  return (
    <AppSection>
      <AppContainer maxWidth="md">
      <Box component="header" sx={{ mb: 5, borderBottom: 1, borderColor: "divider", pb: 3 }}>
        <Link href="/" className="text-sm font-medium underline">
          Home
        </Link>
        <Typography component="h1" variant="h3" sx={{ mt: 2 }}>Posts</Typography>
      </Box>
      <PostList posts={posts} emptyMessage="No published posts found." />
      </AppContainer>
    </AppSection>
  );
}
