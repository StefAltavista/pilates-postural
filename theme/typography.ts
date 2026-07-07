import type { TypographyVariantsOptions } from "@mui/material/styles";

const fontFamily = [
  "Inter",
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "sans-serif",
].join(",");

export const typography: TypographyVariantsOptions = {
  fontFamily,
  htmlFontSize: 16,
  fontSize: 16,
  h1: {
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontSize: "clamp(1.875rem, 4vw, 3rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 650,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  h4: { fontSize: "1.5rem", fontWeight: 650, lineHeight: 1.3 },
  h5: { fontSize: "1.25rem", fontWeight: 650, lineHeight: 1.35 },
  h6: { fontSize: "1rem", fontWeight: 650, lineHeight: 1.4 },
  subtitle1: { fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.55, textAlign: "justify" },
  subtitle2: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.65, textAlign: "justify" },
  body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6, textAlign: "justify" },
  button: {
    fontSize: "0.875rem",
    fontWeight: 650,
    lineHeight: 1.25,
    letterSpacing: "0.01em",
    textTransform: "none",
  },
  caption: { fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.5 },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.08em",
  },
  primaryTitle: {
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
  },
  secondarySubtitle: {
    fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
    fontWeight: 400,
    lineHeight: 1.55,
    textAlign: "justify",
  },
  quote: {
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
    fontStyle: "italic",
    fontWeight: 450,
    lineHeight: 1.6,
  },
  link: {
    color: "inherit",
    fontSize: "inherit",
    fontWeight: 600,
    lineHeight: "inherit",
    textDecoration: "underline",
    textDecorationThickness: "0.08em",
    textUnderlineOffset: "0.18em",
  },
};
