import type { AdapterEvent, AdapterLaunchHandle, AdapterLaunchRequest, AdapterReadback } from "./contracts.ts";

export type EventSink = (event: AdapterEvent) => void;

export interface OrchestrationAdapter {
  launch(request: AdapterLaunchRequest, sink: EventSink): Promise<AdapterLaunchHandle>;
  readback(agentRef: string): Promise<AdapterReadback>;
  cancel(agentRef: string): Promise<void>;
}

export interface ScheduledWork {
  atMs: number;
  run(): void;
}

export interface DeterministicClock {
  now(): number;
  schedule(delayMs: number, run: () => void): void;
}
