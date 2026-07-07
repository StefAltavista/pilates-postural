"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppCard } from "@/components/common/AppCard";
import { AppTextField } from "@/components/common/AppTextField";
import {
  createCategoryAction,
  type CategoryActionState,
} from "@/lib/actions/categories";
import { type CategoryFormInput, categoryFormSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/validation/slug";
import { SubmitButton } from "@/components/admin/common/SubmitButton";

export function CategoryForm({ csrfToken }: { csrfToken: string }) {
  const [serverState, setServerState] = useState<CategoryActionState>({});
  const [slugTouched, setSlugTouched] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormInput>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { csrfToken, name: "", slug: "" },
  });

  const name = useWatch({ control, name: "name" });

  useEffect(() => {
    if (!slugTouched) {
      setValue("slug", slugify(name), { shouldValidate: true });
    }
  }, [name, setValue, slugTouched]);

  async function onSubmit(values: CategoryFormInput) {
    const result = await createCategoryAction(values);
    setServerState(result);

    if (result.ok) {
      reset();
      setSlugTouched(false);
    }
  }

  return (
    <AppCard component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <Stack spacing={2}>
      <Typography variant="h6">New category</Typography>
      <input type="hidden" {...register("csrfToken")} />
      {serverState.errors?.form ? (
        <Alert severity="error">{serverState.errors.form[0]}</Alert>
      ) : null}
      {serverState.message ? <Alert severity="success">{serverState.message}</Alert> : null}

      <AppTextField
        label="Name"
        error={Boolean(errors.name || serverState.errors?.name)}
        helperText={errors.name?.message ?? serverState.errors?.name?.[0]}
        {...register("name")}
      />

      <AppTextField
        label="Slug"
        error={Boolean(errors.slug || serverState.errors?.slug)}
        helperText={errors.slug?.message ?? serverState.errors?.slug?.[0]}
        {...register("slug", { onChange: () => setSlugTouched(true) })}
      />

      <Box>
        <SubmitButton pending={isSubmitting}>Create category</SubmitButton>
      </Box>
      </Stack>
    </AppCard>
  );
}
