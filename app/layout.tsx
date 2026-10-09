import type { Metadata } from "next";
import { AppProviders } from "@/app/providers";
import { siteConfig } from "@/seo/site.config";
import { googleFontStylesheets } from "@/theme/fontMap";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  authors: [{ name: "Andrea Maresca" }],
  creator: "Andrea Maresca",
  publisher: siteConfig.siteName,
  keywords: [
    "Pilates Rapallo",
    "Pilates posturale",
    "Pilates Reformer",
    "Gyrotonic Rapallo",
    "massoterapia Rapallo",
    "postura",
    "mobilità",
    "benessere",
  ],
  openGraph: {
    type: "website",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    url: siteConfig.siteUrl,
    images: [
      {
        url: siteConfig.defaultImage,
        width: siteConfig.defaultImageWidth,
        height: siteConfig.defaultImageHeight,
        alt: siteConfig.defaultImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.defaultImage,
        width: siteConfig.defaultImageWidth,
        height: siteConfig.defaultImageHeight,
        alt: siteConfig.defaultImageAlt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {googleFontStylesheets.map((href) => (
          <link href={href} key={href} rel="stylesheet" />
        ))}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
