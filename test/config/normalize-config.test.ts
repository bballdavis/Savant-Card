import { describe, expect, it } from "vitest";
import { normalizeConfig, resolveBreakerDisplay } from "../../src/config/normalize-config";

describe("normalizeConfig", () => {
  it("applies safe defaults and preserves partial user config", () => {
    const config = normalizeConfig({ graph: { refresh_interval_seconds: 5 }, layout: { density: "compact" } });
    expect(config.discovery.enabled).toBe(true);
    expect(config.graph.refresh_interval_seconds).toBe(30);
    expect(config.layout.density).toBe("compact");
  });

  it("resolves breaker overrides over global display defaults", () => {
    const config = normalizeConfig({
      display: { show_average_power: true },
      breaker_overrides: { "device:a": { label: "Network Closet", show_average_power: false } },
    });
    const display = resolveBreakerDisplay(config, {
      id: "device:a",
      name: "Original",
      controllable: true,
      entities: {},
      available: true,
      discoveryConfidence: "high",
    });
    expect(display.label).toBe("Network Closet");
    expect(display.show_average_power).toBe(false);
  });
});
