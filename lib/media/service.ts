import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import type { NormalizedMedia } from "./types";

const MEDIA_ROOT = path.join(process.cwd(), "public", "uploads", "media");
const MEDIA_URL_ROOT = "/uploads/media";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

const versions = [
  { name: "large", width: 1600, quality: 82 },
  { name: "medium", width: 960, quality: 82 },
  { name: "thumbnail", width: 320, quality: 78 },
] as const;

export class MediaError extends Error {
  constructor(
    public readonly code:
      | "MISSING_IMAGE"
      | "UNSUPPORTED_FILE_TYPE"
      | "FILE_TOO_LARGE"
      | "PROCESSING_FAILED"
      | "WRITE_FAILED",
    message: string,
  ) {
    super(message);
    this.name = "MediaError";
  }
}

function assertSafeMediaId(mediaId: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(mediaId)) {
    throw new Error("Invalid media id.");
  }
}

export async function createMediaFromFile(file: File): Promise<NormalizedMedia> {
  if (!file.size) {
    throw new MediaError("MISSING_IMAGE", "No image file was provided.");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new MediaError(
      "UNSUPPORTED_FILE_TYPE",
      "Upload a JPEG, PNG, WebP, or AVIF image.",
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new MediaError("FILE_TOO_LARGE", "Images must be 5MB or smaller.");
  }

  const mediaId = randomUUID();
  const temporaryId = `.tmp-${mediaId}-${randomUUID()}`;
  const temporaryDir = path.join(MEDIA_ROOT, temporaryId);
  const mediaDir = path.join(MEDIA_ROOT, mediaId);

  try {
    await mkdir(temporaryDir, { recursive: true });
    const input = Buffer.from(await file.arrayBuffer());
    const originalPath = path.join(temporaryDir, "original.webp");

    await sharp(input).rotate().webp({ quality: 82 }).toFile(originalPath);
    await Promise.all(
      versions.map(({ name, width, quality }) =>
        sharp(originalPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toFile(path.join(temporaryDir, `${name}.webp`)),
      ),
    );

    const [metadata, originalStats] = await Promise.all([
      sharp(originalPath).metadata(),
      stat(originalPath),
    ]);
    if (!metadata.width || !metadata.height) {
      throw new Error("Processed image dimensions are unavailable.");
    }

    await rename(temporaryDir, mediaDir);

    const baseUrl = `${MEDIA_URL_ROOT}/${mediaId}`;
    try {
      return await prisma.media.create({
        data: {
          id: mediaId,
          originalUrl: `${baseUrl}/original.webp`,
          largeUrl: `${baseUrl}/large.webp`,
          mediumUrl: `${baseUrl}/medium.webp`,
          thumbnailUrl: `${baseUrl}/thumbnail.webp`,
          width: metadata.width,
          height: metadata.height,
          mimeType: "image/webp",
          sizeBytes: originalStats.size,
        },
      });
    } catch (error) {
      console.error(`Failed to write media record ${mediaId}.`, error);
      await deleteMediaFolder(mediaId);
      throw new MediaError("WRITE_FAILED", "The uploaded image could not be saved.");
    }
  } catch (error) {
    await cleanupPath(temporaryDir, temporaryId);
    if (error instanceof MediaError) {
      throw error;
    }
    throw new MediaError("PROCESSING_FAILED", "The image could not be processed.");
  }
}

export async function deleteMediaFolder(mediaId: string): Promise<void> {
  assertSafeMediaId(mediaId);
  await cleanupPath(path.join(MEDIA_ROOT, mediaId), mediaId);
}

async function cleanupPath(target: string, mediaId: string) {
  try {
    await rm(target, { recursive: true, force: true });
  } catch (error) {
    console.error(`Failed to clean up media files for ${mediaId}.`, error);
  }
}

export async function deleteMediaIfUnreferenced(mediaId: string | null | undefined) {
  if (!mediaId) return false;
  assertSafeMediaId(mediaId);

  const deleted = await prisma.media.deleteMany({
    where: { id: mediaId, posts: { none: {} } },
  });
  if (deleted.count === 0) return false;

  await deleteMediaFolder(mediaId);
  return true;
}
