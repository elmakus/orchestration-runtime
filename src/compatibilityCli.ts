import { readFile } from "node:fs/promises";
import { assessCompatibilityReport, type CompatibilityReport } from "./compatibility.ts";

const path = process.argv[2] ?? "evidence/m01/compatibility-report.json";
const report = JSON.parse(await readFile(path, "utf8")) as CompatibilityReport;
const assessment = assessCompatibilityReport(report);

process.stdout.write(JSON.stringify(assessment, null, 2) + "\n");
if (!assessment.valid) process.exitCode = 1;
else if (assessment.blockedRequired.length > 0) process.exitCode = 2;
