"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppCheckbox } from "@/components/common/AppCheckbox";
import { useConsent } from "@/lib/consent/useConsent";

export function CookieBanner() {
  const {
    consent,
    isReady,
    hasDecision,
    setConsent,
    acceptAllConsent,
    rejectOptionalConsent,
    clearConsent,
  } = useConsent();
  const [managing, setManaging] = useState(false);
  const [googleMapsEnabled, setGoogleMapsEnabled] = useState(true);
  const showDevControls = process.env.NODE_ENV === "development";

  function openSettings() {
    setGoogleMapsEnabled(consent?.googleMaps ?? true);
    setManaging(true);
  }

  function saveSettings() {
    setConsent({ googleMaps: googleMapsEnabled });
    setManaging(false);
  }

  function clearSavedChoice() {
    clearConsent();
    setGoogleMapsEnabled(true);
    setManaging(false);
  }

  if (!isReady) {
    return null;
  }

  return (
    <>
      {!hasDecision ? (
        <Box
          component="aside"
          aria-label="Preferenze cookie e servizi esterni"
          sx={{
            position: "fixed",
            zIndex: "snackbar",
            right: { xs: 16, sm: 24 },
            bottom: { xs: 16, sm: 24 },
            left: { xs: 16, sm: "auto" },
            width: { sm: 480 },
          }}
        >
          <AppCard sx={{ p: { xs: 2.5, sm: 3 }, boxShadow: 6 }}>
            <Typography variant="h5">Servizi esterni opzionali</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              Questo sito usa la memoria locale solo per ricordare la tua scelta. Google Maps e
              opzionale e resta bloccato finche non dai il consenso.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 2.5 }}>
              <AppButton onClick={acceptAllConsent}>Accetta tutto</AppButton>
              <AppButton variant="outlined" color="inherit" onClick={rejectOptionalConsent}>
                Rifiuta opzionali
              </AppButton>
              <AppButton variant="text" color="inherit" onClick={openSettings}>
                Gestisci
              </AppButton>
            </Stack>
          </AppCard>
        </Box>
      ) : null}

      {hasDecision ? (
        <IconButton
          aria-label="Apri preferenze cookie"
          onClick={openSettings}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            bottom: { xs: 16, sm: 24 },
            boxShadow: 3,
            color: "text.light",
            fontSize: 20,
            height: 44,
            position: "fixed",
            right: { xs: 16, sm: 24 },
            width: 44,
            zIndex: "snackbar",
            "&:hover": { bgcolor: "background.paper", boxShadow: 6 },
          }}
        >
          <Box component="span" aria-hidden="true" sx={{ lineHeight: 1 }}>
            C
          </Box>
        </IconButton>
      ) : null}

      <Dialog open={managing} onClose={() => setManaging(false)} fullWidth maxWidth="xs">
        <DialogTitle>Gestisci servizi esterni</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            La memoria necessaria e sempre attiva per ricordare questa scelta. Non sono usate
            categorie analytics, marketing, profilazione o pubblicita.
          </Typography>
          <AppCheckbox checked disabled label="Necessari (sempre attivi)" />
          <AppCheckbox
            checked={googleMapsEnabled}
            label="Google Maps"
            helperText="Permette il caricamento della mappa incorporata fornita da Google."
            onChange={(event) => setGoogleMapsEnabled(event.target.checked)}
          />
          {showDevControls ? (
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 2.5, pt: 2 }}>
              <AppButton color="warning" size="small" variant="outlined" onClick={clearSavedChoice}>
                SOLO DEV: cancella scelta
              </AppButton>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <AppButton variant="text" color="inherit" onClick={() => setManaging(false)}>
            Annulla
          </AppButton>
          <AppButton onClick={saveSettings}>Salva scelte</AppButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
