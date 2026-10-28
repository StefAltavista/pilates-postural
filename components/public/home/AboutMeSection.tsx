import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const certifications = [
  { mark: "C", name: "CSEN" },
  { mark: "C", name: "CONI" },
  { mark: "G", name: "GYROTONIC®" },
  { mark: "G", name: "GYROKINESIS®" },
];

export function AboutMeSection() {
  return (
    <AppSection sx={{ bgcolor: "surface.light", color: "text.primary" }}>
      <AppContainer>
        <Box
          sx={{
            alignItems: "center",
            display: "grid",
            gap: { xs: 5, md: 8, lg: 11 },
            gridTemplateColumns: { md: "minmax(0, 0.82fr) minmax(0, 1.18fr)" },
          }}
        >
          <FadeInOnScroll>
            <Box
              sx={{
                aspectRatio: { xs: "4 / 5", sm: "3 / 4", md: "4 / 5" },
                bgcolor: "surfaceAlt.main",
                borderRadius: 2,
                boxShadow: "0 28px 80px rgba(25, 86, 79, 0.14)",
                maxWidth: { xs: 560, md: "none" },
                overflow: "hidden",
                position: "relative",
              }}
            >
              <OptimizedImage
                src="/images/home/DSC_0445_2.jpg"
                alt="Ritratto di Andrea Maresca nello studio"
                fill
                sizes="(max-width: 899px) 100vw, 42vw"
                style={{ objectFit: "cover", objectPosition: "center 28%" }}
              />
            </Box>
          </FadeInOnScroll>

          <FadeInOnScroll delayMs={120}>
            <Stack spacing={{ xs: 3.5, md: 4.5 }}>
              <Stack spacing={1.5}>
                <Typography color="primary.main" variant="overline">
                  Chi sono
                </Typography>
                <Typography component="h2" variant="sectionTitle">
                  Andrea Maresca
                </Typography>
              </Stack>

              <Stack spacing={2.25} sx={{ maxWidth: 760 }}>
                <Typography color="text.secondary" variant="secondarySubtitle">
                  Nasce come danzatore e diventa successivamente insegnante di
                  danza moderna, jazz, contemporanea e danze caraibiche.
                </Typography>
                <Typography color="text.secondary">
                  Si avvicina al Pilates nel 2006, certificandosi nel metodo di
                  Giuseppe Orizzonte per Matwork, piccoli attrezzi e Circular
                  Pilates. Consegue poi la certificazione CSEN nella disciplina
                  sportiva “Ginnastica finalizzata alla salute e al fitness”.
                </Typography>
                <Typography color="text.secondary">
                  È inoltre diplomato CONI come allenatore di pesistica e cultura
                  fisica, nonché trainer GYROTONIC EXPANSION SYSTEM® e
                  GYROKINESIS®.
                </Typography>
              </Stack>

              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "border.main",
                  pt: { xs: 3.5, md: 4.5 },
                }}
              >
                <Typography color="text.secondary" sx={{ mb: 2.5 }} variant="overline">
                  Certificazioni
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gap: { xs: 2, sm: 2.5 },
                    gridTemplateColumns: {
                      xs: "repeat(2, minmax(0, 1fr))",
                      lg: "repeat(4, minmax(0, 1fr))",
                    },
                  }}
                >
                  {certifications.map((certification) => (
                    <Stack
                      aria-label={`Logo provvisorio ${certification.name}`}
                      key={certification.name}
                      spacing={1.25}
                      sx={{ alignItems: "center", minWidth: 0, textAlign: "center" }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          alignItems: "center",
                          aspectRatio: "1",
                          bgcolor: "surfaceAlt.main",
                          border: "1px solid",
                          borderColor: "border.main",
                          borderRadius: "50%",
                          color: "primary.main",
                          display: "flex",
                          fontFamily: "inherit",
                          fontSize: { xs: "1.25rem", md: "1.4rem" },
                          justifyContent: "center",
                          width: { xs: 58, md: 64 },
                        }}
                      >
                        {certification.mark}
                      </Box>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.04em",
                          overflowWrap: "anywhere",
                        }}
                        variant="caption"
                      >
                        {certification.name}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Stack>
          </FadeInOnScroll>
        </Box>
      </AppContainer>
    </AppSection>
  );
}
