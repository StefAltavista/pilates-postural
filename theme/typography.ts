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
    fontSize: "3.75rem",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0,
    "@media (max-width:900px)": { fontSize: "3rem" },
    "@media (max-width:600px)": { fontSize: "2.35rem" },
  },
  h2: {
    fontFamily: titleFontFamily,
    fontSize: "2.75rem",
    fontWeight: 680,
    lineHeight: 1.12,
    letterSpacing: 0,
    "@media (max-width:900px)": { fontSize: "2.25rem" },
    "@media (max-width:600px)": { fontSize: "1.95rem" },
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
    fontSize: "1.1rem",
    fontWeight: 400,
    lineHeight: 1.55,
    "@media (max-width:600px)": { fontSize: "1rem" },
  },
  subtitle2: {
    fontFamily: secondaryFontFamily,
    fontSize: "0.95rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.65,
    "@media (max-width:600px)": { fontSize: "0.95rem", lineHeight: 1.6 },
  },
  body2: {
    fontSize: "0.92rem",
    fontWeight: 400,
    lineHeight: 1.6,
    "@media (max-width:600px)": { fontSize: "0.88rem" },
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
    fontSize: "clamp(2.5rem, 1.5rem + 3vw, 4rem)",
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: 0,
    overflowWrap: "anywhere",
  },
  sectionTitle: {
    fontFamily: titleFontFamily,
    fontSize: "clamp(2rem, 1.25rem + 2.5vw, 3.75rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: 0,
    overflowWrap: "anywhere",
  },
  secondarySubtitle: {
    fontFamily: textFontFamily,
    fontSize: "clamp(1.125rem, 0.95rem + 0.6vw, 1.5rem)",
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
