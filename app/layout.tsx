import type { Metadata } from "next";
import { AppProviders } from "@/app/providers";
import { siteConfig } from "@/seo/site.config";
import { googleFontStylesheets } from "@/theme/fontMap";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
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
