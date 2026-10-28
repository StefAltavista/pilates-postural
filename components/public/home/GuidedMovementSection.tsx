import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";

export function GuidedMovementSection() {
  return (
    <AppSection sx={{ bgcolor: "surface.light" }}>
      <FadeInOnScroll>
        <AppContainer>
          <Stack spacing={{ xs: 4, md: 6 }}>
            <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 850 }}>
              <Typography component="h2" variant="sectionTitle">
                Movimento guidato, preciso, personalizzato
              </Typography>

              <Typography color="text.secondary" variant="overline">
                Reformer, Cadillac, Chair, Barrel e piccoli attrezzi
              </Typography>

              <Typography color="text.primary" variant="secondarySubtitle">
                Ogni attrezzo permette di costruire un percorso preciso: dal
                rinforzo profondo alla mobilità, dalla rieducazione posturale al
                controllo del movimento. Le macchine accompagnano il corpo, lo
                sostengono dove serve e lo guidano verso un lavoro più
                consapevole ed efficace.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <AppButton href="/palestra">Scopri la palestra</AppButton>
              </Stack>
            </Stack>
          </Stack>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
