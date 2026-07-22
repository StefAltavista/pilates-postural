import type {
  CSSObject,
  PaletteColor,
  SimplePaletteColorOptions,
} from "@mui/material/styles";

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
    primaryTitle: CSSObject;
    secondarySubtitle: CSSObject;
    quote: CSSObject;
    link: CSSObject;
  }

  interface TypographyVariantsOptions {
    primaryTitle?: CSSObject;
    secondarySubtitle?: CSSObject;
    quote?: CSSObject;
    link?: CSSObject;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    light: string;
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
