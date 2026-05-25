import { describe, expect, it } from "vitest";
import "../../src/components/sparkline";
import { normalizePoints } from "../../src/components/sparkline";

describe("normalizePoints", () => {
  it("handles normal points", () => {
    expect(normalizePoints([{ start: 1, value: 1 }, { start: 2, value: 3 }])?.path).toContain("M");
  });

  it("handles flat and missing data", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toContain("31.00");
    expect(normalizePoints([])).toBeUndefined();
  });

  it("uses zero as the visual baseline", () => {
    const normalized = normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 100 }]);

    expect(normalized?.path).toBe("M 0.00 34.00 L 100.00 11.60");
  });

  it("does not draw long zero runs as a baseline", () => {
    const normalized = normalizePoints([
      { start: 1, value: 0 },
      { start: 2, value: 0 },
      { start: 3, value: 100 },
    ]);

    expect(normalized?.path).toBe("M 50.00 34.00 L 100.00 11.60");
  });

  it("does not fill zero-only stretches", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.fillPath).toBe("");
    expect(
      normalizePoints([
        { start: 1, value: 0 },
        { start: 2, value: 0 },
        { start: 3, value: 100 },
      ])?.fillPath,
    ).toBe("M 50.00 34.00 L 100.00 11.60 L 100.00 36 L 50.00 36 Z");
  });

  it("raises zero-only data enough to remain visible", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toBe(
      "M 0.00 31.00 L 100.00 31.00",
    );
  });

  it("renders missing data as a flatline instead of text", async () => {
    const element = document.createElement("savant-sparkline");
    document.body.append(element);
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector(".empty")).toBeNull();
    expect(element.shadowRoot?.querySelector('svg[data-no-history="true"]')).toBeTruthy();
    element.remove();
  });
});
