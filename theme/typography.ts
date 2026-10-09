import type { TypographyVariantsOptions } from "@mui/material/styles";
import { typographyFontMap } from "./fontMap";

const fallbackFontFamily = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "sans-serif",
].join(",");

const buildFontFamily = (fontFamily: string) =>
  [fontFamily, fallbackFontFamily].join(",");

const textFontFamily = buildFontFamily(typographyFontMap.text.family);
const secondaryFontFamily = buildFontFamily(typographyFontMap.secondary.family);
const titleFontFamily = buildFontFamily(typographyFontMap.title.family);
export const typography: TypographyVariantsOptions = {
  fontFamily: textFontFamily,
  htmlFontSize: 16,
  fontSize: 16,
  h1: {
    fontFamily: titleFontFamily,
    fontSize: "4rem",
    fontWeight: 500,
    lineHeight: 1.12,
    letterSpacing: "-0.015em",
    "@media (max-width:900px)": { fontSize: "3.15rem" },
    "@media (max-width:600px)": { fontSize: "2.65rem" },
  },
  h2: {
    fontFamily: titleFontFamily,
    fontSize: "3rem",
    fontWeight: 600,
    lineHeight: 1.12,
    letterSpacing: "-0.012em",
    "@media (max-width:900px)": { fontSize: "2.45rem" },
    "@media (max-width:600px)": { fontSize: "2.2rem" },
  },
  h3: {
    fontFamily: secondaryFontFamily,
    fontSize: "2rem",
    fontWeight: 400,
    lineHeight: 1.22,
    letterSpacing: 0,
    "@media (max-width:900px)": { fontSize: "1.7rem" },
    "@media (max-width:600px)": { fontSize: "1.5rem" },
  },
  h4: {
    fontFamily: secondaryFontFamily,
    fontSize: "1.55rem",
    fontWeight: 400,
    lineHeight: 1.28,
    "@media (max-width:900px)": { fontSize: "1.35rem" },
    "@media (max-width:600px)": { fontSize: "1.2rem" },
  },
  h5: {
    fontFamily: secondaryFontFamily,
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: 1.35,
    "@media (max-width:600px)": { fontSize: "1.1rem" },
  },
  h6: {
    fontFamily: secondaryFontFamily,
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: "1.2rem",
    fontWeight: 400,
    lineHeight: 1.55,
    "@media (max-width:600px)": { fontSize: "1.1rem" },
  },
  subtitle2: {
    fontFamily: secondaryFontFamily,
    fontSize: "0.95rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: 1.65,
    "@media (max-width:600px)": { fontSize: "1.0625rem", lineHeight: 1.6 },
  },
  body2: {
    fontSize: "1.0625rem",
    fontWeight: 400,
    lineHeight: 1.6,
    "@media (max-width:600px)": { fontSize: "1rem" },
  },
  button: {
    fontFamily: secondaryFontFamily,
    fontSize: "0.9rem",
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: 0,
    textTransform: "none",
  },
  caption: { fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.5 },
  overline: {
    fontFamily: secondaryFontFamily,
    fontSize: "1rem",
    fontWeight: 200,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
  },
  // Display titles, editorial section headings, and lead copy share one scale.
  primaryTitle: {
    fontFamily: titleFontFamily,
    fontSize: "clamp(2.8rem, 1.55rem + 3.3vw, 4.35rem)",
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: "-0.015em",
    overflowWrap: "anywhere",
  },
  sectionTitle: {
    fontFamily: titleFontFamily,
    fontSize: "clamp(2.3rem, 1.35rem + 2.7vw, 4rem)",
    fontWeight: 500,
    lineHeight: 1.12,
    letterSpacing: "-0.012em",
    overflowWrap: "anywhere",
  },
  secondarySubtitle: {
    fontFamily: textFontFamily,
    fontSize: "clamp(1.25rem, 1.075rem + 0.6vw, 1.625rem)",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  quote: {
    fontSize: "1.35rem",
    fontStyle: "italic",
    fontWeight: 450,
    lineHeight: 1.6,
  },
  link: {
    color: "inherit",
    fontSize: "inherit",
    fontWeight: 400,
    lineHeight: "inherit",
    textDecoration: "underline",
    textDecorationThickness: "0.08em",
    textUnderlineOffset: "0.18em",
  },
};
