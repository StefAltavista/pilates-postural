import "server-only";

import { headers } from "next/headers";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, LoginAttempt>();

async function getClientIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwardedFor || headersList.get("x-real-ip") || "unknown";
}

function pruneExpiredAttempts(now: number) {
  for (const [key, attempt] of attempts) {
    if (attempt.resetAt <= now) attempts.delete(key);
  }
}

export async function getLoginRateLimitKey(email: string) {
  const ip = await getClientIp();
  return `${ip}:${email.trim().toLowerCase()}`;
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  pruneExpiredAttempts(now);

  const attempt = attempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    return { limited: false, retryAfterSeconds: 0 };
  }

  return {
    limited: attempt.count >= LOGIN_MAX_ATTEMPTS,
    retryAfterSeconds: Math.ceil((attempt.resetAt - now) / 1000),
  };
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || existing.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }

  existing.count += 1;
}

export function resetLoginRateLimit(key: string) {
  attempts.delete(key);
}

