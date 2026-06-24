import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { NewsFeed, type NewsPost } from "@/components/public/news/NewsFeed";

export function NewsPage({ posts }: { posts: NewsPost[] }) {
  return (
    <AppSection>
      <AppContainer maxWidth="md">
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography color="primary.main" variant="overline">
            News
          </Typography>
          <Typography component="h1" variant="h2">
            Stories, updates, and recent work.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Follow the complete stream of published posts and open any story for its dedicated
            page.
          </Typography>
        </Stack>
        <NewsFeed posts={posts} />
      </AppContainer>
    </AppSection>
  );
}
