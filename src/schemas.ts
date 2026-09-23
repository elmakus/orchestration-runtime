import { capabilities, failureCodes, semanticRoles } from "./contracts.ts";

export const taskCapsuleSchema = {
  $id: "https://elmakus.dev/orchestration-runtime/task-capsule.schema.json",
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "taskId", "role", "intent", "authorityRefs", "preconditionDigests", "capabilities", "negativeBoundaries", "payload"],
  properties: {
    schemaVersion: { const: 1 },
    taskId: { type: "string", minLength: 1 },
    role: { enum: [...semanticRoles] },
    intent: { type: "string", minLength: 1 },
    authorityRefs: { type: "array", minItems: 1, items: { type: "string", minLength: 1 } },
    preconditionDigests: { type: "object", additionalProperties: { type: "string", pattern: "^[a-f0-9]{64}$" } },
    capabilities: { type: "array", uniqueItems: true, items: { enum: [...capabilities] } },
    negativeBoundaries: { type: "array", items: { type: "string", minLength: 1 } },
    payload: {}
  }
} as const;

export const workerResultSchema = {
  $id: "https://elmakus.dev/orchestration-runtime/worker-result.schema.json",
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "taskId", "inputDigest", "status", "summary", "evidenceRefs", "checks", "changeRefs"],
  properties: {
    schemaVersion: { const: 1 },
    taskId: { type: "string", minLength: 1 },
    inputDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
    status: { enum: ["completed", "blocked", "failed", "stale"] },
    summary: { type: "string", minLength: 1, maxLength: 4000 },
    evidenceRefs: { type: "array", items: { type: "string", minLength: 1 } },
    checks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "status"],
        properties: {
          name: { type: "string", minLength: 1 },
          status: { enum: ["passed", "failed", "not_run"] },
          detail: { type: "string" }
        }
      }
    },
    changeRefs: { type: "array", items: { type: "string", minLength: 1 } },
    blocker: {
      type: "object",
      additionalProperties: false,
      required: ["code", "detail"],
      properties: {
        code: { type: "string", minLength: 1 },
        detail: { type: "string", minLength: 1 }
      }
    },
    failure: {
      type: "object",
      additionalProperties: false,
      required: ["code", "detail", "retryable"],
      properties: {
        code: { enum: [...failureCodes] },
        detail: { type: "string", minLength: 1 },
        retryable: { type: "boolean" }
      }
    }
  }
} as const;
