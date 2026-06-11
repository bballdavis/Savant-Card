export interface Scene {
  id: string;
  name: string;
}

export interface SceneBreakerState {
  entityId: string;
  isOn: boolean;
}

export interface SceneListResponse {
  scenes: Array<{ scene_id: string; name: string }>;
}

export interface BreakerEnergyMetrics {
  averageWatts?: number;
  averageKwPerHour?: number;
  estimatedWeeklyKwh?: number;
  batteryDrainPercentPerHour?: number;
}

export interface SceneFooterSummary {
  totalOnBreakers: number;
  totalBreakers: number;
  totalAverageWatts: number;
  totalKwhPerHour: number;
  totalWeeklyKwh: number;
  batteryDrainPercentPerHour?: number;
}

export interface ScenesConfig {
  enabled: boolean;
  battery_capacity_kwh?: number;
}
