import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

export function EquipmentSection() {
  return (
    <AppSection
      aria-label="Lo studio e gli attrezzi"
      sx={{ bgcolor: "surface.light", color: "text.primary" }}
    >
      <FadeInOnScroll>
        <AppContainer>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 0.8, sm: 1, md: 1.5 },
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              maxWidth: 1040,
              mx: "auto",
              width: "100%",
            }}
          >
            {[
              {
                src: "/images/palestra/PHOTO-2026-07-29-17-28-20(4).jpg",
                alt: "Attrezzi Pilates nello studio",
              },

              {
                title: "Lezioni di gruppo",
                subtitle:
                  "Lezioni guidate per migliorare postura, forza e mobilità",
                buttonLabel: "Prenota",
                href: "/prenotazioni",
              },
              {
                title: "Lezioni private",
                subtitle: "Esercizi personalizzati in base alle tue esigenze.",
                buttonLabel: "Contattaci",
                href: "/contact",
              },
              {
                src: "/images/home/home3.jpg",
                alt: "Sala attrezzi dello studio",
              },
            ].map((item) => (
              <Box
                key={"subtitle" in item ? item.subtitle : item.src}
                sx={{
                  alignItems: "center",
                  aspectRatio: "2 / 1.5",
                  bgcolor:
                    "subtitle" in item ? "surfaceAlt.light" : "surfaceAlt.dark",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  p: "subtitle" in item ? { xs: 2.5, sm: 4, md: 6 } : 0,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {"subtitle" in item ? (
                  <Stack
                    spacing={{ xs: 1.5, sm: 2.5 }}
                    sx={{ alignItems: "center" }}
                  >
                    <Typography
                      color="text.primary"
                      component="h4"
                      sx={{
                        fontSize: "clamp(1rem, 0.72rem + 1.1vw, 1.55rem)",
                        lineHeight: 1.2,
                      }}
                      variant="h5"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      color="text.primary"
                      component="p"
                      sx={{
                        fontSize: "clamp(1rem, 0.7rem + 1vw, 1.2rem)",
                        lineHeight: 1.2,
                      }}
                      variant="caption"
                    >
                      {item.subtitle}
                    </Typography>
                    <AppButton href={item.href} size="small" variant="outlined">
                      {item.buttonLabel}
                    </AppButton>
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
