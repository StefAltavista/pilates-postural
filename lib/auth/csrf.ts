import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME, getSessionSecret } from "@/lib/auth/session";

const CSRF_TOKEN_MAX_AGE_MS = 2 * 60 * 60 * 1000;

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function valuesMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

function getRequestOrigin(headersList: Headers) {
  const origin = headersList.get("origin");
  if (!origin) return null;

  try {
    return new URL(origin);
  } catch {
    return null;
  }
}

function getRequestHost(headersList: Headers) {
  return headersList.get("x-forwarded-host") ?? headersList.get("host");
}

export async function verifySameOriginRequest() {
  const headersList = await headers();
  const origin = getRequestOrigin(headersList);
  const host = getRequestHost(headersList);
  const forwardedProto = headersList.get("x-forwarded-proto");

  if (!origin || !host) return false;

  return (
    origin.host === host &&
    (!forwardedProto || origin.protocol.replace(":", "") === forwardedProto)
  );
}

export async function createAdminCsrfToken() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    throw new Error("Cannot create a CSRF token without an admin session.");
  }

  const nonce = randomBytes(18).toString("base64url");
  const expiresAt = Date.now() + CSRF_TOKEN_MAX_AGE_MS;
  const payload = `${nonce}.${expiresAt}`;
  const signature = sign(`${sessionToken}.${payload}`);

  return `${payload}.${signature}`;
}

export async function verifyAdminCsrfToken(token: unknown) {
  if (typeof token !== "string" || !token) return false;

  const [nonce, expiresAtValue, signature] = token.split(".");
  if (!nonce || !expiresAtValue || !signature) return false;

  const expiresAt = Number(expiresAtValue);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < Date.now()) return false;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return false;

  const expected = sign(`${sessionToken}.${nonce}.${expiresAt}`);
  return valuesMatch(signature, expected);
}

export async function verifyAdminMutation(token: unknown) {
  return (await verifySameOriginRequest()) && (await verifyAdminCsrfToken(token));
}
