import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { digestJson } from "../src/digest.ts";
import { taskCapsuleSchema, workerResultSchema } from "../src/schemas.ts";
import { validateTaskCapsule, validateWorkerResult } from "../src/validation.ts";

const fixture = (name: string): unknown =>
  JSON.parse(readFileSync(join(process.cwd(), "test", "fixtures", name), "utf8"));

test("valid contract fixtures pass TypeScript validators", () => {
  assert.equal(validateTaskCapsule(fixture("valid-task-capsule.json")).ok, true);
  assert.equal(validateWorkerResult(fixture("valid-worker-result.json")).ok, true);
});

test("invalid capsule returns deterministic exact diagnostics", () => {
  const outcome = validateTaskCapsule(fixture("invalid-task-capsule.json"));
  assert.equal(outcome.ok, false);
  assert.deepEqual(
    outcome.issues.map(({ path, keyword }) => ({ path, keyword })),
    [
      { path: "/authorityRefs", keyword: "minItems" },
      { path: "/capabilities", keyword: "uniqueItems" },
      { path: "/intent", keyword: "minLength" },
      { path: "/preconditionDigests/authority", keyword: "pattern" },
      { path: "/role", keyword: "enum" },
      { path: "/taskId", keyword: "minLength" }
    ]
  );
});

test("published JSON schemas stay synchronized with source schemas", () => {
  const taskSchema = JSON.parse(readFileSync(join(process.cwd(), "schemas", "task-capsule.schema.json"), "utf8"));
  const resultSchema = JSON.parse(readFileSync(join(process.cwd(), "schemas", "worker-result.schema.json"), "utf8"));
  assert.deepEqual(taskSchema, taskCapsuleSchema);
  assert.deepEqual(resultSchema, workerResultSchema);
});

test("canonical digest ignores object key insertion order", () => {
  assert.equal(digestJson({ b: 2, a: 1 }), digestJson({ a: 1, b: 2 }));
  assert.notEqual(digestJson({ a: 1 }), digestJson({ a: 2 }));
});
