import type { PaletteOptions } from "@mui/material/styles";

/**
 * Client-facing colors live here so a new brand can be applied without
 * searching through component overrides or application code.
 */
export const palette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1D4ED8",
    light: "#60A5FA",
    dark: "#1E3A8A",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#7C3AED",
    light: "#A78BFA",
    dark: "#5B21B6",
    contrastText: "#FFFFFF",
  },
  error: { main: "#DC2626", light: "#F87171", dark: "#991B1B" },
  warning: { main: "#D97706", light: "#FBBF24", dark: "#92400E" },
  info: { main: "#0284C7", light: "#38BDF8", dark: "#075985" },
  success: { main: "#15803D", light: "#4ADE80", dark: "#166534" },
  background: {
    default: "#F8FAFC",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#172033",
    secondary: "#526077",
    disabled: "#94A3B8",
  },
  divider: "#DCE2EA",
  brand: {
    main: "#1D4ED8",
    light: "#DBEAFE",
    dark: "#1E3A8A",
    contrastText: "#FFFFFF",
  },
  accent: {
    main: "#DB2777",
    light: "#FCE7F3",
    dark: "#9D174D",
    contrastText: "#FFFFFF",
  },
  surface: {
    main: "#FFFFFF",
    light: "#FFFFFF",
    dark: "#E2E8F0",
    contrastText: "#172033",
  },
  surfaceAlt: {
    main: "#F1F5F9",
    light: "#F8FAFC",
    dark: "#CBD5E1",
    contrastText: "#172033",
  },
  border: {
    main: "#CBD5E1",
    light: "#E2E8F0",
    dark: "#94A3B8",
    contrastText: "#172033",
  },
  muted: {
    main: "#64748B",
    light: "#94A3B8",
    dark: "#475569",
    contrastText: "#FFFFFF",
  },
  overlay: {
    main: "rgba(15, 23, 42, 0.56)",
    light: "rgba(15, 23, 42, 0.24)",
    dark: "rgba(15, 23, 42, 0.72)",
    contrastText: "#FFFFFF",
  },
};
