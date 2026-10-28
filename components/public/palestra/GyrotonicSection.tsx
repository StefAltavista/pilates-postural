import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const benefits = [
  {
    number: "01",
    title: "Postura ed elasticità",
    description:
      "Aiuta ad alleviare i dolori alla schiena e alla cervicale, migliorando l’allineamento e la mobilità articolare.",
  },
  {
    number: "02",
    title: "Tonificazione",
    description:
      "Allunga e definisce la muscolatura senza appesantire, favorendo un corpo più snello e armonioso.",
  },
];

const principles = [
  {
    number: "01",
    title: "Movimento tridimensionale",
    description:
      "Non esistono posizioni statiche o movimenti lineari: archi, onde e spirali coinvolgono insieme muscoli, articolazioni e organi interni.",
  },
  {
    number: "02",
    title: "Respiro ritmico",
    description:
      "Ogni gesto è guidato da schemi di respirazione specifici che stimolano il sistema nervoso, aumentano l’energia vitale e aiutano a decomprimere le vertebre.",
  },
  {
    number: "03",
    title: "Senza macchinari",
    description:
      "A differenza del Gyrotonic, che utilizza attrezzature con cavi e pulegge, la Gyrokinesis si pratica con il proprio peso corporeo, un tappetino e uno sgabello.",
  },
];

export default function GyrotonicSection() {
  return (
    <AppSection
      sx={{
        bgcolor: "background.default",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          border: "1px solid",
          borderColor: "border.light",
          borderRadius: "50%",
          content: '\"\"',
          height: { xs: 240, md: 440 },
          position: "absolute",
          right: { xs: -150, md: -220 },
          top: { xs: 80, md: 120 },
          width: { xs: 240, md: 440 },
        },
      }}
    >
      <AppContainer sx={{ position: "relative" }}>
        <FadeInOnScroll>
          <Box
            sx={{
              alignItems: "end",
              display: "grid",
              gap: { xs: 3, md: 8 },
              gridTemplateColumns: {
                md: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
              },
              mb: { xs: 5, md: 9 },
            }}
          >
            <Stack spacing={1.75}>
              <Typography component="h2" variant="sectionTitle">
                Gyrotonic &amp; Gyrokinesis
              </Typography>
              <Typography color="primary.main" variant="overline">
                Il movimento nasce dalla colonna e si apre nello spazio.
              </Typography>
            </Stack>

            <Typography color="text.secondary" variant="secondarySubtitle">
              La Gyrokinesis è un allenamento olistico che unisce yoga, danza,
              tai chi e nuoto in movimenti fluidi e circolari, con
              un&apos;attenzione profonda alla colonna vertebrale.
            </Typography>
          </Box>
        </FadeInOnScroll>

        <Stack spacing={{ xs: 9, md: 13, lg: 16 }}>
          <FadeInOnScroll>
            <Box
              sx={{
                aspectRatio: { xs: "4 / 3", sm: "16 / 10", md: "16 / 7" },
                bgcolor: "surfaceAlt.dark",
                borderRadius: 2,
                boxShadow: "0 30px 90px rgba(25, 86, 79, 0.16)",
                overflow: "hidden",
                position: "relative",
                width: "100%",
              }}
            >
              <OptimizedImage
                src="/images/home/home1.jpg"
                alt="La sala dello studio con gli attrezzi Gyrotonic e Pilates"
                fill
                sizes="(max-width: 899px) 100vw, 1200px"
                style={{ objectFit: "cover", objectPosition: "center 54%" }}
              />
              <Box
                sx={{
                  background:
                    "linear-gradient(180deg, transparent 58%, rgba(16, 69, 65, 0.66) 100%)",
                  inset: 0,
                  position: "absolute",
                }}
              />
              <Typography
                color="common.white"
                sx={{
                  bottom: { xs: 18, md: 28 },
                  left: { xs: 20, md: 34 },
                  letterSpacing: "0.08em",
                  position: "absolute",
                  textTransform: "uppercase",
                }}
                variant="caption"
              >
                Fluidità · Respiro · Continuità
              </Typography>
            </Box>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 4, md: 8, lg: 11 },
                gridTemplateColumns: {
                  md: "minmax(220px, 0.55fr) minmax(0, 1.45fr)",
                },
              }}
            >
              <Stack spacing={1.25} sx={{ maxWidth: 360 }}>
                <Typography color="primary.main" variant="overline">
                  Cosa cambia nel corpo
                </Typography>
                <Typography component="h3" variant="h3">
                  I principali benefici
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 4, sm: 5, lg: 7 },
                  gridTemplateColumns: { sm: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                {benefits.map((benefit) => (
                  <Stack
                    key={benefit.title}
                    spacing={2}
                    sx={{
                      borderTop: "1px solid",
                      borderColor: "border.main",
                      pt: { xs: 2.5, md: 3.5 },
                      pr: { sm: 2, lg: 4 },
                    }}
                  >
                    <Typography color="primary.main" variant="overline">
                      {benefit.number}
                    </Typography>
                    <Typography component="h4" variant="h4">
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <Box>
              <Stack spacing={1.5} sx={{ maxWidth: 760, mb: { xs: 5, md: 8 } }}>
                <Typography color="primary.main" variant="overline">
                  Il metodo
                </Typography>
                <Typography component="h3" variant="h3">
                  Come funziona e cosa lo rende unico
                </Typography>
              </Stack>

              <Stack
                spacing={0}
                sx={{
                  borderBlock: "1px solid",
                  borderColor: "border.main",
                }}
              >
                {principles.map((principle, index) => (
                  <Box
                    key={principle.title}
                    sx={{
                      alignItems: "start",
                      borderBottom:
                        index < principles.length - 1 ? "1px solid" : "none",
                      borderColor: "border.main",
                      display: "grid",
                      // gap: { xs: 1.5, sm: 2.5, md: 5 },
                      gridTemplateColumns: {
                        sm: "64px minmax(0, 0.8fr)",
                        md: "72px minmax(220px, 0.75fr) minmax(0, 1.25fr)",
                      },
                      py: { xs: 1, md: 2 },
                    }}
                  >
                    <Typography color="primary.main" variant="overline">
                      {principle.number}
                    </Typography>
                    <Typography component="h4" variant="h4">
                      {principle.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        gridColumn: { sm: "2", md: "auto" },
                        maxWidth: 660,
                      }}
                    >
                      {principle.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <Box
              sx={{
                bgcolor: "surfaceAlt.main",
                borderRadius: 2,
                display: "grid",
                gap: { xs: 3.5, md: 8, lg: 11 },
                gridTemplateColumns: {
                  md: "minmax(240px, 0.7fr) minmax(0, 1.3fr)",
                },
                p: { xs: 4, sm: 6, md: 8, lg: 10 },
                position: "relative",
                width: "100%",
                "&::before": {
                  bgcolor: "primary.main",
                  borderRadius: 999,
                  content: '\"\"',
                  height: 3,
                  left: { xs: 32, sm: 48, md: 64, lg: 80 },
                  position: "absolute",
                  top: 0,
                  width: 80,
                },
              }}
            >
              <Stack spacing={1.5}>
                <Typography color="primary.main" variant="overline">
                  Origini e filosofia
                </Typography>
                <Typography component="h3" variant="h3">
                  Un metodo nato dall&apos;esperienza del corpo.
                </Typography>
              </Stack>

              <Stack spacing={2.25} sx={{ maxWidth: 720 }}>
                <Typography color="text.secondary">
                  Il sistema è stato ideato negli anni Ottanta dal ballerino
                  professionista di origine rumena Juliu Horvath. Dopo un grave
                  infortunio che ne compromise la carriera, sviluppò questa
                  disciplina unendo i principi chiave di yoga, danza, tai chi e
                  nuoto.
                </Typography>
                <Typography color="text.secondary">
                  L&apos;obiettivo è aumentare la flessibilità, rinforzare i
                  muscoli profondi, decomprimere le articolazioni e migliorare
                  l&apos;allineamento della colonna vertebrale.
                </Typography>
              </Stack>
            </Box>
          </FadeInOnScroll>
        </Stack>
      </AppContainer>
    </AppSection>
  );
}
