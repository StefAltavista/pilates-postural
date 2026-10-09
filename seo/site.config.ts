function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function isLocalUrl(url: string) {
  try {
    const hostname = new URL(withProtocol(url)).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function resolveSiteUrl() {
  const configuredUrl = process.env.SITE_URL;

  if (configuredUrl && !isLocalUrl(configuredUrl)) {
    return withProtocol(configuredUrl);
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

  if (vercelUrl) {
    return withProtocol(vercelUrl);
  }

  return configuredUrl ? withProtocol(configuredUrl) : "http://localhost:3000";
}

export const siteConfig = {
  siteName: "Pilates Postural Studio",
  siteUrl: resolveSiteUrl(),
  defaultTitle:
    "Pilates Postural Studio | Pilates, Gyrotonic e massoterapia a Rapallo",
  defaultDescription:
    "A Rapallo, uno studio dedicato a Pilates posturale, Reformer, Gyrotonic e massoterapia. Percorsi personalizzati per postura, mobilità e benessere.",
  defaultImage: "/images/logo_background.png?v=2",
  defaultImageAlt:
    "Pilates Postural Studio di Andrea Maresca, studio Pilates e Gyrotonic a Rapallo",
  defaultImageWidth: 1420,
  defaultImageHeight: 1560,
  locale: "it_IT",
} as const;
