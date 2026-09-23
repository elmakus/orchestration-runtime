# Orchestration Runtime — Strategic Plan P1 (FROZEN)

Status: **FROZEN** — cycle 1, planner audit GREEN, independent Plan Review pending,
not approved for Execution Prep. Do not treat this document as execution authority:
Execution Prep requires a GREEN independent review of this exact frozen subject plus
satisfied premium C.

| Field | Value |
|---|---|
| Workstream | `change-orchestration-prior-art-findings` |
| Planning cycle | 1 |
| Entry subject | `definition:R1|planning-cycle:1` |
| Plan revision | P1 |
| Plan path | `planning/ORCHESTRATION_RUNTIME_PLAN_P1.md` |
| State / audit | frozen / green (independent review pending; not approved for Execution Prep) |

## Authority bindings (exact, read-only)

This plan implements only the accepted Definition below. Brainstorming and Research
artifacts are provenance/evidence, not authority. Accepted Brainstorming choices carry
binding force only as incorporated into requirements R1..R12 and the ADR under their
Interpretation/supersession rules (later explicit refinements control; candidates,
rejects, deferred details, and cancelled questions are excluded); all other exploratory
content remains evidence only.

| Authority | Path | Blob (verified this run) |
|---|---|---|
| Requirements R1 (canonical) | `requirements/ORCHESTRATION_RUNTIME_R1.md` | `317ef0626446425dd023578b1ce831d61361299e` |
| Decisions ADR R1 (canonical) | `decisions/ADR_ORCHESTRATION_RUNTIME_R1.md` | `03fd5544102c1e470acffba15f42a59149123bf2` |
| Brainstorming source (incorporated choices only) | `brainstorming/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md` | `ea3bc14673cc0cc064dd891fdd6ce3a13218342b` |
| Research evidence (supporting only) | `research/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md` | `208b5d024618e35098d334b37852a1394ec2af7d` |
| Workflow/bootstrap binding (not product authority) | `workflow/PWV2_ADOPTION.md` | `a289a90e75e5900ac6bb73088beb8d40edf19db9` |
| PWv2 package | `elmakus/project_workflow_v2@c2f53dc15f35dcbf1506b5a80ad3fd85d32211dd` (tree `f05d86d…`, pw `0.2.1`) | — |

Premium A provenance (semantic only): initial A for exact Definition R1 was
satisfied by the user's locator-only receiving-context handoff
(repository + branch + obligation `premium_A` + start pointer
`implementation/workstreams/change-orchestration-prior-art-findings/DEFINITION.toml`),
accepted as the planning-context authorization. No model, session, or harness
identity is recorded as authority.

How to read: §§ Goal–Validation Plan are the executable strategy in six
milestones. The appendix maps every atomic R1..R12 clause, every ADR boundary,
and the accepted refinements to milestones and checks. Milestone sections state
their requirement anchors; the appendix is the complete coverage proof.

## Goal

Deliver Orchestration Runtime V1: a provider-neutral execution/orchestration
layer that consumes exact bounded obligations (PW-controlled or ad-hoc Main
delegation), executes them through Paseo-managed Pi workers under enforced
role, capability, fan-out, Git-truth, and recovery contracts, and returns exact
bounded results — with Project Workflow remaining the sole governance authority.

## Success Criteria

1. All six milestone gates (G1–G6) pass in order; each gate re-verifies prior gates' contracts (no regression by later slices).
2. Mandatory fan-out invariants hold exactly: full Research = 3 fresh lanes /
   3 successes; broad discovery = 2 fresh lanes / 2 successes; failures replaced or run blocks/fails.
3. Worker→Reviewer RED→repair→GREEN lifecycle completes within budgets (≤4 failed
   semantic repairs; ≤2 infrastructure retries after initial; format correction on a
   separate one-attempt budget) with same-session continuity where the subject is unchanged.
4. Every mutating completion exposes explicit Git/integration truth; terminal
   `MERGED_MAIN` is reported only after target-side readback; merge without readback
   yields `integration_uncertain`, never `MERGED_MAIN`.
5. Recovery matrix passes: journal loss, post-commit/pre-result, transport
   interruption, dirty cancellation, and merge-time uncertainty each recover observably
   or fail closed with diagnostics; canonical Git/PW state plus attributable Paseo
   metadata/history suffice for best-effort recovery, with explicit uncertainty where
   evidence is incomplete.
6. `or doctor` is callable through the Main-facing surface and reports deployment,
   profile/config, capability/registry, classification-pending, and Git/worktree readiness.
7. Full suite passes twice: deterministically against a fake adapter, and live against
   real Paseo/Pi on the inexpensive worker profile; end-to-end acceptance on the fixture
   repository is followed by direct testing across the user's real projects.

## Context And Current Facts

- Accepted Definition is GREEN for scope `orchestration-runtime-prior-art@1` (R1):
  12 requirement groups (121 numbered clauses), ADR architecture boundaries, explicit V1
  exclusions, and Planning-deferred implementation details (schemas, TS types, module
  layout, adapter APIs, config syntax, optional substrate reuse).
- No OR product code exists yet; this plan is the first Planning-cycle output. Nothing
  has been implemented, frozen, reviewed, or approved for execution.
- Initial deployment standardizes on Paseo as execution/control backend with Pi as the
  coding-agent harness beneath it. The current supported Paseo/Pi environment is an
  execution prerequisite: actual versions, lifecycle events, reconnect/resume behavior,
  tool restrictions, worktree support, and failure modes are **unverified** and must be
  established by the M1 compatibility gate before dependent implementation claims them.
- Two cross-repository follow-ups bound integration mechanics without reopening R1:
  `elmakus/chatgpt-codex-project-workflow#56` (multi-mutator topology inside one
  obligation) and `elmakus/pi-unraid#3` (host-level Pi mutation policy). Until the exact
  current PW authorizes multi-mutator topology, OR serializes or fails closed.
- Prior-art evidence (not authority) names reusable-substrate candidates
  (`pi-extensible-workflows`, pi-fabric, Dagu patterns, Laya/System One advisory use).
  Any reuse must be justified by M1 evidence of concrete benefit; the default is a small
  native core reusing Paseo lifecycle/workspace/GUI capabilities.

## Constraints And Non-goals

- PW remains canonical governance/lifecycle authority; OR never infers or replaces it (R1).
- V1 targets one configured Paseo host/control plane; no OR daemon, no OR database, no
  multi-host scheduling, no recursive subagents, no second Task Board, no custom OR
  dashboard/Paseo pill, no token/cost accounting (explicit exclusions + ADR).
- Runtime journals, run IDs, sessions, Paseo metadata, workspaces, worktrees, queues,
  and derived status are disposable execution metadata relative to Git/PW truth.
- Capability/tool policy stays deliberately simple (R11.18): broad role defaults,
  special handling only for secrets/production/external side effects; no IAM platform,
  no per-command semantic sandbox, no large taxonomies.
- This plan grants no production or live-rollout authority and creates no new product
  scope or PW Research obligations. Choices that depend on deployment facts stay
  conditional behind explicit verified gates; they do not demand new user product decisions.
- Raw logs, transcripts, and runtime/session IDs stay out of the repository and out of
  Main context by default; durable records are compact with evidence references.

## Key Decisions

1. **Layered implementation: TS core + adapter contract + Paseo/Pi adapter + thin Pi
   extension.** Core orchestration logic lives in a separately testable TypeScript
   library behind a provider-neutral adapter interface; the Paseo/Pi adapter is one
   implementation; Main integrates through a small Pi extension (one primary typed
   entry plus cancel/resume/status/doctor auxiliaries). Rejected: burying semantics in
   extension/UI code (untestable), and adopting a full workflow substrate up front
   (unproven benefit, larger coupling surface).
2. **Contracts first, deployment facts before live slices.** M1 freezes
   provider-neutral obligation/capsule/envelope/failure-taxonomy/Git-state vocabularies
   and a fake adapter, and produces an evidence-backed compatibility report (actual and
   minimum Paseo/Pi versions, events, reconnect/resume, tool restriction mechanism,
   worktree support, failure behavior). No milestone may depend on an unverified
   Paseo/Pi API, version, or guarantee; G1 blocks M2's live slice until the report exists.
3. **Enforcement before mutation.** Role ceilings, capability/tool-registry resolution,
   scheduler/wave reservations, and branch protection land and pass gates (M3, M4 lead)
   before any live mutating slice runs. Violation tests must fail closed.
4. **Vertical slices with per-milestone tests.** Each milestone is independently testable
   (fake-first, then inexpensive-profile live where the slice touches the backend) and
   owns explicit completion gates; there is no big-bang integration milestone. M6 is
   conformance + end-to-end + real-project testing, not first integration.
5. **Conditional substrate reuse.** `pi-extensible-workflows` / pi-fabric reuse is
   decided in M1 on measured benefit (session/fan-out/schema/journal primitives) versus
   coupling cost, reusing native Paseo lifecycle/workspace/GUI either way. Either outcome
   preserves all R1..R12 contracts; the plan does not assume reuse.
6. **PW topology is probed, not assumed.** M4 queries exact current PW behavior for
   multi-mutator legality within one obligation (#56); parallel worker fan-out executes
   only when legal, otherwise OR serializes/fails closed. Ad-hoc mutation policy aligns
   with the #3 host-policy outcome but OR's own no-write-on-main + auto-branch rule holds
   regardless.
7. **Recovery is observable and readback-first.** Retry budgets, reconnect-before-replace,
   post-commit recovery from Git+Paseo, side-effect readback/idempotency checks, dirty
   worktree preservation, and target-side merge readback are first-class tested behaviors
   (M5), not error-string handling. Uncertain states surface as explicit values
   (`side_effect_uncertain`, `integration_uncertain`, `recovery_pending`), never as `done`.
8. **Process-shared reservation/queue coordination without a daemon.** The global ceiling,
   wave reservations, and queue span every Main/Pi-extension process sharing the one
   Paseo control plane, so M1 selects a small process-shared file-backed coordination
   mechanism (atomic updates/locks on shared storage; no daemon/database), and M1's
   compatibility work establishes execution placement, shared storage, and available
   native coordination support. M3 proves two or more independent OR/core instances
   cannot exceed 9 active subagents or partially launch mandatory x3/x2 waves.
   Lost/stale reservation recovery first reconciles attributable live Paseo children
   before admitting more work; ambiguous ownership blocks admission instead of resetting
   capacity. M5 covers owner/process crash, duplicate wakeups, and lost journal/lease
   recovery. This coordination state is disposable runtime metadata, never PW governance.
   If the deployment cannot meet the single-host shared-coordination contract, the
   incompatible gate is named explicitly; multi-host scope is not introduced.

## Recommended Approach

Build six ordered vertical slices. M1 establishes contracts, the fake adapter, the
fixture repository skeleton, and the compatibility gate. M2 delivers minimal event-driven
read-only delegation through the thin extension plus doctor. M3 adds roles,
capabilities, the Tool Registry with proposals-only classification, and the scheduler.
M4 adds Git-safe Worker/Reviewer/repair loops with PW/ad-hoc binding. M5 adds
recovery, cancellation, reload, retention, and truthful status. M6 runs full
fake+live conformance, verified end-to-end `MERGED_MAIN`, then real-project testing.

Dependency/write ownership: milestones are linear by default (M_n gates M_{n+1}).
One overlap is permitted: M5's retry-budget/cancellation primitives may be implemented
concurrently with M4's review-loop mechanics only with disjoint file ownership and a
merge-gated integration before M5's recovery tests run. All other concurrency follows
R4.10: disjoint legal write scopes only, otherwise serialize.

## Work Plan

### M1 — Contracts, fake adapter, fixture skeleton, compatibility gate

Intent: freeze the provider-neutral vocabulary every later slice depends on, and
replace all Paseo/Pi assumptions with measured deployment facts.

Scope:

- Provider-neutral TypeScript types + JSON validation for: task-capsule envelope
  (common base + role payloads), worker result envelope (bounded fields,
  evidence/check/change/blocker/failure sections), obligation/result binding
  (immutable digests, precondition refs), failure taxonomy, run/lane state machine
  (`created`, `running`, `collecting`, `blocked`, `completed`, `failed`,
  `cancelled`, `stale`), Git/integration-state vocabulary (`IMPLEMENTED_LOCAL`,
  `IMPLEMENTATION_COMPLETE/REVIEW_PENDING`, `INTEGRATION_READY`, `PR_OPEN`,
  `MERGED_MAIN`, `integration_uncertain`).
- Fake adapter: in-memory Paseo/Pi double implementing the adapter contract
  deterministically (scripted events, failures, latencies; virtual clock hooks for
  ceiling/retention tests). All core semantics must be drivable through it.
- Fixture repository skeleton with controlled branches, GREEN/RED checks, conflict
  fixtures, and worktree scenarios (populated further in M4/M6).
- Compatibility evidence in two classes. Passive reads (no session creation): versions,
  configuration surfaces, and documentation-declared events/capabilities. Explicitly
  bounded active probes: creation/control of disposable tool-free or strictly read-only
  child sessions under a concrete test-traffic grant, proving lifecycle/completion/error/
  attention events, reconnect/resume behavior, tool/capability restriction mechanism and
  its failure mode, worktree/subbranch support, session metadata/label support, profile
  resolution, and execution placement/shared storage plus available native coordination
  support (atomic file updates/locks). Repository/product mutation is forbidden in all
  M1 probe workloads. Output is a versioned evidence report classifying every item as
  proven, unknown/unverified, or proven unsupported — never assumptions.
- Coordination mechanism selection: the small process-shared file-backed reservation/queue
  design (atomic updates/locks; no daemon/database), with its shared-storage, placement,
  and native-support assumptions recorded for M3/M5 proof.
- Pre-M3 restriction baseline: every M1 probe workload runs under a minimal verified
  native restriction (tool-free workload preferred; no unapproved tools, secrets,
  production mutation, or external effects beyond the named session/test traffic).
  Denial/unavailability behavior is verified before launch; missing mechanical support
  blocks the probe. No custom shell sandbox is built and product role policy is not
  expanded here.
- Substrate decision record: reuse vs native, justified by measured benefit.

Requirement anchors: R1.1–R1.5 (authority model in types), R12.8 (min versions),
R6.1/R6.6/R6.9 (envelope skeletons), R8.12–R8.13 (state vocabulary),
R9.1 (taxonomy), R11.2 (capability vocabulary), R12.1 (fake testability).

Dependencies: none (first slice). Blocks all later milestones via G1.

Completion gate G1:

- Contract schemas validate fixture corpora (valid + invalid cases) with exact diagnostics.
- Fake adapter passes determinism replay (same script → same event/result trace).
- Compatibility report exists with actual versions and classifies every probe item as
  proven, unknown/unverified, or proven unsupported. Proven-unsupported is recorded
  only with a fail-closed error path as valid negative behavior; it never satisfies a
  required happy-path capability. Bounded limitations may be recorded only for
  non-required/deferred items; every required capability is proven before its dependent
  gate, with no fake-only waiver for required live G2/G6 outcomes. Unknown/unverified
  items block dependent slices until proven or explicitly re-scoped as non-required
  limitations at a gate.
- Coordination contract established: shared storage, execution placement, and native
  atomic/lock support verified, or the incompatible gate named explicitly with the
  blocked dependent scope (no multi-host scope introduced).
- Pre-M3 restriction baseline verified for every live probe workload (denial behavior
  proven before launch; tool-free preferred; missing mechanical support blocks the probe).
- Substrate decision recorded with evidence; chosen path's contracts still provider-neutral.

Tests: schema unit tests; fake-adapter replay/determinism tests; probe report
classification test (every item proven/unknown/proven-unsupported; no invented values).

Risks: deployment drift after probing → doctor re-probes on demand (M2/M5); probe
items that cannot be proven even with bounded active probes → unknown/unverified blocks
dependent required slices, or a bounded limitation is recorded only if the item is
non-required/deferred.

### M2 — Minimal event-driven delegation, Pi extension, doctor

Intent: prove the thinnest real path — Main delegates, Paseo/Pi executes, events
return — with no mutation and no polling.

Scope:

- Thin Pi extension: one primary typed `orchestrate(request)` entry (scalar and
  whole-wave requests) plus small auxiliaries (cancel/resume/status/doctor). Core
  orchestration stays in the testable library; the extension is a narrow surface.
- Paseo adapter implementing the M1 adapter contract: managed child creation with
  descriptive titles + metadata labels (run ID, role, lane angle, workstream),
  completion/error/attention event consumption, reconnect/readback hooks (exercised in M5).
- Run orchestration loop: `run_id` issuance with prompt launch state, async completion
  via events, per-lane tracking, batch aggregation (wake Main only on batch-complete /
  decision-needed / material failure), compact on-demand run summaries.
- `or doctor` (also via Main surface): full readiness validation — Paseo connectivity,
  Pi provider, worker profile/config resolution, permissions, Git/worktree readiness,
  registry/classification summary hooks (populated in M3).
- Main fast path preserved for genuinely small/leaf work; OR unavailability surfaced
  (no silent fallback for OR-classified substantial work); read-only roles share the
  current workspace.
- Pre-M3 restriction baseline (from M1): all M2 smoke workloads run tool-free or under
  the verified minimal native restriction; denial/unavailability behavior is re-verified
  on the smoke path before launch; missing mechanical support blocks the smoke rather
  than falling back to prompt labels.

Requirement anchors: R2.2/R2.3/R2.6, R3.4/R3.5/R3.6, R5.7 (interruption≠cancellation
distinction), R6.3 (mechanical field materialization), R10.1/R10.2/R10.10.

Dependencies: G1 (contracts + compatibility report). The live slice uses only
probe-proven surfaces. Required capabilities that are unknown/unverified or proven
unsupported block the dependent live outcome; only non-required/deferred items may
proceed with a bounded limitation recorded at the gate. A fail-closed error path covers
the negative case but never substitutes for a required happy-path capability, and fake
coverage never waives a required live G2 outcome.

Completion gate G2:

- Read-only single-lane delegation round-trips through real Paseo/Pi on the
  inexpensive worker profile: launch → event completion → structured result → Main.
- Restriction baseline holds on the live smoke path (verified denial behavior before
  launch; no unapproved tools/secrets/effects beyond the named session/test traffic).
- No status polling in normal operation (assert via adapter instrumentation: zero poll
  calls on the happy path).
- Doctor reports green on the deployment; each check has a negative test (induced
  failure → precise diagnostic, no crash).
- Fast-path and unavailability-surfacing behaviors covered by tests.

Tests: fake-adapter state-machine/event tests; live read-only smoke on the
inexpensive profile; doctor positive/negative tests.

Risks: event-delivery gaps/duplicates → adapter dedupes by lane identity and surfaces
gaps as explicit failures; Paseo GUI/notification variance → assert on adapter-level
events, not GUI text.

### M3 — Roles, capabilities, Tool Registry, scheduler (before production mutation)

Intent: land all enforcement — who may do what, with which tools, in which slots —
and prove fan-out/scheduling invariants before any live mutation. General role/registry
enforcement arrives here; pre-M3 live work runs only under the M1 minimal verified
native restriction baseline.

Scope:

- Four versioned semantic roles (Scout/Researcher/Worker/Reviewer) with hard
  capability ceilings; one centrally configured fixed worker profile
  (model/reasoning) + shared Paseo launch profile; per-assignment pinning of
  resolved profile/registry/role-contract versions; drift detection (materialize
  explicitly or fail clearly, never silent fallback).
- Task capsules: refs + minimal bounded excerpts, size guardrail with
  refs-fallback, material negative boundaries only; Main declares semantic needs,
  OR resolves deterministically.
- Result envelopes with mechanical validation; one same-session format-correction
  attempt on a separate budget (semantic repair budget untouched); second schema
  failure → terminal `schema_invalid`.
- Tool Registry v1 (global, versioned, source-controlled): capability-tagged tools,
  deterministic preference ordering, safe same-capability/same-safety fallback with
  recorded resolution, unknown/unclassified tools excluded from automatic bundles,
  task-relevant (not all-tools) bundles, secrets/production/external-side-effect
  special handling, deterministic redaction of known injected secrets, no custom shell
  sandbox (platform enforcement + contracts).
- Tool onboarding: automatic analysis of new/changed tools (metadata, schemas,
  actions, manifests, docs; per-action where exposed) producing proposals-only
  batched reports (capabilities, read/write/side-effect/secret/production flags,
  evidence/rationale, confidence/uncertainty, `needs_review` marks, diff vs active
  policy); activation only via explicit user approval (batch approve / per-item edit /
  reject); human overrides authoritative until material surface change; version-only
  changes skip re-approval; rollback to prior registry revision.
- Scheduler: global ceiling 9 active OR subagents (Main excluded); mandatory x3/x2
  waves launch only with full slots reserved; continuations (repair/review/recheck)
  outrank new waves; Worker fan-out batches to available capacity; FIFO + anti-starvation
  aging within class; single orchestration may consume the ceiling; explicit queued
  states (`queued: waiting for N slots`); `capability_needed` blockers grantable to the
  same assignment when authority permits; `capability_block_rate` metric. Reservation/queue
  state is process-shared and file-backed per the M1 coordination design: M3 proves two or
  more independent OR/core instances cannot exceed 9 active subagents or partially launch
  mandatory x3/x2 waves, and that lost/stale reservations reconcile attributable live
  Paseo children before further admission (ambiguous ownership blocks admission).
- Fresh-session rules for Scout/Researcher/formal Reviewer (no Main transcript;
  bounded capsules + authorized refs); lane independence (no sibling results before
  return); Main-owned angles/synthesis; OR bundles without semantic synthesis.

Requirement anchors: R3.1–R3.4/R3.8, R4 (all), R5.1/R5.6, R6 (all), R10.8/R10.9,
R11 (all).

Dependencies: G2. No live mutation in this milestone (read-only + synthetic
mutation-planning paths only).

Completion gate G3:

- Table-driven registry/capability resolution tests across roles × task needs with
  exact expected bundles; unknown-tool exclusion and pinning tests.
- Fan-out invariant tests: exact x3/x2 counts, distinct angles enforced, identical
  prompts rejected, failed-lane replacement, block/fail on permanent lane loss.
- Scheduler tests: full-slot reservation, continuation priority over queued waves,
  capacity batching for Workers, aging anti-starvation, queued-state observability.
- Multi-instance scheduler tests: concurrent independent OR/core instances hold the
  ceiling and wave atomicity; stale-reservation recovery reconciles attributable live
  Paseo children first; ambiguous ownership blocks admission (never silent reset).
- Classification flow tests on fixture tool manifests: proposal content, batching,
  approve/edit/reject, override precedence, conflict surfacing
  (`previously approved capability no longer supported`), `needs_review` marking.
- Live read-only x3/x2 waves on the inexpensive profile (evidence gathering only).

Risks: policy overcomplexity → enforce R11.18 simplicity budget in review of this
slice; classifier over/under-permissiveness → contained by proposals-only + user edit;
cheap-model tool-selection noise → broad-but-relevant defaults + block-rate tuning signal.

### M4 — Git-safe Worker/Reviewer/repair loops, PW/ad-hoc binding

Intent: make mutation safe and review honest — branch protection, isolation, exact
subjects, bounded repair — bound to exact PW or ad-hoc authority.

Scope:

- Mutation guards: read-only inspection on `main` allowed; mutation never starts from
  `main`; PW mode binds the exact PW-selected workstream branch; ad-hoc mutation from
  `main` auto-creates a legal isolated task branch/worktree before first write; fast
  path obeys the same rule; single mutating Worker may use canonical workspace, concurrent
  mutators get isolated worktrees/subbranches from the canonical branch; Main does not
  mutate a Worker-owned shared workspace; worker subbranches stay local unless remote
  publication is required; final PR/integration originates from the canonical workstream
  branch only.
- Worker completion: local commit per mutating Worker (own messages allowed);
  mechanical merge/cherry-pick into the canonical branch only after Main's semantic
  acceptance; auto-resolution only for clearly mechanical conflicts, else escalate;
  deterministic legally-authorized PW integration continues automatically when no human
  gate remains; temporary worktree/subbranch removal after canonical integration.
- Review loop: normal single Reviewer on the exact immutable Worker commit/subbranch in
  a fresh session (no Worker transcript); Reviewer runs tests/checks, may use ephemeral
  artifacts, never mutates production code or reviewed tests (reports bad tests instead);
  RED returns corrective work to Worker; ordinary Worker↔Reviewer repair continues
  mechanically (same bounded pair/session where valid) up to ≤4 failed semantic repairs,
  then escalates; GREEN sessions archived after durable capture; recheck returns to the
  same Reviewer for the same subject; failed Reviewer without verdict replaced fresh.
- PW adapter: neutral obligation/subject/authority/evidence mapping (core stays unaware
  of Card/Milestone/Definition/Planning concepts); mechanical evidence validation
  (structure, refs, checks, exact binding) without semantic sufficiency judgments; only
  obligation-required results flow to PW; advisory reviews never mutate Task Board formal
  state; durable writes go through normal Git commits on the canonical branch.
- PW topology probe (#56): determine exact current multi-mutator legality inside one
  obligation; parallel execution only when legal, otherwise serialize/fail closed.
  Host mutation-policy alignment (#3) recorded; OR's own guards hold regardless.
- Integration-state surfacing for every mutating completion (mandatory compact
  `Git state` + exact identities: branch, commit SHA, PR, merge SHA as applicable);
  worker/review/orchestration/integration completions kept distinct.

Requirement anchors: R1.2/R1.5, R3.7, R4.10/R4.11, R5.2–R5.5, R7 (all), R8.1–R8.10.

Dependencies: G3 (enforcement must precede live mutation). M5's retry/cancellation
primitives may overlap with disjoint file ownership; merge-gated before M5 recovery tests.

Completion gate G4:

- Fixture GREEN/RED/conflict/worktree scenarios pass on fake adapter and live
  (inexpensive profile): exact-subject review, RED→repair→GREEN with session continuity
  and attempt identity, conflict escalation, branch-protection violation tests.
- Topology probe result recorded; executed path (parallel vs serialized) matches the
  probe; serialization path covered by tests either way.
- Ad-hoc auto-branch/worktree creation, PW exact-branch binding, and local-commit +
  mechanical-merge flows verified with exact-identity assertions.
- No completion message hides integration state (message-shape tests).

Risks: PW topology unauthorized → serialized execution is the planned outcome, not a
slip; merge-conflict semantic ambiguity → always escalates, never auto-resolved.

### M5 — Recovery, cancellation, reload, retention, truthful status

Intent: make every material failure observable, recoverable, or explicitly uncertain —
with best-effort recovery from canonical Git/PW state plus attributable Paseo
metadata/history, surfacing explicit uncertainty where evidence is incomplete.

Scope:

- Retry policy: only explicitly transient/retryable infrastructure failures retried;
  ≤2 automatic retries after initial (≤3 infrastructure attempts) with short bounded
  backoff; permission/config/semantic/stale/authority failures never blindly retried;
  pre-mutation retryable failure restarts fresh preserving task identity; post-partial-state
  session death continues via explicit validated handoff.
- Transport interruption: reconnect/read back the existing Paseo agent before replacing it.
- Post-commit/pre-result: recover from Git + Paseo history; never rerun implementation
  solely because messaging was lost.
- Side-effect uncertainty: no retry until safe readback/idempotency resolves state;
  otherwise return `side_effect_uncertain`.
- Cancellation: distinct Main-interruption vs orchestration-cancellation; explicit
  whole-run cancellation over the known child set; dirty worktrees enter
  `recovery_pending` (never destroyed before recovery/deliberate abandonment);
  cancellation preserves recovery/diagnostics state; valid Paseo children may finish
  while Main is absent, with later reconciliation.
- Journal loss: best-effort recovery from attributable Paseo metadata/history + Git/PW;
  recovery revalidates canonical bindings/preconditions first; stale results advisory-only.
- Coordination recovery: owner/process crash, duplicate wakeups, and lost journal/lease
  recovery per the M1 design; ambiguous ownership blocks admission (never silent capacity
  reset); all coordination state remains disposable runtime metadata, never PW governance.
- Reload/retention: config/extension changes reloadable without restarting Paseo or
  harming unrelated sessions; journal retention ~30 days with automatic GC after durable
  results/evidence are safe; no Paseo transcript ownership/duplication.
- Timing: one generous global hard ceiling (~6h) as last-resort fuse; healthy
  Paseo-reported activity never killed for wall-clock age; ceiling hit →
  inspect/escalate, kill only if demonstrably stuck or explicitly cancelled; long-running
  notices sparse.
- Status truth: event-driven material lifecycle events (completed, blocked/needs-decision,
  failed, stale); derived live status without PW Task Board duplication; target-side
  readback before `MERGED_MAIN`; merge call without readback → `integration_uncertain`
  + recovery routing; blocked Workers resumable in-session after Main resolves decisions.

Requirement anchors: R2.7, R5.5/R5.7, R8.11–R8.13, R9 (all), R10.3–R10.7.

Dependencies: G4 for recovery subjects that involve review/integration state; retry and
cancellation primitives may start alongside M4 under disjoint ownership (see approach).

Completion gate G5:

- Fault-injection matrix green on fake + live fixture: journal loss, post-commit/pre-result
  crash, transport interruption, dirty cancellation, merge-without-readback, owner/process
  crash, duplicate wakeup, lost lease — each with observable recovery or
  explicit-uncertainty outcome and diagnostics assertions.
- Reload test: config change applies without Paseo restart; in-flight assignments keep
  pinned profile/registry/role versions; idle/blocked assignments not restarted.
- Ceiling test (virtual + live short-fuse analog): healthy activity survives, stuck/cancelled
  sessions terminate, escalation precedes kill.
- Retention/GC test: aged journal entries cleaned only after durable capture.

Risks: Paseo history gaps bound best-effort recovery → record per-scenario recovery
bounds with explicit uncertainty; live fault-injection flakiness → the fake matrix is the
deterministic diagnostic gate and live runs must still prove required live outcomes (fake
results never substitute for failed/missing required live checks).

### M6 — Full conformance, verified end-to-end, real-project testing

Intent: prove the whole runtime twice (fake + real inexpensive profile), verify one
true `MERGED_MAIN` end to end, then test on real projects directly.

Scope:

- Full fake-adapter conformance suite: fan-out, RED→repair→GREEN, queueing,
  capability resolution, retries, crash recovery, worktree isolation, Git-state truth,
  PW binding — all deterministic.
- Full live suite on real Paseo/Pi with the actual inexpensive worker profile on the
  fixture repository (same coverage as fake, plus lifecycle/notification/workspace
  realities fakes cannot validate).
- End-to-end acceptance: delegation → worker execution → review → repair →
  OR reload/restart recovery → integration → target-side verified `MERGED_MAIN`,
  including a Paseo GUI/Pi Main operator smoke pass.
- Real-project testing across the user's actual projects (selected by Main/user at
  execution time): no artificial single low-risk pilot; fixture validation first, then
  diverse real tasks. Findings feed bounded repair/backlog, not scope reopening.
- Rollout report: suites, evidence refs, deployment versions, and the bounded-limitation
  register (non-required/deferred items only, each with gate, evidence, and impact).

Requirement anchors: R12 (all); regression of G1–G5 contracts.

Dependencies: G5. Real-project testing additionally requires the execution-time grants
named below (fixture-only rights do not cover user projects).

Completion gate G6 (V1 acceptance):

- Fake suite green; live inexpensive-profile suite green; e2e `MERGED_MAIN` verified by
  target-side readback; doctor green on the deployment.
- Real-project runs executed and recorded with compact results + evidence refs.
- No open gate item from G1–G5; remaining bounded limitations cover non-required/deferred
  items only, each recorded with its gate, evidence, and dependent-scope impact — never
  as waivers for required capabilities.

Tests: the suites themselves, plus suite-parity checks (every live scenario has a fake
twin asserting identical contract outcomes where backend realities permit).

Risks: real-project variance → Main bounds task selection; deployment-only failures →
doctor + compatibility re-probe before any fix claims a backend change.

## Validation Plan

Layers (each milestone uses the layers its scope touches; M6 runs all):

1. Unit/table-driven: schemas, taxonomy, registry resolution (roles × needs → exact
   bundles), scheduler policy, state machines, message shapes. Fast, no backend.
2. Fake-adapter deterministic: replayed event/failure scripts, virtual clock for
   ceiling/retention/backoff, fault-injection matrix as the deterministic diagnostic
   gate (diagnostics only; required live outcomes still need live proof).
3. Live inexpensive-profile: same scenarios as layer 2 where backend realities matter
   (lifecycle, notifications, workspaces/worktrees, profiles), on the fixture repository.
4. Doctor/diagnostics: positive + induced-negative checks; classification-pending and
   drift reporting.
5. End-to-end + operator smoke: full lifecycle through Paseo GUI/Pi Main to verified
   `MERGED_MAIN`.
6. Real-project confirmation (M6 only, granted scope): diverse real tasks, compact
   evidence.

Evidence rules: Main receives compact structured results + evidence refs, never
transcripts/logs by default; durable records carry run/task identity, obligation
digest, role/model/profile/registry versions, status, attempts, timestamps, result,
evidence refs, and mutation/worktree summary. Raw logs and runtime IDs stay out of
the repository.

Fixture repository contents: controlled branches, GREEN/RED check fixtures, conflict
pairs, worktree scenarios, review-subject fixtures, evidence-schema fixtures, and a
fault-injection harness (post-commit crash, transport cut, merge-no-readback).

## Appendix A — Atomic requirement coverage (R1..R12)

Every numbered clause below names its implementing milestone(s) and verification hook.
Clause essences are plan prose; the canonical wording is the bound requirements document.

### R1. Authority boundary → M1 (model), M4 (enforcement)

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R1.1 | PW is canonical governance authority | M1, M4 | PW-adapter mapping tests; no governance inference paths |
| R1.2 | OR consumes bounded obligations, returns bounded results | M1, M4 | Obligation/result binding + digest tests |
| R1.3 | Runtime state disposable vs Git/PW | M1, M5 | Journal-loss recovery test; disposable-state audit |
| R1.4 | Recovery revalidates bindings first; stale is advisory | M5 | Stale-binding recovery tests |
| R1.5 | PW execution binds exact workstream; no broadening | M4 | Exact-branch binding + no-broadening tests |

### R2. Deployment and integration shape → M1, M2, M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R2.1 | Provider-neutral durable contracts | M1 | Contract review + adapter-interface tests |
| R2.2 | Initial deployment: Paseo backend + Pi harness | M2 | Live delegation smoke on deployment |
| R2.3 | Main integration via Pi extension + testable core | M2 | Extension surface + core unit tests |
| R2.4 | One Paseo host; no multi-host scope | M1, M2 | Single-host config; no placement logic |
| R2.5 | No separate OR daemon/database | M1, M5 | Architecture audit; file-journal only |
| R2.6 | Reuse Paseo agents/lifecycle/workspaces/GUI | M2 | Adapter reuse tests; no duplicate facilities |
| R2.7 | Reloadable config without Paseo restart | M5 | Reload test |

### R3. Roles and delegation → M2, M3, M4

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R3.1 | Exactly Scout/Researcher/Worker/Reviewer | M3 | Role-set + versioning tests |
| R3.2 | Roles versioned by OR; Paseo profile is execution-only | M3 | Role-version + profile-separation tests |
| R3.3 | One fixed worker profile; no project override | M3 | Resolution + override-rejection tests |
| R3.4 | Main classifies/decomposes; OR enforces mechanically | M2, M3 | Validation-boundary tests |
| R3.5 | Main fast path for small/leaf work | M2 | Fast-path tests |
| R3.6 | OR unavailability surfaced, no silent fallback | M2 | Unavailability tests |
| R3.7 | PW-controlled + ad-hoc through one runtime | M4 | Dual-adapter tests |
| R3.8 | One subagent level; workers spawn nothing | M3 | Spawn-guard tests |
| R3.9 | User subagent instructions may steer Main compatibly | M3 | Delegation-heuristic tests |

### R4. Fan-out and queue invariants → M3, M4

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R4.1 | Full Research = exactly 3 fresh lanes, shared question, distinct angles | M3 | Fan-out invariant tests |
| R4.2 | 3 successes required; replace or block/fail | M3 | Lane-replacement tests |
| R4.3 | Broad discovery = exactly 2 lanes + 2 successes | M3 | Fan-out invariant tests |
| R4.4 | Narrow discovery: Main or one Scout | M3 | Discovery-routing tests |
| R4.5 | Worker fan-out dynamic, no ritual count | M3 | Decomposition-driven batching tests |
| R4.6 | Global ceiling 9 (excl. Main); excess queues | M3 | Ceiling + queue tests |
| R4.7 | x3/x2 waves launch only with full slots | M3 | Reservation tests |
| R4.8 | Continuations prioritized; simple otherwise + aging | M3 | Priority + aging tests |
| R4.9 | One orchestration may consume full ceiling | M3 | No-per-run-cap test |
| R4.10 | Concurrent mutation only on disjoint scopes + deps | M3, M4 | Ownership/dependency gate tests |
| R4.11 | PW multi-Worker mutation obeys PW authority; else serialize/fail closed | M4 | Topology-probe + serialization tests |

### R5. Session freshness and continuity → M2–M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R5.1 | Fresh sessions for new Scout/Researcher/Reviewer + capsules | M3 | Freshness tests |
| R5.2 | Worker session persists across ordinary repair | M3, M4 | Continuity tests |
| R5.3 | Recheck reuses Reviewer session for same subject | M4 | Recheck-routing tests |
| R5.4 | Failed verdict-less Reviewer replaced fresh, same subject | M4, M5 | Replacement tests |
| R5.5 | Blocked Worker resumable in-session after decision | M5 | Resume tests |
| R5.6 | Scout/Researcher follow-up normally fresh; tiny clarification may reuse | M3 | Follow-up routing tests |
| R5.7 | Main interruption ≠ cancellation; valid children may finish + reconcile | M2, M5 | Interruption/cancellation distinction tests |

### R6. Task and result contracts → M1–M3

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R6.1 | One common capsule envelope + role payload | M1, M3 | Schema tests |
| R6.2 | Capsule contents: identity, intent, bindings, excerpts, boundaries | M3 | Capsule-shape tests |
| R6.3 | Main supplies semantics; OR materializes mechanics | M2, M3 | Materialization tests |
| R6.4 | Refs + minimal excerpts; fallback for oversized | M3 | Size-guardrail tests |
| R6.5 | Workers may discover within granted read authority | M3 | Discovery-scope tests |
| R6.6 | Validated structured result envelope | M1, M3 | Envelope validation tests |
| R6.7 | Compact results + refs to Main by default | M2, M3 | Message-shape tests |
| R6.8 | OR bundles but never synthesizes/resolves | M3 | No-synthesis tests |
| R6.9 | Results bind exact assignment/preconditions via digests | M1, M3 | Binding tests |
| R6.10 | One format-correction attempt; then `schema_invalid` | M3 | Correction-budget tests |

### R7. Review and repair → M4

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R7.1 | PW controls review need in PW mode; Main in ad-hoc | M4 | Review-routing tests |
| R7.2 | Default one Reviewer unless more required | M4 | Reviewer-count tests |
| R7.3 | Reviewer independent; exact immutable subject | M4 | Independence + subject tests |
| R7.4 | Reviewer inspects/tests, never mutates prod code/tests | M4 | Non-mutation enforcement tests |
| R7.5 | RED returns corrective production work to Worker | M4 | RED-routing tests |
| R7.6 | Ordinary repair continues mechanically until decision/authority needed | M4 | Loop-continuation tests |
| R7.7 | At most 4 failed semantic repairs, then escalate | M4 | Repair-budget tests |
| R7.8 | GREEN sessions archived after durable capture | M4 | Archive tests |

### R8. Repository mutation and Git truth → M1, M4, M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R8.1 | Mutation never starts from `main` (read-only OK) | M4 | Guard tests |
| R8.2 | PW mutation uses exact PW workstream branch | M4 | Binding tests |
| R8.3 | Ad-hoc mutation from `main` auto-creates branch/worktree | M4 | Auto-branch tests |
| R8.4 | Fast-path mutation obeys no-write-on-main | M4 | Fast-path guard tests |
| R8.5 | Single mutator may use canonical workspace; concurrent need isolation | M4 | Isolation tests |
| R8.6 | Main does not mutate Worker-owned shared workspace | M4 | Ownership tests |
| R8.7 | Local commit per mutating Worker; subbranches normally local | M4 | Commit/branch tests |
| R8.8 | Main accepts semantically; OR merges mechanically, escalates ambiguity | M4 | Merge/escalation tests |
| R8.9 | Final PR/integration from canonical branch only | M4 | Integration-origin tests |
| R8.10 | Deterministic authorized PW integration continues automatically | M4 | Auto-continuation tests |
| R8.11 | Target-side readback verifies merge before terminal truth | M5 | Readback tests |
| R8.12 | Explicit Git/integration state; no bare `done` | M1, M4, M5 | Message-shape tests |
| R8.13 | Worker/review/orchestration/integration completions distinct | M1, M4 | Lifecycle-state tests |

### R9. Failure, retry, recovery, cancellation → M1, M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R9.1 | Small stable failure taxonomy | M1 | Taxonomy tests |
| R9.2 | Only transient/retryable auto-retried | M5 | Retry-classification tests |
| R9.3 | At most 2 retries after initial (≤3 attempts) + bounded backoff | M5 | Budget/backoff tests |
| R9.4 | Permission/config/semantic/stale/authority never blindly retried | M5 | No-blind-retry tests |
| R9.5 | Transport interruption: reconnect/read back before replace | M5 | Reconnect tests |
| R9.6 | Pre-mutation retryable failure restarts fresh, same identity | M5 | Restart tests |
| R9.7 | Dead session + partial state continues only via validated handoff | M5 | Handoff tests |
| R9.8 | Commit-exists/result-lost recovers from Git+Paseo, no rerun | M5 | Post-commit recovery tests |
| R9.9 | Uncertain side effects: readback/idempotency or `side_effect_uncertain` | M5 | Uncertainty tests |
| R9.10 | Dirty worktrees recoverable; no early destruction | M5 | `recovery_pending` tests |
| R9.11 | Explicit whole-run cancellation over known child set | M5 | Cancellation tests |
| R9.12 | Cancellation preserves recovery/diagnostics state | M5 | Preservation tests |
| R9.13 | Journal loss never blocks project recovery (Git/PW/Paseo suffice) | M5 | Journal-loss tests |

### R10. Timing, retention, observability → M2, M3, M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R10.1 | Event-driven status, no normal polling | M2 | Zero-poll instrumentation test |
| R10.2 | Material lifecycle events to Main by default | M2 | Event-filter tests |
| R10.3 | One generous global hard ceiling (~6h) as last-resort fuse | M5 | Ceiling-config tests |
| R10.4 | Healthy Paseo-reported activity never killed for age | M5 | Healthy-survival tests |
| R10.5 | Ceiling hit → inspect/escalate before kill | M5 | Escalation tests |
| R10.6 | Bounded journal retention (~30d) + automatic GC after safety | M5 | Retention/GC tests |
| R10.7 | No Paseo transcript ownership/duplication | M5 | Storage-audit tests |
| R10.8 | Derived live status, no PW Task Board duplication | M3 | Status-scope tests |
| R10.9 | Operational metrics; no token/cost accounting | M3 | Metrics tests |
| R10.10 | `or doctor` via Main-facing surface | M2 | Doctor tests |

### R11. Capabilities, tools, secrets → M1, M3, M5

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R11.1 | Explicit resolved capability set; hard role ceilings | M3 | Ceiling-enforcement tests |
| R11.2 | Small stable capability vocabulary, generous defaults | M1, M3 | Vocabulary + default tests |
| R11.3 | Role default bundles (Worker/Researcher/Scout/Reviewer shapes) | M3 | Bundle tests |
| R11.4 | Network-read vs external-side-effect authority distinct | M3 | Separation tests |
| R11.5 | External side effects need bounded concrete grant (PW legality / ad-hoc user intent) | M3 | Grant tests |
| R11.6 | Task-scoped secret bindings; values out of prompts/transcripts | M3 | Secret-handling tests |
| R11.7 | Deterministic redaction of known injected secrets | M3 | Redaction tests |
| R11.8 | No custom shell sandbox; platform enforcement + contracts | M3 | Architecture audit |
| R11.9 | Native Pi/Paseo tool restriction used where available | M3, M5 | Enforcement-mapping tests |
| R11.10 | Global versioned Tool Registry + role bundles; narrow-only for projects | M3 | Registry tests |
| R11.11 | Main declares needs; OR resolves deterministically + records version | M3 | Resolution tests |
| R11.12 | Unknown/unclassified tools excluded from automatic bundles | M3 | Exclusion tests |
| R11.13 | New/changed tools auto-analyzed → proposal only | M3 | Proposal-generation tests |
| R11.14 | Classifications inactive until explicit user approval (batch/edit/reject) | M3 | Approval-flow tests |
| R11.15 | Reports show per-action capabilities, evidence, flags, confidence, diff | M3 | Report-content tests |
| R11.16 | Overrides authoritative until material change; version-only skips re-approval | M3 | Override/conflict tests |
| R11.17 | Running assignments keep pinned registry/bundle | M3, M5 | Pinning tests |
| R11.18 | Deliberately simple V1 policy; source history suffices | M3 | Simplicity-budget review |
| R11.19 | Missing capability → `capability_needed`, grantable in place | M3 | Blocker/grant tests |
| R11.20 | Capability-block rate tracked for tuning | M3 | Metric tests |

### R12. Acceptance and rollout → M1, M6 (all milestones feed it)

| Clause | Essence | Milestone | Verification |
|---|---|---|---|
| R12.1 | Core deterministically testable via fake adapter | M1, M6 | Fake suite |
| R12.2 | Live tests on real Paseo/Pi with inexpensive worker profile | M6 | Live suite |
| R12.3 | Fixture repo: branches, GREEN/RED, conflicts, worktrees | M1, M4, M6 | Fixture inventory |
| R12.4 | Coverage: fan-out, RED→repair→GREEN, queueing, capabilities, retries, recovery, worktrees, Git truth, PW binding | M6 | Suite-parity matrix |
| R12.5 | Fault injection at post-commit/pre-result, transport, merge-time | M5, M6 | Injection matrix |
| R12.6 | E2E incl. reload/restart recovery + target-side `MERGED_MAIN` | M6 | E2E test |
| R12.7 | Fixture validation → direct real-project testing (no artificial pilot) | M6 | Real-project runs |
| R12.8 | Current supported Paseo/Pi + defined minimum, no legacy matrix | M1, M6 | Compatibility report |

## Appendix B — ADR boundary coverage

Each ADR architecture bullet maps to the milestone(s) that preserve it; verification
is the same hook as the corresponding R-clause tests above.

| ADR boundary | Milestone |
|---|---|
| PW is external governance; OR is execution, not second authority | M1, M4 |
| Bounded typed obligations in, bounded typed results out, exact staleness | M1, M3, M4 |
| Provider-neutral durable contracts; Paseo-managed Pi initial deployment | M1, M2 |
| Main integration via Pi extension + separately testable core | M2 |
| One Paseo host; no OR daemon; no OR database | M1, M2, M5 |
| Semantic roles exactly Scout/Researcher/Worker/Reviewer | M3 |
| Main owns semantics/synthesis; OR owns mechanical enforcement/orchestration/recovery | M2, M3 |
| Fast path for small work; no silent fallback for OR-classified work | M2 |
| Full Research x3 fresh; broad discovery x2 fresh | M3 |
| Dynamic Worker fan-out gated by dependency/write ownership; PW-bounded | M3, M4 |
| Normal single Reviewer; bounded same-pair RED repair then escalate | M4 |
| Mutation never from `main`; PW exact branch; ad-hoc auto branch/worktree | M4 |
| Isolated worktrees/subbranches for concurrent mutators; exact commits; mechanical merge after Main acceptance | M4 |
| Explicit Git/integration truth; four distinct completion states | M1, M4, M5 |
| Disposable runtime state; revalidated recovery; readback over blind retry | M1, M5 |
| Event-driven over Paseo notifications, not polling | M2 |
| One central worker profile; one global ceiling (initial 9) | M3 |
| Simple capability policy: hard ceilings, broad defaults, bounded grants, native enforcement | M3 |
| Global versioned Tool Registry; auto-analysis proposals-only; explicit user approval | M3 |
| `or doctor` + fake/live/fault-injection/e2e-with-readback acceptance | M2, M5, M6 |
| Rollout: fixture validation → direct real-project testing | M6 |

Accepted superseding refinements preserved (no reopening): Paseo mandatory for initial
deployment; no transcript/timeline duplication and no daemon/database; no token/cost
accounting; proposals-only classification with user approval/edit; lightweight
capability design; generous last-resort ceiling; ~30-day journal retention; one
subagent level; fixture→real-project rollout. Deferred-to-Planning items decided here:
schemas/types/layout/adapter APIs (M1), config syntax (M1/M3), substrate reuse
(conditional, M1 evidence gate).

## Risks / Rollback

| Risk | Mitigation |
|---|---|
| Paseo/Pi surfaces differ from prior-art leads | G1 compatibility gate; unverified items fail closed, never assumed |
| Deployment drift after G1 | Doctor re-probe on demand; reload without Paseo restart |
| Capability-policy overengineering | R11.18 simplicity budget enforced at M3 review |
| Classifier mis-scoping tools | Proposals-only + user edit + rollback to prior registry revision |
| PW topology forbids parallel mutators | Planned serialization path (M4 probe outcome, not a slip) |
| Live-test flakiness (events, timing) | Fake matrix is normative; live runs confirm; virtual clock for timing |
| Real-project variance | Main-bounded task selection; findings → bounded repair, not rescoping |

Rollback: no product code exists yet, so milestone slices are independently
revertible during implementation; this frozen plan follows the PW correction lifecycle
(new cycle/revision for material changes; Stage-6 independent review next). Runtime state
is disposable by design; fixture-only mutation until M6's granted real-project testing.

## Resources and grants required for later execution

Writing this plan grants none of the following; each must be concretely available
before the milestone that needs it:

- M1–M2: read access to the actual Paseo/Pi deployment, plus session-launch/control
  rights and inexpensive-profile test traffic for explicitly bounded active
  compatibility probes and smoke runs (disposable tool-free or strictly read-only
  sessions; repository/product mutation forbidden).
- M2–M6: a real Paseo host + Pi provider with the inexpensive worker profile funded
  for test traffic; exact versions recorded at G1.
- M1/M4/M6: a fixture repository (GitHub) with branch/PR/merge rights scoped to
  fixture content only, including check fixtures and conflict pairs.
- M3: user availability to review/approve tool-classification batches (no standing
  pre-approval; each batch needs explicit action).
- M6: explicit scope grant naming the real projects/tasks for direct testing, plus any
  repo/secret/production access those tasks need (task-scoped, never wholesale).
- Throughout: no secrets in prompts, transcripts, durable records, or the repository;
  secret values travel only through runtime/environment channels with redaction.

## Open Questions

None that block this plan or require new user product decisions. The following stay
conditional behind explicit verified gates and resolve during implementation:

- Substrate reuse (native vs `pi-extensible-workflows`/pi-fabric pieces) — M1 evidence gate.
- Exact Paseo/Pi APIs, versions, and enforcement guarantees — G1 compatibility report.
- Multi-mutator legality inside one PW obligation — M4 topology probe (#56).
- Host Pi mutation-policy globalization — recorded alignment (#3); OR guards hold regardless.

