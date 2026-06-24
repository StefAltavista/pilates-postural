import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { LoadingState } from "@/components/common/LoadingState";

export default function Loading() {
  return (
    <AppSection>
      <AppContainer>
        <LoadingState />
      </AppContainer>
    </AppSection>
  );
}
