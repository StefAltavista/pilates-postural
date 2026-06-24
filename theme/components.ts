import type { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      "*, *::before, *::after": { boxSizing: "border-box" },
      html: { scrollBehavior: "smooth" },
      body: { minHeight: "100vh" },
      "::selection": { backgroundColor: "rgba(29, 78, 216, 0.2)" },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        minHeight: 42,
        borderRadius: 8,
        paddingInline: 20,
      },
      sizeSmall: { minHeight: 36, paddingInline: 14 },
      sizeLarge: { minHeight: 48, paddingInline: 24 },
    },
  },
  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
        [theme.breakpoints.up("lg")]: {
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
        },
      }),
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: 12,
        backgroundImage: "none",
      }),
    },
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { backgroundImage: "none" },
      outlined: ({ theme }) => ({ borderColor: theme.palette.border.main }),
    },
  },
  MuiTextField: {
    defaultProps: { size: "small", variant: "outlined" },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 42,
        borderRadius: 8,
        backgroundColor: theme.palette.surface.main,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.secondary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 2 },
      }),
      notchedOutline: ({ theme }) => ({ borderColor: theme.palette.border.main }),
    },
  },
  MuiLink: {
    defaultProps: { underline: "hover" },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        fontWeight: 600,
        textUnderlineOffset: "0.18em",
      }),
    },
  },
};
