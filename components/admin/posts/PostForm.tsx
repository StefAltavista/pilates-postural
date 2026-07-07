"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createPostAction, updatePostAction, type PostActionState } from "@/lib/actions/posts";
import { type PostFormInput, postFormSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/validation/slug";
import { SubmitButton } from "@/components/admin/common/SubmitButton";
import { AppButton } from "@/components/common/AppButton";
import { AppCheckbox } from "@/components/common/AppCheckbox";
import { AppSelect } from "@/components/common/AppSelect";
import { AppTextArea } from "@/components/common/AppTextArea";
import { AppTextField } from "@/components/common/AppTextField";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import type { NormalizedMedia, PostImage } from "@/lib/media/types";

const MAX_POST_IMAGES = 5;

type CategoryOption = { id: string; name: string };

type PostFormProps = {
  categories: CategoryOption[];
  csrfToken: string;
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    postDate: Date;
    images: PostImage[];
    published: boolean;
    categoryId: string;
  };
};

export function PostForm({ categories, csrfToken, post }: PostFormProps) {
  const [serverState, setServerState] = useState<PostActionState>({});
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [mediaById, setMediaById] = useState<Record<string, NormalizedMedia>>(() =>
    Object.fromEntries((post?.images ?? []).map((image) => [image.media.id, image.media])),
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = useMemo<PostFormInput>(
    () => ({
      title: post?.title ?? "",
      csrfToken,
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      postDate: (post?.postDate ?? new Date()).toISOString().slice(0, 10),
      images: (post?.images ?? []).map((image) => ({
        mediaId: image.media.id,
        title: image.title,
      })),
      published: post?.published ?? false,
      categoryId: post?.categoryId ?? categories[0]?.id ?? "",
    }),
    [categories, csrfToken, post],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormInput>({ resolver: zodResolver(postFormSchema), defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "images" });
  const title = useWatch({ control, name: "title" });
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    if (!slugTouched) setValue("slug", slugify(title), { shouldValidate: true });
  }, [setValue, slugTouched, title]);

  async function onSubmit(values: PostFormInput) {
    setServerState({});
    const result = post
      ? await updatePostAction(post.id, values)
      : await createPostAction(values);
    if (result) setServerState(result);
  }

  async function uploadOne(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/admin/api/upload", {
      method: "POST",
      body: formData,
      headers: { "x-csrf-token": csrfToken },
    });
    const data = (await response.json()) as
      | (Omit<NormalizedMedia, "createdAt"> & { createdAt: string })
      | { error: string };

    if (!response.ok || !("id" in data)) {
      throw new Error("error" in data ? data.error : `Could not upload ${file.name}.`);
    }

    return { ...data, createdAt: new Date(data.createdAt) };
  }

  async function uploadImages(selectedFiles: FileList) {
    const remaining = MAX_POST_IMAGES - fields.length;
    const files = Array.from(selectedFiles).slice(0, remaining);
    if (!files.length) return;

    setUploadError(
      selectedFiles.length > remaining
        ? `Only ${remaining} more image${remaining === 1 ? "" : "s"} can be added.`
        : "",
    );
    setIsUploading(true);
    try {
      for (const file of files) {
        const uploaded = await uploadOne(file);
        setMediaById((current) => ({ ...current, [uploaded.id]: uploaded }));
        append({ mediaId: uploaded.id, title: file.name.replace(/\.[^.]+$/, "") });
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function removeUnreferencedMedia(id: string) {
    try {
      await fetch("/admin/api/upload", {
        method: "DELETE",
        headers: { "content-type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ id }),
      });
    } catch {
      // A saved relation is cleaned after the post update; an uploaded file is best-effort here.
    }
  }

  function removeImage(index: number, mediaId: string) {
    remove(index);
    setMediaById((current) => {
      const next = { ...current };
      delete next[mediaId];
      return next;
    });
    void removeUnreferencedMedia(mediaId);
  }

  const imageError =
    (typeof errors.images?.message === "string" ? errors.images.message : undefined) ??
    serverState.errors?.images?.[0];

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5}>
      <input type="hidden" {...register("csrfToken")} />
      {serverState.errors?.form ? <Alert severity="error">{serverState.errors.form[0]}</Alert> : null}

      <AppTextField label="Title" error={Boolean(errors.title || serverState.errors?.title)} helperText={errors.title?.message ?? serverState.errors?.title?.[0]} {...register("title")} />
      <Controller
        control={control}
        name="slug"
        render={({ field }) => (
          <AppTextField
            {...field}
            value={field.value ?? ""}
            label="Slug"
            error={Boolean(errors.slug || serverState.errors?.slug)}
            helperText={errors.slug?.message ?? serverState.errors?.slug?.[0]}
            onChange={(event) => {
              setSlugTouched(true);
              field.onChange(event);
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <AppSelect
            {...field}
            value={field.value ?? ""}
            label="Category"
            options={categoryOptions}
            error={Boolean(errors.categoryId || serverState.errors?.categoryId)}
            helperText={errors.categoryId?.message ?? serverState.errors?.categoryId?.[0]}
          />
        )}
      />
      <Controller
        control={control}
        name="postDate"
        render={({ field }) => (
          <AppTextField
            {...field}
            value={field.value ?? ""}
            type="date"
            label="Date"
            error={Boolean(errors.postDate || serverState.errors?.postDate)}
            helperText={errors.postDate?.message ?? serverState.errors?.postDate?.[0]}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />
      <AppTextArea label="Excerpt" minRows={3} error={Boolean(errors.excerpt || serverState.errors?.excerpt)} helperText={errors.excerpt?.message ?? serverState.errors?.excerpt?.[0]} {...register("excerpt")} />
      <AppTextArea label="Content" minRows={12} error={Boolean(errors.content || serverState.errors?.content)} helperText={errors.content?.message ?? serverState.errors?.content?.[0]} {...register("content")} />

      <Divider />
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Post images</Typography>
          <Typography color="text.secondary" variant="body2">
            Add up to 5 images. Each Title is also used as the public image alt text.
          </Typography>
        </Box>

        {fields.map((field, index) => {
          const media = mediaById[field.mediaId];
          return (
            <Box key={field.id} sx={{ display: "grid", gap: 2, gridTemplateColumns: { sm: "180px 1fr" }, border: 1, borderColor: "divider", borderRadius: 2, p: 2 }}>
              {media ? (
                <OptimizedImage src={media.thumbnailUrl} alt="" width={320} height={220} sizes="180px" style={{ width: "100%", height: 120, borderRadius: 8, objectFit: "cover" }} />
              ) : null}
              <Stack spacing={1.5}>
                <input type="hidden" {...register(`images.${index}.mediaId`)} />
                <AppTextField
                  label="Title"
                  error={Boolean(errors.images?.[index]?.title)}
                  helperText={errors.images?.[index]?.title?.message}
                  slotProps={{ htmlInput: { maxLength: 160 } }}
                  {...register(`images.${index}.title`)}
                />
                <AppButton type="button" color="error" variant="text" onClick={() => removeImage(index, field.mediaId)} sx={{ alignSelf: "start" }}>
                  Delete image
                </AppButton>
              </Stack>
            </Box>
          );
        })}

        <Box>
          <AppButton component="label" variant="outlined" disabled={isUploading || fields.length >= MAX_POST_IMAGES}>
            {isUploading ? "Uploading…" : "Add images"}
            <input ref={fileInputRef} hidden multiple type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => event.target.files && void uploadImages(event.target.files)} />
          </AppButton>
        </Box>
        <Typography color="text.secondary" variant="caption">
          {fields.length} of {MAX_POST_IMAGES} images. JPEG, PNG, WebP, or AVIF; max 5MB each.
        </Typography>
        {uploadError || imageError ? <Alert severity="error">{uploadError || imageError}</Alert> : null}
      </Stack>

      <AppCheckbox label="Published" {...register("published")} />
      <Box><SubmitButton pending={isSubmitting || isUploading}>{post ? "Update post" : "Create post"}</SubmitButton></Box>
    </Stack>
  );
}
