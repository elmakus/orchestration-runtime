# Orchestration Runtime Requirements R1

Status: ACCEPTED
Definition source: `orchestration-runtime-prior-art@1`
Accepted source artifact: `brainstorming/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md`
Accepted source blob: `ea3bc14673cc0cc064dd891fdd6ce3a13218342b`
Supporting prior-art evidence: `research/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md` at migrated source blob `208b5d024618e35098d334b37852a1394ec2af7d`

## Interpretation

This document is canonical Definition authority for the promoted scope above.

The non-superseded user-accepted choices in the exact accepted source artifact are incorporated as Definition constraints. Later explicit refinements, revisions and superseding choices in that artifact take precedence over earlier provisional choices. Items explicitly described there as candidates, research findings only, deferred implementation details, unresolved follow-ups, rejected proposals or cancelled questions do not become requirements merely by reference.

Implementation details intentionally deferred by the accepted source—exact JSON schemas, TypeScript types, repository/module layout, concrete Paseo adapter APIs, exact configuration syntax and optional substrate reuse—remain Planning/implementation choices as long as they satisfy these requirements.

## R1. Authority boundary

1. Project Workflow remains the canonical governance and project-lifecycle authority in PW-controlled work.
2. Orchestration Runtime (OR) consumes exact bounded obligations and returns exact bounded results; it must not infer or replace canonical project authority.
3. OR runtime journals, run IDs, sessions, Paseo metadata, workspaces, worktrees, queues and derived status are execution metadata only and must remain disposable relative to Git/PW truth.
4. Recovery must revalidate canonical bindings and preconditions before continuation. Stale results may be advisory but cannot satisfy a changed obligation.
5. PW-controlled execution must bind to the exact PW-selected workstream/authority. OR may decompose execution inside that boundary but may not broaden goal, authority, evidence requirements, capability bounds or canonical subject.

## R2. Deployment and integration shape

1. OR must be provider-neutral at its durable contract boundaries.
2. The initial supported deployment uses Paseo as the execution/control backend and Pi as the coding-agent harness/provider beneath it.
3. OR must expose its Main-facing integration through a Pi extension/tool surface backed by a separately testable core library.
4. V1 targets one configured Paseo host/control plane. Multi-host scheduling, host selection and balancing are out of scope.
5. V1 must not require a separate always-on OR daemon or database.
6. OR should use Paseo-managed child agents, lifecycle notifications, workspaces/worktrees and existing GUI/history instead of duplicating those facilities.
7. OR configuration changes should be reloadable without restarting the whole Paseo control plane or terminating unrelated Paseo sessions.

## R3. Roles and delegation

1. V1 semantic roles are exactly: Scout, Researcher, Worker and Reviewer.
2. Role semantics are versioned by OR; a shared Paseo execution profile supplies common model/effort execution settings but is not the semantic role definition.
3. Normal worker roles resolve through one centrally configured fixed worker profile/model/reasoning policy. Projects cannot override that profile in V1.
4. Main owns semantic delegation classification and task decomposition. OR enforces mechanical validity, role invariants, capability ceilings, fan-out invariants and canonical bindings.
5. Main retains a direct worker-free fast path for genuinely small/leaf work.
6. For substantial work classified as requiring OR, OR unavailability must be surfaced rather than silently falling back to Main.
7. V1 supports both PW-controlled obligations and lightweight ad-hoc Main delegation through the same runtime.
8. V1 has one subagent level: OR/Main may create workers; workers may not recursively create subagents.
9. Explicit user instructions about using or avoiding subagents may steer Main when compatible with PW/governance constraints.

## R4. Fan-out and queue invariants

1. Full Research requires exactly three fresh independent Researcher lanes with one shared bounded question and distinct explicit angles.
2. Mandatory full Research is satisfied only by three successful independent results; permanently failed lanes are replaced or the run blocks/fails.
3. Broad discovery requires exactly two independent Scout lanes with distinct angles and two successful results.
4. Narrow discovery may use Main directly or one Scout.
5. Worker fan-out cardinality is dynamic and follows legal decomposition; it has no ritual fixed count.
6. The initial global ceiling is 9 active OR subagents, excluding Main. Excess legal work queues rather than being rejected for capacity alone.
7. Mandatory Research x3 and broad Scout x2 waves launch only when the full required slot count is available.
8. Continuations such as repair/review/recheck receive priority over opening new exploratory waves; queue behavior should otherwise remain simple and predictable with anti-starvation aging.
9. One legal orchestration may consume the full global worker ceiling.
10. Concurrent mutating workers are allowed only when their write scopes do not overlap and dependencies permit parallel execution. Overlapping or dependent mutation packages serialize.
11. In PW-controlled work, any internal multi-Worker mutation fan-out must remain one bounded PW acceptance subject and must obey the current PW authority. If PW does not authorize that topology, OR must serialize/fail closed rather than invent parallel governance.

## R5. Session freshness and continuity

1. New Scout, Researcher and formal Reviewer assignments start in fresh sessions without inherited Main transcript, receiving bounded task capsules and authorized references.
2. A Worker session persists across implementation and ordinary repair iterations for the same bounded task when possible.
3. Ordinary recheck after repair uses the same Reviewer session when the review subject remains the same; a new formal independent-review subject follows PW freshness requirements.
4. A failed Reviewer without a terminal verdict is replaced by a fresh Reviewer on the same immutable subject.
5. A blocked Worker remains resumable for the same bounded task after Main resolves the blocking decision.
6. Scout/Researcher substantive follow-up is normally a fresh bounded assignment; tiny clarification may reuse the just-returned lane session.
7. Main interruption and orchestration cancellation are distinct. Valid Paseo children may finish while Main is temporarily absent, and later recovery must reconcile their state.

## R6. Task and result contracts

1. All roles use one common bounded task-capsule envelope with role-specific payload.
2. Capsules carry task identity, intent/rationale, exact canonical bindings/preconditions when applicable, material authority excerpts plus exact references, capability envelope, and only material negative boundaries.
3. Main provides semantic task content, angles and ownership; OR materializes mechanical fields such as IDs, resolved profile, session mode, workspace/worktree, capability set, schema, timeout and bindings.
4. Context should prefer exact references plus minimal bounded excerpts; oversized content must fall back to references/excerpts rather than indiscriminate copying.
5. Workers may perform additional discovery inside granted read authority without broadening the task goal.
6. Every worker return uses a validated structured result envelope with bounded natural-language content and explicit evidence/check/change/blocker/failure data as applicable.
7. Main receives compact structured results and evidence references by default, not full worker transcripts.
8. OR may collect/bundle multi-worker results but must not semantically synthesize or resolve conflicts before Main.
9. Each result must bind to the exact assignment/obligation input and relevant preconditions through immutable identity/digest information.
10. Semantically valid results that fail envelope formatting may receive one same-session format-correction attempt without consuming semantic repair budget; another schema failure becomes terminal `schema_invalid`.

## R7. Review and repair

1. PW controls whether review is required in PW mode; Main decides in ad-hoc mode.
2. Normal review defaults to one Reviewer unless PW/problem semantics require more.
3. Reviewer is independent of the Worker transcript and must review the exact immutable Worker commit/subbranch/subject.
4. Reviewer may inspect, run tests/checks and create ephemeral test artifacts but must not modify production code or reviewed production tests as part of the verdict.
5. RED review returns corrective production work to Worker.
6. Ordinary Worker↔Reviewer repair may continue mechanically without a new Main rollout until semantic decision/new authority/escalation is needed.
7. Automatic semantic repair is bounded to at most four failed repair attempts before escalation to Main.
8. GREEN Reviewer sessions may be archived after verdict/evidence are durably captured.

## R8. Repository mutation and Git truth

1. Read-only inspection of `main` is allowed, but repository mutation must not start from `main`.
2. PW-controlled mutation must use the exact PW-selected canonical workstream branch.
3. In ad-hoc mode, a mutation attempted from `main` must cause automatic creation of a legal isolated task branch/worktree before the first write.
4. Main fast-path mutation is subject to the same no-write-on-main rule.
5. A single mutating Worker may use the canonical authorized workspace when there is no competing mutation; concurrent mutating Workers require isolated worktrees/subbranches derived from the canonical branch.
6. While one mutating Worker owns a shared workspace, Main must not independently mutate that same workspace.
7. Each mutating Worker should finish with a local commit. Temporary worker branches normally remain local unless remote publication is specifically required.
8. Main owns semantic integration acceptance; OR may perform mechanical merge/cherry-pick after that decision and must escalate ambiguity/conflicts.
9. Final PW PR/integration to `main` must originate from the canonical workstream branch, never directly from temporary worker subbranches.
10. Deterministic legally authorized PW integration should continue automatically when no human gate remains.
11. Target-side readback must verify final merge/integration before reporting terminal merged truth.
12. Mutating completion must expose explicit Git/integration state and exact relevant identities. Generic `done` must never hide an unmerged branch.
13. Worker completion, review completion, orchestration completion and repository integration are distinct lifecycle facts.

## R9. Failure, retry, recovery and cancellation

1. OR uses a small stable failure taxonomy including retryable provider/transport failure, schema invalidity, permission/config failure, stale precondition, side-effect uncertainty and runtime-internal failure.
2. Only explicitly transient/retryable infrastructure failures are automatically retried.
3. Retryable infrastructure failure receives at most two automatic retries after the initial failure, for at most three infrastructure attempts, with simple bounded backoff.
4. Permission denial, missing model, invalid configuration, semantic error, stale precondition and invalid authority are not blindly retried.
5. On transport interruption, OR first reconnects/reads back the existing Paseo agent before replacing it.
6. Pre-mutation retryable provider failure may restart the same assignment in a fresh session while preserving task identity.
7. When a Worker session dies with partial workspace state, a fresh replacement may continue only after explicit validated handoff.
8. If a durable Worker commit exists but the structured response was lost, OR should recover from Git plus available Paseo history instead of rerunning implementation solely because messaging was lost.
9. Uncertain external side effects must not be retried until safe readback/idempotency resolves the uncertainty; otherwise return `side_effect_uncertain`.
10. Dirty worktrees after failure/cancellation enter recoverable state and must not be destroyed before recovery or deliberate abandonment.
11. OR exposes explicit whole-run cancellation for its known child set.
12. Cancellation and cleanup must preserve enough state for recovery/diagnostics.
13. OR journal loss must not make project recovery impossible; canonical Git/PW state and attributable Paseo metadata/history remain sufficient for best-effort recovery.

## R10. Timing, retention and observability

1. OR consumes Paseo completion/error/attention events rather than polling normal worker status.
2. Main receives only material lifecycle events by default: completed, blocked/needs-decision, failed, stale and optionally sparse long-running notices.
3. V1 uses one generous global agent hard ceiling, initially about six hours, only as a last-resort safety fuse.
4. Normal long-running activity reported healthy by Paseo must not be cancelled merely because wall-clock time is high.
5. Reaching the ceiling triggers inspection/escalation before any kill unless the session is demonstrably stuck or explicitly cancelled.
6. OR retains compact runtime journal/history for a bounded period, initially roughly 30 days, then cleans it automatically after required durable results/evidence are safe.
7. OR does not own Paseo transcript retention and should not duplicate Paseo timelines/transcripts.
8. OR provides derived live status and query surfaces without duplicating PW Task Board semantics.
9. V1 operational metrics include elapsed time, attempts, resolved worker profile/model identity, queue/capability-block behavior and similar runtime signals. Token/cost accounting is not required.
10. `or doctor` is part of V1 and must be callable through the Main-facing OR surface.

## R11. Capabilities, tools and secrets

1. Every assignment has an explicit resolved capability set. Role ceilings are hard: Main may narrow but not expand beyond them.
2. Capability policy uses a small stable vocabulary and generous practical defaults rather than a large IAM-style taxonomy.
3. Worker defaults include normal local development capabilities; Researcher is broad read/evidence oriented; Scout is broad local-project discovery without default external web; Reviewer has broad local inspection/test power but no production-code mutation or external side effects by default.
4. Network/read authority is distinct from external-side-effect authority.
5. External side effects require a bounded concrete grant. In PW mode legality comes from the exact PW obligation; in ad-hoc mode Main may grant a bounded effect that follows directly from the user request.
6. Secrets are task-scoped references/bindings, not wholesale inheritance. Secret values should not be embedded in prompts/transcripts when avoidable.
7. OR applies deterministic redaction for known injected secret values in returned/logged output.
8. OR must not attempt to build a custom semantic shell-command sandbox. Use available platform enforcement plus explicit role/task contracts.
9. Where Pi/Paseo can mechanically restrict tools/capabilities, OR should use that enforcement.
10. OR owns a global versioned Tool Registry and role-default tool bundles; projects may narrow use but cannot expand global trust or hard role ceilings.
11. Main declares semantic tool/capability needs; OR resolves them deterministically to installed approved tools and records the resolved registry/bundle version.
12. Unknown/unclassified tools are excluded from automatic worker bundles.
13. Newly discovered or materially changed MCPs/skills/extensions are automatically analyzed from available metadata, schemas, actions, manifests and documentation to produce a proposal only.
14. Generated tool classifications do not become active until explicit user approval. The user may approve a batch, edit individual capabilities/risk flags, or reject it.
15. Classification reports must be concise but show per-action/tool capabilities where possible, evidence/rationale, read/write/external-side-effect/secret/production flags, confidence/uncertainty and the proposed change from active policy.
16. Human overrides remain authoritative until a material tool-surface change requires re-review. Version-only changes with no material capability change need not trigger approval.
17. Running assignments retain their pinned approved registry/bundle even if registry configuration changes.
18. Tool Registry policy must remain deliberately simple in V1; ordinary source-controlled history is sufficient and a separate capability-policy platform is out of scope.
19. Missing capabilities return an explicit `capability_needed` blocker and may be granted to the same assignment when authority permits.
20. Capability-block rate is tracked as evidence for tuning role defaults.

## R12. Acceptance and rollout

1. Most OR core behavior must be deterministically testable against a fake adapter without live Paseo/Pi.
2. Integration tests must also exercise a real Paseo instance and real Pi provider using the actual inexpensive worker profile intended for production.
3. A dedicated fixture repository must cover controlled branches, GREEN/RED checks, conflicts and worktree scenarios.
4. Tests must cover mandatory Research x3 and Scout x2 fan-out, Worker→Reviewer RED→repair→GREEN lifecycle, queueing, tool/capability resolution, retries, crash recovery, worktree isolation, Git-state truth and PW binding.
5. Recovery tests must inject faults at material boundaries such as post-commit/pre-result, transport interruption and merge-time failure.
6. V1 end-to-end acceptance includes delegation, worker execution, review, repair, recovery after OR reload/restart and verified target-side `Git state: MERGED_MAIN`.
7. Rollout uses the fixture repository for deterministic technical validation, then moves directly to real-project testing across the user's actual projects rather than requiring one artificially isolated low-risk pilot.
8. V1 targets the current supported Paseo/Pi environment actually used for deployment with a defined minimum supported version, not a broad legacy compatibility matrix.

## Explicit V1 exclusions

- OR as a second Project Workflow authority or second Task Board.
- Runtime database or external orchestrator history required for project recovery.
- Separate OR daemon/background control plane.
- Multi-host scheduling/balancing.
- Recursive worker-created subagents.
- Dedicated Archivist or Evidence Auditor roles.
- Custom full OR dashboard or Paseo pill/plugin in V1.
- Provider-specific semantics in shared PW↔OR contracts when avoidable.
- Silent model fallback, silent substantial-task fallback to Main, or blind side-effect retry.
- Complex IAM-like capability governance, semantic inspection of every shell command, or large role/bundle taxonomies.

## Deferred to Planning/implementation

Planning may choose exact schemas, TypeScript types, module layout, adapter APIs, configuration syntax, persistence file formats and whether any reusable substrate such as `pi-extensible-workflows` or pi-fabric is worth adopting. Those choices must preserve this Definition authority.
