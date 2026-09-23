# M01 substrate decision

Decision: use a small native TypeScript core for V1 foundations and keep optional reuse behind the provider-neutral adapter boundary.

Evidence considered:
- accepted P1 defaults to a small native core unless measured M1 evidence shows concrete substrate benefit;
- `research/ORCHESTRATION_RUNTIME_PRIOR_ART_R1.md` records useful `pi-extensible-workflows` primitives, but also a larger dependency/behavior surface, governance-review caveats, and journal exactly-once limitations;
- the same research identifies `pi-fabric` as useful for capability discovery/code-mode composition while warning against making its agent/workflow/mesh state another orchestration owner;
- M01 local implementation needs only contracts, validation, deterministic fake execution, compatibility gating, and coordination evidence, all of which fit a compact native core without adopting another scheduler/state owner.

This is not a permanent rejection of reuse. Later adapter implementation may reuse bounded primitives when live compatibility evidence proves a concrete benefit without weakening the accepted authority, freshness, recovery, or Git-truth contracts.
