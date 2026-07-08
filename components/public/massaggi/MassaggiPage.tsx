import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

const massaggiItems = [
  {
    eyebrow: "Massoterapia",
    title: "Trattamenti per tensioni e recupero",
    description:
      "Massaggi mirati per alleggerire rigidita muscolari, sostenere il recupero e ritrovare una sensazione di leggerezza.",
    color: "primary.light",
  },
  {
    eyebrow: "Benessere",
    title: "Ascolto del corpo",
    description:
      "Ogni trattamento viene adattato alla persona, al momento e alle zone che richiedono piu attenzione.",
    color: "secondary.light",
  },
  {
    eyebrow: "Integrazione",
    title: "Movimento e trattamento manuale",
    description:
      "La parte manuale dialoga con Pilates e Gyrotonic per costruire un percorso piu completo sul benessere.",
    color: "accent.light",
  },
];

export function MassaggiPage() {
  return (
    <AppSection>
      <AppContainer>
        <Stack spacing={2} sx={{ maxWidth: 780, mb: { xs: 5, md: 7 } }}>
          <Typography color="primary.main" variant="overline">
            Massaggi
          </Typography>
          <Typography component="h1" variant="h2">
            Massaggi e trattamenti per rilascio, recupero e benessere.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Una proposta semplice e accogliente per sciogliere tensioni, migliorare percezione
            corporea e sostenere il percorso di movimento.
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 4, md: 6 }}>
          {massaggiItems.map((item, index) => (
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

