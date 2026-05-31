"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  createCategoryAction,
  type CategoryActionState,
} from "@/lib/actions/categories";
import { type CategoryFormInput, categoryFormSchema } from "@/lib/validation/schemas";
import { slugify } from "@/lib/validation/slug";
import { SubmitButton } from "@/components/admin/common/SubmitButton";

export function CategoryForm() {
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
    defaultValues: { name: "", slug: "" },
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded border p-4">
      <h2 className="text-lg font-semibold">New category</h2>
      {serverState.errors?.form ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverState.errors.form[0]}
        </p>
      ) : null}
      {serverState.message ? <p className="text-sm text-green-700">{serverState.message}</p> : null}

      <label className="grid gap-1 text-sm font-medium">
        Name
        <input className="rounded border px-3 py-2 font-normal" {...register("name")} />
        <FieldError message={errors.name?.message ?? serverState.errors?.name?.[0]} />
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

      <div>
        <SubmitButton pending={isSubmitting}>Create category</SubmitButton>
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
