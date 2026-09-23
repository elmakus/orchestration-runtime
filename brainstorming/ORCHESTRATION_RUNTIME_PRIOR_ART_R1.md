# Brainstorm — Orchestration Runtime prior-art findings

Date: 2026-09-23
Scope ID: orchestration-runtime-prior-art
Revision: R1
Status: tentative

## Goal

Receive and organize the orchestration-layer findings transferred from the completed architecture research in `elmakus/chatgpt-codex-project-workflow`.

This scope is deliberately narrower than the source research. It concerns the standalone `elmakus/orchestration-runtime` project only.

## Boundary

Project Workflow remains the governance/policy authority.

This repository concerns the execution layer that consumes an exact Project Workflow obligation and executes it through bounded workers/tools/sessions.

Working boundary:

```text
Project Workflow
  -> typed Execution Obligation
  -> Orchestration Runtime
  -> typed Execution Result
  -> Project Workflow
```

The runtime may execute repository/tool mutations when authorized by the obligation, but it must not become a second source of project lifecycle truth.

## Transferred source

Primary source artifact:

`elmakus/chatgpt-codex-project-workflow`
branch: `work/pwv2-architecture-prior-art-research`
artifact: `research/PWV2_ARCHITECTURE_PRIOR_ART_R3.md`
source blob: `3fbefb2fa7bb1e5ba9fecf08e61d59b4b33d5b6d`

R1/R2 source research pinned the upstream implementations; R3 rechecked that their main HEADs had not changed before performing the layer reclassification.

## Verified findings received

- Project Workflow and runtime orchestration are separate layers by design.
- Runtime should consume an exact semantic obligation rather than infer the current project lifecycle from broad repository/chat context.
- Runtime state/journals/sessions/worktrees are execution metadata and optimization, never canonical project authority.
- The strongest concrete Pi-native substrate candidate found is `pi-extensible-workflows`.
- Dagu provides strong deterministic execution-engine prior art but is less naturally embedded in Pi.
- pi-fabric provides strong code-mode composition and lazy capability-discovery prior art.
- Laya/System One is an optional advisory optimization for bounded typed classification, not a routing authority.
- rpiv-todo contributes only runtime-adjacent derived queue/UI ideas; its task persistence model must not become canonical runtime/project state.
- Existing `elmakus/codex_workflow` contains useful lessons around bounded delegation, provider/runtime abstraction, independent verification and event-driven waiting, but it is not the target architecture.
- Fresh independent review is a cross-layer contract: Project Workflow defines semantic freshness/evidence; runtime enforces clean session/resource isolation.

## Candidate families received

### Orchestration Runtime

- provider-neutral role runtime;
- explicit fresh/continuation worker sessions;
- bounded context materialization/transport;
- structured result transport;
- fan-out/fan-in/pipeline scheduling;
- lazy capability discovery;
- code-mode mechanical composition;
- runtime journal/replay;
- worktree isolation/mutation ownership;
- event-driven lifecycle and observability;
- budgets/timeouts/recursion/concurrency guards;
- optional calibrated typed decision helper;
- derived runtime/working-queue UX.

### Shared Project Workflow ↔ runtime interface

- typed Execution Obligation;
- typed Execution Result;
- fresh independent-review contract;
- abstract capability policy;
- canonical stale-binding handshake;
- user/checkpoint gate handshake;
- stable runtime failure taxonomy.

## Explicit rejects received

- runtime journal/run ID as project authority;
- external orchestrator database/history required for project recovery;
- runtime selecting canonical requirements/decisions/route by inference;
- bundled `pi-extensible-workflows` `reviewLoop` as Project Workflow independent review;
- ad-hoc LLM-generated workflow program as Project Workflow policy;
- persistent agent handle for fresh independent review;
- small classifier as legal workflow router;
- confidence threshold as proof of correctness;
- runtime-owned second Task Board;
- runtime worktree branch as replacement for Project Workflow workstream identity.

## Adaptive discovery state

### Accepted exploratory choices

| Choice | Challenge | Stability |
|---|---|---|
| Runtime remains separate from Project Workflow governance. | Combining them would reduce one interface but make execution state compete with canonical policy/state. | Stable research constraint. |
| Runtime should be provider-neutral. | Current codex_workflow proves multi-runtime roles are possible; retaining Codex-specific identity would make the new layer unnecessarily narrow. | Stable research conclusion, not yet requirement. |
| Runtime state is disposable relative to project truth. | Journals materially improve recovery speed, but requiring them would create a second authority. | Stable research conclusion. |
| Evaluate pi-extensible-workflows before rebuilding all Pi orchestration primitives. | Building from scratch gives control, but duplicates existing session/replay/worktree/schema machinery. | Stable candidate, not selected architecture. |
| Interface must carry semantic constraints without leaking provider-specific wiring into Project Workflow. | Putting tool names/model aliases into policy would couple governance to one runtime. | Stable research conclusion. |
| Main should retain a worker-free fast path for genuinely small/leaf work and decide whether delegation is worthwhile before spawning any subagent. | Forcing a subagent for every task wastes coordination/context on trivial work; allowing Main to do substantive delegated work would defeat the orchestration objective. | User-accepted exploratory choice from grilling round 1. |
| All normal worker roles should resolve through one centrally configured fixed worker model rather than role-specific model selection by Main. | Per-call model override or silent fallback to Main would make cost/capability behavior unpredictable. | User-accepted exploratory choice from grilling round 1; exact failure/fallback semantics still to refine. |
| Full Research should default to three fresh independent researcher lanes with complementary angles, synthesized by Main rather than majority voting. | One researcher is cheaper, but materially weaker against blind spots; identical prompts to three workers would waste the fan-out. | User-accepted exploratory choice from grilling round 1. |
| Runtime should support both Project-Workflow-controlled obligations and lightweight ad-hoc Main delegation through one orchestration layer. | A PW-only runtime would unnecessarily limit normal Pi use; two unrelated runtimes would duplicate worker/session mechanics. | User-accepted exploratory choice from grilling round 1; common-envelope details unresolved. |
| Keep Scout and Researcher as distinct semantic roles: Scout maps existing local/project context; Researcher investigates unknowns, alternatives, external evidence and prior art. | Merging them makes permissions/prompts broader and increases duplicate discovery. | User-accepted exploratory choice from grilling round 2. |
| Broad context discovery should default to two fresh Scout lanes with complementary angles; narrow lookups may use Main directly or one Scout. | Always spawning two wastes coordination on trivial lookups; one lane is weaker for genuinely broad discovery. | User-accepted exploratory choice from grilling round 2. |
| Review requirement is supplied by Project Workflow in PW-controlled mode and decided by Main in ad-hoc mode; runtime does not force review for every worker task. | Mandatory review of every trivial task adds unnecessary cost; omitting policy-owned review would violate governance. | User-accepted exploratory choice from grilling round 2. |
| Ordinary review defects should use a repair loop bound to the same Worker and same Reviewer when possible; no direct sibling-agent messaging is required. | Direct peer messaging weakens Main/runtime observability and can create hidden coordination state. | User-accepted exploratory choice from grilling round 2; exact broker/auto-forward semantics still to refine. |
| Only Main/runtime may spawn subagents initially; worker-to-worker recursive spawning is forbidden. | Flat orchestration keeps cost, authority, context and failure propagation bounded. | User-accepted exploratory choice from grilling round 2. |

### Unresolved product/architecture decisions

- adopt, wrap, fork or reject `pi-extensible-workflows`;
- build a thinner Pi-native role runtime instead;
- exact Execution Obligation/Result schema;
- exact provider/capability adapter model;
- whether code-mode composition uses pi-fabric, MCP-native scripting or a smaller internal mechanism;
- whether optional typed classification has enough real volume/value to justify operation;
- final architecture/name beyond repository identity.

## Research status

Transferred findings are complete in:

`research/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md`

No Definition/Planning promotion has been authorized.

## Outcome

- Tentative conclusion: treat the new repository as the home of the provider-neutral execution/orchestration layer, with Project Workflow remaining external authority.
- Explicit product choices promoted: none.
- Research still needed before architecture selection: live substrate comparison/prototype after future Definition authorization.
- Next phase/action: approved transfer scope complete.
- Definition promotion authorization: pending
- Definition promotion subject: none

> Nothing in this file becomes accepted requirement/decision authority by itself.
