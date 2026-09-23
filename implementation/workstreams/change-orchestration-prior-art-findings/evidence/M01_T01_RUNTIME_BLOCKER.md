# M01-T01 runtime/access blocker evidence

## Durable implementation state

The local M01 foundation implementation was committed to the canonical workstream branch as:

`e5b93e82ebb96df674724eec3c7dfb8c84e9132c` — `feat: establish M01 orchestration runtime foundations`.

That commit contains the provider-neutral TypeScript contracts, deterministic validators/digests, scripted fake adapter, compatibility-gate model, fixture repository skeleton, coordination design and evidence-backed native-core substrate decision.

## Deterministic local validation

The local M01 implementation passed its deterministic test suite:

- `npm test`: 12/12 tests GREEN;
- deterministic invalid-contract diagnostics;
- deterministic fake-adapter replay/readback;
- compatibility-report completeness and fail-closed behavior;
- fixture scenario inventory.

`npm run compatibility:check` returns a structurally valid report and exit code 2 while required live facts remain unproven. This is the intended fail-closed outcome, not a product-code failure.

## Actual blocker

The target Paseo/Pi deployment has not yet been installed. Therefore G1 cannot truthfully record or prove deployment-specific facts and must remain blocked.

The compatibility report intentionally keeps the following required subjects `unknown_unverified` until the deployment exists:

- exact installed Paseo and Pi versions and the initial supported minimum baseline;
- lifecycle and completion/error/attention events;
- reconnect/resume behavior;
- native tool/capability restriction and denial behavior;
- worktree/subbranch support;
- metadata/label support;
- fixed worker-profile resolution;
- execution placement;
- shared storage visibility;
- atomic replace/exclusive locking support;
- bounded failure behavior.

G1 does not permit fake-only proof or invented values for these required live capabilities.

## Version policy at resume

The planned deployment may use the then-current latest Paseo and Pi releases. At G1, record the exact installed versions as immutable evidence. The initial minimum-supported baseline can be defined from the exact versions actually validated at G1; no legacy-version matrix is required by the accepted scope. Later deployment drift is handled by compatibility/doctor re-probing rather than by assuming every newer version is automatically equivalent.

## Resume condition

Resume M01-T01 after Paseo and Pi are deployed and the bounded test-traffic/read-only probe rights described by P1 are available. First reconcile the execution checkout against canonical Git, then perform only the tool-free or strictly read-only G1 probes. Required unknown/unsupported facts continue to block their dependent live outcomes until proven or explicitly re-scoped by the workflow.
