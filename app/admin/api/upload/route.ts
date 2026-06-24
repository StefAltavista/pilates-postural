import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import {
  createMediaFromFile,
  deleteMediaIfUnreferenced,
  MediaError,
} from "@/lib/media/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || !file.size) {
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }

  try {
    const media = await createMediaFromFile(file);
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    if (error instanceof MediaError) {
      const status = error.code === "WRITE_FAILED" ? 500 : 400;
      return NextResponse.json({ error: error.message }, { status });
    }
    console.error("Unexpected media upload failure.", error);
    return NextResponse.json({ error: "The image upload failed." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await requireAdmin();
  const body = (await request.json().catch(() => null)) as { id?: unknown } | null;
  if (!body || typeof body.id !== "string" || !body.id) {
    return NextResponse.json({ error: "A media id is required." }, { status: 400 });
  }

  try {
    const deleted = await deleteMediaIfUnreferenced(body.id);
    return NextResponse.json({ deleted });
  } catch (error) {
    console.error(`Failed to remove media ${body.id}.`, error);
    return NextResponse.json({ error: "The media could not be removed." }, { status: 500 });
  }
}
