import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { siteConfig } from "@/seo/site.config";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/featured", label: "Featured" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader() {
  return (
    <Box
      component="header"
      sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}
    >
      <AppContainer>
        <Box sx={{ py: { xs: 2.5, sm: 3.5 }, textAlign: "center" }}>
          <Typography component="div" variant="h4">
            <Link href="/" className="text-inherit no-underline">
              {siteConfig.siteName}
            </Link>
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Showcase &amp; stories
          </Typography>
        </Box>

        <Stack
          component="nav"
          aria-label="Primary navigation"
          direction="row"
          spacing={{ xs: 2.5, sm: 4 }}
          sx={{ borderTop: 1, borderColor: "divider", py: 1.5, justifyContent: "center" }}
        >
          {navigation.map((item) => (
            <Typography component="span" key={item.href} variant="subtitle2">
              <Link href={item.href} className="text-inherit no-underline">
                {item.label}
              </Link>
            </Typography>
          ))}
        </Stack>
      </AppContainer>
    </Box>
  );
}
