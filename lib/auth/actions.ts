"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { verifyAdminMutation, verifySameOriginRequest } from "@/lib/auth/csrf";
import {
  checkLoginRateLimit,
  getLoginRateLimitKey,
  recordFailedLogin,
  resetLoginRateLimit,
} from "@/lib/auth/rateLimit";
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
  if (!(await verifySameOriginRequest())) {
    return { errors: { form: ["The login request could not be verified."] } };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const rateLimitKey = await getLoginRateLimitKey(parsed.data.email);
  const rateLimit = checkLoginRateLimit(rateLimitKey);
  if (rateLimit.limited) {
    return {
      errors: {
        form: [
          `Too many failed login attempts. Try again in ${Math.ceil(rateLimit.retryAfterSeconds / 60)} minutes.`,
        ],
      },
    };
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
    recordFailedLogin(rateLimitKey);
    return { errors: { form: ["Invalid username or password."] } };
  }

  resetLoginRateLimit(rateLimitKey);
  await createAdminSession(adminEmail);
  redirect("/admin/posts");
}

export async function logoutAction(formData: FormData) {
  if (!(await verifyAdminMutation(formData.get("csrfToken")))) {
    return;
  }

  await clearAdminSession();
  redirect("/admin/login");
}
