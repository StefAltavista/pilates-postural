import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/lib/format";

export function PostHeaderSection({ title, postDate, excerpt }: { title: string; postDate: Date; excerpt: string | null }) {
  return (
    <Box component="header" sx={{ mb: 4 }}>
      <Typography component="h1" variant="primaryTitle">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
        {formatDate(postDate)}
      </Typography>
      {excerpt ? (
        <Typography
          component="p"
          color="text.secondary"
          sx={{ mt: 2, mb: 0, maxWidth: 900 }}
          variant="secondarySubtitle"
        >
          {excerpt}
        </Typography>
      ) : null}
    </Box>
  );
}
