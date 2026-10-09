import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function ContactIntroSection() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 680, mb: 5 }}>
      <Typography component="h1" variant="primaryTitle">
        Vieni a trovarci a Rapallo.
      </Typography>
      <Typography color="text.secondary" variant="secondarySubtitle">
        Per informazioni su Pilates, Gyrotonic, massaggi e disponibilita puoi chiamare lo
        studio o raggiungerci in Vicolo del Ghiaccio.
      </Typography>
    </Stack>
  );
}
