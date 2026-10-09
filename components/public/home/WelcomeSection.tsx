import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function WelcomeSection() {
  return (
  <AppSection
    sx={{
      bgcolor: "background.paper",
      color: "surfaceAlt.light",
    }}
  >
    <FadeInOnScroll>
      <AppContainer>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 5 },
            gridTemplateColumns: { md: "0.65fr 1fr" },
            alignItems: "center",
          }}
        >
          <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 700 }}>
            <Typography
              component="h2"
              sx={{ color: "surfaceAlt.light" }}
              variant="sectionTitle"
            >
              Every body is welcome
            </Typography>
            <Typography
              sx={{ color: "surfaceAlt.light" }}
              variant="overline"
            >
              Consapevolezza del corpo
            </Typography>
            <Typography
              sx={{ color: "surfaceAlt.light" }}
              variant="secondarySubtitle"
            >
              Imparare ad ascoltare il corpo, riconoscerne i segnali e
              ritrovare un movimento più consapevole, naturale e presente.
            </Typography>
            <Typography sx={{ color: "surfaceAlt.light" }} variant="body1">
              Le lezioni e i trattamenti sono pensati per persone diverse:
              chi vuole muoversi meglio, chi cerca sostegno dopo periodi di
              tensione, chi desidera migliorare tono, equilibrio e
              percezione corporea con un approccio rispettoso.
            </Typography>
          </Stack>

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              minHeight: { xs: 240, sm: 300, md: 400 },
            }}
          >
            <OptimizedImage
              src="/icons/plant.png"
              alt=""
              aria-hidden="true"
              width={1254}
              height={1254}
              sizes="(max-width: 900px) 55vw, 28vw"
              style={{
                display: "block",
                filter: "brightness(1000%)",
                height: "auto",
                maxWidth: 340,
                width: "70%",
              }}
            />
          </Box>
        </Box>
      </AppContainer>
    </FadeInOnScroll>
  </AppSection>
  );
}
