import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const movementQualities = [
  { machine: "Reformer", quality: "ritmo, precisione, sostegno" },
  { machine: "Gyrotonic machine", quality: "spirali, respiro, continuità" },
  { machine: "Barrel", quality: "apertura, mobilità, leggerezza" },
];

export function MethodSection() {
  return (
    <AppSection sx={{ bgcolor: "background.paper", color: "common.white" }}>
      <AppContainer>
        <Box
          sx={{
            alignItems: "center",
            display: "grid",
            gap: { xs: 5, md: 7 },
            gridTemplateColumns: { md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" },
          }}
        >
          <FadeInOnScroll>
            <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 560 }}>
              <Typography color="surfaceAlt.light" variant="overline">
                Un unico spazio, tre ritmi
              </Typography>
              <Typography component="h2" variant="sectionTitle">
                L&apos;attrezzo cambia. L&apos;attenzione al corpo resta.
              </Typography>
              <Typography color="surfaceAlt.light" variant="secondarySubtitle">
                La macchina non è il punto di arrivo: è il modo in cui troviamo
                il movimento più adatto a te, quel giorno.
              </Typography>

              <Stack
                divider={<Divider flexItem sx={{ borderColor: "rgba(255,255,255,0.28)" }} />}
                spacing={0}
                sx={{ borderBlock: "1px solid rgba(255,255,255,0.28)" }}
              >
                {movementQualities.map((item) => (
                  <Box
                    key={item.machine}
                    sx={{
                      alignItems: { sm: "baseline" },
                      display: "grid",
                      gap: { xs: 0.25, sm: 2 },
                      gridTemplateColumns: { sm: "minmax(150px, 0.8fr) 1.2fr" },
                      py: 1.75,
                    }}
                  >
                    <Typography component="h3" variant="h5">
                      {item.machine}
                    </Typography>
                    <Typography color="surfaceAlt.light">
                      {item.quality}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Box>
                <AppButton color="inherit" href="/prenotazioni" variant="outlined">
                  Prova una lezione
                </AppButton>
              </Box>
            </Stack>
          </FadeInOnScroll>

          <FadeInOnScroll delayMs={120}>
            <Box
              sx={{
                aspectRatio: { xs: "4 / 3", md: "5 / 6" },
                borderRadius: 2,
                boxShadow: "0 24px 70px rgba(6, 44, 41, 0.24)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <OptimizedImage
                src="/images/palestra/PHOTO-2026-07-29-17-28-20(2).jpg"
                alt="La sala attrezzi dello studio tra legno, luce e verde"
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
          </FadeInOnScroll>
        </Box>
      </AppContainer>
    </AppSection>
  );
}
