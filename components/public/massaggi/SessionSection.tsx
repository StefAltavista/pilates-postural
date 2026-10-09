import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const sessionSteps = [
  {
    label: "01",
    title: "Ascolto iniziale",
    text: "Si parte da una breve raccolta di sensazioni, abitudini e zone da trattare.",
  },
  {
    label: "02",
    title: "Trattamento mirato",
    text: "Il ritmo viene modulato sul corpo: piu profondo dove serve, piu leggero dove occorre ascolto.",
  },
  {
    label: "03",
    title: "Chiusura e continuita",
    text: "Quando utile, il trattamento viene collegato a piccoli suggerimenti di movimento e postura.",
  },
];

export function SessionSection() {
  return (
    <AppSection sx={{ bgcolor: "background.default" }}>
      <FadeInOnScroll>
        <AppContainer>
          <Box
            sx={{
              alignItems: "center",
              display: "grid",
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { md: "0.9fr 1.1fr" },
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
                src="/images/massaggi/3.jpg"
                alt="Andrea nello studio Pilates Postural"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>

            <Stack spacing={{ xs: 2.5, md: 3 }}>
              <Stack spacing={1.5}>
                <Typography color="primary.main" variant="overline">
                  Come si svolge
                </Typography>
                <Typography component="h2" variant="sectionTitle">
                  Una seduta semplice, precisa e rispettosa dei tempi del
                  corpo.
                </Typography>
              </Stack>

              <Stack spacing={2.25}>
                {sessionSteps.map((step) => (
                  <Box
                    key={step.label}
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "auto minmax(0, 1fr)",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        bgcolor: "background.default",
                        borderRadius: 999,
                        color: "text.primary",
                        display: "inline-flex",
                        height: 42,
                        justifyContent: "center",
                        width: 42,
                      }}
                    >
                      <Typography component="span" variant="subtitle2">
                        {step.label}
                      </Typography>
                    </Box>
                    <Stack spacing={0.5}>
                      <Typography component="h3" variant="h4">
                        {step.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {step.text}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
