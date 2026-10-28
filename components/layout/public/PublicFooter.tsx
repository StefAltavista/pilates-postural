"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { siteConfig } from "@/seo/site.config";
import { publicNavigation } from "./navigation";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/privacy-policy", label: "Privacy e dati" },
  { href: "/cookie-policy", label: "Cookie policy" },
];

const footerLinkSx = {
  color: "text.primary",
  display: "inline-flex",
  textDecoration: "none",
  textUnderlineOffset: "0.22em",
  width: "fit-content",
  "&:hover": { color: "primary.dark", textDecoration: "underline" },
  "&:focus-visible": {
    borderRadius: 0.5,
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 4,
  },
};

export function PublicFooter() {
  // const showContactDetails =
  //   pathname !== "/" && !pathname.startsWith("/contact");

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "surfaceAlt.light",
        color: "text.primary",
        pb: { xs: 6, md: 8 },
        pt: { xs: 8, md: 12 },
      }}
    >
      <AppContainer>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              md: true
                ? "repeat(3, minmax(0, 1fr))"
                : "repeat(2, minmax(0, 1fr))",
            },
          }}
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pb: { xs: 7, md: 0 },
              px: { md: 4, lg: 6 },
              textAlign: "center",
            }}
          >
            <Box
              component={Link}
              href="/"
              aria-label={`${siteConfig.siteName}, torna alla home`}
              sx={{
                display: "block",
                height: { xs: 170, sm: 190, md: 210 },
                position: "relative",
                width: { xs: 244, sm: 272, md: 300 },
                "&:focus-visible": {
                  borderRadius: 1,
                  outline: "2px solid ",
                  outlineColor: "primary.main",
                  outlineOffset: 5,
                },
              }}
            >
              <OptimizedImage
                src="/images/logo_official.png"
                alt={siteConfig.siteName}
                fill
                sizes="248px"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </Box>
          </Stack>

          <Stack
            component="nav"
            aria-label="Navigazione nel footer"
            spacing={2.5}
            sx={{
              alignItems: "center",
              borderLeft: { xs: "none", md: "2px solid white" },
              borderTop: { md: "none", xs: "2px solid white" },

              pb: { xs: true ? 5 : 0, md: 0 },
              px: { md: 4, lg: 6 },
              textAlign: "center",
              pt: { xs: 7, md: 0 },
            }}
          >
            {publicNavigation.map((item) => (
              <Typography component="span" key={item.href} variant="body1">
                <Box component={Link} href={item.href} sx={footerLinkSx}>
                  {item.label}
                </Box>
              </Typography>
            ))}
          </Stack>

          {true ? (
            <Stack
              spacing={3.25}
              sx={{
                alignItems: "center",
                borderLeft: { xs: "none", md: "2px solid white" },
                borderTop: { md: "none", xs: "2px solid white" },
                px: { md: 4, lg: 6 },
                textAlign: "center",
                pt: { xs: 7, md: 0 },
              }}
            >
              <Stack
                component="address"
                spacing={2}
                sx={{ alignItems: "center", fontStyle: "normal" }}
              >
                <Typography variant="body1">
                  <Box component={Link} href="/contact" sx={footerLinkSx}>
                    Vicolo del Ghiaccio 9, Rapallo
                  </Box>
                </Typography>
                <Typography variant="body1">
                  <Box component="a" href="tel:+393491747713" sx={footerLinkSx}>
                    +39 349 174 7713
                  </Box>
                </Typography>
                {/* </Stack>

              <Stack
                component="nav"
                aria-label="Informazioni legali"
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  gap: "10px 20px",
                  justifyContent: "center",
                }}
              > */}
                {legalLinks.map((item) => (
                  <Typography component="span" key={item.href} variant="body1">
                    <Box component={Link} href={item.href} sx={footerLinkSx}>
                      {item.label}
                    </Box>
                  </Typography>
                ))}
              </Stack>
            </Stack>
          ) : null}
        </Box>
      </AppContainer>
    </Box>
  );
}
