export const typographyFontMap = {
  text: {
    name: "Bubbler One",
    family: '"Bubbler One"',
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Bubbler+One&display=swap",
  },

  secondary: {
    name: "Elms Sans",
    family: '"Elms Sans"',
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap",
  },
  primary: {
    name: "Alata",
    family: '"Alata"',
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Alata,wght@0,6..96,400..900;1,6..96,400..900&display=swap",
  },
  title: {
    name: "Noto",
    family: '"Noto Serif Display"',
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&display=swap",
  },
} as const;

export const googleFontStylesheets = Object.values(typographyFontMap).map(
  (font) => font.googleFontUrl,
);
