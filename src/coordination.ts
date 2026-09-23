import type { ProbeStatus } from "./compatibility.ts";

export interface CoordinationEvidence {
  sharedStorage: ProbeStatus;
  atomicReplace: ProbeStatus;
  exclusiveLock: ProbeStatus;
  executionPlacement: ProbeStatus;
}

export interface CoordinationDecision {
  mechanism: "shared_file_lock_and_atomic_replace";
  ready: boolean;
  blockers: string[];
}

export function selectCoordinationMechanism(evidence: CoordinationEvidence): CoordinationDecision {
  const blockers = Object.entries(evidence)
    .filter(([, status]) => status !== "proven")
    .map(([name, status]) => `${name}:${status}`)
    .sort();
  return { mechanism: "shared_file_lock_and_atomic_replace", ready: blockers.length === 0, blockers };
}
