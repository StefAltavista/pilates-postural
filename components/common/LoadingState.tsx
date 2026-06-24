import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <Box
      aria-live="polite"
      aria-busy="true"
      sx={{ display: "grid", justifyItems: "center", gap: 2, py: 8 }}
    >
      <CircularProgress size={32} />
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
    </Box>
  );
}
