export const requiredProbeIds = [
  "versions", "lifecycle_events", "completion_error_attention_events", "reconnect_resume",
  "tool_restriction", "worktree_subbranch", "metadata_labels", "profile_resolution",
  "execution_placement", "shared_storage", "atomic_lock_support", "failure_behavior"
] as const;

export type ProbeId = (typeof requiredProbeIds)[number];
export type ProbeStatus = "proven" | "unknown_unverified" | "proven_unsupported";

export interface CompatibilityProbe {
  id: ProbeId;
  required: boolean;
  status: ProbeStatus;
  detail: string;
  evidenceRefs: string[];
}

export interface CompatibilityReport {
  schemaVersion: 1;
  observedAt: string;
  paseoVersion: string | null;
  piVersion: string | null;
  minimumPaseoVersion: string | null;
  minimumPiVersion: string | null;
  probes: CompatibilityProbe[];
}

export interface CompatibilityAssessment {
  valid: boolean;
  errors: string[];
  blockedRequired: ProbeId[];
}

export function assessCompatibilityReport(report: CompatibilityReport): CompatibilityAssessment {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const probe of report.probes) {
    if (seen.has(probe.id)) errors.push(`duplicate probe: ${probe.id}`);
    seen.add(probe.id);
    if (!probe.detail.trim()) errors.push(`probe ${probe.id} requires detail`);
    if (probe.status !== "unknown_unverified" && probe.evidenceRefs.length === 0) {
      errors.push(`probe ${probe.id} status ${probe.status} requires evidence`);
    }
  }
  for (const id of requiredProbeIds) if (!seen.has(id)) errors.push(`missing required probe: ${id}`);
  const blockedRequired = report.probes
    .filter((probe) => probe.required && probe.status !== "proven")
    .map((probe) => probe.id)
    .sort() as ProbeId[];
  return { valid: errors.length === 0, errors: errors.sort(), blockedRequired };
}

export interface LiveProbeSpec {
  name: string;
  workload: "tool_free" | "strictly_read_only";
  restrictionProvenBeforeLaunch: boolean;
  repositoryMutation: false;
  secretUse: false;
  productionEffect: false;
}

export function assertSafeLiveProbe(spec: LiveProbeSpec): void {
  if (!spec.restrictionProvenBeforeLaunch) {
    throw new Error(`probe ${spec.name} blocked: mechanical restriction not proven before launch`);
  }
  if (!["tool_free", "strictly_read_only"].includes(spec.workload)) {
    throw new Error(`probe ${spec.name} blocked: unsupported workload class`);
  }
}
