import { describe, expect, it } from "vitest";
import "../../src/components/sparkline";
import { normalizePoints } from "../../src/components/sparkline";

describe("normalizePoints", () => {
  it("handles normal points", () => {
    expect(normalizePoints([{ start: 1, value: 1 }, { start: 2, value: 3 }])?.path).toContain("M");
  });

  it("handles flat and missing data", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toContain("27.00");
    expect(normalizePoints([])).toBeUndefined();
  });

  it("uses zero as the visual baseline", () => {
    const normalized = normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 100 }]);

    expect(normalized?.path).toBe("M 0.00 27.00 L 100.00 9.40");
  });

  it("draws zero runs as a visible value line", () => {
    const normalized = normalizePoints([
      { start: 1, value: 0 },
      { start: 2, value: 0 },
      { start: 3, value: 100 },
    ]);

    expect(normalized?.path).toBe("M 0.00 27.00 L 50.00 27.00 M 50.00 27.00 L 100.00 9.40");
  });

  it("does not fill zero-only stretches", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.fillPath).toBe("");
    expect(
      normalizePoints([
        { start: 1, value: 0 },
        { start: 2, value: 0 },
        { start: 3, value: 100 },
      ])?.fillPath,
    ).toBe("M 50.00 27.00 L 100.00 9.40 L 100.00 36 L 50.00 36 Z");
  });

  it("keeps low positive values above the zero axis on large domains", () => {
    expect(
      normalizePoints([
        { start: 1, value: 0 },
        { start: 2, value: 10 },
        { start: 3, value: 1000 },
      ])?.path,
    ).toBe("M 0.00 27.00 L 50.00 26.82 M 50.00 26.82 L 100.00 9.40");
  });

  it("keeps every line coordinate inside the visible plot area while fill reaches the bottom", () => {
    const normalized = normalizePoints([
      { start: 1, value: 0 },
      { start: 2, value: 2 },
      { start: 3, value: 10000 },
    ]);
    const yValues = [...(normalized?.path.matchAll(/(?:M|L) \d+\.\d+ (\d+\.\d+)/g) ?? [])].map((match) =>
      Number(match[1]),
    );

    expect(Math.max(...yValues)).toBeLessThanOrEqual(27);
    expect(Math.min(...yValues)).toBeGreaterThanOrEqual(5);
    expect(normalized?.fillPath).toContain(" 36");
  });

  it("raises zero-only data enough to remain visible", () => {
    expect(normalizePoints([{ start: 1, value: 0 }, { start: 2, value: 0 }])?.path).toBe(
      "M 0.00 27.00 L 100.00 27.00",
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
