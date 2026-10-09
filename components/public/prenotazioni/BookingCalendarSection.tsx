import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CalBookingEmbed } from "./CalBookingEmbed";

export function BookingCalendarSection() {
  const calEventUrl = process.env.NEXT_PUBLIC_CALCOM_EVENT_URL ?? "";

  return (
    <>
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
    </>
  );
}
