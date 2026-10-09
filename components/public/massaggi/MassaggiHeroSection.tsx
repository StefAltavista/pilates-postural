import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function MassaggiHeroSection() {
  return (
    <AppSection sx={{ bgcolor: "background.default" }}>
      <FadeInOnScroll>
        <AppContainer>
          <Box
            sx={{
              alignItems: "center",
              display: "grid",
              gap: { xs: 4, md: 7 },
              gridTemplateColumns: {
                md: "minmax(0, 0.85fr) minmax(360px, 1.15fr)",
              },
            }}
          >
            <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: 640 }}>
              <Typography color="primary.main" variant="overline">
                Massaggi e massoterapia
              </Typography>
              <Typography component="h1" variant="primaryTitle">
                Trattamenti manuali per sciogliere tensioni e ritrovare
                spazio.
              </Typography>
              <Typography color="text.secondary" variant="secondarySubtitle">
                Una parte dello studio e dedicata al lavoro manuale: massaggi
                mirati, ascolto del corpo e trattamenti pensati per sostenere
                recupero, benessere e percezione corporea.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <AppButton href="/contact">
                  Contattami per una seduta privata
                </AppButton>
              </Stack>
            </Stack>

            <Box
              sx={{
                minHeight: { xs: 340, sm: 430, md: 540 },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  bgcolor: "surfaceAlt.dark",
                  border: 1,
                  borderColor: "border.main",
                  borderRadius: 2,
                  boxShadow: "0 24px 70px rgba(6, 75, 65, 0.18)",
                  height: { xs: 330, sm: 410, md: 500 },
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                }}
              >
                <OptimizedImage
                  src="/images/massaggi/4.jpg"
                  alt="Ambiente preparato per un massaggio nello studio"
                  fill
                  priority
                  sizes="(max-width: 900px) 62vw, 30vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Box>
            </Box>
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
