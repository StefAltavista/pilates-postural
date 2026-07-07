-- Store post-specific image metadata and stable carousel order in an explicit relation.
CREATE TABLE "PostImage" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "PostImage_position_check" CHECK ("position" >= 0 AND "position" < 5)
);

-- Preserve every existing post image and collapse the old alt/caption concepts into Title.
INSERT INTO "PostImage" ("id", "postId", "mediaId", "title", "position")
SELECT
    CONCAT('legacy_', "Post"."id"),
    "Post"."id",
    "Post"."mediaId",
    COALESCE(NULLIF("Media"."alt", ''), NULLIF("Media"."caption", ''), "Post"."title"),
    0
FROM "Post"
JOIN "Media" ON "Media"."id" = "Post"."mediaId"
WHERE "Post"."mediaId" IS NOT NULL;

CREATE UNIQUE INDEX "PostImage_postId_mediaId_key" ON "PostImage"("postId", "mediaId");
CREATE UNIQUE INDEX "PostImage_postId_position_key" ON "PostImage"("postId", "position");
CREATE INDEX "PostImage_mediaId_idx" ON "PostImage"("mediaId");

ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post" DROP CONSTRAINT "Post_mediaId_fkey";
DROP INDEX "Post_mediaId_idx";
ALTER TABLE "Post" DROP COLUMN "mediaId";
ALTER TABLE "Media" DROP COLUMN "alt";
ALTER TABLE "Media" DROP COLUMN "caption";
