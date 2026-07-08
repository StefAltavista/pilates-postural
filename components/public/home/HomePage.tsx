import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const highlights = [
  {
    title: "Pilates posturale",
    text: "Percorsi a corpo libero e con attrezzi per ritrovare allineamento, respiro e controllo.",
    image: "/images/home/7158gup8241.jpg",
  },
  {
    title: "Gyrotonic",
    text: "Movimenti circolari e fluidi per dare spazio alla colonna e migliorare mobilita e coordinazione.",
    image: "/images/home/7708nku8078.jpg",
  },
  {
    title: "Massoterapia",
    text: "Trattamenti manuali pensati per alleggerire tensioni, accompagnare il recupero e favorire benessere.",
    image: "/images/home/3750ybc1742.jpg",
  },
];

const apparatus = ["Reformer", "Barrel", "Gyrotonic machine", "Cadillac"];

export function HomePage() {
  return (
    <>
      <AppSection sx={{ bgcolor: "background.default", pt: { xs: 4, md: 7 } }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: {
                  md: "minmax(0, 1fr) minmax(320px, 0.85fr)",
                },
                "& > :first-of-type": {
                  order: { xs: 2, md: 1 },
                },
                "& > :last-child": {
                  order: { xs: 1, md: 2 },
                },
              }}
            >
              <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 700 }}>
                <Typography component="h1" variant="primaryTitle">
                  Pilates Postural Studio
                </Typography>
                <Typography color="primary.main" variant="overline">
                  di Andrea Maresca
                </Typography>
                <Typography color="text.secondary" variant="secondarySubtitle">
                  Uno spazio dedicato a Pilates, Gyrotonic, postura e massaggi.
                  Qui il movimento diventa ascolto, respiro e cura del corpo.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <AppButton href="/news">Leggi le notvità</AppButton>
                  <AppButton
                    href="/prenotazioni"
                    color="inherit"
                    variant="outlined"
                  >
                    Prenotazioni
                  </AppButton>
                </Stack>
              </Stack>

              <Box
                sx={{
                  minHeight: { xs: 310, sm: 360, md: 460 },
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: 2,
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,

                    maskImage: "url('/images/logo.png')",
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",

                    WebkitMaskImage: "url('/images/logo.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -20,

                      backgroundImage: "url('/images/default_img2.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",

                      filter: "blur(2px)",
                      transform: "scale(1.04)",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection sx={{ bgcolor: "background.default", color: "primary.main" }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: { md: "0.9fr 1.1fr" },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                }}
              >
                {[
                  "/images/home/7330sdy9721.jpg",
                  "/images/home/4.jpg",
                  "/images/home/3.jpg",
                  "/images/home/6778nog9742.jpg",
                ].map((image, index) => (
                  <Box
                    key={image}
                    sx={{
                      aspectRatio: index === 0 ? "3 / 4" : "4 / 3",
                      borderRadius: 2,
                      bgcolor: "surfaceAlt.main",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <OptimizedImage
                      src={image}
                      alt="Dettaglio dello studio Pilates Postural"
                      fill
                      sizes="(max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
              <Stack spacing={{ xs: 2, md: 2.5 }}>
                <Typography color="primary.main" variant="overline">
                  Attrezzi e metodo
                </Typography>
                <Typography component="h2" variant="h3">
                  Reformer, Barrel, Gyrotonic machine e Cadillac
                </Typography>
                <Typography color="primary.main" variant="body1">
                  Gli attrezzi aiutano a modulare intensita e sostegno:
                  permettono un lavoro preciso sulla colonna, sul centro, sulla
                  mobilita articolare e sulla qualita del gesto.
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {apparatus.map((item) => (
                    <Box
                      component="span"
                      key={item}
                      sx={{
                        bgcolor: "surfaceAlt.main",
                        border: 1,
                        borderColor: "border.main",
                        borderRadius: 999,
                        color: "primary.dark",
                        px: 2,
                        py: 0.75,
                      }}
                    >
                      <Typography component="span" variant="subtitle2">
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection id="movimento">
        <FadeInOnScroll>
          <AppContainer>
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Typography color="primary.main" variant="overline">
                Movimento, Pilates, Gyrotonic
              </Typography>
              <Typography component="h2" variant="h3">
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
                <AppCard key={item.title} sx={{ overflow: "hidden" }}>
                  <Box
                    sx={{
                      aspectRatio: "4 / 3",
                      bgcolor: "surfaceAlt.dark",
                      position: "relative",
                    }}
                  >
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Stack spacing={1} sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Typography component="h3" variant="h5">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {item.text}
                    </Typography>
                  </Stack>
                </AppCard>
              ))}
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection sx={{ bgcolor: "background.default", pt: { xs: 4, md: 7 } }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: {
                  md: "minmax(0, 1fr) minmax(320px, 0.85fr)",
                },
                "& > :first-of-type": {
                  order: { xs: 2, md: 1 },
                },
                "& > :last-child": {
                  order: { xs: 1, md: 2 },
                },
              }}
            >
              <Box
                sx={{
                  minHeight: { xs: 310, sm: 360, md: 460 },
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: 2,
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,

                    maskImage: "url('/images/teaser1.png')",
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",

                    WebkitMaskImage: "url('/images/teaser1.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -20,

                      backgroundImage: "url('/images/default_img2.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",

                      filter: "blur(2px)",
                      transform: "scale(1.04)",
                    }}
                  />
                </Box>
              </Box>
              <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 700 }}>
                <Typography component="h2" variant="primaryTitle">
                  Movimento guidato, preciso, personalizzato
                </Typography>

                <Typography color="primary.main" variant="overline">
                  Reformer, Cadillac, Chair, Barrel e piccoli attrezziReformer,
                  Cadillac, Chair, Barrel e piccoli attrezzi
                </Typography>

                <Typography color="text.secondary" variant="secondarySubtitle">
                  Ogni attrezzo permette di costruire un percorso preciso: dal
                  rinforzo profondo alla mobilità, dalla rieducazione posturale
                  al controllo del movimento. Le macchine accompagnano il corpo,
                  lo sostengono dove serve e lo guidano verso un lavoro più
                  consapevole ed efficace.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <AppButton href="/palestra">Scopri la palestra</AppButton>
                </Stack>
              </Stack>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection
        sx={{
          bgcolor: "background.paper",
          color: "text.light",
          py: { xs: 4, sm: 5, md: 7 },
        }}
      >
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: { md: "0.65fr 1fr" },
                alignItems: "center",
              }}
            >
              <Stack spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 700 }}>
                <Typography
                  component="h2"
                  color="text.light"
                  variant="primaryTitle"
                >
                  Every body is welcome
                </Typography>
                <Typography color="text.light" variant="overline">
                  Consapevolezza del corpo
                </Typography>
                <Typography color="text.light" variant="body1">
                  Imparare ad ascoltare il corpo, riconoscerne i segnali e
                  ritrovare un movimento più consapevole, naturale e presente.
                </Typography>{" "}
                <Typography color="text.light" variant="body1">
                  Le lezioni e i trattamenti sono pensati per persone diverse:
                  chi vuole muoversi meglio, chi cerca sostegno dopo periodi di
                  tensione, chi desidera migliorare tono, equilibrio e
                  percezione corporea con un approccio rispettoso.
                </Typography>
              </Stack>

              <Box
                sx={{
                  aspectRatio: { xs: "16 / 10", md: "4 / 3" },
                  borderRadius: 2,
                  bgcolor: "surfaceAlt.dark",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <OptimizedImage
                  src="/images/home/7330sdy9721.jpg"
                  alt="Studio Pilates Postural a Rapallo"
                  fill
                  sizes="(max-width: 900px) 100vw, 36vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection sx={{ bgcolor: "background.default", color: "primary.main" }}>
        <FadeInOnScroll>
          <AppContainer>
            <Stack
              spacing={{ xs: 1.5, md: 2 }}
              sx={{ alignItems: "center", textAlign: "center" }}
            >
              <Typography component="h2" variant="h3">
                Vicolo del Ghiaccio 9, Rapallo
              </Typography>
              <Typography sx={{ maxWidth: 720 }} variant="body1">
                Per informazioni su lezioni, trattamenti e disponibilita puoi
                contattare lo studio al numero +39 349 174 7713.
              </Typography>
              <AppButton href="tel:+393491747713" color="secondary">
                Chiama lo studio
              </AppButton>
            </Stack>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>
    </>
  );
}
