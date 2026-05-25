import { describe, expect, it } from "vitest";
import { StatisticsManager } from "../../src/data/statistics-manager";
import { createHass } from "../fixtures/hass-states";
import type { HomeAssistant } from "../../src/types/home-assistant";

describe("StatisticsManager", () => {
  it("fetches and caches statistics", async () => {
    const manager = new StatisticsManager();
    const first = await manager.getStatistics(createHass(), "sensor.kitchen_power", "24h", 300);
    const second = await manager.getStatistics(createHass(), "sensor.kitchen_power", "24h", 300);
    expect(first.averageWatts).toBe(150);
    expect(second).toBe(first);
  });

  it("fetches 12h recorder statistics with the requested time range", async () => {
    const messages: Array<Record<string, any>> = [];
    const hass = createHass();
    const connection = hass.connection!;
    const originalSend = connection.sendMessagePromise!.bind(connection);
    connection.sendMessagePromise = async <T = any>(message: Record<string, any>): Promise<T> => {
      messages.push(message);
      return originalSend<T>(message);
    };

    await new StatisticsManager().getStatistics(hass as HomeAssistant, "sensor.kitchen_power", "12h", 300);

    const statsRequest = messages.find((message) => message.type === "recorder/statistics_during_period");
    expect(statsRequest?.period).toBe("5minute");
    expect(Date.parse(statsRequest?.end_time) - Date.parse(statsRequest?.start_time)).toBe(12 * 60 * 60 * 1000);
  });
});
