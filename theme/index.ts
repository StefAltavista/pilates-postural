"use client";

import { createTheme } from "@mui/material/styles";
import { components } from "./components";
import { palette } from "./palette";
import { typography } from "./typography";

export const theme = createTheme({
  cssVariables: true,
  palette,
  typography,
  spacing: 8,
  shape: { borderRadius: 8 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components,
});
