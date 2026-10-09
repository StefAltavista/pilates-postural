import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";

export function ContactDetailsSection() {
  return (
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
  );
}
