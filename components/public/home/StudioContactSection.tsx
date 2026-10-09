import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";

export function StudioContactSection() {
  return (
  <AppSection sx={{ bgcolor: "background.default", color: "text.primary" }}>
    <FadeInOnScroll>
      <AppContainer>
        <Stack
          spacing={{ xs: 1.5, md: 2 }}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <Typography component="h2" variant="sectionTitle">
            Vicolo del Ghiaccio 9, Rapallo
          </Typography>
          <Typography sx={{ maxWidth: 720 }} variant="secondarySubtitle">
            Per informazioni su lezioni, trattamenti e disponibilita puoi
            contattare lo studio al numero +39 349 174 7713.
          </Typography>
          <AppButton href="tel:+393491747713">
            Chiama lo studio
          </AppButton>
        </Stack>
      </AppContainer>
    </FadeInOnScroll>
  </AppSection>
  );
}
