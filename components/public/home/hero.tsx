import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import {
  SweepingArcs,
  CornerCurve,
} from "@/components/public/decorative/DecorativeLines";

export function Hero() {
  return (
    <AppSection
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        color: "text.primary",
        bgcolor: "background.default",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          width: { xs: 650, md: 1000 },
          height: 750,
          left: -280,
          top: -260,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <SweepingArcs opacity={0.1} />
      </Box>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          width: 680,
          height: 510,
          right: -250,
          bottom: -220,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <CornerCurve opacity={0.13} />
      </Box>
      <AppContainer>
        <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 850 }}>
            <Typography
              color="text.secondary"
              variant="overline"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
            >
              MOVIMENTO · POSTURA · CONSAPEVOLEZZA
            </Typography>
            <Typography
              component="h1"
              variant="primaryTitle"
              color="text.primary"
            >
              Muoversi bene, sentirsi meglio.
            </Typography>
            <Typography color="text.primary" variant="secondarySubtitle">
              Uno spazio dedicato a Pilates, Gyrotonic, postura e massaggi. Qui
              il movimento diventa ascolto, respiro e cura del corpo. Le
              proposte si adattano a esigenze diverse, dal lavoro sugli attrezzi
              ai trattamenti manuali, per accompagnare ogni persona con
              attenzione e gradualità.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <AppButton href="/news">Leggi le novità</AppButton>
              <AppButton
                href="/prenotazioni"
                color="inherit"
                variant="outlined"
              >
                Prenotazioni
              </AppButton>
            </Stack>
        </Stack>
      </AppContainer>
    </AppSection>
  );
}
