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
          aria-label="Cookie and external service preferences"
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
            <Typography variant="h5">Optional external services</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              This site uses local storage only to remember your choice. Google Maps is optional
              and remains blocked until you consent.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 2.5 }}>
              <AppButton onClick={acceptAllConsent}>Accept all</AppButton>
              <AppButton variant="outlined" color="inherit" onClick={rejectOptionalConsent}>
                Reject optional
              </AppButton>
              <AppButton variant="text" color="inherit" onClick={openSettings}>
                Manage settings
              </AppButton>
            </Stack>
          </AppCard>
        </Box>
      ) : null}

      {hasDecision ? (
        <IconButton
          aria-label="Open cookie preferences"
          onClick={openSettings}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            bottom: { xs: 16, sm: 24 },
            boxShadow: 3,
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
            🍪
          </Box>
        </IconButton>
      ) : null}

      <Dialog open={managing} onClose={() => setManaging(false)} fullWidth maxWidth="xs">
        <DialogTitle>Manage external services</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            Necessary storage is always active because it remembers this choice. No analytics,
            marketing, profiling, or advertising categories are used.
          </Typography>
          <AppCheckbox checked disabled label="Necessary (always active)" />
          <AppCheckbox
            checked={googleMapsEnabled}
            label="Google Maps"
            helperText="Allows embedded maps provided by Google to load."
            onChange={(event) => setGoogleMapsEnabled(event.target.checked)}
          />
          {showDevControls ? (
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 2.5, pt: 2 }}>
              <AppButton color="warning" size="small" variant="outlined" onClick={clearSavedChoice}>
                ONLY DEV: clear cookies
              </AppButton>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <AppButton variant="text" color="inherit" onClick={() => setManaging(false)}>
            Cancel
          </AppButton>
          <AppButton onClick={saveSettings}>Save choices</AppButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
