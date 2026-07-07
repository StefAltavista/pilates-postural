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
  createdAt: Date;
};

export type PostImage = {
  id: string;
  title: string;
  position: number;
  media: NormalizedMedia;
};
