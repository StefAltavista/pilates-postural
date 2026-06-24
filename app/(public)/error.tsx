"use client";

import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { ErrorState } from "@/components/common/ErrorState";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <AppSection>
      <AppContainer maxWidth="sm">
        <ErrorState
          description="The page could not be loaded. Please try again."
          action={<AppButton onClick={reset}>Try again</AppButton>}
        />
      </AppContainer>
    </AppSection>
  );
}
