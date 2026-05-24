import { HistoryManager } from "./history-manager";
import type { GraphPeriod } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { BreakerStatistics, SparklinePoint } from "../types/statistics";

interface CacheEntry {
  data: BreakerStatistics;
  fetchedAt: number;
}

export class StatisticsManager {
  private cache = new Map<string, CacheEntry>();
  private history = new HistoryManager();

  public async getStatistics(
    hass: HomeAssistant,
    entityId: string,
    period: GraphPeriod,
    refreshIntervalSeconds: number,
  ): Promise<BreakerStatistics> {
    const key = `${entityId}:${period}`;
    const now = Date.now();
    const cached = this.cache.get(key);
    if (cached && now - cached.fetchedAt < refreshIntervalSeconds * 1000) {
      return cached.data;
    }

    try {
      const points = await this.fetchStatisticsOrHistory(hass, entityId, period);
      const values = points.map((point) => point.value).filter(Number.isFinite);
      const data: BreakerStatistics = {
        entityId,
        period,
        points,
        averageWatts: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined,
        maximumWatts: values.length ? Math.max(...values) : undefined,
        loading: false,
        fetchedAt: now,
      };
      this.cache.set(key, { data, fetchedAt: now });
      return data;
    } catch (error) {
      return {
        entityId,
        period,
        points: [],
        loading: false,
        error: error instanceof Error ? error.message : "History unavailable",
      };
    }
  }

  public invalidate(entityId?: string): void {
    if (!entityId) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${entityId}:`)) this.cache.delete(key);
    }
  }

  private async fetchStatisticsOrHistory(
    hass: HomeAssistant,
    entityId: string,
    period: GraphPeriod,
  ): Promise<SparklinePoint[]> {
    if (!hass.connection?.sendMessagePromise) return [];
    if (period === "7d" || period === "24h") {
      try {
        const end = new Date();
        const start = new Date(end.getTime() - periodToMsInline(period));
        const stats = await hass.connection.sendMessagePromise<any>({
          type: "recorder/statistics_during_period",
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          statistic_ids: [entityId],
          period: period === "7d" ? "hour" : "5minute",
          types: ["mean", "max"],
        });
        const rows = stats?.[entityId] ?? [];
        const points = rows
          .map((row: any) => ({
            start: new Date(row.start).getTime(),
            value: Number(row.mean ?? row.max),
          }))
          .filter((point: SparklinePoint) => Number.isFinite(point.start) && Number.isFinite(point.value));
        if (points.length) return points;
      } catch {
        // Fall through to state history. Some HA installs disable recorder statistics per sensor.
      }
    }
    return this.history.fetchHistory(hass, entityId, period);
  }
}

function periodToMsInline(period: GraphPeriod): number {
  switch (period) {
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    case "6h":
      return 6 * 60 * 60 * 1000;
    case "1h":
      return 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
}
