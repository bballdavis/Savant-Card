import { describe, expect, it } from "vitest";
import "../../src/components/sparkline";
import { normalizePoints } from "../../src/components/sparkline";

describe("normalizePoints", () => {
  it("handles normal points", () => {
    expect(normalizePoints([{ start: 1, value: 1 }, { start: 2, value: 3 }])?.path).toContain("M");
  });

  it("handles flat and missing data", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toContain("35.00");
    expect(normalizePoints([])).toBeUndefined();
  });

  it("uses zero as the visual baseline", () => {
    const normalized = normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 100 }]);

    expect(normalized?.path).toBe("M 0.00 35.00 L 100.00 5.00");
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
