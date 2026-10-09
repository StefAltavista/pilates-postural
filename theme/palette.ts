import type { PaletteOptions } from "@mui/material/styles";

/**
 * Client-facing colors live here so a new brand can be applied without
 * searching through component overrides or application code.
 */
export const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#26585c",
    light: "#86D8CB",
    dark: "#38b5be",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#4da6a7",
    light: "#A8DCE9",
    dark: "#26585c",
    contrastText: "#FFFFFF",
  },
  error: { main: "#DC2626", light: "#F87171", dark: "#991B1B" },
  warning: { main: "#B7791F", light: "#F6D58A", dark: "#7A4B0C" },
  info: { main: "#207EA3", light: "#A7E5F3", dark: "#0B526A" },
  success: { main: "#177B52", light: "#8FE0BD", dark: "#0A4D33" },
  background: {
    default: "#f1f9f9",
    paper: "#4da6a7",
  },

  text: {
    primary: "#26585c",
    secondary: "#436B66",
    disabled: "#87A6A0",
  },
  divider: "#BFE3DC",
  brand: {
    main: "#0F6F61",
    light: "#D6F5EF",
    dark: "#144e59",
    contrastText: "#FFFFFF",
  },
  accent: {
    main: "#58AFA6",
    light: "#D8F2EE",
    dark: "#1F7068",
    contrastText: "#FFFFFF",
  },
  surface: {
    main: "#F8FFFC",
    light: "#FFFFFF",
    dark: "#D8EEE8",
    contrastText: "#1c5358",
  },
  surfaceAlt: {
    main: "#DDF6EF",
    light: "#eefaf9",
    dark: "#A9D9D0",
    contrastText: "#1a4b53",
  },
  border: {
    main: "#B9DED7",
    light: "#DDF3EE",
    dark: "#77AFA5",
    contrastText: "#173C37",
  },
  muted: {
    main: "#5E817C",
    light: "#A9C8C2",
    dark: "#3F625D",
    contrastText: "#FFFFFF",
  },
  overlay: {
    main: "rgba(6, 75, 65, 0.48)",
    light: "rgba(6, 75, 65, 0.18)",
    dark: "rgba(6, 61, 75, 0.68)",
    contrastText: "#FFFFFF",
  },
};
