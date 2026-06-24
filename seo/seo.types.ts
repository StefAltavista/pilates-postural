export type SeoMetadataInput = {
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  description?: string | null;
  image?: string | null;
  path?: string;
  noIndex?: boolean;
};

export type PostSeoInput = {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  media?: {
    largeUrl: string;
    caption?: string | null;
  } | null;
};
