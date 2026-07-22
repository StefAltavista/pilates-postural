import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const treatments = [
  {
    eyebrow: "Decontratturante",
    title: "Collo, spalle e schiena",
    description:
      "Pressioni calibrate e lavoro mirato sulle zone che accumulano tensione, con attenzione alla respirazione e al rilascio progressivo.",
    detail:
      "Ideale dopo periodi di stress, posture prolungate o carichi intensi.",
  },
  {
    eyebrow: "Rilassante",
    title: "Respiro e leggerezza",
    description:
      "Un trattamento piu morbido, pensato per abbassare il tono di tensione e accompagnare il corpo verso una sensazione di quiete.",
    detail: "Utile quando serve recuperare spazio, sonno e presenza nel corpo.",
  },
  {
    eyebrow: "Integrazione",
    title: "Massaggio e movimento",
    description:
      "La parte manuale puo dialogare con Pilates e Gyrotonic, creando continuita tra trattamento, postura e qualita del movimento.",
    detail:
      "Consigliato nei percorsi in cui il corpo ha bisogno di essere seguito nel tempo.",
  },
];

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

export function MassaggiPage() {
  return (
    <>
      <AppSection sx={{ bgcolor: "background.default", pt: { xs: 4, md: 7 } }}>
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
                <Typography component="h1" variant="h2">
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
                    src="/images/massaggi/2.jpg"
                    alt="Trattamento manuale nello studio"
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

      <AppSection sx={{ bgcolor: "background.paper", color: "text.light" }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: { lg: "0.58fr 1.42fr" },
              }}
            >
              <Stack spacing={1.5} sx={{ maxWidth: 500 }}>
                <Typography color="text.light" variant="overline">
                  Percorsi manuali
                </Typography>
                <Typography component="h2" variant="h3">
                  Tre modi diversi di accompagnare rilascio e recupero.
                </Typography>
                <Typography color="text.light" sx={{ opacity: 0.86 }}>
                  Il trattamento puo essere piu profondo, piu distensivo o
                  integrato al lavoro posturale. Si sceglie insieme in base a
                  tensioni, obiettivi e sensibilita del momento.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 2, md: 2.5 },
                  gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
                }}
              >
                {treatments.map((item, index) => (
                  <FadeInOnScroll delayMs={index * 90} key={item.title}>
                    <AppCard
                      sx={{
                        bgcolor: "rgba(238, 250, 249, 0.08)",
                        borderColor: "rgba(238, 250, 249, 0.28)",
                        borderRadius: 2,
                        color: "text.light",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                        minHeight: { md: 360 },
                        p: { xs: 2.5, md: 3 },
                      }}
                    >
                      <Stack spacing={1.4}>
                        <Typography color="text.light" variant="overline">
                          {item.eyebrow}
                        </Typography>
                        <Typography component="h3" variant="h4">
                          {item.title}
                        </Typography>
                        <Typography color="text.light" sx={{ opacity: 0.82 }}>
                          {item.description}
                        </Typography>
                      </Stack>
                      <Typography
                        color="text.light"
                        sx={{ mt: { xs: 3, md: 4 }, opacity: 0.72 }}
                        variant="body2"
                      >
                        {item.detail}
                      </Typography>
                    </AppCard>
                  </FadeInOnScroll>
                ))}
              </Box>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

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
                  <Typography component="h2" variant="h3">
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
                          bgcolor: "accent.light",
                          borderRadius: 999,
                          color: "primary.dark",
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
    </>
  );
}
