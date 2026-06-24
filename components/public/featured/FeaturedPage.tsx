import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";

const featuredItems = [
  {
    eyebrow: "Identity",
    title: "A visual language for a new idea",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    color: "primary.light",
  },
  {
    eyebrow: "Digital",
    title: "A quieter kind of digital experience",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam pellentesque ornare sem lacinia.",
    color: "secondary.light",
  },
  {
    eyebrow: "Campaign",
    title: "Turning a small moment into a story",
    description:
      "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.",
    color: "accent.light",
  },
];

export function FeaturedPage() {
  return (
    <AppSection>
      <AppContainer>
        <Stack spacing={2} sx={{ maxWidth: 760, mb: { xs: 5, md: 7 } }}>
          <Typography color="primary.main" variant="overline">
            Featured
          </Typography>
          <Typography component="h1" variant="h2">
            A selection of work worth spending time with.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. These neutral project blocks
            can be replaced with client imagery and final case-study copy.
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 4, md: 6 }}>
          {featuredItems.map((item, index) => (
            <AppCard key={item.title} sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { md: "1.35fr 1fr" },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    minHeight: { xs: 260, md: 420 },
                    bgcolor: item.color,
                    order: { md: index % 2 === 0 ? 0 : 1 },
                  }}
                />
                <Stack spacing={2} sx={{ alignSelf: "center", p: { xs: 3, md: 5 } }}>
                  <Typography color="primary.main" variant="overline">
                    {item.eyebrow}
                  </Typography>
                  <Typography component="h2" variant="h3">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.description}</Typography>
                </Stack>
              </Box>
            </AppCard>
          ))}
        </Stack>
      </AppContainer>
    </AppSection>
  );
}
