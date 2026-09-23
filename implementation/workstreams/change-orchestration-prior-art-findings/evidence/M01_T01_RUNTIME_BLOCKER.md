# M01-T01 runtime/access blocker evidence

## Durable implementation state

The local M01 foundation implementation was committed to the canonical workstream branch as:

`e5b93e82ebb96df674724eec3c7dfb8c84e9132c` — `feat: establish M01 orchestration runtime foundations`.

That commit contains the provider-neutral TypeScript contracts, deterministic validators/digests, scripted fake adapter, compatibility-gate model, fixture repository skeleton, coordination design and evidence-backed native-core substrate decision.

## Deterministic local validation

A clean local copy of the exact implementation content passed:

- `npm test`: 12/12 tests GREEN;
- deterministic invalid-contract diagnostics;
- deterministic fake-adapter replay/readback;
- compatibility-report completeness and fail-closed behavior;
- fixture scenario inventory.

`npm run compatibility:check` returned a structurally valid report and exit code 2 because required live facts remain unproven. This is the intended fail-closed outcome, not a product-code test failure.

## Remaining G1 evidence

The compatibility report intentionally leaves these required subjects `unknown_unverified` until direct readback/probes are possible:

- actual/minimum Paseo and Pi versions;
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

## Concrete blocker

The authorized workstation remote-access channel reached its current usage limit after repository synchronization and before the required bounded live probes could be completed. The channel explicitly reports that tool calls are paused.

Some uncommitted scratch M01 files may remain in the workstation checkout from the interrupted direct implementation attempt. Canonical Git on this workstream branch remains authoritative; on access restoration, the checkout must be read back and reconciled against the canonical branch before any further local mutation.

## Resume condition

Restore the authorized workstation remote-access channel. Then resume M01-T01, first reconcile the checkout to canonical Git, and perform only the bounded read-only/tool-free compatibility probes permitted by the Card. Required unknown/unsupported facts continue to block dependent live work until proven or correctly classified.
