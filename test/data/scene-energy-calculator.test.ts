import { describe, expect, it } from "vitest";
import type { BreakerStatistics } from "../../src/types/statistics";
import { computeBreakerEnergy, computeSceneFooter } from "../../src/data/scene-energy-calculator";

describe("scene energy calculator", () => {
  it("computes breaker battery drain percent per hour from average watts", () => {
    const metrics = computeBreakerEnergy(statistics(1500), 15);

    expect(metrics.averageWatts).toBe(1500);
    expect(metrics.averageKwPerHour).toBe(1.5);
    expect(metrics.estimatedWeeklyKwh).toBe(252);
    expect(metrics.batteryDrainPercentPerHour).toBe(10);
  });

  it("computes scene footer battery drain percent per hour from active breakers", () => {
    const summary = computeSceneFooter(
      { breaker_a: true, breaker_b: true, breaker_c: false },
      new Map([
        ["breaker_a", { averageWatts: 500 } as any],
        ["breaker_b", { averageWatts: 1500 } as any],
        ["breaker_c", { averageWatts: 900 } as any],
      ]),
      20,
    );

    expect(summary.totalBreakers).toBe(3);
    expect(summary.totalOnBreakers).toBe(2);
    expect(summary.totalAverageWatts).toBe(2000);
    expect(summary.totalKwhPerHour).toBe(2);
    expect(summary.totalWeeklyKwh).toBe(336);
    expect(summary.batteryDrainPercentPerHour).toBe(10);
  });

  it("omits battery drain percent when capacity is not configured", () => {
    const breaker = computeBreakerEnergy(statistics(750), undefined);
    const summary = computeSceneFooter({ breaker_a: true }, new Map([["breaker_a", { averageWatts: 750 } as any]]), 0);

    expect(breaker.batteryDrainPercentPerHour).toBeUndefined();
    expect(summary.batteryDrainPercentPerHour).toBeUndefined();
  });
});

function statistics(averageWatts: number): BreakerStatistics {
  return {
    entityId: "sensor.example_power",
    period: "24h",
    points: [],
    averageWatts,
    maximumWatts: averageWatts,
    loading: false,
  };
}
