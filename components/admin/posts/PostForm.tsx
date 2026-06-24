"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
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
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

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
      const response = await fetch("/admin/api/upload", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Media cleanup failed.");
      }
    } catch {
      // Cleanup is best-effort here; saved post changes repeat reference-aware cleanup server-side.
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
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5}>
      {serverState.errors?.form ? (
        <Alert severity="error">{serverState.errors.form[0]}</Alert>
      ) : null}

      <AppTextField
        label="Title"
        error={Boolean(errors.title || serverState.errors?.title)}
        helperText={errors.title?.message ?? serverState.errors?.title?.[0]}
        {...register("title")}
      />

      <AppTextField
        label="Slug"
        error={Boolean(errors.slug || serverState.errors?.slug)}
        helperText={errors.slug?.message ?? serverState.errors?.slug?.[0]}
        {...register("slug", { onChange: () => setSlugTouched(true) })}
      />

      <AppSelect
        label="Category"
        options={categoryOptions}
        error={Boolean(errors.categoryId || serverState.errors?.categoryId)}
        helperText={errors.categoryId?.message ?? serverState.errors?.categoryId?.[0]}
        {...register("categoryId")}
      />

      <AppTextArea
        label="Excerpt"
        minRows={3}
        error={Boolean(errors.excerpt || serverState.errors?.excerpt)}
        helperText={errors.excerpt?.message ?? serverState.errors?.excerpt?.[0]}
        {...register("excerpt")}
      />

      <AppTextArea
        label="Content"
        minRows={12}
        error={Boolean(errors.content || serverState.errors?.content)}
        helperText={errors.content?.message ?? serverState.errors?.content?.[0]}
        {...register("content")}
      />

      <Stack spacing={1}>
        <Typography variant="subtitle2">Featured image</Typography>
        {previewUrl ? (
          <OptimizedImage
            src={previewUrl}
            alt=""
            width={640}
            height={360}
            sizes="(max-width: 900px) 100vw, 640px"
            style={{ width: "100%", height: 192, borderRadius: 8, objectFit: "cover" }}
          />
        ) : null}
        <input type="hidden" {...register("coverImage")} />
        <input type="hidden" {...register("mediaId")} />
        <Box>
          <AppButton component="label" variant="outlined">
            {isUploading ? "Uploading…" : "Choose image"}
            <input
              hidden
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
              }}
            />
          </AppButton>
        </Box>
        <Typography color="text.secondary" variant="caption">
          JPEG, PNG, WebP, or AVIF. Max 5MB.
        </Typography>
        {previewUrl ? (
          <AppButton
            type="button"
            color="error"
            variant="text"
            onClick={removeImage}
            sx={{ alignSelf: "start" }}
          >
            Remove image
          </AppButton>
        ) : null}
        {uploadError || errors.coverImage?.message || serverState.errors?.coverImage?.[0] ? (
          <Alert severity="error">
            {uploadError || errors.coverImage?.message || serverState.errors?.coverImage?.[0]}
          </Alert>
        ) : null}
      </Stack>

      <AppCheckbox label="Published" {...register("published")} />

      <Box>
        <SubmitButton pending={isSubmitting || isUploading}>
          {post ? "Update post" : "Create post"}
        </SubmitButton>
      </Box>
    </Stack>
  );
}
