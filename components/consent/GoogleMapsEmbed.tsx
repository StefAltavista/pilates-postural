"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { useConsent } from "@/lib/consent/useConsent";

type GoogleMapsEmbedProps = {
  embedUrl: string;
  title?: string;
};

export function GoogleMapsEmbed({ embedUrl, title = "Google Maps" }: GoogleMapsEmbedProps) {
  const { hasGoogleMapsConsent, acceptAllConsent } = useConsent();

  if (hasGoogleMapsConsent) {
    return (
      <Box
        component="iframe"
        src={embedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        sx={{ display: "block", width: "100%", minHeight: 400, border: 0, borderRadius: 1.5 }}
      />
    );
  }

  return (
    <AppCard sx={{ display: "grid", minHeight: 400, placeItems: "center", p: 3 }}>
      <Stack spacing={2} sx={{ maxWidth: 500, textAlign: "center" }}>
        <Typography component="h2" variant="h5">
          Google Maps è bloccato
        </Typography>
        <Typography color="text.secondary" variant="body2">
          La mappa è fornita da Google e può trasferire dati a Google. Verrà caricata solo dopo il
          consenso al servizio opzionale Google Maps.
        </Typography>
        <Box>
          <AppButton onClick={acceptAllConsent}>Consenti Google Maps</AppButton>
        </Box>
      </Stack>
    </AppCard>
  );
}
