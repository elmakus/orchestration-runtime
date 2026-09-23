# ADR — Orchestration Runtime Definition R1

Status: ACCEPTED
Source scope: `orchestration-runtime-prior-art@1`
Source Brainstorming blob: `ea3bc14673cc0cc064dd891fdd6ce3a13218342b`

## Decision

Accept the promoted Orchestration Runtime R1 boundary as the product/architecture decision set for downstream Planning.

The canonical requirements are `requirements/ORCHESTRATION_RUNTIME_R1.md`. This ADR records the principal architecture choices that Planning must preserve.

## Accepted architecture

- Project Workflow remains the external governance and lifecycle authority. OR is an execution/orchestration layer, not a second authority store.
- OR consumes bounded typed obligations and returns bounded typed results with exact binding/staleness semantics.
- OR durable contracts remain provider-neutral, while the initial deployment standardizes on Paseo-managed Pi execution.
- OR integrates with Main through a Pi extension/tool surface backed by a separately testable core library.
- V1 uses one Paseo host/control plane, no separate OR daemon and no OR database.
- The initial semantic roles are Scout, Researcher, Worker and Reviewer.
- Main owns semantic delegation/decomposition and synthesis; OR owns mechanical validation/enforcement, session/workspace orchestration, fan-out invariants, capability/tool resolution and runtime recovery.
- Main retains a fast path for truly small work, while substantial work classified for OR does not silently fall back when OR is unavailable.
- Full Research is three fresh complementary Researcher lanes; broad discovery is two fresh complementary Scout lanes.
- Worker fan-out is dynamic and only legal when dependency/write ownership permits it. PW-controlled mutation remains bounded by the exact PW obligation/workstream.
- Review normally uses one independent Reviewer; ordinary RED repair reuses the same bounded Worker/Reviewer pair where valid and escalates after the accepted finite repair budget.
- Repository mutation never starts from `main`; PW mutation uses the canonical PW workstream, while ad-hoc mutation auto-creates a legal branch/worktree.
- Concurrent mutating workers use isolated worktrees/subbranches, produce exact commits and integrate mechanically only after Main accepts the semantic result.
- User-facing mutating completion always exposes explicit Git/integration truth; implementation, review, orchestration and merge completion are distinct states.
- Runtime state is disposable and recovery revalidates canonical Git/PW truth. Uncertain side effects are read back rather than blindly retried.
- OR is event-driven over Paseo lifecycle notifications rather than status polling.
- V1 uses one centrally configured worker profile/model/reasoning policy and one generous global concurrency ceiling, initially 9 active subagents.
- Capability policy is deliberately practical and simple: hard role ceilings, broad defaults, bounded grants for secrets/production/external side effects, and native mechanical enforcement where available.
- OR owns a global versioned Tool Registry. New or materially changed tools may be LLM-analyzed automatically, but generated classifications are proposals only and require explicit user approval before activation.
- V1 includes `or doctor`, deterministic core tests with a fake adapter, live Paseo/Pi integration tests, fault-injection recovery tests and end-to-end verification including target-side merged-state readback.
- Initial rollout moves from fixture validation directly to real-project testing across the user's actual projects.

## Supersession rule

The promoted Brainstorming artifact contains deliberate refinements made across many grilling rounds. Where an earlier choice is explicitly revised, superseded or narrowed later in that same artifact, the later statement controls. Temporary candidate ideas, unresolved research candidates, rejected proposals and explicitly deferred implementation details are not accepted architecture merely because they appear in the source artifact.

Important resolved refinements include:

- Paseo is mandatory for the initial deployment rather than merely an optional backend candidate.
- OR does not duplicate Paseo transcripts/timelines or introduce its own daemon/database.
- Token/cost accounting is not a V1 requirement despite earlier exploratory interest in it.
- Tool classification is automatically proposed but never auto-activated; the user retains final approval and may edit the proposal.
- Capability design stays intentionally lightweight instead of evolving into a general IAM/policy platform.
- The hard execution timeout is a generous last-resort global safety fuse rather than normal inactivity supervision.
- Runtime journal retention is bounded (initially roughly 30 days) and is not project authority.
- V1 keeps one subagent level only.
- Rollout proceeds from fixture tests directly into real-project testing rather than requiring a single low-risk pilot.

## Cross-repository dependencies that do not block this Definition

Two follow-ups remain outside this repository's Definition authority:

1. `elmakus/chatgpt-codex-project-workflow#56` decides/clarifies how one PW Card/Execution Obligation may legally contain multiple mutating Workers. OR must obey the current PW authority and fail closed/serialize where that topology is not legal.
2. `elmakus/pi-unraid#3` concerns host-level/global Pi repository mutation policy. OR's own requirement remains no write from `main`, exact PW binding in managed mode and automatic legal branch/worktree creation in ad-hoc mutation.

These follow-ups may refine integration mechanics but do not reopen the accepted OR product boundary.

## Consequences

Planning may now choose exact schemas, TypeScript APIs, repository layout, adapter implementation and reusable substrate decisions, but it may not weaken the authority boundary, role/freshness rules, fan-out invariants, Git truth, recovery semantics or user-approved tool-classification model accepted here.
