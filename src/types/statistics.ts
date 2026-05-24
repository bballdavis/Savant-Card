export interface SparklinePoint {
  start: number;
  value: number;
}

export interface BreakerStatistics {
  entityId: string;
  period: string;
  averageWatts?: number;
  maximumWatts?: number;
  points: SparklinePoint[];
  loading: boolean;
  error?: string;
  fetchedAt?: number;
}
