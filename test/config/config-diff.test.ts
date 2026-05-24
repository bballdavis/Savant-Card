import { describe, expect, it } from "vitest";
import { minimalConfig } from "../../src/config/config-diff";
import { normalizeConfig } from "../../src/config/normalize-config";

describe("minimalConfig", () => {
  it("stores only differences from defaults", () => {
    const minimal = minimalConfig(normalizeConfig({ title: "Panel", excluded_breakers: ["device:a"] }));
    expect(minimal).toEqual({
      type: "custom:savant-energy-breaker-board-card",
      title: "Panel",
      excluded_breakers: ["device:a"],
    });
  });
});
