import { NewsIntroSection } from "./NewsIntroSection";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { NewsFeed, type NewsPost } from "@/components/public/news/NewsFeed";

export function NewsPage({ posts }: { posts: NewsPost[] }) {
  return (
    <AppSection>
      <AppContainer maxWidth="lg">
        <NewsIntroSection />
        <NewsFeed posts={posts} />
      </AppContainer>
    </AppSection>
  );
}
