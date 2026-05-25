import { describe, expect, it } from "vitest";
import "../../src/card/savant-energy-breaker-board-card";
import { SavantEnergyBreakerBoardCard } from "../../src/card/savant-energy-breaker-board-card";
import { DEFAULT_CONFIG } from "../../src/config/defaults";
import type { BreakerStatistics } from "../../src/types/statistics";

describe("statistics refresh", () => {
  it("applies breaker statistics one entity at a time as requests resolve", async () => {
    const card = document.createElement("savant-energy-breaker-board-card") as SavantEnergyBreakerBoardCard;
    const first = deferred<BreakerStatistics>();
    const second = deferred<BreakerStatistics>();
    (card as any).hass = {};
    (card as any).config = DEFAULT_CONFIG;
    (card as any).breakers = [
      breaker("breaker-a", "sensor.a_power"),
      breaker("breaker-b", "sensor.b_power"),
    ];
    (card as any).statsRequestSpacingMs = 0;
    (card as any).statistics = {
      getStatistics: (hass: unknown, entityId: string) =>
        entityId === "sensor.a_power" ? first.promise : second.promise,
    };

    const refresh = (card as any).loadStatisticsSequentially();
    first.resolve(stat("sensor.a_power", 10));
    await Promise.resolve();
    await Promise.resolve();

    expect((card as any).stats.get("sensor.a_power")?.averageWatts).toBe(10);
    expect((card as any).stats.has("sensor.b_power")).toBe(false);

    second.resolve(stat("sensor.b_power", 20));
    await refresh;
    expect((card as any).stats.get("sensor.b_power")?.averageWatts).toBe(20);
  });
});

function breaker(id: string, powerEntity: string) {
  return {
    id,
    name: id,
    controllable: false,
    entities: { power: powerEntity },
    available: true,
    discoveryConfidence: "high",
  };
}

function stat(entityId: string, value: number): BreakerStatistics {
  return {
    entityId,
    period: "24h",
    points: [{ start: 1, value }],
    averageWatts: value,
    maximumWatts: value,
    loading: false,
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
