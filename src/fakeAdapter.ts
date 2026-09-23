import type { AdapterEvent, AdapterEventType, AdapterLaunchHandle, AdapterLaunchRequest, AdapterReadback } from "./contracts.ts";
import type { DeterministicClock, EventSink, OrchestrationAdapter, ScheduledWork } from "./adapter.ts";

export interface FakeScriptEvent {
  delayMs: number;
  type: AdapterEventType;
  payload?: unknown;
}

export class ManualClock implements DeterministicClock {
  private currentMs = 0;
  private queue: ScheduledWork[] = [];

  now(): number { return this.currentMs; }

  schedule(delayMs: number, run: () => void): void {
    if (!Number.isInteger(delayMs) || delayMs < 0) throw new Error("delayMs must be a non-negative integer");
    this.queue.push({ atMs: this.currentMs + delayMs, run });
    this.queue.sort((a, b) => a.atMs - b.atMs);
  }

  advanceTo(targetMs: number): void {
    if (targetMs < this.currentMs) throw new Error("clock cannot move backwards");
    while (this.queue[0] && this.queue[0].atMs <= targetMs) {
      const next = this.queue.shift()!;
      this.currentMs = next.atMs;
      next.run();
    }
    this.currentMs = targetMs;
  }

  runAll(): void {
    while (this.queue.length > 0) this.advanceTo(this.queue[0]!.atMs);
  }
}

interface FakeAgent {
  assignmentId: string;
  state: AdapterReadback["state"];
  lastSequence: number;
}

export class ScriptedFakeAdapter implements OrchestrationAdapter {
  private nextId = 1;
  private agents = new Map<string, FakeAgent>();

  constructor(private readonly clock: DeterministicClock, private readonly script: readonly FakeScriptEvent[]) {}

  async launch(request: AdapterLaunchRequest, sink: EventSink): Promise<AdapterLaunchHandle> {
    const agentRef = `fake-agent-${this.nextId++}`;
    const agent: FakeAgent = { assignmentId: request.assignmentId, state: "running", lastSequence: 0 };
    this.agents.set(agentRef, agent);
    let accumulated = 0;
    this.script.forEach((scriptEvent, index) => {
      accumulated += scriptEvent.delayMs;
      this.clock.schedule(accumulated, () => {
        const current = this.agents.get(agentRef);
        if (!current || current.state === "missing") return;
        const sequence = index + 1;
        current.lastSequence = sequence;
        if (scriptEvent.type === "completed") current.state = "completed";
        if (scriptEvent.type === "failed") current.state = "failed";
        const event: AdapterEvent = {
          sequence, agentRef, assignmentId: request.assignmentId,
          type: scriptEvent.type, atMs: this.clock.now(), payload: scriptEvent.payload
        };
        sink(event);
      });
    });
    return { agentRef, assignmentId: request.assignmentId };
  }

  async readback(agentRef: string): Promise<AdapterReadback> {
    const agent = this.agents.get(agentRef);
    if (!agent) return { agentRef, assignmentId: "", state: "missing", lastSequence: 0 };
    return { agentRef, ...agent };
  }

  async cancel(agentRef: string): Promise<void> {
    const agent = this.agents.get(agentRef);
    if (agent) agent.state = "failed";
  }
}
