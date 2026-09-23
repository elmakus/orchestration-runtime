import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("fixture repository skeleton contains the required M1 scenario inventory", () => {
  const inventory = JSON.parse(readFileSync(join(process.cwd(), "fixtures", "repository", "scenarios.json"), "utf8")) as {
    scenarios: string[];
  };
  for (const expected of [
    "green-check",
    "red-check",
    "merge-conflict",
    "isolated-worktree",
    "immutable-review-subject",
    "evidence-schema",
    "post-commit-crash",
    "transport-cut",
    "merge-no-readback"
  ]) {
    assert.ok(inventory.scenarios.includes(expected), `missing fixture scenario ${expected}`);
  }
});
