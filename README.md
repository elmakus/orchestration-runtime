# Orchestration Runtime

Provider-neutral orchestration core governed by the accepted Project Workflow workstream in this repository.

M01 establishes bounded contracts, deterministic validation/digests, a fake adapter, compatibility gating, fixture scenarios, coordination evidence, and the native-core substrate decision. It does not implement the Paseo/Pi production adapter or later M2-M6 behavior.

Run the local deterministic suite with:

```sh
npm test
```

Check the compatibility gate with:

```sh
npm run compatibility:check
```

Exit code `2` means the report is structurally valid but one or more required live facts are still unproven; dependent live work must remain blocked.
