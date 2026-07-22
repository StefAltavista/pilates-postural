"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { FadeInOnScroll } from "@/components/common/FadeInOnScroll";
import { OptimizedImage } from "@/components/common/OptimizedImage";

const toolGroups = [
  {
    id: "reformer",
    eyebrow: "Pilates",
    title: "Reformer e lavoro posturale",
    description:
      "Il carrello mobile e le molle accompagnano il corpo in un lavoro preciso su centro, allineamento e controllo.",
    image: "/images/palestra/12.jpg",
    imageAlt: "Reformer nello studio Pilates Postural",
    imagePosition: "center",
    history:
      "Il Reformer nasce dal lavoro di Joseph Pilates nel Novecento. L'idea era usare molle, cinghie e una superficie mobile per creare resistenza controllata, assistenza e feedback immediato durante l'esercizio.",
    purpose:
      "Serve a migliorare forza profonda, stabilita, coordinazione e postura. Il carrello scorrevole rende visibili compensi e asimmetrie, mentre le molle permettono di dosare il lavoro in modo dolce o intenso in base alla persona.",
  },
  {
    id: "barrel-cadillac",
    eyebrow: "Attrezzi",
    title: "Barrel e Cadillac",
    description:
      "Due strumenti complementari per sostenere la colonna, aprire il respiro e dare al movimento una direzione piu chiara.",
    image: "/images/palestra/6.jpg",
    imageAlt: "Barrel e Cadillac nello spazio Pilates",
    imagePosition: "center",
    history:
      "Barrel e Cadillac appartengono alla famiglia degli attrezzi sviluppati intorno al metodo Pilates. La Cadillac, chiamata anche Trapeze Table, nasce dall'uso di molle e supporti sopra un lettino; il Barrel lavora invece con curve pensate per accompagnare la forma naturale della colonna.",
    purpose:
      "Il Barrel aiuta estensione, flessione e mobilita della schiena, con un sostegno molto utile per aprire il torace. La Cadillac permette esercizi assistiti, trazioni leggere, lavoro sulle braccia e sulle gambe, e progressioni molto controllate.",
  },
  {
    id: "gyrotonic",
    eyebrow: "Gyrotonic",
    title: "Movimento fluido e tridimensionale",
    description:
      "La pulley tower guida spirali, cerchi e onde: un lavoro continuo che mette insieme respiro, ritmo e mobilita.",
    image: "/images/palestra/5.jpg",
    imageAlt: "Esercizio Gyrotonic con pulley tower",
    imagePosition: "center",
    history:
      "Il Gyrotonic nasce dal lavoro di Juliu Horvath e dalla ricerca di un movimento piu circolare, elastico e tridimensionale. La macchina con pulegge permette di trasformare la resistenza in un gesto fluido, senza interrompere il respiro.",
    purpose:
      "E utile per migliorare coordinazione, mobilita articolare, percezione dello spazio e liberta della colonna. Le traiettorie circolari invitano il corpo a uscire dalla rigidita lineare e a ritrovare continuita.",
  },
];

const methodItems = [
  {
    title: "Percorsi su misura",
    text: "Le lezioni possono essere individuali o in piccoli gruppi, con intensita e obiettivi adattati al corpo della persona.",
  },
  {
    title: "Tecnica e ascolto",
    text: "Ogni attrezzo diventa un supporto per capire meglio il gesto, non solo per renderlo piu difficile.",
  },
  {
    title: "Continuita",
    text: "Il lavoro in palestra puo dialogare con massaggi e trattamenti, cosi il corpo viene seguito in modo piu completo.",
  },
];

export function PalestraPage() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  return (
    <>
      <AppSection sx={{ bgcolor: "background.default", pt: { xs: 4, md: 7 } }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: { xs: 4, md: 7 },
                gridTemplateColumns: {
                  md: "minmax(360px, 1.08fr) minmax(0, 0.92fr)",
                },
              }}
            >
              <Box
                sx={{
                  alignItems: "end",
                  display: "grid",
                  gap: { xs: 2, sm: 2.5 },
                  gridTemplateColumns: "0.82fr 1fr",
                  minHeight: { xs: 430, sm: 500, md: 560 },
                }}
              >
                <Box
                  sx={{
                    alignSelf: "start",
                    aspectRatio: "3 / 4",
                    bgcolor: "surfaceAlt.dark",
                    borderRadius: 2,
                    boxShadow: "0 24px 70px rgba(6, 75, 65, 0.18)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <OptimizedImage
                    src="/images/palestra/5.jpg"
                    alt="Esercizio Gyrotonic nello studio"
                    fill
                    priority
                    sizes="(max-width: 900px) 42vw, 26vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </Box>

                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      aspectRatio: "4 / 3",
                      bgcolor: "surfaceAlt.main",
                      borderRadius: 2,
                      boxShadow: "0 18px 54px rgba(6, 75, 65, 0.14)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <OptimizedImage
                      src="/images/palestra/12.jpg"
                      alt="Reformer e attrezzi Pilates nello studio"
                      fill
                      sizes="(max-width: 900px) 52vw, 32vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </Box>
                  <AppCard
                    sx={{
                      bgcolor: "surface.light",
                      borderColor: "border.light",
                      borderRadius: 2,
                      boxShadow: "0 16px 46px rgba(6, 75, 65, 0.14)",
                      p: { xs: 2.25, md: 3 },
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography color="primary.main" variant="overline">
                        Attrezzi e metodo
                      </Typography>
                      <Typography component="h2" variant="h4">
                        La macchina sostiene, il corpo impara.
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Molle, cinghie, pulegge e curve non sostituiscono il
                        movimento: lo rendono piu leggibile, dosabile e
                        rispettoso.
                      </Typography>
                    </Stack>
                  </AppCard>
                </Stack>
              </Box>

              <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: 660 }}>
                <Typography color="primary.main" variant="overline">
                  Palestra
                </Typography>
                <Typography component="h1" variant="h2">
                  Pilates, attrezzi e Gyrotonic per dare forma al movimento.
                </Typography>
                <Typography color="text.secondary" variant="secondarySubtitle">
                  Uno spazio raccolto dove Reformer, Barrel, Cadillac e
                  Gyrotonic machine aiutano il corpo a ritrovare forza gentile,
                  mobilita e presenza.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <AppButton href="/prenotazioni">Prenota una lezione</AppButton>
                </Stack>
              </Stack>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>

      <AppSection sx={{ bgcolor: "background.default", pt: { xs: 2, md: 4 } }}>
        <AppContainer>
          <FadeInOnScroll>
            <Stack spacing={1.25} sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
              <Typography color="primary.main" variant="overline">
                Gli strumenti della palestra
              </Typography>
              <Typography component="h2" variant="h3">
                Tre gruppi di attrezzi, tre qualita di movimento.
              </Typography>
              <Typography color="text.secondary">
                Ogni macchina ha una storia e un compito diverso. Insieme
                permettono di lavorare su postura, controllo, elasticita e
                coordinazione senza perdere ascolto.
              </Typography>
            </Stack>
          </FadeInOnScroll>

          <Stack spacing={{ xs: 4, md: 5 }}>
            {toolGroups.map((item, index) => {
              const isExpanded = expandedTool === item.id;

              return (
                <FadeInOnScroll delayMs={index * 90} key={item.id}>
                  <AppCard sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { md: "1.08fr 0.92fr" },
                      }}
                    >
                      <Box
                        sx={{
                          aspectRatio: { xs: "4 / 3", md: "auto" },
                          bgcolor: "surfaceAlt.main",
                          minHeight: { md: 440 },
                          order: { md: index % 2 === 0 ? 0 : 1 },
                          position: "relative",
                        }}
                      >
                        <OptimizedImage
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 900px) 100vw, 54vw"
                          style={{
                            objectFit: "cover",
                            objectPosition: item.imagePosition,
                          }}
                        />
                      </Box>

                      <Stack
                        spacing={2}
                        sx={{
                          alignSelf: "center",
                          minWidth: 0,
                          p: { xs: 2.5, sm: 3, md: 5 },
                        }}
                      >
                        <Typography color="primary.main" variant="overline">
                          {item.eyebrow}
                        </Typography>
                        <Typography component="h3" variant="h3">
                          {item.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.description}
                        </Typography>

                        <Collapse
                          id={`${item.id}-details`}
                          in={isExpanded}
                          timeout={260}
                          unmountOnExit
                        >
                          <Stack
                            spacing={1.5}
                            sx={{
                              borderTop: 1,
                              borderColor: "border.light",
                              mt: 1,
                              pt: 2,
                            }}
                          >
                            <Box>
                              <Typography
                                color="primary.main"
                                component="h4"
                                variant="subtitle2"
                              >
                                Un po&apos; di storia
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                {item.history}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                color="primary.main"
                                component="h4"
                                variant="subtitle2"
                              >
                                A cosa serve
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                {item.purpose}
                              </Typography>
                            </Box>
                          </Stack>
                        </Collapse>

                        <Box
                          aria-controls={`${item.id}-details`}
                          aria-expanded={isExpanded}
                          component="button"
                          onClick={() =>
                            setExpandedTool(isExpanded ? null : item.id)
                          }
                          type="button"
                          sx={{
                            alignSelf: "flex-start",
                            bgcolor: "transparent",
                            border: 0,
                            color: "primary.main",
                            cursor: "pointer",
                            display: "inline-flex",
                            font: "inherit",
                            p: 0,
                            position: "relative",
                            textDecoration: "none",
                            "&::after": {
                              bgcolor: "currentColor",
                              bottom: -3,
                              content: '""',
                              height: 1,
                              left: 0,
                              position: "absolute",
                              right: 0,
                              transform: "scaleX(1)",
                              transformOrigin: "left center",
                              transition: "transform 220ms ease",
                            },
                            "&:hover::after, &:focus-visible::after": {
                              transform: "scaleX(0.72)",
                            },
                            "&:focus-visible": {
                              borderRadius: 0.5,
                              outline: "2px solid currentColor",
                              outlineOffset: 5,
                            },
                          }}
                        >
                          <Typography component="span" variant="subtitle2">
                            {isExpanded ? "Riduci testo" : "Leggi di piu"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </AppCard>
                </FadeInOnScroll>
              );
            })}
          </Stack>
        </AppContainer>
      </AppSection>

      <AppSection sx={{ bgcolor: "background.paper", color: "text.light" }}>
        <FadeInOnScroll>
          <AppContainer>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: { lg: "0.7fr 1.3fr" },
              }}
            >
              <Stack spacing={1.5} sx={{ maxWidth: 520 }}>
                <Typography color="text.light" variant="overline">
                  Metodo in sala
                </Typography>
                <Typography component="h2" variant="h3">
                  Il lavoro sugli attrezzi resta concreto, progressivo e
                  personale.
                </Typography>
                <Typography color="text.light" sx={{ opacity: 0.86 }}>
                  La palestra non e pensata come una sequenza standard, ma come
                  un laboratorio sul gesto: ogni esercizio viene scelto per dare
                  una risposta al corpo che arriva in studio.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 2, md: 2.5 },
                  gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
                }}
              >
                {methodItems.map((item, index) => (
                  <FadeInOnScroll delayMs={index * 90} key={item.title}>
                    <AppCard
                      sx={{
                        bgcolor: "rgba(238, 250, 249, 0.08)",
                        borderColor: "rgba(238, 250, 249, 0.28)",
                        borderRadius: 2,
                        color: "text.light",
                        height: "100%",
                        p: { xs: 2.5, md: 3 },
                      }}
                    >
                      <Stack spacing={1.25}>
                        <Typography component="h3" variant="h4">
                          {item.title}
                        </Typography>
                        <Typography color="text.light" sx={{ opacity: 0.82 }}>
                          {item.text}
                        </Typography>
                      </Stack>
                    </AppCard>
                  </FadeInOnScroll>
                ))}
              </Box>
            </Box>
          </AppContainer>
        </FadeInOnScroll>
      </AppSection>
    </>
  );
}
