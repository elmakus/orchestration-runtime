# Research — Orchestration Runtime prior-art findings R1

Date: 2026-09-23
Research question: Transfer and reconcile the runtime-specific findings from the completed PWv2.1 / Orchestration Runtime architecture research into this repository without promoting them into architecture authority.

## Durable continuation metadata — chatgpt_only

Research ID: orchestration-runtime-prior-art-r1
Status: consumed
Origin role: brainstorming
Origin subject: orchestration-runtime-prior-art@R1
Return target: brainstorming:orchestration-runtime-prior-art@R1
Return reconciliation: applied
Return reconciliation result: brainstorming/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md@blob:c33dde764e4697651bac33e840da99c2ccbe95fe

## Purpose of this artifact

This is the durable runtime-side handoff from the architecture research that originally lived in:

- repository: `elmakus/chatgpt-codex-project-workflow`
- branch: `work/pwv2-architecture-prior-art-research`
- source artifact: `research/PWV2_ARCHITECTURE_PRIOR_ART_R3.md`
- source blob: `3fbefb2fa7bb1e5ba9fecf08e61d59b4b33d5b6d`

The source research separated Project Workflow governance from runtime orchestration after an earlier synthesis had blurred those layers.

This artifact intentionally transfers only:
- runtime responsibilities;
- shared Project Workflow ↔ runtime interface findings;
- prior art relevant to runtime implementation;
- legacy `codex_workflow` lessons;
- runtime-specific failure modes/rejects;
- validation experiments.

PWv2.1-only policy-kernel findings remain in the Project Workflow repository.

Nothing here is accepted architecture authority. This is research evidence for later Definition.

## Source snapshot

The source research pinned/rechecked:

- `monotykamary/pi-fabric@0c742a021e229602626ca76b6db5e831f38cb258`
- `NandhaKishorM/laya@010bacef009c855ccba814b51f7c8e1d38ab5e3f`
- `snellingio/system-one@8ca10fd7dda8ad7db4b88af64b27e61452dd3716`
- `dagucloud/dagu@f8e5c27ce6d94e65bc72ce2c340e6775f2e99083`
- `juicesharp/rpiv-mono@d74b1c99830a565f3df3f37e0a36616d17ffc574`
- `vekexasia/pi-extensible-workflows@0c11e343cc3b36afcc702a334a0c47ce0b27d622`
- legacy/local baseline: `elmakus/codex_workflow@018bcede6e0b5fe59c099a15e246d03cba02d9f6`

Relevant local architecture evidence also came from `elmakus/pi-unraid`, whose current durable research/governance separates Project Workflow authority from external/native subagent orchestration.

## Core architecture boundary

The runtime should not answer:

> What project phase/role is legally next?

It should answer:

> Given this exact legal execution obligation, how do I execute it safely, efficiently and observably?

Target boundary:

```text
                 PROJECT GOVERNANCE / POLICY
┌──────────────────────────────────────────────────────┐
│ Project Workflow                                     │
│                                                      │
│ - canonical repo/Git state                           │
│ - exact current subject/obligation                   │
│ - phase/role legality                                │
│ - authority/evidence requirements                    │
│ - review freshness semantics                         │
│ - user-owned gates                                   │
│ - legal transition/stop                              │
└──────────────────────┬───────────────────────────────┘
                       │ typed Execution Obligation
                       ▼
                 EXECUTION / ORCHESTRATION
┌──────────────────────────────────────────────────────┐
│ Orchestration Runtime                                │
│                                                      │
│ - launch worker/session                              │
│ - resolve provider/model/resources                   │
│ - deliver bounded context                            │
│ - fan-out/fan-in/pipeline                            │
│ - retry/timeout/concurrency/budget                    │
│ - worktree/session isolation                         │
│ - runtime journal/replay                             │
│ - compact status/observability                       │
└──────────────────────┬───────────────────────────────┘
                       │ typed Execution Result
                       ▼
┌──────────────────────────────────────────────────────┐
│ Project Workflow                                     │
│ - re-check canonical subject/preconditions           │
│ - validate evidence/result contract                  │
│ - persist any legal workflow transition in Git       │
└──────────────────────────────────────────────────────┘
```

The runtime can make repository/tool/external mutations when the obligation permits them.

The runtime must not independently decide that:
- a Card is complete;
- a review gate is satisfied;
- a RED result can be ignored;
- Definition/Planning is complete;
- a user promotion gate is satisfied;
- a workstream is integrated/terminal;
- another Project Workflow phase is now legal.

Those remain governance decisions.

# Runtime responsibility model

## Runtime owns

- worker/session process lifecycle;
- provider/model/thinking/runtime resolution;
- role-resource materialization;
- context transport;
- tool/skill/extension/MCP mapping;
- fan-out/fan-in/pipeline execution;
- runtime retry mechanics;
- timeout/cancellation;
- concurrency/recursion/budget guards;
- worktree allocation for subordinate execution sandboxes;
- structured worker-result enforcement;
- runtime journals and replay optimizations;
- event/status delivery;
- runtime observability;
- optional runtime-local advisory classification.

## Runtime does not own

- canonical Project Workflow workstream/Card/review state;
- accepted requirements/decisions;
- legal route selection;
- user-owned promotion/gate authority;
- semantic review independence definition;
- authority-slice selection by free inference;
- final project/workstream acceptance;
- canonical project recovery state;
- a second Task Board;
- a second workflow state machine whose persistence outranks Git.

## Runtime may derive but not own

- current runtime working queue from supplied/authorized obligations;
- progress views;
- dependency execution order for already-authorized parallel work items;
- provider/model/tool resolution;
- runtime retryability;
- runtime-local status.

# Legacy elmakus/codex_workflow lessons

The current fork is not the target architecture, but it contains useful mechanisms.

## Concepts worth preserving

### 1. Bounded delegation

Current design already recognizes that workers should not receive all Main context. Workers get a bounded role-owned package with:
- goal;
- constraints;
- relevant authority/context;
- evidence obligations.

This remains a strong runtime principle.

### 2. Semantic role independent of worker runtime

Current `plus` and `muse-max` profiles prove a useful abstraction:

```text
semantic role
    ↓
runtime/provider mapping
```

The same role can execute through different engines without changing its semantic responsibility.

The new runtime should generalize this rather than preserve the exact profile model.

### 3. Independent verification ownership

Current Executor versus Tester separation is useful.

The runtime should be capable of hard technical isolation between:
- implementation worker;
- independent reviewer/tester worker.

The semantic definition of "independent" remains external policy.

### 4. Event-driven waiting

Normal long worker execution should not produce status polling chatter.

Useful pattern:
- wait for terminal completion;
- allow a very small set of exceptional material events;
- keep routine progress out of the parent context.

### 5. Bounded result return

Workers return bounded final results rather than share arbitrary sibling context.

This maps directly to typed Execution Result.

### 6. Explicit role capability intent

Read-only discovery/review and mutating executor roles should have different effective capabilities.

The new runtime should make capability ceilings inspectable and mechanically enforceable.

## Concepts to rebuild rather than preserve

### Codex-specific identity

The new repository should not assume Codex is the semantic identity of orchestration.

Provider/model is runtime configuration.

### Fixed six-role topology

A hard-coded role set couples runtime implementation to one governance design.

Runtime should consume a semantic role/capability contract supplied by Project Workflow.

### Hard-coded provider profiles

Current `plus` / `muse-max` is useful evidence for adapterability, not necessarily the final configuration abstraction.

### Runtime-owned continuity documents

Project recovery must not depend on runtime-owned notes/session registries.

### Main-as-policy-owner because runtime says so

The runtime does not define governance roles. Project Workflow does.

# Prior art — pi-extensible-workflows

## Why it matters most

This is the strongest concrete Pi-native substrate candidate found.

It already provides:
- deterministic JavaScript workflow programs;
- separate `agent(...)` Pi sessions;
- no automatic inheritance of Main context;
- roles;
- model aliases;
- tool/skill/extension selectors;
- `contextFiles`;
- `parallel`;
- `pipeline`;
- registered workflow functions;
- `outputSchema`;
- exactly-one terminal `workflow_result`;
- checkpoints;
- budgets;
- worktrees;
- structural call identity;
- journal replay;
- retry/resume;
- compact status;
- Trajectory observability;
- compact workflow catalog discovery.

## Strong candidate use

A future adapter could map:

```text
Execution Obligation
    ↓
piewf role/session/options
    ↓
Pi agent(s)
    ↓
structured result
    ↓
Execution Result
```

This can avoid rebuilding from zero:
- session spawning;
- role/resource selection;
- fan-out;
- result schemas;
- journal/replay;
- subordinate worktrees;
- checkpoint transport;
- run inspection;
- budgets/concurrency.

## Important capability-selector caveat

Positive selectors are not automatically restrictive allowlists.

A restrictive role uses a deny-all-then-allow pattern such as:

```yaml
tools: ["!*", "read", "grep", "find", "ls"]
```

Any future adapter must validate effective capability sets rather than assume selector syntax is least-privilege.

## Fresh-review caveat

The bundled `reviewLoop` is not suitable as Project Workflow independent review.

It explicitly gives reviewers:
- original task;
- previous review findings;
- developer summary.

A fresh Project Workflow reviewer must instead be launched from a clean canonical package when policy requires it.

Therefore:
- reuse runtime primitives;
- do not reuse generic review semantics as governance authority.

## Journal caveat

Completed operations can replay after retry.

This is operationally valuable but does not provide exactly-once side effects.

A crash after an external effect but before journaling can repeat that effect.

Therefore:
- mutation/result contracts need readback/idempotency;
- uncertain external effects must be surfaced explicitly;
- journal state is cache, not truth.

## Substrate options to compare later

### Option A — wrap/adapt pi-extensible-workflows

Pros:
- substantial Pi-native runtime already implemented;
- fewer low-level lifecycle mechanisms to build;
- schemas/worktrees/replay/observability already present.

Risks:
- larger dependency/behavior surface;
- must prove runtime semantics can be constrained to external Project Workflow authority;
- package evolution/version compatibility;
- generic workflow concepts may be broader than needed.

### Option B — fork pi-extensible-workflows

Pros:
- tighter control and direct policy hardening.

Risks:
- ownership/update burden;
- divergence cost;
- premature fork before adapter limits are known.

### Option C — smaller native runtime built directly on Pi primitives

Pros:
- minimal surface;
- exact contract fit;
- easier conceptual audit.

Risks:
- reimplements session/process/worktree/retry/observability mechanisms;
- higher engineering cost;
- may recreate bugs solved upstream.

Research does not select among these.

# Prior art — Dagu

## Useful mechanisms

Dagu demonstrates deterministic execution-engine behavior:
- explicit dependency DAG;
- retries;
- timeouts;
- structured output schemas;
- human/approval waits;
- sub-DAG composition;
- durable run inspection;
- Pi harness steps;
- tool/provider/model/thinking selection.

## Best role in this project

Dagu is strong architecture prior art for:
- dependency scheduling;
- retry state;
- approval waiting;
- schema-valid step outputs;
- subordinate workflow composition.

It is less naturally embedded in Pi than pi-extensible-workflows.

## Explicit non-goal

Do not make Dagu run DB/state canonical Project Workflow state.

A future runtime may copy the engine patterns without deploying Dagu itself.

# Prior art — pi-fabric

## Strongest runtime findings

### Lazy capability discovery

Fabric exposes:
- `tools.search`;
- `tools.describe`;
- `tools.call`.

Discovery describes a capability but does not grant permission.

This is valuable when the full tool/MCP/plugin catalog is large.

Target pattern:

```text
small capability index
    ↓
search likely capability
    ↓
load exact schema/details
    ↓
authorization check
    ↓
call
```

This can materially reduce prompt/tool-schema overhead.

### Code-mode mechanical composition

One bounded program can:
- read;
- search;
- filter;
- loop;
- fan out;
- join results;
- return a small JSON-compatible result.

Only the returned value needs to enter the parent reasoning context.

This is useful for:
- evidence collection;
- repository search;
- mechanical tool-heavy transforms;
- large MCP result filtering.

### Bounded traces

Large intermediate tool output does not need to become the main reasoning transcript.

Stable evidence refs/trace metadata can preserve inspectability.

## Where it should not expand automatically

Fabric also has:
- agents;
- workflows;
- mesh/shared state.

If this repository adopts another orchestration substrate, Fabric should not automatically become a second scheduler/state owner.

Possible constrained use:
- capability discovery;
- code-mode tool composition;
- bounded provider/tool execution.

# Prior art — Laya / System One

## Mechanism

System One-style constrained decisions support:
- Choice;
- Score;
- boolean/Noul probability.

They use allowed-answer logits rather than normal free-text generation.

## Runtime fit

Potential use only for bounded non-authoritative choices such as:
- shortlist a tool class;
- recommend cheap versus strong runtime profile;
- bucket an evidence item;
- recommend escalation;
- rank candidate actions inside a pre-approved set.

## Hard limitations

Returned probability/confidence is not automatically calibrated correctness.

System One explicitly states:
- a value such as 0.9 is model probability mass, not 90% correctness;
- thresholds should be chosen from representative labeled data;
- option order and OOD behavior need evaluation.

## Do not use for

- legal Project Workflow route;
- Project Workflow approval;
- review acceptance;
- irreversible action authorization;
- authority selection.

## Adoption threshold

Do not introduce this subsystem merely because it is elegant.

Require:
- a real high-volume bounded classification problem;
- labeled production-like examples;
- measurable latency/cost benefit versus rules or normal model escalation;
- explicit abstain/fallback path.

# Prior art — rpiv-todo

Most of rpiv-todo belongs to Project Workflow research, not this runtime.

Runtime-adjacent findings:

## Useful

- clear ready/blocked visualization;
- derived dependency view;
- cycle-aware progress UX;
- reconstructable working view after context loss.

## Do not copy

- session/conversation branch persistence as project state;
- independent task authority.

If used here, it should only inspire a derived runtime/operator view sourced from canonical Project Workflow obligations plus ephemeral runtime jobs.

# Runtime candidate portfolio

## OR1 — Provider-neutral role runtime

### Problem

Legacy orchestration is tied to Codex/Muse-specific profiles.

### Mechanism

Define a runtime adapter abstraction that resolves:

```text
semantic role + capability requirements
        ↓
provider/model/thinking/runtime/session implementation
```

Project Workflow does not need to know the concrete provider unless accepted authority explicitly pins it.

### Benefit

- one orchestration layer across providers;
- runtime swaps do not redefine governance roles;
- easier benchmarking/fallback.

### Authority impact

None if runtime mapping is non-authoritative configuration.

### Complexity

Medium-high.

### Validation

Run the same Execution Obligation through two adapters and require:
- same semantic result schema;
- equivalent capability restrictions;
- no change to Project Workflow state semantics.

## OR2 — Fresh/continuation session primitive

### Problem

Some obligations require a new context; others legitimately continue a worker.

### Mechanism

Explicit mode:

```text
fresh
continue(session_ref)
```

Continuation is permitted only when the obligation says so.

Independent reviewer defaults to fresh.

### Benefit

Mechanical role isolation and predictable context.

### Complexity

Medium.

### Validation

- prove fresh reviewer cannot read executor transcript/session;
- prove continuation retains state only when explicitly authorized;
- stale/dead session fails closed.

## OR3 — Bounded context materializer/transport

### Problem

Project Workflow can name canonical authority refs, but worker context must be delivered without inheriting parent transcript.

### Mechanism

Runtime:
1. receives authority refs/digests;
2. verifies them;
3. materializes exact files/excerpts/instructions;
4. delivers them to fresh worker;
5. exposes omitted-but-expandable source refs.

Runtime must not substitute a different authority set.

### Benefit

Potentially very large context reduction.

### Risk

Omission/materialization bugs can silently weaken constraints.

### Validation

Replay historical tasks using:
- full manual context;
- bounded materialized context.

Primary metric is missed/changed constraints, not token reduction.

## OR4 — Structured result transport

### Problem

Free-form worker prose is hard to validate and compose.

### Mechanism

Typed terminal result envelope plus optional role-specific payload schema.

Exactly one terminal result.

### Benefit

- deterministic fan-in;
- clear malformed-result failure;
- smaller parent context;
- stable downstream handling.

### Limitation

Schema-valid does not mean semantically correct.

### Validation

Malformed, partial, oversized and contradictory result cases.

## OR5 — Fan-out / fan-in / pipeline scheduler

### Problem

Independent work should not require serial parent-agent turns.

### Mechanism

- keyed parallel work items;
- deterministic result association;
- pipeline stages;
- explicit dependency edges;
- bounded concurrency.

Runtime executes already-authorized work items.

### Benefit

Latency reduction and lower parent transcript growth.

### Risk

Semantic independence must not be guessed casually.

### Validation

- parallel read-only research;
- parallel isolated worktrees;
- one branch failure;
- cancellation;
- deterministic result ordering/identity.

## OR6 — Lazy capability discovery

### Problem

Large tool/plugin/MCP schema surfaces waste context.

### Mechanism

Compact index → search → describe → call.

Authorization remains separate.

### Benefit

High potential schema-context reduction.

### Validation

A/B:
- all schemas exposed;
- lazy discovery.

Measure:
- input tokens;
- lookup calls;
- failed tool calls;
- latency;
- final correctness.

## OR7 — Code-mode mechanical composition

### Problem

Tool-heavy loops/filter/search create many model/tool turns and large transcripts.

### Mechanism

Checked script/program executes multiple mechanical calls and returns bounded structured output plus evidence refs.

### Initial safety boundary

Read-only first.

### Benefit

High context/round-trip reduction.

### Validation

- failed nested call;
- partial fan-out;
- cancellation;
- oversized raw tool output;
- retained evidence refs;
- deterministic error surfacing.

## OR8 — Runtime journal/replay

### Problem

A runtime crash should not repeat every completed operation.

### Mechanism

Structural operation identity:
- completed operations replay from journal;
- incomplete operations execute.

Journal key must bind to canonical Execution Obligation digest.

### Benefit

Operational resilience.

### Authority rule

Journal is disposable cache.

### Validation

1. execute partial run;
2. crash;
3. replay;
4. delete all runtime state;
5. prove Project Workflow can still recover and launch a new correct run;
6. advance canonical subject/head and prove old run cannot resume.

## OR9 — Worktree isolation and mutation ownership

### Problem

Parallel mutating workers can collide.

### Mechanism

- subordinate named worktrees;
- one mutation owner per scope/path;
- explicit integration/readback;
- cleanup lifecycle.

### Authority rule

Project Workflow workstream branch remains lifecycle identity.

Runtime worktree is only execution sandbox.

### Validation

- disjoint concurrent edits;
- conflicting edits;
- stale base;
- worker crash;
- cleanup failure;
- result integration.

## OR10 — Event-driven lifecycle and observability

### Problem

Polling workers wastes calls/context and makes long tasks noisy.

### Mechanism

- durable runtime execution ID;
- terminal event delivery;
- small exceptional-event channel;
- inspect/status API;
- optional timeline/Gantt/Trajectory UI.

### Benefit

Lower chatter and better operations.

### Validation

Long worker, cancellation, restart, duplicate completion suppression and lost UI state.

## OR11 — Budgets / timeouts / recursion / concurrency guards

### Problem

Nested agent/tool execution can run away.

### Mechanism

Hard limits:
- max concurrent workers;
- max children per execution;
- max depth;
- timeout;
- token/cost budget;
- narrowing capability inheritance.

### Benefit

Operational safety and predictable resource use.

### Validation

- budget race;
- queued tasks;
- max depth;
- timeout;
- cancellation tree;
- child capability inheritance.

## OR12 — Optional calibrated typed decision helper

### Problem

Some runtime choices may be semantic but too small for a large reasoning model.

### Mechanism

Closed-label typed decision with:
- full distribution;
- calibration identity/version;
- abstain;
- fallback to stronger reasoning.

### Benefit

Potential latency/cost reduction.

### Authority rule

Advisory only.

### Validation

Real labeled runtime corpus:
- accuracy;
- confusion matrix;
- Brier/ECE;
- option-order sensitivity;
- OOD;
- drift;
- false automatic choice versus escalation cost.

## OR13 — Derived runtime/working-queue UX

### Problem

Operator needs compact view of:
- current obligations/jobs;
- blocked/ready work;
- worker status.

### Mechanism

Render:
- canonical Project Workflow facts;
- ephemeral runtime status.

Keep them visually/semantically distinct.

### Benefit

Good Pi/Paseo/TUI operation without making UI state authoritative.

### Validation

Delete all UI/cache state and rebuild from:
- canonical Project Workflow;
- surviving runtime processes/store where available.

UI must have no hidden path to advance canonical workflow state.

# Shared Project Workflow ↔ runtime interface

These contracts matter to this repository because the runtime must implement them, even though governance owns their semantic meaning.

## IF1 — Typed Execution Obligation

Conceptual shape:

```text
identity:
  workflow_revision
  workstream_id
  obligation_id
  subject

canonical_precondition:
  branch
  expected_head_or_state_digest

role:
  semantic_role
  freshness: fresh | continuation
  continuation_ref?: ...

authority:
  exact refs
  source hashes/commit refs
  dependency-result refs

policy:
  mutation class
  capability constraints
  workspace constraints
  review/evidence invariants

completion:
  required checks
  evidence requirements
  result schema id
```

### Runtime responsibility

- validate required fields;
- verify source bindings before launch;
- refuse stale/incompatible obligation;
- materialize without silently altering semantics.

### Non-goal

Do not inject provider/model aliases here unless Project Workflow accepted authority explicitly requires them.

## IF2 — Typed Execution Result

Conceptual shape:

```text
execution_id
obligation_digest
status:
  completed
  failed
  cancelled
  blocked
  stale

result_payload
evidence_refs
check_results
mutation_summary
resulting_commit_or_head
runtime_failure_code
runtime_trace_ref optional
resolved_runtime_metadata optional
```

Runtime returns facts.

Project Workflow decides lifecycle meaning.

## IF3 — Fresh independent-review contract

### Project Workflow side

Defines:
- exact review subject;
- exact authority/evidence;
- freshness requirement;
- prohibited contamination sources;
- allowed review capabilities;
- expected verdict/findings contract.

### Runtime side

Enforces:
- new session/process;
- no executor transcript inheritance;
- no persistent handle reuse;
- minimal/read-only capabilities unless explicitly authorized otherwise;
- exact canonical package;
- typed output.

A new agent ID alone is not sufficient if its prompt includes implementer narrative.

## IF4 — Abstract capability policy

Project Workflow should be able to express intent such as:
- repository read-only;
- repository mutation;
- Git commit allowed/forbidden;
- external network allowed/forbidden;
- external side effects allowed/forbidden;
- secret-access class;
- user interaction allowed/required.

Runtime maps these to concrete:
- Pi tools;
- extensions;
- MCP servers;
- permission rules;
- sandbox/worktree behavior.

This avoids coupling governance to one runtime's tool names.

## IF5 — Canonical stale-binding handshake

### Before launch/resume

Runtime checks:
- supplied branch/subject/digest still matches canonical references;
- execution has not been superseded.

### Before accepting result

Project Workflow rechecks canonical state independently.

Both ends fail closed.

## IF6 — User/checkpoint gate handshake

Project Workflow decides:
- gate is legally required;
- gate subject;
- allowed response shape.

Runtime:
- pauses execution;
- renders/collects response;
- returns exact gate ID + response.

Runtime checkpoint state alone does not make the response canonical.

## IF7 — Runtime failure taxonomy

Suggested stable classes:
- `retryable_provider_failure`;
- `timeout`;
- `cancelled`;
- `capability_missing`;
- `permission_denied`;
- `budget_exhausted`;
- `workspace_conflict`;
- `schema_invalid`;
- `stale_precondition`;
- `side_effect_uncertain`;
- `runtime_internal_error`.

The runtime must not convert these into arbitrary Project Workflow routes.

# Failure modes and explicit rejects

## R1 — Runtime state as project authority

Reject:
- run ID;
- journal;
- session registry;
- runtime DB;
- Trajectory/UI state

as proof of project lifecycle completion.

## R2 — Runtime required for project recovery

Reject any architecture where losing runtime state makes it impossible to recover the next Project Workflow obligation from Git.

## R3 — Runtime infers canonical authority

Runtime must not scan broad repo/chat history and decide on its own which requirements/decisions/current Card are authoritative.

Consume explicit canonical obligation refs.

## R4 — Generic piewf reviewLoop as governance review

Reject as direct implementation of Project Workflow independent review.

Reuse primitives, not its semantic loop.

## R5 — Ad-hoc generated orchestration program as policy authority

Dynamic workflow code can be useful for task execution.

It must not silently redefine:
- legal phases;
- user gates;
- review requirements;
- authority precedence.

## R6 — Persistent session for fresh reviewer

Reject persistent `agent.create`/equivalent handles when the obligation requires fresh independent review.

## R7 — Classifier as legal route owner

Laya/System One may advise bounded runtime choices only after validation.

## R8 — Confidence as correctness proof

Never interpret model probability/concentration as calibrated correctness without domain validation.

## R9 — Runtime-owned Task Board

Reject a second mutable project queue.

Runtime job queues are ephemeral execution state.

## R10 — Runtime worktree as workstream identity

Worktree branches are execution sandboxes only.

## R11 — Retry implies exactly-once

Never assume journal/retry prevents duplicate external side effects.

Use idempotency/readback and surface uncertainty.

## R12 — Provider-specific semantics in governance boundary

Avoid making Codex/Muse/other provider names part of generic role semantics unless accepted project authority explicitly requires them.

# Context strategy

The runtime has a major opportunity to reduce context without weakening authority.

## Parent context

Parent/Main should not need:
- all worker transcripts;
- all tool intermediate outputs;
- every MCP schema;
- every runtime status event.

It should receive:
- compact terminal result;
- exact evidence refs;
- exceptional event only when materially needed.

## Worker context

Worker should receive:
- semantic role;
- exact obligation;
- exact authority/materialized sources;
- minimal tools/resources;
- required output schema.

Worker should not automatically inherit:
- entire parent chat;
- unrelated project docs;
- sibling worker transcripts.

## Tool context

Use lazy capability discovery for large catalogs.

Hot/common capabilities may remain direct where measured benefit justifies prompt cost.

# Determinism and recovery strategy

## Deterministic parts

Prefer code for:
- lifecycle status transitions inside runtime;
- dependency scheduling;
- concurrency/budget checks;
- output-schema validation;
- workspace allocation;
- stale obligation validation;
- capability enforcement;
- retry state;
- cancellation.

## Semantic parts

Use models for:
- bounded role work;
- implementation;
- research;
- review reasoning;
- planning-like semantic work when supplied as an authorized obligation.

## Recovery hierarchy

```text
1. Project Workflow Git state
   -> determines legal current obligation

2. Runtime state/journal
   -> may accelerate continuation of that exact obligation

3. Worker session state
   -> may continue only when obligation permits it
```

If layer 2 or 3 disappears, layer 1 remains sufficient.

# Suggested validation sequence for future Definition/Planning

This is not implementation authorization.

## Stage 1 — Freeze interface before scheduler complexity

Define/prototype:
- IF1 Execution Obligation;
- IF2 Execution Result;
- IF4 capability abstraction;
- IF5 stale-binding handshake.

No multi-agent fan-out required.

## Stage 2 — One fresh read-only worker

Safest first role:
- Research/Explorer-style read-only worker.

Prove:
- no parent transcript inheritance;
- exact bounded context;
- typed result;
- capability ceiling.

## Stage 3 — Fresh independent reviewer

Prove:
- separate session;
- no executor narrative;
- canonical evidence package;
- read-only enforcement;
- typed findings/verdict.

## Stage 4 — One mutating executor

Prove:
- worktree/workspace isolation;
- mutation policy;
- commit/readback evidence;
- stale result rejection.

## Stage 5 — Substrate comparison

Run the same IF1/IF2 contract through:

A. pi-extensible-workflows adapter;

B. smallest plausible native Pi runtime.

Compare:
- implementation size;
- context overhead;
- reliability;
- isolation;
- retry/recovery;
- observability;
- upgrade coupling.

Do not compare architectures with different external contracts.

## Stage 6 — Add fan-out

Only after single-worker semantics are stable.

## Stage 7 — Add journal/replay

Then test destructive runtime-state deletion.

## Stage 8 — Add optional tool code-mode/lazy discovery

Use Fabric or equivalent only when measurement shows material benefit.

## Stage 9 — Consider typed classifier

Only if real bounded high-volume runtime decisions justify the operational cost.

# Validation matrix

| Experiment | Must prove |
|---|---|
| Obligation parser/validator | malformed/stale obligation fails before worker launch |
| Fresh worker | no implicit parent transcript/context |
| Fresh reviewer | zero executor transcript contamination |
| Capability audit | effective worker resources equal/narrow requested policy |
| Structured result corruption | malformed output is explicit failure |
| Provider swap | same semantic obligation/result contract across adapters |
| Runtime-state deletion | Project Workflow recovery remains possible |
| Resume after canonical advance | stale runtime resume fails closed |
| Journal crash before/after effect | no false exactly-once claim |
| Worktree parallelism | no unintended cross-worker mutations |
| Cancellation tree | descendants terminate/settle predictably |
| Duplicate completion | one terminal result accepted per execution |
| Fan-out partial failure | successful branches preserved; missing branches explicit |
| Lazy capability discovery | lower context without authorization bypass |
| Code-mode composition | bounded output without hidden evidence loss |
| Optional classifier | calibrated measurable benefit + abstain behavior |
| UI/cache deletion | runtime/project status reconstructs from real sources |

# Decision surface left for future Definition

Research does not resolve these:

1. Use `pi-extensible-workflows` as substrate?
2. Wrap or fork it?
3. Build minimal native Pi runtime instead?
4. Exact provider-adapter abstraction?
5. Exact capability-policy vocabulary?
6. Exact execution obligation/result schemas?
7. Which roles need continuation versus always-fresh sessions?
8. Worktree/integration model for mutating workers?
9. Runtime store format and retention?
10. Which observability UI is needed with Paseo/TUI?
11. Whether pi-fabric is installed or only borrowed conceptually?
12. Whether a typed classifier is operationally justified?
13. Version-compatibility contract between Project Workflow and runtime?

These belong to future Brainstorming/Definition after explicit promotion.

# Overall conclusion

The strongest transferred conclusion is:

> **Project Workflow decides what is legally required. Orchestration Runtime executes that exact obligation. Runtime output is evidence/input back to Project Workflow, never a second source of project truth.**

For this repository, the most promising architecture research direction is:

```text
provider-neutral semantic obligation
        ↓
runtime adapter / capability resolver
        ↓
fresh or authorized-continuation Pi worker
        ↓
bounded context + least privilege
        ↓
structured result + evidence refs
        ↓
canonical stale/precondition check
        ↓
Project Workflow lifecycle handling
```

The strongest concrete substrate candidate is `pi-extensible-workflows`.

The strongest complementary runtime ideas are:
- pi-fabric for lazy capability discovery and code-mode mechanical composition;
- Dagu for deterministic execution-engine patterns;
- current codex_workflow for bounded delegation/runtime abstraction/event-driven waiting lessons;
- System One/Laya only as optional calibrated advisory optimization.

No substrate, schema, provider architecture or implementation approach is accepted by this research.
