import Typography from "@mui/material/Typography";

export function PolicyHeader({ title }: { title: string }) {
  return (
    <Typography component="h1" variant="sectionTitle" sx={{ mb: 4 }}>
      {title}
    </Typography>
  );
}
