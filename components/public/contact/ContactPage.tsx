import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { GoogleMapsEmbed } from "@/components/consent/GoogleMapsEmbed";

export function ContactPage() {
  return (
    <AppSection>
      <AppContainer maxWidth="md">
        <Stack spacing={2} sx={{ maxWidth: 680, mb: 5 }}>
          <Typography color="primary.main" variant="overline">
            Contact
          </Typography>
          <Typography component="h1" variant="h2">
            Let&apos;s start a conversation.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Share a project, ask a
            question, or simply introduce yourself.
          </Typography>
        </Stack>

        <AppCard sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2">Email</Typography>
              <Typography color="text.secondary">hello@example.com</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Phone</Typography>
              <Typography color="text.secondary">+00 123 456 789</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Studio</Typography>
              <Typography color="text.secondary">
                Example Street 12
                <br />
                10000 Example City
              </Typography>
            </Box>
          </Stack>
        </AppCard>

        <Box sx={{ mt: 5 }}>
          <GoogleMapsEmbed
            embedUrl="https://www.google.com/maps?q=Rome%2C%20Italy&output=embed"
            title="Studio location"
          />
        </Box>
      </AppContainer>
    </AppSection>
  );
}
