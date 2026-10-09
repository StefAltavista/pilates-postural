import { PolicyHeader } from "./PolicyHeader";
import { PolicyContent } from "./PolicyContent";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

export function PolicyDocument({ title, content }: { title: string; content: string }) {
  return (
    <AppSection>
      <AppContainer>
        <PolicyHeader title={title} />
        <PolicyContent content={content} />
      </AppContainer>
    </AppSection>
  );
}
