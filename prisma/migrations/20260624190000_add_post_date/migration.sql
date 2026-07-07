ALTER TABLE "Post" ADD COLUMN "postDate" TIMESTAMP(3);
UPDATE "Post" SET "postDate" = "createdAt";
ALTER TABLE "Post" ALTER COLUMN "postDate" SET NOT NULL;

DROP INDEX "Post_published_createdAt_idx";
CREATE INDEX "Post_published_postDate_idx" ON "Post"("published", "postDate");
