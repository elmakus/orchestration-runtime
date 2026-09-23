import { createHash } from "node:crypto";

function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  const object = value as Record<string, unknown>;
  const keys = Object.keys(object).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonical(object[key])}`).join(",")}}`;
}

export function canonicalJson(value: unknown): string {
  return canonical(value);
}

export function digestJson(value: unknown): string {
  return createHash("sha256").update(canonical(value)).digest("hex");
}
