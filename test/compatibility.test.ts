import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  assertSafeLiveProbe,
  assessCompatibilityReport,
  requiredProbeIds,
  type CompatibilityReport
} from "../src/compatibility.ts";
import { selectCoordinationMechanism } from "../src/coordination.ts";

const readReport = (): CompatibilityReport =>
  JSON.parse(readFileSync(join(process.cwd(), "evidence", "m01", "compatibility-report.json"), "utf8")) as CompatibilityReport;

test("compatibility report accounts for every required probe", () => {
  const assessment = assessCompatibilityReport(readReport());
  assert.equal(assessment.valid, true);
  assert.deepEqual(
    [...new Set(readReport().probes.map((probe) => probe.id))].sort(),
    [...requiredProbeIds].sort()
  );
});

test("proven compatibility claims require durable evidence", () => {
  const report = structuredClone(readReport());
  report.probes[0]!.status = "proven";
  report.probes[0]!.evidenceRefs = [];
  const assessment = assessCompatibilityReport(report);
  assert.equal(assessment.valid, false);
  assert.match(assessment.errors.join("\n"), /requires evidence/);
});

test("required unknown or unsupported facts block dependent work", () => {
  const assessment = assessCompatibilityReport(readReport());
  assert.ok(assessment.blockedRequired.length > 0);
  assert.ok(assessment.blockedRequired.includes("tool_restriction"));
});

test("live probes fail closed until restriction is proven", () => {
  assert.throws(
    () => assertSafeLiveProbe({
      name: "lifecycle",
      workload: "tool_free",
      restrictionProvenBeforeLaunch: false,
      repositoryMutation: false,
      secretUse: false,
      productionEffect: false
    }),
    /mechanical restriction not proven/
  );
  assert.doesNotThrow(() => assertSafeLiveProbe({
    name: "lifecycle",
    workload: "strictly_read_only",
    restrictionProvenBeforeLaunch: true,
    repositoryMutation: false,
    secretUse: false,
    productionEffect: false
  }));
});

test("coordination selection blocks on unproven prerequisites", () => {
  assert.deepEqual(
    selectCoordinationMechanism({
      sharedStorage: "proven",
      atomicReplace: "unknown_unverified",
      exclusiveLock: "proven",
      executionPlacement: "proven"
    }),
    {
      mechanism: "shared_file_lock_and_atomic_replace",
      ready: false,
      blockers: ["atomicReplace:unknown_unverified"]
    }
  );
});
