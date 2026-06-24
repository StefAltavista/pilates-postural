import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

export type PolicyFile = "privacy-policy.md" | "cookie-policy.md" | "impressum.md";

export function getPolicyContent(fileName: PolicyFile) {
  return readFile(path.join(process.cwd(), "public", "policies", fileName), "utf8");
}
