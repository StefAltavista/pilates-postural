import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const highlights = [
  {
    title: "Pilates posturale",
    text: "Percorsi a corpo libero e con attrezzi per ritrovare allineamento, respiro e controllo.",
    image: "/icons/reformer.png",
  },
  {
    title: "Massoterapia",
    text: "Trattamenti manuali pensati per alleggerire tensioni, accompagnare il recupero e favorire benessere.",
    image: "/icons/gyrotonic.png",
  },
  {
    title: "Gyrotonic",
    text: "Movimenti circolari e fluidi per dare spazio alla colonna e migliorare mobilita e coordinazione.",
    image: "/icons/massage.png",
  },
];

export function MovementSection() {
  return (
    <AppSection id="movimento">
      <FadeInOnScroll>
        <AppContainer>
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography color="text.secondary" variant="overline">
              Movimento, Pilates, Gyrotonic
            </Typography>
            <Typography component="h2" variant="sectionTitle">
              Percorsi per muoversi con piu liberta
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
            }}
          >
            {highlights.map((item) => (
              <AppCard
                key={item.title}
                sx={{
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  color: "surfaceAlt.light",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "4 / 3",
                    // bgcolor: "surfaceAlt.light",
                    bgcolor: "white",

                    border: "none",
                    position: "relative",
                  }}
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Stack spacing={1} sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Typography component="h3" variant="h4">
                    {item.title}
                  </Typography>
                  <Typography color="surfaceAlt.light" variant="body2">
                    {item.text}
                  </Typography>
                </Stack>
              </AppCard>
            ))}
          </Box>
        </AppContainer>
      </FadeInOnScroll>
    </AppSection>
  );
}
