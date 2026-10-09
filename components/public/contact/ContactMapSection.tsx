import Box from "@mui/material/Box";
import { GoogleMapsEmbed } from "@/components/consent/GoogleMapsEmbed";

export function ContactMapSection() {
  return (
    <Box sx={{ mt: 5 }}>
      <GoogleMapsEmbed
        embedUrl="https://www.google.com/maps?q=Vicolo%20del%20Ghiaccio%209%2C%2016035%20Rapallo%20GE%2C%20Italy&output=embed"
        title="Pilates Postural Studio a Rapallo"
      />
    </Box>
  );
}
