import { describe, expect, it } from "vitest";
import { BreakerDiscoveryService } from "../../src/data/breaker-discovery-service";
import { normalizeConfig } from "../../src/config/normalize-config";
import { createHass } from "../fixtures/hass-states";

describe("BreakerDiscoveryService", () => {
  it("merges registry and manual breakers", async () => {
    const service = new BreakerDiscoveryService();
    const breakers = await service.discover(
      createHass(),
      normalizeConfig({
        manual_breakers: [{ id: "manual_a", name: "Manual", power_entity: "sensor.manual_power" }],
      }),
    );
    expect(breakers.some((breaker) => breaker.id === "device:dev1")).toBe(true);
    expect(breakers.some((breaker) => breaker.id === "manual:manual_a")).toBe(true);
  });
});
