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
  const resolvedImage = absoluteUrl(image || siteConfig.defaultImage);
  const canonicalUrl = path ? absoluteUrl(path) : undefined;

  return {
    title,
    description: resolvedDescription,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: "website",
      title,
      description: resolvedDescription,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      url: canonicalUrl,
      images: [{ url: resolvedImage, alt: imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: [{ url: resolvedImage, alt: imageAlt || title }],
    },
  };
}

export function createPostSeoMetadata(post: PostSeoInput): Metadata {
  const firstImage = post.images?.[0];
  const metadata = createSeoMetadata({
    title: post.title,
    excerpt: post.excerpt,
    image: firstImage?.media.largeUrl,
    imageAlt: firstImage?.title,
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
