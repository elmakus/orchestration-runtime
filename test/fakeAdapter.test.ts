import assert from "node:assert/strict";
import test from "node:test";
import type { AdapterEvent, TaskCapsule } from "../src/contracts.ts";
import { ManualClock, ScriptedFakeAdapter } from "../src/fakeAdapter.ts";

const capsule: TaskCapsule = {
  schemaVersion: 1,
  taskId: "fake-task",
  role: "worker",
  intent: "deterministic replay",
  authorityRefs: ["requirements/ORCHESTRATION_RUNTIME_R1.md"],
  preconditionDigests: {},
  capabilities: ["local_read"],
  negativeBoundaries: ["no external side effects"],
  payload: {}
};

async function replay(): Promise<AdapterEvent[]> {
  const clock = new ManualClock();
  const adapter = new ScriptedFakeAdapter(clock, [
    { delayMs: 0, type: "started" },
    { delayMs: 5, type: "attention", payload: { note: "bounded" } },
    { delayMs: 5, type: "completed", payload: { ok: true } }
  ]);
  const events: AdapterEvent[] = [];
  const handle = await adapter.launch({ assignmentId: "assignment-1", capsule, workspaceRef: "fixture" }, (event) => events.push(event));
  clock.runAll();
  assert.deepEqual(await adapter.readback(handle.agentRef), {
    agentRef: "fake-agent-1",
    assignmentId: "assignment-1",
    state: "completed",
    lastSequence: 3
  });
  return events;
}

test("fake adapter replays deterministically", async () => {
  assert.deepEqual(await replay(), await replay());
});

test("manual clock fails closed on backwards time", () => {
  const clock = new ManualClock();
  clock.advanceTo(10);
  assert.throws(() => clock.advanceTo(9), /cannot move backwards/);
});
