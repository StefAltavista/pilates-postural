import Box from "@mui/material/Box";
import { ImageDotCarousel } from "@/components/public/ImageDotCarousel";
import { type PostDisplayImage } from "@/components/public/posts/PostModalImage";

export function PostGallerySection({ remainingImages }: { remainingImages: PostDisplayImage[] }) {
  return (
    <>
      {remainingImages.length ? (
        <Box
          component="section"
          aria-label="Altre immagini dell'articolo"
          sx={{
            mt: 5,
            mx: { lg: "auto" },
            width: { xs: "100%", lg: "70%" },
          }}
        >
          <ImageDotCarousel images={remainingImages} showActiveTitle />
        </Box>
      ) : null}
    </>
  );
}
