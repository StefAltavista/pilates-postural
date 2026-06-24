import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { siteConfig } from "@/seo/site.config";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/impressum", label: "Impressum" },
];

export function PublicFooter() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "surfaceAlt.main", borderTop: 1, borderColor: "divider", py: 3 }}
    >
      <AppContainer>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography color="text.secondary" variant="body2">
            {siteConfig.siteName} © {new Date().getFullYear()}
          </Typography>
          <Stack
            component="nav"
            aria-label="Legal navigation"
            direction="row"
            sx={{ flexWrap: "wrap", gap: 2 }}
          >
            {legalLinks.map((item) => (
              <Typography component="span" key={item.href} variant="body2">
                <Link href={item.href} className="text-inherit underline underline-offset-4">
                  {item.label}
                </Link>
              </Typography>
            ))}
          </Stack>
        </Stack>
      </AppContainer>
    </Box>
  );
}
