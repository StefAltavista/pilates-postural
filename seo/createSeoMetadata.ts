import type { Metadata } from "next";
import { siteConfig } from "@/seo/site.config";
import type { PostSeoInput, SeoMetadataInput } from "@/seo/seo.types";

function absoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, siteConfig.siteUrl).toString();
}

export function createSeoMetadata({
  title,
  subtitle,
  excerpt,
  description,
  image,
  imageAlt,
  path,
  noIndex = false,
}: SeoMetadataInput): Metadata {
  const resolvedDescription =
    description || excerpt || subtitle || siteConfig.defaultDescription;
  const usesDefaultImage = !image;
  const resolvedImage = absoluteUrl(image || siteConfig.defaultImage);
  const resolvedImageAlt =
    imageAlt || (usesDefaultImage ? siteConfig.defaultImageAlt : title);
  const canonicalUrl = path ? absoluteUrl(path) : undefined;
  const socialTitle =
    title === siteConfig.siteName
      ? siteConfig.defaultTitle
      : `${title} | ${siteConfig.siteName}`;
  const socialImage = {
    url: resolvedImage,
    alt: resolvedImageAlt,
    ...(usesDefaultImage
      ? {
          width: siteConfig.defaultImageWidth,
          height: siteConfig.defaultImageHeight,
        }
      : {}),
  };

  return {
    title:
      title === siteConfig.siteName
        ? { absolute: siteConfig.defaultTitle }
        : title,
    description: resolvedDescription,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: "website",
      title: socialTitle,
      description: resolvedDescription,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      url: canonicalUrl,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: resolvedDescription,
      images: [socialImage],
    },
  };
}

export function createPostSeoMetadata(post: PostSeoInput): Metadata {
  const metadata = createSeoMetadata({
    title: post.title,
    excerpt: post.excerpt,
    path: `/${post.category.slug}/${post.slug}`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
    },
  };
}
