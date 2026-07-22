import "server-only";

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  const quote = trimmed[0];

  if (
    (quote === '"' || quote === "'") &&
    trimmed.length > 1 &&
    trimmed.at(-1) === quote
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function cleanBcryptHash(value: string | undefined) {
  return cleanEnvValue(value).replaceAll("\\$", "$");
}

export function getAdminCredentials() {
  const adminEmail = cleanEnvValue(process.env.ADMIN_EMAIL);
  const adminPasswordHash = cleanBcryptHash(process.env.ADMIN_PASSWORD_HASH);
  const hasAdminEmail = Boolean(adminEmail);
  const hasAdminPasswordHash = Boolean(adminPasswordHash);
  const hasValidAdminPasswordHash = BCRYPT_HASH_PATTERN.test(adminPasswordHash);

  return {
    adminEmail,
    adminPasswordHash,
    hasAdminEmail,
    hasAdminPasswordHash,
    hasValidAdminPasswordHash,
    isConfigured:
      hasAdminEmail && hasAdminPasswordHash && hasValidAdminPasswordHash,
  };
}

export function getSessionSecretValue() {
  return cleanEnvValue(process.env.SESSION_SECRET);
}
