# V1 -> V2 pilot migration provenance

Status: STAGED / NOT LIVE

## Exact V1 source

- Repository: `elmakus/orchestration-runtime`
- Source branch: `work/orchestration-prior-art-findings`
- Source commit: `636a9ec2b7760fc6a24eddb00319bfff9d583165`
- Source tree: `6c1ee742596619b793bcab13e1064d25797018c5`
- Integration target rollback ref: `main@c4130e63760d08c3656552f4a92c479239acbea3`
- V1 `PROJECT.md` blob: `1528c676ab2ccfe3db78b712f0ef45aca149c9ca`
- V1 `WORKSTREAM.yaml` blob: `208d543bb389ce7e33d3866489f3ae19ee94c3be`
- V1 `INTAKE.md` blob: `ae4768b0f7406e62b1b6115ea66807797783a7cc`
- Prior-art Brainstorming evidence blob: `ea3bc14673cc0cc064dd891fdd6ce3a13218342b`
- Prior-art Research evidence blob: `208b5d024618e35098d334b37852a1394ec2af7d`

The immutable source commit remains the exact historical V1 state even after activation.

## Reconstituted semantic boundary

The accepted M07 R02 adoption freeze requires the destination to preserve the source as:
- Intake complete;
- exploratory scope `orchestration-runtime-prior-art@1`;
- `ready_for_definition`;
- Definition promotion authorization pending;
- no active Research obligation;
- no accepted Definition, requirements, decisions or plan;
- no Task Board, implementation or review obligation.

V2 structurally requires a GREEN challenge audit for `ready_for_definition`; this field is the schema-compatible representation of the already-frozen ready boundary, not a new product decision or promotion authorization.

The completed V1 prior-art Research is retained as immutable evidence in Git and is not recreated as an active V2 `RESEARCH.toml` obligation.

## Live-owner boundary

This commit is staged on `migration/pwv2-orchestration-prior-art`. It is not live while the original selected branch remains at `636a9ec2b7760fc6a24eddb00319bfff9d583165`.

Activation is only the later verified fast-forward of `work/orchestration-prior-art-findings` to this exact staged commit, after bootstrap/recovery prerequisites are satisfied.
