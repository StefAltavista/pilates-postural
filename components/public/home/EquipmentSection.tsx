import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import Stack from "@mui/material/Stack";

export function EquipmentSection() {
  return (
    <AppSection
      aria-label="Lo studio e gli attrezzi"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <FadeInOnScroll>
        <AppContainer>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 2.5, md: 3 },
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              maxWidth: 1040,
              mx: "auto",
              width: "100%",
            }}
          >
            {[
              {
                // src: "/images/home/home1.jpg",
                src: "/images/palestra/PHOTO-2026-07-29-17-28-20(4).jpg",
                alt: "Attrezzi Pilates nello studio",
              },

              { label: "Reformer & Cadillac", subtitle: "Lezioni in gruppo" },
              { label: "Barrel & Gyrotonic", subtitle: "Lezioni private" },
              {
                src: "/images/home/home3.jpg",
                alt: "Sala attrezzi dello studio",
              },
            ].map((item) => (
              <Box
                key={"label" in item ? item.label : item.src}
                sx={{
                  alignItems: "center",
                  aspectRatio: "1 / 1",
                  bgcolor:
                    "label" in item ? "surfaceAlt.light" : "surfaceAlt.dark",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  p: "label" in item ? { xs: 2.5, sm: 4, md: 6 } : 0,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {"label" in item ? (
                  <Stack>
                    {" "}
                    <Typography
                      color="text.primary"
                      component="h2"
                      sx={{
                        fontSize: "clamp(1.45rem, 1rem + 2.5vw, 3.5rem)",
                        lineHeight: 1.08,
                      }}
                      variant="sectionTitle"
                    >
                      {item.label}
                    </Typography>{" "}
                    <Typography
                      color="text.primary"
                      component="aside"
                      // sx={{
                      //   fontSize: "clamp(1.45rem, 1rem + 2.5vw, 3.5rem)",
                      //   lineHeight: 1.08,
                      // }}
                      variant="body1"
                    >
                      {item.subtitle}
                    </Typography>
                  </Stack>
                ) : (
                  <OptimizedImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 50vw, 520px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
