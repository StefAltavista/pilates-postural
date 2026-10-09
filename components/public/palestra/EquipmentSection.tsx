import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const equipment = [
  {
    number: "01",
    title: "Reformer",
    quality: "Precisione e controllo",
    description:
      "Il carrello scorrevole e le molle accompagnano ogni gesto, rendendo il lavoro preciso, graduale e personale.",
    image: "/images/palestra/PHOTO-2026-07-29-17-28-20(4).jpg",
    imagePosition: "38% center",
    alt: "Reformer in legno nella sala Pilates dello studio",
  },
  {
    number: "02",
    title: "Gyrotonic machine",
    quality: "Fluidità e respiro",
    description:
      "Pulegge e maniglie disegnano traiettorie circolari, per un movimento continuo che lascia spazio alla colonna.",
    image: "/images/palestra/3.jpg",
    imagePosition: "18% 76%",
    alt: "Gyrotonic machine nella sala attrezzi dello studio",
  },
  {
    number: "03",
    title: "Barrel",
    quality: "Apertura e mobilità",
    description:
      "La sua curva sostiene il corpo e invita ad aprire il torace, allungare la schiena e cambiare prospettiva.",
    image: "/images/palestra/1.jpg",
    imagePosition: "82% center",
    alt: "Barrel in legno nella sala Pilates dello studio",
  },
];

export function EquipmentSection() {
  return (
    <AppSection sx={{ bgcolor: "surface.light" }}>
      <AppContainer>
        <FadeInOnScroll>
          <Stack spacing={1.5} sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
            <Typography color="primary.main" variant="overline">
              Gli attrezzi della sala
            </Typography>
            <Typography component="h2" variant="sectionTitle">
              Tre forme, tre sensazioni di movimento.
            </Typography>
            <Typography color="text.secondary" variant="secondarySubtitle">
              Ogni macchina accompagna il corpo in modo diverso. Non serve
              conoscerle già: basta iniziare a muoversi.
            </Typography>
          </Stack>
        </FadeInOnScroll>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 2.5, lg: 3 },
            gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          {equipment.map((item, index) => (
            <FadeInOnScroll delayMs={index * 100} key={item.title}>
              <Box component="article">
                <Box
                  sx={{
                    aspectRatio: { xs: "4 / 3", md: "4 / 5" },
                    bgcolor: "surfaceAlt.dark",
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    "&::after": {
                      background:
                        "linear-gradient(180deg, transparent 54%, rgba(10, 46, 43, 0.52) 100%)",
                      content: '\"\"',
                      inset: 0,
                      pointerEvents: "none",
                      position: "absolute",
                    },
                  }}
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 899px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: item.imagePosition }}
                  />
                  <Typography
                    aria-hidden="true"
                    component="span"
                    sx={{
                      bottom: 16,
                      color: "common.white",
                      fontFamily: "inherit",
                      fontSize: "0.82rem",
                      letterSpacing: "0.12em",
                      position: "absolute",
                      right: 18,
                      zIndex: 1,
                    }}
                  >
                    {item.number}
                  </Typography>
                </Box>

                <Stack spacing={1} sx={{ pt: 2.25 }}>
                  <Typography color="primary.main" variant="overline">
                    {item.quality}
                  </Typography>
                  <Typography component="h3" variant="h3">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </Stack>
              </Box>
            </FadeInOnScroll>
          ))}
        </Box>
      </AppContainer>
    </AppSection>
  );
}
