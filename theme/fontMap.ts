export const typographyFontMap = {
  // primary: {
  //   name: "Bubbler One",
  //   family: '"Bubbler One"',
  //   googleFontUrl:
  //     "https://fonts.googleapis.com/css2?family=Bubbler+One&display=swap",
  // },
  text: {
    name: "Happy Monkey",
    family: '"Happy Monkey"',
    googleFontUrl:
      "https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap",
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
      "https://fonts.googleapis.com/css2?family=Alata&display=swap",
  },
} as const;

export const googleFontStylesheets = Object.values(typographyFontMap).map(
  (font) => font.googleFontUrl,
);
