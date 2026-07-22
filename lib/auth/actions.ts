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
import { getAdminCredentials } from "@/lib/auth/config";
import { clearAdminSession, createAdminSession } from "./session";
import { loginSchema } from "@/lib/validation/schemas";

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

  const adminCredentials = getAdminCredentials();

  if (!adminCredentials.isConfigured) {
    console.error("Admin credentials are not configured correctly.", {
      hasAdminEmail: adminCredentials.hasAdminEmail,
      hasAdminPasswordHash: adminCredentials.hasAdminPasswordHash,
      hasValidAdminPasswordHash: adminCredentials.hasValidAdminPasswordHash,
    });

    return {
      errors: {
        form: [
          "Admin credentials are not configured correctly. Check ADMIN_EMAIL and ADMIN_PASSWORD_HASH.",
        ],
      },
    };
  }

  const emailMatches =
    parsed.data.email.toLowerCase() ===
    adminCredentials.adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    adminCredentials.adminPasswordHash,
  );

  if (!emailMatches || !passwordMatches) {
    recordFailedLogin(rateLimitKey);
    return { errors: { form: ["Invalid username or password."] } };
  }

  resetLoginRateLimit(rateLimitKey);
  await createAdminSession(adminCredentials.adminEmail);
  redirect("/admin/posts");
}

export async function logoutAction(formData: FormData) {
  if (!(await verifyAdminMutation(formData.get("csrfToken")))) {
    return;
  }

  await clearAdminSession();
  redirect("/admin/login");
}
