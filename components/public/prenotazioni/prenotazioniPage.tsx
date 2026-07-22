import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { CalBookingEmbed } from "./CalBookingEmbed";

const calEventUrl = process.env.NEXT_PUBLIC_CALCOM_EVENT_URL ?? "";

export function PrenotazioniPage() {
  return (
    <AppSection>
      <AppContainer>
        <Stack spacing={2} sx={{ maxWidth: 780, mb: { xs: 4, md: 6 } }}>
          <Typography color="primary.main" variant="overline">
            Prenotazioni
          </Typography>
          <Typography component="h1" variant="h2">
            Prenota la tua lezione di Pilates Reformer.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Scegli il giorno e l&apos;orario piu comodi per la tua lezione. Il calendario e aggiornato
            con le disponibilita dello studio: sentiti libera di prenotare direttamente online.
          </Typography>
        </Stack>

        <Box
          sx={{
            border: 1,
            borderColor: "border.main",
            borderRadius: 3,
            bgcolor: "surface.light",
            overflow: "hidden",
          }}
        >
          <CalBookingEmbed eventUrl={calEventUrl} />
        </Box>

        <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
          Preferisci aprire il calendario in una nuova scheda?{" "}
          <Link href={calEventUrl || "https://cal.com/stef-ltv/pilates-reformer"} target="_blank">
            Vai alla pagina di prenotazione
          </Link>
          .
        </Typography>
      </AppContainer>
    </AppSection>
  );
}
