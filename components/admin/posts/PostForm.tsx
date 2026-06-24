"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { createPostAction, updatePostAction, type PostActionState } from "@/lib/actions/posts";
import { type PostFormInput, postFormSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/validation/slug";
import { SubmitButton } from "@/components/admin/common/SubmitButton";
import type { NormalizedMedia } from "@/lib/media/types";

type CategoryOption = {
  id: string;
  name: string;
};

type PostFormProps = {
  categories: CategoryOption[];
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    mediaId: string | null;
    media: NormalizedMedia | null;
    published: boolean;
    categoryId: string;
  };
};

export function PostForm({ categories, post }: PostFormProps) {
  const [serverState, setServerState] = useState<PostActionState>({});
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [media, setMedia] = useState<NormalizedMedia | null>(post?.media ?? null);
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));

  const defaultValues = useMemo<PostFormInput>(
    () => ({
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImage: post?.coverImage ?? "",
      mediaId: post?.mediaId ?? "",
      published: post?.published ?? false,
      categoryId: post?.categoryId ?? categories[0]?.id ?? "",
    }),
    [categories, post],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormInput>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  const title = useWatch({ control, name: "title" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const previewUrl = media?.mediumUrl ?? coverImage;

  useEffect(() => {
    if (!slugTouched) {
      setValue("slug", slugify(title), { shouldValidate: true });
    }
  }, [setValue, slugTouched, title]);

  async function onSubmit(values: PostFormInput) {
    setServerState({});
    const result = post
      ? await updatePostAction(post.id, values)
      : await createPostAction(values);

    if (result) {
      setServerState(result);
    }
  }

  async function uploadImage(file: File) {
    setUploadError("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as
        | (Omit<NormalizedMedia, "createdAt"> & { createdAt: string })
        | { error: string };

      if (!response.ok || !("id" in data)) {
        setUploadError("error" in data ? data.error : "Upload failed.");
        return;
      }

      const previousMediaId = media?.id;
      const uploadedMedia = { ...data, createdAt: new Date(data.createdAt) };
      setMedia(uploadedMedia);
      setValue("mediaId", data.id, { shouldDirty: true, shouldValidate: true });
      setValue("coverImage", "", { shouldDirty: true, shouldValidate: true });

      if (previousMediaId && previousMediaId !== data.id) {
        void removeUnreferencedMedia(previousMediaId);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function removeUnreferencedMedia(id: string) {
    try {
      await fetch("/admin/api/upload", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Saving the post performs the same reference-aware cleanup server-side.
    }
  }

  function removeImage() {
    const mediaId = media?.id;
    setMedia(null);
    setValue("mediaId", "", { shouldDirty: true, shouldValidate: true });
    setValue("coverImage", "", { shouldDirty: true, shouldValidate: true });
    if (mediaId) void removeUnreferencedMedia(mediaId);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      {serverState.errors?.form ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverState.errors.form[0]}
        </p>
      ) : null}

      <label className="grid gap-1 text-sm font-medium">
        Title
        <input className="rounded border px-3 py-2 font-normal" {...register("title")} />
        <FieldError message={errors.title?.message ?? serverState.errors?.title?.[0]} />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Slug
        <input
          className="rounded border px-3 py-2 font-normal"
          {...register("slug", {
            onChange: () => setSlugTouched(true),
          })}
        />
        <FieldError message={errors.slug?.message ?? serverState.errors?.slug?.[0]} />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Category
        <select className="rounded border px-3 py-2 font-normal" {...register("categoryId")}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <FieldError message={errors.categoryId?.message ?? serverState.errors?.categoryId?.[0]} />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Excerpt
        <textarea className="min-h-24 rounded border px-3 py-2 font-normal" {...register("excerpt")} />
        <FieldError message={errors.excerpt?.message ?? serverState.errors?.excerpt?.[0]} />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Content
        <textarea className="min-h-72 rounded border px-3 py-2 font-normal" {...register("content")} />
        <FieldError message={errors.content?.message ?? serverState.errors?.content?.[0]} />
      </label>

      <div className="grid gap-2">
        <span className="text-sm font-medium">Featured image</span>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt=""
            width={640}
            height={360}
            className="h-48 w-full rounded object-cover"
          />
        ) : null}
        <input type="hidden" {...register("coverImage")} />
        <input type="hidden" {...register("mediaId")} />
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void uploadImage(file);
            }
          }}
          className="text-sm"
        />
        <p className="text-xs text-zinc-500">JPEG, PNG, WebP, or AVIF. Max 5MB.</p>
        {previewUrl ? (
          <button
            type="button"
            onClick={removeImage}
            className="w-fit text-sm font-medium text-red-700 underline"
          >
            Remove image
          </button>
        ) : null}
        <FieldError
          message={uploadError || errors.coverImage?.message || serverState.errors?.coverImage?.[0]}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" {...register("published")} />
        Published
      </label>

      <div>
        <SubmitButton pending={isSubmitting || isUploading}>
          {post ? "Update post" : "Create post"}
        </SubmitButton>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-normal text-red-600">{message}</p>;
}
