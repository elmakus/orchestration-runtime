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
| New Scout, Researcher and Reviewer assignments start in fresh sessions without inherited Main transcript; they receive only bounded task capsules and authorized references. | Full transcript inheritance increases contamination and context cost. | User-accepted exploratory choice from grilling round 3. |
| A Worker session should persist across implementation and ordinary repair iterations for the same bounded task, and be replaced only for a new task or explicit replacement. | Continuity preserves local implementation reasoning and avoids needless rediscovery. | User-accepted exploratory choice from grilling round 3. |
| Ordinary recheck after repair should return to the same Reviewer session; a new formal independent-review subject may require a fresh Reviewer when Project Workflow freshness rules say so. | Same-reviewer recheck preserves defect context, while formal independence remains a PW-owned semantic constraint. | User-accepted exploratory choice from grilling round 3. |
| Main should receive compact structured results plus evidence references by default, not worker transcripts or bulky logs. | This minimizes Main context while preserving evidence drill-down when needed. | User-accepted exploratory choice from grilling round 3. |
| Automatic Worker↔Reviewer repair cycles may run up to four failed repair attempts before escalation to Main. | A finite retry ceiling prevents unbounded loops while allowing more recovery than a strict two-attempt limit. | User-accepted exploratory choice from grilling round 3; exact failure accounting and reset semantics still to define. |
| Mutating Workers should use isolated worktrees by default when multiple Workers run concurrently; a single Worker may operate directly on the authorized workstream branch when collision risk is absent. | Mandatory worktrees for every trivial mutation add overhead, while concurrent writes need isolation. | User-accepted exploratory choice from grilling round 4. |
| Main/runtime may execute multiple Workers concurrently only when write scopes are non-overlapping and dependency ordering permits it; overlapping or dependent mutation packages must serialize. | Parallelism is useful only when ownership can be made mechanically safe. | User-accepted exploratory choice from grilling round 4. |
| Every semantic role has a hard capability ceiling; Main may narrow but never expand a worker beyond that role ceiling. | This keeps role safety enforceable by runtime rather than prompt convention. | User-accepted exploratory choice from grilling round 4. |
| Every worker return uses a validated structured result envelope with bounded natural-language fields and explicit evidence/check/change/blocker data as applicable. | Free-form returns are harder to route, validate, retry and summarize consistently. | User-accepted exploratory choice from grilling round 4. |
| Main/runtime may cancel an in-flight worker batch when new evidence invalidates its question or canonical precondition; normal Scout/Researcher batches otherwise complete before synthesis. | Early cancellation saves wasted work only when the remaining assignments have become semantically stale, not merely because an early answer looks plausible. | User-accepted exploratory choice from grilling round 4. |
| Worker-model resolution should fail closed when the configured worker model is unavailable; no silent fallback to Main or another model. | Silent fallback breaks cost/capability expectations and obscures execution semantics. | User-accepted exploratory choice from grilling round 5. |
| Runtime may automatically retry only failures classified as transient/retryable infrastructure failures; semantic, permission, stale-precondition and invalid-schema failures require cause correction or Main intervention. | Blind retries can repeat invalid work or side effects. | User-accepted exploratory choice from grilling round 5. |
| Timeout policy should be activity-aware: use a role-configured inactivity timeout plus a much higher absolute hard ceiling. Meaningful lifecycle activity renews the inactivity lease; reaching the hard ceiling still stops/escalates the task. | A single wall-clock timeout would kill healthy long-running workers, while no hard ceiling permits hung or runaway sessions. | Tentative recommendation accepted for further grilling in round 5; exact durations unresolved. |
| Worker failure returns a compact diagnostic envelope including failure class, attempt count, last meaningful error, session/worktree refs and side-effect certainty, while keeping full logs out of Main context by default. | Main needs enough information to decide without absorbing bulky runtime traces. | User-accepted exploratory choice from grilling round 5. |
| Main has no bypass for runtime mechanical guardrails such as capability ceilings, model pinning or workspace isolation; it must instead issue a new legal assignment/strategy. | Prompt-level discretion must not disable enforced safety and determinism. | User-accepted exploratory choice from grilling round 5. |
| Initial semantic role set is `Scout`, `Researcher`, `Worker`, and `Reviewer`. | These names are provider-neutral and map cleanly to discovery, external/problem research, bounded mutation, and independent verification. | User-accepted exploratory choice from grilling round 6. |
| Do not add a dedicated Archivist role in the initial runtime. | Project Workflow owns durable project state in PW-controlled mode; ad-hoc documentation can be assigned to a Worker until evidence shows a separate role is worthwhile. | User-accepted exploratory choice from grilling round 6. |
| Do not add a dedicated Evidence Auditor role initially. | One Researcher lane can be explicitly adversarial/evidence-focused; a separate role can be introduced only if repeated use proves necessary. | User-accepted exploratory choice from grilling round 6. |
| Main should receive only material lifecycle events by default: completed, blocked/needs-decision, failed, stale, and optionally a sparse long-running notice; routine progress remains runtime-local. | This avoids polling and Main-context churn while preserving intervention points. | User-accepted exploratory choice from grilling round 6. |
| Runtime should enforce a configurable global concurrency ceiling; initial default maximum active subagent sessions is 9, with excess work queued rather than rejected when otherwise valid. | This bounds accidental fan-out and host/provider pressure without constraining the semantic size of a work wave. | User-accepted exploratory choice from grilling round 6. |
| Main owns semantic delegation classification (`direct`, Scout, Researcher, Worker, Reviewer); runtime enforces only mechanical validity and role invariants. | A second semantic router inside runtime would duplicate Main reasoning and risk conflicting authority. | User-accepted exploratory choice from grilling round 7. |
| Once Main/PW marks an assignment as full Research, runtime requires exactly three independent Researcher lanes for that bounded problem. | This preserves deliberate multi-angle research while leaving the decision to invoke full Research with Main/PW. | User-accepted exploratory choice from grilling round 7. |
| Broad discovery marked as such requires exactly two independent Scout lanes; narrow lookup may use one Scout or direct Main inspection. | This mirrors the research fan-out pattern without wasting workers on trivial discovery. | User-accepted exploratory choice from grilling round 7. |
| Multi-lane Scout/Researcher fan-out requires one shared bounded problem plus a distinct explicit angle for every lane; identical prompts are invalid for mandatory fan-out. | Diversity should come from intentional evidence perspectives, not stochastic duplication. | User-accepted exploratory choice from grilling round 7. |
| Main may open additional Scout/Researcher waves when a completed wave exposes a new material question; each new full Research problem again follows the three-lane rule. | Research depth should be adaptive rather than globally limited to one wave. | User-accepted exploratory choice from grilling round 7. |
| In PW-controlled mode, Main may decompose and refine an Execution Obligation into legal subassignments but may not change its goal, authority, evidence requirements, capability bounds or canonical subject. | Main orchestrates execution but does not rewrite Project Workflow semantics. | User-accepted exploratory choice from grilling round 8. |
| Main supplies semantic task content, angles and ownership; runtime materializes the final worker capsule with model resolution, session mode, capability ceiling, workspace/worktree, IDs, schema, timeout and canonical bindings. | This separates reasoning from mechanical enforcement and keeps worker packaging consistent. | User-accepted exploratory choice from grilling round 8. |
| In ad-hoc mode, Main may choose task-specific scope and capabilities only within the selected role's hard ceiling. | Ad-hoc flexibility should not bypass enforced role safety. | User-accepted exploratory choice from grilling round 8. |
| Worker results must bind to the exact task/obligation input through an immutable digest and relevant canonical preconditions; changed subject/head/precondition makes the old result stale rather than acceptable by default. | This prevents accepting evidence produced for an obsolete execution target. | User-accepted exploratory choice from grilling round 8. |
| Runtime should persist disposable execution journal/session metadata for resume, diagnostics and observability, including run IDs, worker sessions, attempts, worktrees, events and result references; project recovery must not depend on it. | Runtime state accelerates continuation but must remain subordinate to Git/Project Workflow truth. | User-accepted exploratory choice from grilling round 8. |
| Runtime recovery always revalidates canonical state and task preconditions before attempting resume; mismatched bindings make the prior run stale. | Runtime continuation must never outrank current Git/Project Workflow truth. | User-accepted exploratory choice from grilling round 9. |
| If a Worker session disappears while its worktree/partial changes remain, a fresh replacement Worker may take over through an explicit handoff of current workspace state rather than pretending session continuation. | Session identity and workspace state are separate; preserving that distinction avoids hidden continuity assumptions. | User-accepted exploratory choice from grilling round 9. |
| Uncertain external side effects must not be blindly retried after crash; runtime returns `side_effect_uncertain` unless a safe read-back/idempotency check can resolve the state. | Blind retries can duplicate irreversible actions. | User-accepted exploratory choice from grilling round 9. |
| Results marked stale cannot satisfy the current obligation/acceptance; Main may only reuse them as advisory input to a new legal task. | This preserves exact subject/precondition binding while avoiding needless loss of potentially useful information. | User-accepted exploratory choice from grilling round 9. |
| Runtime should garbage-collect completed worktrees, sessions and journals after a retention window and only after required results/evidence references have been safely persisted outside ephemeral execution state. | Ephemeral execution artifacts should not accumulate indefinitely or become accidental authority. | User-accepted exploratory choice from grilling round 9; exact retention period unresolved. |

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
