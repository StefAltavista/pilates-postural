import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function TreatmentsSection() {
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
              alignItems: "center",
              display: "grid",
              gap: { xs: 3, md: 5 },
              gridTemplateColumns: { md: "0.65fr 1fr" },
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: { xs: 240, sm: 300, md: 400 },
              }}
            >
              <OptimizedImage
                src="/icons/hands.png"
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                sizes="(max-width: 900px) 55vw, 28vw"
                style={{
                  display: "block",
                  filter: "brightness(1000%)",
                  height: "auto",
                  maxWidth: 360,
                  width: "72%",
                }}
              />
            </Box>

            <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 720 }}>
              <Typography color="surfaceAlt.light" variant="overline">
                Massaggio e massoterapia
              </Typography>
              <Typography component="h2" variant="sectionTitle">
                Ritrovare calma, mobilità e leggerezza.
              </Typography>
              <Typography color="surfaceAlt.light" variant="secondarySubtitle">
                Un trattamento pensato per sciogliere le tensioni, ridurre lo
                stress e accompagnare il recupero con un approccio
                fisioterapico, mirato e rispettoso del corpo.
              </Typography>
              <Typography color="surfaceAlt.light" variant="body1">
                Stress · tensioni muscolari · mobilità
              </Typography>
            </Stack>
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
