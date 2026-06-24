export type NormalizedMedia = {
  id: string;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  mimeType: string;
  sizeBytes: number;
  alt: string | null;
  caption: string | null;
  createdAt: Date;
};
