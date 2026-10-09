import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function NewsIntroSection() {
  return (
    <Stack spacing={2} sx={{ mb: 10 }}>
      <Typography color="primary.main" variant="overline">
        Novità
      </Typography>
      <Typography component="h1" variant="primaryTitle">
        Aggiornamenti dallo studio.
      </Typography>
      <Typography color="text.secondary" variant="secondarySubtitle">
        Comunicazioni, approfondimenti e piccoli spunti dedicati a benessere e
        pratica.
      </Typography>
    </Stack>
  );
}
