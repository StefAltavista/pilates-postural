import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function PalestraHeroSection() {
  return (
    <AppSection sx={{ bgcolor: "background.default" }}>
      <FadeInOnScroll>
        <AppContainer>
          <Box
            sx={{
              alignItems: "center",
              display: "grid",
              gap: { xs: 4, md: 7 },
              gridTemplateColumns: { md: "minmax(0, 1fr) minmax(0, 1fr)" },
            }}
          >
            <Box
              sx={{
                aspectRatio: { xs: "4 / 3", md: "5 / 6" },
                bgcolor: "surfaceAlt.main",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <OptimizedImage
                src="/images/home/home2.jpg"
                alt="Attrezzi Pilates nello studio a Rapallo"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>

            <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: 660 }}>
              <Typography color="primary.main" variant="overline">
                Lo studio
              </Typography>
              <Typography component="h1" variant="primaryTitle">
                Pilates, attrezzi e Gyrotonic per dare forma al movimento.
              </Typography>
              <Typography color="text.secondary" variant="secondarySubtitle">
                Uno spazio raccolto dove Reformer, Barrel, Cadillac e Gyrotonic
                machine aiutano il corpo a ritrovare forza gentile, mobilita e
                presenza.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <AppButton href="/prenotazioni">Prenota una lezione</AppButton>
              </Stack>
            </Stack>
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
