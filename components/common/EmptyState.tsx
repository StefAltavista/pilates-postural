import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        gap: 1,
        border: 1,
        borderColor: "border.main",
        borderRadius: 1.5,
        bgcolor: "surfaceAlt.main",
        px: 3,
        py: 6,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {description ? (
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      ) : null}
      {action ? <Box sx={{ mt: 1 }}>{action}</Box> : null}
    </Box>
  );
}
