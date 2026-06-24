import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

const highlights = [
  {
    title: "A considered approach",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem at arcu luctus posuere.",
    color: "primary.light",
  },
  {
    title: "Built around the story",
    text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.",
    color: "secondary.light",
  },
  {
    title: "Made to be remembered",
    text: "Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum.",
    color: "accent.light",
  },
];

export function HomePage() {
  return (
    <>
      <AppSection sx={{ pt: { xs: 6, md: 10 } }}>
        <AppContainer>
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              gap: { xs: 4, md: 7 },
              gridTemplateColumns: { md: "minmax(0, 1fr) minmax(320px, 0.85fr)" },
            }}
          >
            <Stack spacing={3} sx={{ maxWidth: 700 }}>
              <Typography color="primary.main" variant="overline">
                Independent showcase
              </Typography>
              <Typography component="h1" variant="primaryTitle">
                Ideas, projects, and stories with a point of view.
              </Typography>
              <Typography color="text.secondary" variant="secondarySubtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur
                est at lobortis, donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <AppButton href="/featured">Explore featured work</AppButton>
                <AppButton href="/news" color="inherit" variant="outlined">
                  Read the news
                </AppButton>
              </Stack>
            </Stack>
            <Box
              aria-hidden="true"
              sx={{
                minHeight: { xs: 280, md: 430 },
                borderRadius: 2,
                bgcolor: "surfaceAlt.dark",
              }}
            />
          </Box>
        </AppContainer>
      </AppSection>

      <AppSection sx={{ bgcolor: "surfaceAlt.main" }}>
        <AppContainer maxWidth="md">
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { md: "0.6fr 1fr" } }}>
            <Typography component="h2" variant="h3">
              A simple place for meaningful work.
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis
              interdum. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada
              magna mollis euismod. This section is ready for a client introduction, studio
              statement, or concise company profile.
            </Typography>
          </Box>
        </AppContainer>
      </AppSection>

      <AppSection id="featured">
        <AppContainer>
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography color="primary.main" variant="overline">
              Latest highlights
            </Typography>
            <Typography component="h2" variant="h3">
              Selected work and recent stories
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            }}
          >
            {highlights.map((item) => (
              <AppCard key={item.title} sx={{ overflow: "hidden" }}>
                <Box aria-hidden="true" sx={{ aspectRatio: "4 / 3", bgcolor: item.color }} />
                <Stack spacing={1} sx={{ p: 2.5 }}>
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
      </AppSection>
    </>
  );
}
