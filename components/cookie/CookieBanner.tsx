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
    hasDecision,
    setConsent,
    acceptAllConsent,
    rejectOptionalConsent,
  } = useConsent();
  const [managing, setManaging] = useState(false);
  const [googleMapsEnabled, setGoogleMapsEnabled] = useState(true);

  function openSettings() {
    setGoogleMapsEnabled(consent?.googleMaps ?? true);
    setManaging(true);
  }

  function saveSettings() {
    setConsent({ googleMaps: googleMapsEnabled });
    setManaging(false);
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
      ) : (
        <IconButton
          aria-label="Review cookie and external service preferences"
          title="Review privacy preferences"
          onClick={openSettings}
          sx={{
            position: "fixed",
            zIndex: "snackbar",
            right: { xs: 16, sm: 24 },
            bottom: { xs: 16, sm: 24 },
            width: 44,
            height: 44,
            border: 1,
            borderColor: "border.main",
            bgcolor: "background.paper",
            boxShadow: 3,
            fontSize: 22,
            "&:hover": { bgcolor: "surfaceAlt.main" },
          }}
        >
          <span aria-hidden="true">🍪</span>
        </IconButton>
      )}

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
