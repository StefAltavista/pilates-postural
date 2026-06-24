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
      images: [{ url: resolvedImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: [{ url: resolvedImage, alt: title }],
    },
  };
}

export function createPostSeoMetadata(post: PostSeoInput): Metadata {
  const metadata = createSeoMetadata({
    title: post.title,
    description: post.media?.caption,
    excerpt: post.excerpt,
    image: post.media?.largeUrl || post.coverImage,
    path: `/posts/${post.slug}`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
    },
  };
}
