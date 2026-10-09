export const siteConfig = {
  siteName: "Pilates Postural Studio",
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
  defaultTitle:
    "Pilates Postural Studio | Pilates, Gyrotonic e massoterapia a Rapallo",
  defaultDescription:
    "A Rapallo, uno studio dedicato a Pilates posturale, Reformer, Gyrotonic e massoterapia. Percorsi personalizzati per postura, mobilità e benessere.",
  defaultImage: "/images/logo_background.png",
  defaultImageAlt:
    "Pilates Postural Studio di Andrea Maresca, studio Pilates e Gyrotonic a Rapallo",
  defaultImageWidth: 1420,
  defaultImageHeight: 1560,
  locale: "it_IT",
} as const;
