import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PostModalImage, type PostDisplayImage } from "@/components/public/posts/PostModalImage";

export function PostContentSection({ content, firstImage }: { content: string; firstImage?: PostDisplayImage }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 4, sm: 5 },
        gridTemplateAreas: {
          xs: '"image" "content"',
          lg: '"content image"',
        },
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 2fr) minmax(0, 3fr)",
        },
        alignItems: "start",
      }}
    >
      <Box sx={{ gridArea: "content" }}>
        <Typography
          component="div"
          sx={{ whiteSpace: "pre-wrap" }}
          variant="body1"
        >
          {content}
        </Typography>
      </Box>
      <Box sx={{ gridArea: "image", minWidth: 0 }}>
        {firstImage ? (
          <PostModalImage image={firstImage} priority />
        ) : null}
      </Box>
    </Box>
  );
}
