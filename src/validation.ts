import { capabilities, failureCodes, semanticRoles, type TaskCapsule, type WorkerResult } from "./contracts.ts";

export interface ValidationIssue {
  path: string;
  keyword: string;
  message: string;
}

export interface ValidationOutcome<T> {
  ok: boolean;
  value?: T;
  issues: ValidationIssue[];
}

const hex64 = /^[a-f0-9]{64}$/;
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function issue(issues: ValidationIssue[], path: string, keyword: string, message: string): void {
  issues.push({ path, keyword, message });
}

function finish<T>(value: unknown, issues: ValidationIssue[]): ValidationOutcome<T> {
  issues.sort((a, b) =>
    a.path.localeCompare(b.path) ||
    a.keyword.localeCompare(b.keyword) ||
    a.message.localeCompare(b.message)
  );
  return issues.length === 0 ? { ok: true, value: value as T, issues } : { ok: false, issues };
}

export function validateTaskCapsule(value: unknown): ValidationOutcome<TaskCapsule> {
  const issues: ValidationIssue[] = [];
  if (!isObject(value)) {
    issue(issues, "/", "type", "must be object");
    return finish(value, issues);
  }

  if (value.schemaVersion !== 1) issue(issues, "/schemaVersion", "const", "must equal 1");
  if (typeof value.taskId !== "string" || value.taskId.length === 0) issue(issues, "/taskId", "minLength", "must be non-empty string");
  if (!semanticRoles.includes(value.role as never)) issue(issues, "/role", "enum", "must be a supported semantic role");
  if (typeof value.intent !== "string" || value.intent.length === 0) issue(issues, "/intent", "minLength", "must be non-empty string");

  if (!Array.isArray(value.authorityRefs) || value.authorityRefs.length === 0) {
    issue(issues, "/authorityRefs", "minItems", "must contain at least one authority ref");
  }

  if (!isObject(value.preconditionDigests)) {
    issue(issues, "/preconditionDigests", "type", "must be object");
  } else {
    for (const [key, digest] of Object.entries(value.preconditionDigests)) {
      if (typeof digest !== "string" || !hex64.test(digest)) issue(issues, `/preconditionDigests/${key}`, "pattern", "must be lowercase sha256 hex");
    }
  }

  if (!Array.isArray(value.capabilities)) {
    issue(issues, "/capabilities", "type", "must be array");
  } else {
    if (new Set(value.capabilities).size !== value.capabilities.length) issue(issues, "/capabilities", "uniqueItems", "must not contain duplicates");
    for (let index = 0; index < value.capabilities.length; index += 1) {
      if (!capabilities.includes(value.capabilities[index] as never)) issue(issues, `/capabilities/${index}`, "enum", "unsupported capability");
    }
  }

  if (!Array.isArray(value.negativeBoundaries)) issue(issues, "/negativeBoundaries", "type", "must be array");
  if (!("payload" in value)) issue(issues, "/payload", "required", "payload is required");
  return finish<TaskCapsule>(value, issues);
}

export function validateWorkerResult(value: unknown): ValidationOutcome<WorkerResult> {
  const issues: ValidationIssue[] = [];
  if (!isObject(value)) {
    issue(issues, "/", "type", "must be object");
    return finish(value, issues);
  }
  if (value.schemaVersion !== 1) issue(issues, "/schemaVersion", "const", "must equal 1");
  if (typeof value.taskId !== "string" || value.taskId.length === 0) issue(issues, "/taskId", "minLength", "must be non-empty string");
  if (typeof value.inputDigest !== "string" || !hex64.test(value.inputDigest)) issue(issues, "/inputDigest", "pattern", "must be lowercase sha256 hex");
  if (!["completed", "blocked", "failed", "stale"].includes(String(value.status))) issue(issues, "/status", "enum", "unsupported result status");
  if (typeof value.summary !== "string" || value.summary.length === 0 || value.summary.length > 4000) issue(issues, "/summary", "length", "summary length invalid");
  if (!Array.isArray(value.evidenceRefs)) issue(issues, "/evidenceRefs", "type", "must be array");
  if (!Array.isArray(value.checks)) issue(issues, "/checks", "type", "must be array");
  if (!Array.isArray(value.changeRefs)) issue(issues, "/changeRefs", "type", "must be array");
  if (isObject(value.failure) && !failureCodes.includes(value.failure.code as never)) issue(issues, "/failure/code", "enum", "unsupported failure code");
  return finish<WorkerResult>(value, issues);
}
