-- Keep Post.coverImage while existing URL-only images are migrated naturally.
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "largeUrl" TEXT NOT NULL,
    "mediumUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Post" ADD COLUMN "mediaId" TEXT;
CREATE INDEX "Post_mediaId_idx" ON "Post"("mediaId");
ALTER TABLE "Post" ADD CONSTRAINT "Post_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
