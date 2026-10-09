import { ContactMapSection } from "./ContactMapSection";
import { ContactDetailsSection } from "./ContactDetailsSection";
import { ContactIntroSection } from "./ContactIntroSection";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

export function ContactPage() {
  return (
    <AppSection>
      <AppContainer>
        <ContactIntroSection />
        <ContactDetailsSection />
        <ContactMapSection />
      </AppContainer>
    </AppSection>
  );
}
