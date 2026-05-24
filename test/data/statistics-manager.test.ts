import { describe, expect, it } from "vitest";
import { StatisticsManager } from "../../src/data/statistics-manager";
import { createHass } from "../fixtures/hass-states";

describe("StatisticsManager", () => {
  it("fetches and caches statistics", async () => {
    const manager = new StatisticsManager();
    const first = await manager.getStatistics(createHass(), "sensor.kitchen_power", "24h", 300);
    const second = await manager.getStatistics(createHass(), "sensor.kitchen_power", "24h", 300);
    expect(first.averageWatts).toBe(150);
    expect(second).toBe(first);
  });
});
