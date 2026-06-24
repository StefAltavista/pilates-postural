import type { CSSProperties } from "react";
import type { PaletteColor, SimplePaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand: PaletteColor;
    accent: PaletteColor;
    surface: PaletteColor;
    surfaceAlt: PaletteColor;
    border: PaletteColor;
    muted: PaletteColor;
    overlay: PaletteColor;
  }

  interface PaletteOptions {
    brand?: SimplePaletteColorOptions;
    accent?: SimplePaletteColorOptions;
    surface?: SimplePaletteColorOptions;
    surfaceAlt?: SimplePaletteColorOptions;
    border?: SimplePaletteColorOptions;
    muted?: SimplePaletteColorOptions;
    overlay?: SimplePaletteColorOptions;
  }

  interface TypographyVariants {
    primaryTitle: CSSProperties;
    secondarySubtitle: CSSProperties;
    quote: CSSProperties;
    link: CSSProperties;
  }

  interface TypographyVariantsOptions {
    primaryTitle?: CSSProperties;
    secondarySubtitle?: CSSProperties;
    quote?: CSSProperties;
    link?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    primaryTitle: true;
    secondarySubtitle: true;
    quote: true;
    link: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand: true;
    accent: true;
  }
}

export {};
