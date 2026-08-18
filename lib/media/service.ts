import "server-only";

import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { deleteMediaFiles, saveMediaFiles } from "./storage";
import type { NormalizedMedia } from "./types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

const versions = [
  { width: 1600, quality: 82 },
  { width: 960, quality: 82 },
  { width: 320, quality: 78 },
] as const;

export class MediaError extends Error {
  constructor(
    public readonly code:
      | "MISSING_IMAGE"
      | "UNSUPPORTED_FILE_TYPE"
      | "FILE_TOO_LARGE"
      | "INVALID_MEDIA_ID"
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
    throw new MediaError("INVALID_MEDIA_ID", "The media id is invalid.");
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

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const original = await sharp(input).rotate().webp({ quality: 82 }).toBuffer();
    const [large, medium, thumbnail] = await Promise.all(
      versions.map(({ width, quality }) =>
        sharp(original)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toBuffer(),
      ),
    );

    const metadata = await sharp(original).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error("Processed image dimensions are unavailable.");
    }

    let urls;
    try {
      urls = await saveMediaFiles(mediaId, {
        "original.webp": original,
        "large.webp": large,
        "medium.webp": medium,
        "thumbnail.webp": thumbnail,
      });
    } catch (error) {
      console.error(`Failed to write media files ${mediaId}.`, error);
      throw new MediaError("WRITE_FAILED", "The uploaded image could not be saved.");
    }

    try {
      return await prisma.media.create({
        data: {
          id: mediaId,
          originalUrl: urls["original.webp"],
          largeUrl: urls["large.webp"],
          mediumUrl: urls["medium.webp"],
          thumbnailUrl: urls["thumbnail.webp"],
          width: metadata.width,
          height: metadata.height,
          mimeType: "image/webp",
          sizeBytes: original.byteLength,
        },
      });
    } catch (error) {
      console.error(`Failed to write media record ${mediaId}.`, error);
      await deleteMediaFolder(mediaId);
      throw new MediaError("WRITE_FAILED", "The uploaded image could not be saved.");
    }
  } catch (error) {
    if (error instanceof MediaError) {
      throw error;
    }
    console.error(`Failed to process uploaded media ${mediaId}.`, error);
    throw new MediaError("PROCESSING_FAILED", "The image could not be processed.");
  }
}

export async function deleteMediaFolder(mediaId: string): Promise<void> {
  assertSafeMediaId(mediaId);
  await deleteMediaFiles(mediaId);
}

export async function deleteMediaIfUnreferenced(mediaId: string | null | undefined) {
  if (!mediaId) return false;
  assertSafeMediaId(mediaId);

  const deleted = await prisma.media.deleteMany({
    where: { id: mediaId, postImages: { none: {} } },
  });
  if (deleted.count === 0) return false;

  await deleteMediaFolder(mediaId);
  return true;
}
