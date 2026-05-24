import type { HomeAssistant } from "../types/home-assistant";
import type { GraphPeriod } from "../types/config";
import type { SparklinePoint } from "../types/statistics";

export class HistoryManager {
  public async fetchHistory(
    hass: HomeAssistant,
    entityId: string,
    period: GraphPeriod,
  ): Promise<SparklinePoint[]> {
    if (!hass.connection?.sendMessagePromise) return [];
    const end = new Date();
    const start = new Date(end.getTime() - periodToMs(period));
    const response = await hass.connection.sendMessagePromise<any[]>({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
    });
    const series = response?.[0] ?? [];
    return series
      .map((point: any) => ({
        start: new Date(point.last_changed ?? point.lu ?? point.s).getTime(),
        value: Number(point.state),
      }))
      .filter((point: SparklinePoint) => Number.isFinite(point.start) && Number.isFinite(point.value));
  }
}

export function periodToMs(period: GraphPeriod): number {
  switch (period) {
    case "1h":
      return 60 * 60 * 1000;
    case "6h":
      return 6 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    case "24h":
    default:
      return 24 * 60 * 60 * 1000;
  }
}
