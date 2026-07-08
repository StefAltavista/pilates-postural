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
            Contatti
          </Typography>
          <Typography component="h1" variant="h2">
            Vieni a trovarci a Rapallo.
          </Typography>
          <Typography color="text.secondary" variant="secondarySubtitle">
            Per informazioni su Pilates, Gyrotonic, massaggi e disponibilita puoi chiamare lo
            studio o raggiungerci in Vicolo del Ghiaccio.
          </Typography>
        </Stack>

        <AppCard sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2">Telefono</Typography>
              <Typography color="text.secondary">+39 349 174 7713</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Studio</Typography>
              <Typography color="text.secondary">
                Vicolo del Ghiaccio, 9
                <br />
                16035 Rapallo GE, Italy
              </Typography>
            </Box>
          </Stack>
        </AppCard>

        <Box sx={{ mt: 5 }}>
          <GoogleMapsEmbed
            embedUrl="https://www.google.com/maps?q=Vicolo%20del%20Ghiaccio%209%2C%2016035%20Rapallo%20GE%2C%20Italy&output=embed"
            title="Pilates Postural Studio a Rapallo"
          />
        </Box>
      </AppContainer>
    </AppSection>
  );
}
