# M01 coordination design

Selected V1 mechanism: a small process-shared file-backed reservation/queue record on verified shared storage, using an exclusive lock plus atomic replace.

This is disposable runtime metadata, never Project Workflow authority. Admission must fail closed when ownership is ambiguous. Lost/stale reservation recovery must reconcile attributable live Paseo children before capacity can be reused.

M1 does not claim this mechanism is deployable until live evidence proves:
1. execution placement on the single configured Paseo host;
2. a shared storage path visible to all OR/core processes;
3. reliable exclusive locking;
4. atomic file replacement semantics.

If any required prerequisite remains unknown or unsupported, the dependent M3 scheduler path is blocked rather than widened to multi-host scope.
