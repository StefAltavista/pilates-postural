import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function GuidedMovementSection() {
  return (
    <AppSection sx={{ bgcolor: "background.default" }}>
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

            <Box
              aria-hidden
              sx={{
                aspectRatio: "1026 / 713",
                maskImage: "url('/images/teaser1.png')",
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                maxWidth: 1040,
                mx: "auto",
                overflow: "hidden",
                position: "relative",
                WebkitMaskImage: "url('/images/teaser1.png')",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                width: "100%",
              }}
            >
              <OptimizedImage
                src="/images/palestra/1.jpg"
                alt=""
                fill
                sizes="(max-width: 899px) calc(100vw - 48px), 1040px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
          </Stack>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
