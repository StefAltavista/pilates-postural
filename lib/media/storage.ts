import "server-only";

import { del, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export const MEDIA_FILE_NAMES = [
  "original.webp",
  "large.webp",
  "medium.webp",
  "thumbnail.webp",
] as const;

type MediaFileName = (typeof MEDIA_FILE_NAMES)[number];
export type MediaFiles = Record<MediaFileName, Buffer>;
export type MediaUrls = Record<MediaFileName, string>;

const MEDIA_ROOT = path.join(process.cwd(), "public", "uploads", "media");
const MEDIA_PATH_ROOT = "uploads/media";

function usesBlobStorage() {
  return process.env.VERCEL === "1";
}

function blobPathnames(mediaId: string) {
  return MEDIA_FILE_NAMES.map(
    (fileName) => `${MEDIA_PATH_ROOT}/${mediaId}/${fileName}`,
  );
}

export async function saveMediaFiles(
  mediaId: string,
  files: MediaFiles,
): Promise<MediaUrls> {
  if (usesBlobStorage()) {
    const pathnames = blobPathnames(mediaId);

    try {
      const uploads = await Promise.allSettled(
        MEDIA_FILE_NAMES.map((fileName, index) =>
          put(pathnames[index], files[fileName], {
            access: "public",
            addRandomSuffix: false,
            contentType: "image/webp",
          }),
        ),
      );
      const failedUpload = uploads.find(
        (upload): upload is PromiseRejectedResult => upload.status === "rejected",
      );
      if (failedUpload) {
        throw failedUpload.reason;
      }

      const blobs = uploads.map((upload) => {
        if (upload.status !== "fulfilled") {
          throw upload.reason;
        }
        return upload.value;
      });

      return Object.fromEntries(
        MEDIA_FILE_NAMES.map((fileName, index) => [fileName, blobs[index].url]),
      ) as MediaUrls;
    } catch (error) {
      await cleanupBlobFiles(pathnames, mediaId);
      throw error;
    }
  }

  const temporaryId = `.tmp-${mediaId}-${randomUUID()}`;
  const temporaryDir = path.join(MEDIA_ROOT, temporaryId);
  const mediaDir = path.join(MEDIA_ROOT, mediaId);

  try {
    await mkdir(temporaryDir, { recursive: true });
    await Promise.all(
      MEDIA_FILE_NAMES.map((fileName) =>
        writeFile(path.join(temporaryDir, fileName), files[fileName]),
      ),
    );
    await rename(temporaryDir, mediaDir);
  } catch (error) {
    await cleanupLocalPath(temporaryDir, temporaryId);
    throw error;
  }

  return Object.fromEntries(
    MEDIA_FILE_NAMES.map((fileName) => [
      fileName,
      `/${MEDIA_PATH_ROOT}/${mediaId}/${fileName}`,
    ]),
  ) as MediaUrls;
}

export async function deleteMediaFiles(mediaId: string): Promise<void> {
  if (usesBlobStorage()) {
    await cleanupBlobFiles(blobPathnames(mediaId), mediaId);
    return;
  }

  await cleanupLocalPath(path.join(MEDIA_ROOT, mediaId), mediaId);
}

async function cleanupBlobFiles(pathnames: string[], mediaId: string) {
  try {
    await del(pathnames);
  } catch (error) {
    console.error(`Failed to clean up media files for ${mediaId}.`, error);
  }
}

async function cleanupLocalPath(target: string, mediaId: string) {
  try {
    await rm(target, { recursive: true, force: true });
  } catch (error) {
    console.error(`Failed to clean up media files for ${mediaId}.`, error);
  }
}
