export const siteConfig = {
  siteName: "Pilates Postural Studio",
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
  defaultTitle: "Pilates Postural Studio - Pilates, Gyrotonic e massaggi a Rapallo",
  defaultDescription:
    "Studio a Rapallo dedicato a Pilates posturale, Gyrotonic, movimento consapevole e massoterapia.",
  defaultImage: "/images/home/DSC_0445_2.jpg",
  locale: "it_IT",
} as const;
