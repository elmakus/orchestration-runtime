export const semanticRoles = ["scout", "researcher", "worker", "reviewer"] as const;
export type SemanticRole = (typeof semanticRoles)[number];

export const capabilities = [
  "local_read", "local_write", "git_read", "git_write", "test_execute",
  "network_read", "external_side_effect", "secret_use", "production_access"
] as const;
export type Capability = (typeof capabilities)[number];

export const failureCodes = [
  "retryable_transport", "retryable_provider", "schema_invalid", "permission_denied",
  "config_invalid", "stale_precondition", "side_effect_uncertain",
  "runtime_internal", "semantic_error"
] as const;
export type FailureCode = (typeof failureCodes)[number];

export const runStates = [
  "created", "running", "collecting", "blocked", "completed", "failed", "cancelled", "stale"
] as const;
export type RunState = (typeof runStates)[number];

export const gitIntegrationStates = [
  "IMPLEMENTED_LOCAL", "IMPLEMENTATION_COMPLETE/REVIEW_PENDING",
  "INTEGRATION_READY", "PR_OPEN", "MERGED_MAIN", "integration_uncertain"
] as const;
export type GitIntegrationState = (typeof gitIntegrationStates)[number];

export interface TaskCapsule {
  schemaVersion: 1;
  taskId: string;
  role: SemanticRole;
  intent: string;
  authorityRefs: string[];
  preconditionDigests: Record<string, string>;
  capabilities: Capability[];
  negativeBoundaries: string[];
  payload: unknown;
}

export interface CheckEvidence {
  name: string;
  status: "passed" | "failed" | "not_run";
  detail?: string;
}

export interface WorkerResult {
  schemaVersion: 1;
  taskId: string;
  inputDigest: string;
  status: "completed" | "blocked" | "failed" | "stale";
  summary: string;
  evidenceRefs: string[];
  checks: CheckEvidence[];
  changeRefs: string[];
  blocker?: { code: string; detail: string };
  failure?: { code: FailureCode; detail: string; retryable: boolean };
}

export interface AdapterLaunchRequest {
  assignmentId: string;
  capsule: TaskCapsule;
  workspaceRef: string;
}

export interface AdapterLaunchHandle {
  agentRef: string;
  assignmentId: string;
}

export type AdapterEventType = "started" | "attention" | "completed" | "failed";

export interface AdapterEvent {
  sequence: number;
  agentRef: string;
  assignmentId: string;
  type: AdapterEventType;
  atMs: number;
  payload?: unknown;
}

export interface AdapterReadback {
  agentRef: string;
  assignmentId: string;
  state: "running" | "completed" | "failed" | "missing";
  lastSequence: number;
}
