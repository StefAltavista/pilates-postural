import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { GoogleMapsEmbed } from "@/components/consent/GoogleMapsEmbed";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";

export function StudioContactSection() {
  return (
    <AppSection sx={{ bgcolor: "surface.light", color: "text.primary" }}>
      <AppContainer>
        <Box
          sx={{
            py: 24,
            alignItems: "stretch",
            display: "grid",
            gap: { xs: 4, md: 7, lg: 9 },
            gridTemplateColumns: {
              md: "minmax(0, 1.35fr) minmax(280px, 0.65fr)",
            },
          }}
        >
          <FadeInOnScroll>
            <GoogleMapsEmbed
              embedUrl="https://www.google.com/maps?q=Vicolo%20del%20Ghiaccio%209%2C%2016035%20Rapallo%20GE%2C%20Italy&output=embed"
              title="Pilates Postural Studio a Rapallo"
            />
          </FadeInOnScroll>

          <FadeInOnScroll delayMs={120} sx={{ alignSelf: "center" }}>
            <Stack spacing={{ xs: 2, md: 2.5 }}>
              <Typography component="h2" variant="h2">
                Vieni a trovarci
              </Typography>
              <Typography
                color="primary.main"
                sx={{ fontSize: "clamp(1.1rem, 0.98rem + 0.35vw, 1.3rem)" }}
                variant="overline"
              >
                Vicolo del Ghiaccio 9, Rapallo
              </Typography>
              <Typography color="text.secondary" variant="subtitle1">
                Scopri lo studio e trova il percorso più adatto al tuo corpo e
                ai tuoi obiettivi.
              </Typography>
            </Stack>
          </FadeInOnScroll>
        </Box>
      </AppContainer>
    </AppSection>
  );
}
