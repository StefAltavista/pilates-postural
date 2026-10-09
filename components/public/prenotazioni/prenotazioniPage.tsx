import { BookingCalendarSection } from "./BookingCalendarSection";
import { BookingIntroSection } from "./BookingIntroSection";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

export function PrenotazioniPage() {
  return (
    <AppSection>
      <AppContainer>
        <BookingIntroSection />
        <BookingCalendarSection />
      </AppContainer>
    </AppSection>
  );
}
