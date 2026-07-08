import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

const palestraItems = [
  {
    eyebrow: "Pilates",
    title: "Reformer e lavoro posturale",
    description:
      "Lezioni individuali o in piccoli gruppi per migliorare allineamento, tono e controllo del movimento.",
    color: "primary.light",
  },
  {
    eyebrow: "Attrezzi",
    title: "Barrel e Cadillac",
    description:
      "Supporti versatili per mobilizzare la colonna, aprire il respiro e accompagnare esercizi piu precisi.",
    color: "secondary.light",
  },
  {
    eyebrow: "Gyrotonic",
    title: "Movimento fluido e tridimensionale",
    description:
      "Sequenze circolari per lavorare su coordinazione, elasticita e sensazione di spazio nel corpo.",
    color: "accent.light",
  },
];

export function PalestraPage() {
  return (
    <AppSection>
      <AppContainer>
        <Stack spacing={2} sx={{ maxWidth: 780, mb: { xs: 5, md: 7 } }}>
          <Typography color="primary.main" variant="overline">
            Palestra
          </Typography>
          <Typography component="h1" variant="h2">
            Pilates, attrezzi e Gyrotonic per il movimento quotidiano.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Uno spazio raccolto dove il corpo viene accompagnato con attenzione: dal respiro alla
            postura, dalla forza profonda alla mobilita.
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 4, md: 6 }}>
          {palestraItems.map((item, index) => (
            <AppCard key={item.title} sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "1.35fr 1fr" },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    minHeight: { xs: 240, md: 360 },
                    bgcolor: item.color,
                    order: { md: index % 2 === 0 ? 0 : 1 },
                  }}
                />
                <Stack spacing={2} sx={{ alignSelf: "center", p: { xs: 3, md: 5 } }}>
                  <Typography color="primary.main" variant="overline">
                    {item.eyebrow}
                  </Typography>
                  <Typography component="h2" variant="h3">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.description}</Typography>
                </Stack>
              </Box>
            </AppCard>
          ))}
        </Stack>
      </AppContainer>
    </AppSection>
  );
}

