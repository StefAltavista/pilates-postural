import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function BookingIntroSection() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Box
          aria-hidden="true"
          sx={{ flex: "none", width: { xs: 100, sm: 300 } }}
        >
          <OptimizedImage
            src="/icons/calendar.png"
            alt=""
            width={200}
            height={200}
          />
        </Box>{" "}
        <Stack spacing={{ xs: 1.5, sm: 2 }} sx={{ alignItems: "center" }}>
          <Typography component="h1" variant="primaryTitle">
            Prenota la tua lezione di Pilates Reformer.
          </Typography>
        </Stack>
      </Stack>
      <Typography color="text.secondary" variant="secondarySubtitle">
        Scegli il giorno e l&apos;orario piu comodi per la tua lezione. Il
        calendario e aggiornato con le disponibilita dello studio: sentiti
        libera di prenotare direttamente online.
      </Typography>{" "}
    </Stack>
  );
}
