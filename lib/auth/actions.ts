"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession } from "./session";
import { loginSchema } from "@/lib/validation/schemas";

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    form?: string[];
  };
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (
    !adminEmail ||
    !adminPasswordHash ||
    !BCRYPT_HASH_PATTERN.test(adminPasswordHash)
  ) {
    return { errors: { form: ["Admin credentials are not configured."] } };
  }

  const emailMatches =
    parsed.data.email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    adminPasswordHash,
  );

  if (!emailMatches || !passwordMatches) {
    return { errors: { form: ["Invalid username or password."] } };
  }

  await createAdminSession(adminEmail);
  redirect("/admin/posts");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
