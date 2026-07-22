"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { siteConfig } from "@/seo/site.config";

const navigation = [
  { href: "/", label: "Studio" },
  { href: "/palestra", label: "Palestra" },
  { href: "/massaggi", label: "Massaggi" },
  { href: "/prenotazioni", label: "Prenotazioni" },
  { href: "/news", label: "Novita" },
  { href: "/contact", label: "Contatti" },
];

function isActiveRoute(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavigationItem = (item: (typeof navigation)[number]) => {
    const isActive = isActiveRoute(item.href, pathname);

    return (
      <Typography component="span" key={item.href} variant="subtitle2">
        <Box
          component={Link}
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
          sx={{
            color: "text.light",
            display: "inline-flex",
            pb: 0.5,
            position: "relative",
            textDecoration: "none",
            "&::after": {
              bgcolor: "currentColor",
              bottom: 0,
              content: '""',
              height: 0.01,
              left: 0,
              position: "absolute",
              right: 0,
              transform: isActive ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left center",
              transition: "transform 220ms ease",
            },
            "&:hover::after, &:focus-visible::after": {
              transform: "scaleX(1)",
            },
            "&:focus-visible": {
              borderRadius: 0.5,
              outline: "2px solid currentColor",
              outlineOffset: 4,
            },
          }}
        >
          {item.label}
        </Box>
      </Typography>
    );
  };

  return (
    <Box
      component="header"
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "rgba(238, 250, 249, 0.24)",
        color: "text.light",
      }}
    >
      <AppContainer>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: { xs: "flex-start", md: "center" },
            minHeight: { xs: 72, sm: 78, md: "auto" },
            position: "relative",
            pr: { xs: 6, md: 0 },
            py: { xs: 1.5, sm: 2, md: 3.25 },
            textAlign: { xs: "left", md: "center" },
          }}
        >
          <Box sx={{ color: "text.light" }}>
            <Typography color="text.light" component="div" variant="h4">
              <Link href="/" className="text-inherit no-underline">
                {siteConfig.siteName}
              </Link>
            </Typography>
            <Typography color="text.light" variant="caption">
              Pilates, Gyrotonic e massaggi a Rapallo
            </Typography>
          </Box>
          <IconButton
            aria-controls="mobile-primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            onClick={() => setMenuOpen((open) => !open)}
            sx={{
              border: 1,
              borderColor: "currentColor",
              borderRadius: 5,
              color: "text.light",
              display: { xs: "inline-flex", md: "none" },
              height: 35,
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 35,
              "&:focus-visible": {
                outline: "2px solid currentColor",
                outlineOffset: 4,
              },
            }}
          >
            <Box
              aria-hidden
              component="span"
              sx={{
                display: "grid",
                gap: "4px",
                width: 15,
              }}
            >
              <Box
                component="span"
                sx={{
                  bgcolor: "currentColor",
                  borderRadius: 999,
                  height: 1.5,
                  transform: menuOpen
                    ? "translateY(5.5px) rotate(45deg)"
                    : "none",
                  transition: "transform 200ms ease",
                  width: "100%",
                }}
              />
              <Box
                component="span"
                sx={{
                  bgcolor: "currentColor",
                  borderRadius: 999,
                  height: 1.5,
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 160ms ease",
                  width: "100%",
                }}
              />
              <Box
                component="span"
                sx={{
                  bgcolor: "currentColor",
                  borderRadius: 999,
                  height: 1.5,
                  transform: menuOpen
                    ? "translateY(-5.5px) rotate(-45deg)"
                    : "none",
                  transition: "transform 200ms ease",
                  width: "100%",
                }}
              />
            </Box>
          </IconButton>
        </Box>

        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{
            borderTop: 1,
            borderColor: "rgba(238, 250, 249, 0.24)",
            color: "text.light",
            display: { xs: "none", md: "flex" },
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3 },
            justifyContent: "center",
            py: { xs: 1.25, sm: 1.5 },
          }}
        >
          {navigation.map(renderNavigationItem)}
        </Box>
        <Collapse
          in={menuOpen}
          id="mobile-primary-navigation"
          sx={{ display: { md: "none" } }}
          timeout={240}
          unmountOnExit
        >
          <Box
            component="nav"
            aria-label="Mobile primary navigation"
            sx={{
              borderTop: 1,
              borderColor: "rgba(238, 250, 249, 0.24)",
              color: "text.light",
              pb: { xs: 1.75, sm: 2 },
              pt: { xs: 1.25, sm: 1.5 },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: { xs: 1, sm: 1.15 },
                justifyItems: "start",
              }}
            >
              {navigation.map(renderNavigationItem)}
            </Box>
          </Box>
        </Collapse>
      </AppContainer>
    </Box>
  );
}
