export type SeoMetadataInput = {
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  description?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  path?: string;
  noIndex?: boolean;
};

export type PostSeoInput = {
  title: string;
  slug: string;
  excerpt?: string | null;
  category: { slug: string };
  images?: Array<{
    title: string;
    media: { largeUrl: string };
  }>;
};
