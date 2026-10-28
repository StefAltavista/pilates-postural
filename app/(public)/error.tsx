"use client";

import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { ErrorState } from "@/components/common/ErrorState";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <AppSection>
      <AppContainer>
        <ErrorState
          description="Non è stato possibile caricare la pagina. Riprova."
          action={<AppButton onClick={reset}>Riprova</AppButton>}
        />
      </AppContainer>
    </AppSection>
  );
}
