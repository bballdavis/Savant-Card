import { describe, expect, it } from "vitest";
import { normalizePoints } from "../../src/components/sparkline";

describe("normalizePoints", () => {
  it("handles normal points", () => {
    expect(normalizePoints([{ start: 1, value: 1 }, { start: 2, value: 3 }])?.path).toContain("M");
  });

  it("handles flat and missing data", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toContain("24.00");
    expect(normalizePoints([])).toBeUndefined();
  });
});
