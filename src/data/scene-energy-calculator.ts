import type { BreakerStatistics } from "../types/statistics";
import type { BreakerEnergyMetrics, SceneFooterSummary } from "../types/scene";

const HOURS_PER_WEEK = 168;

export function computeBreakerEnergy(
  stats?: BreakerStatistics,
  batteryCapacityKwh?: number,
): BreakerEnergyMetrics {
  const averageWatts = stats?.averageWatts;
  if (averageWatts === undefined || !Number.isFinite(averageWatts)) {
    return {};
  }
  const averageKwPerHour = averageWatts / 1000;
  const estimatedWeeklyKwh = averageKwPerHour * HOURS_PER_WEEK;
  const result: BreakerEnergyMetrics = {
    averageWatts,
    averageKwPerHour,
    estimatedWeeklyKwh,
  };
  if (batteryCapacityKwh && batteryCapacityKwh > 0) {
    result.batteryDrainPercentPerHour = (averageKwPerHour / batteryCapacityKwh) * 100;
  }
  return result;
}

export function computeSceneFooter(
  relayStates: Record<string, boolean>,
  statsMap: Map<string, BreakerStatistics | undefined>,
  batteryCapacityKwh?: number,
): SceneFooterSummary {
  const breakerIds = Object.keys(relayStates);
  const totalBreakers = breakerIds.length;
  let totalOnBreakers = 0;
  let totalAverageWatts = 0;

  for (const entityId of breakerIds) {
    if (!relayStates[entityId]) continue;
    totalOnBreakers++;
    const stats = statsMap.get(entityId);
    if (stats?.averageWatts && Number.isFinite(stats.averageWatts)) {
      totalAverageWatts += stats.averageWatts;
    }
  }

  const totalKwhPerHour = totalAverageWatts / 1000;
  const totalWeeklyKwh = totalKwhPerHour * HOURS_PER_WEEK;
  const summary: SceneFooterSummary = {
    totalOnBreakers,
    totalBreakers,
    totalAverageWatts,
    totalKwhPerHour,
    totalWeeklyKwh,
  };
  if (batteryCapacityKwh && batteryCapacityKwh > 0) {
    summary.batteryDrainPercentPerHour = (totalKwhPerHour / batteryCapacityKwh) * 100;
  }
  return summary;
}

export function formatWatts(watts?: number): string {
  if (watts === undefined || !Number.isFinite(watts)) return "--";
  if (watts >= 1000) return `${(watts / 1000).toFixed(1)} kW`;
  return `${Math.round(watts)} W`;
}

export function formatKwh(kwh?: number): string {
  if (kwh === undefined || !Number.isFinite(kwh)) return "--";
  if (kwh >= 10) return `${kwh.toFixed(1)} kWh`;
  if (kwh >= 1) return `${kwh.toFixed(2)} kWh`;
  return `${(kwh * 1000).toFixed(0)} Wh`;
}

export function formatBatteryPercent(pct?: number): string {
  if (pct === undefined || !Number.isFinite(pct)) return "";
  return `${pct.toFixed(1)}%/h`;
}
