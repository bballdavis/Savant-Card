import { existsSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(__dirname, "../..");
const repoName = basename(repoRoot);
const hacs = JSON.parse(readFileSync(join(repoRoot, "hacs.json"), "utf8")) as {
  filename?: string;
};

describe("HACS Dashboard structure", () => {
  it("uses a dashboard filename that matches the repository name", () => {
    expect(hacs.filename).toBe(`${repoName}.js`);
  });

  it("keeps the default-branch dashboard artifact in dist for HACS validation", () => {
    expect(existsSync(join(repoRoot, "dist", `${repoName}.js`))).toBe(true);
  });
});
