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

## Scope constraints

- Findings are research evidence, not accepted runtime requirements or decisions.
- Do not copy PWv2.1-only policy-kernel candidates into this repository as runtime requirements.
- Preserve shared interface constraints because the runtime must interoperate correctly with Project Workflow.
- Do not assume the current `elmakus/codex_workflow` architecture/name is the target.
- Do not select between adopting/wrapping/forking `pi-extensible-workflows` and implementing a thinner native runtime.
- No Definition, Planning or implementation.

## Research questions

1. What responsibilities should the runtime own?
2. Which prior-art mechanisms are strongest for those responsibilities?
3. What interface must exist between Project Workflow and runtime?
4. Which legacy `codex_workflow` concepts are worth preserving?
5. What failure modes/anti-authority rules must constrain a future implementation?
6. What experiments should later Definition/Planning require?

## Outcome

- Research required: yes.
- Research obligation: `research/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md`.
- Definition promotion authorization: pending.
- Definition promotion subject: none.

> Nothing in this file is accepted architecture authority.
