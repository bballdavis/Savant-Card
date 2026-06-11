# Implementation Spec: Foundation Layer

## Context
Part of scene integration for Savant-Card. The card is a LitElement-based Home Assistant Lovelace card at `/Users/philipdavis/Repos/Savant-Card`. Uses TypeScript, Vite, Lit 3.x.

Scenes are stored in the HASS-Savant-Energy integration's JSON storage and accessed via REST API: `/api/savant_energy/scenes` etc.

## Task 1A: Types (`src/types/scene.ts`) — NEW FILE

Typescript interfaces for the scene domain.

```typescript
export interface Scene {
  id: string;           // e.g. "savant_living_room_scene"
  name: string;         // display name, e.g. "Living Room"
}

export interface SceneBreakerState {
  entityId: string;
  isOn: boolean;
}

// REST API response: GET /api/savant_energy/scenes
export interface SceneListResponse {
  scenes: Array<{ scene_id: string; name: string }>;
}

// Computed energy metrics for a single breaker
export interface BreakerEnergyMetrics {
  averageWatts?: number;
  averageKwPerHour?: number;    // averageWatts / 1000
  estimatedWeeklyKwh?: number;  // averageKwPerHour * 168
  batteryDrainPercentPerHour?: number;  // averageKwPerHour / batteryCapacityKwh * 100
}

// Summary footer data
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
```

## Task 1B: Scene Service (`src/data/scene-service.ts`) — NEW FILE

Wraps all REST API calls. Uses `hass.callApi(method, path, body?)`.

```typescript
import type { HomeAssistant } from "../types/home-assistant";
import type { Scene, SceneListResponse } from "../types/scene";

export class SceneService {
  constructor(private hass: HomeAssistant) {}

  async fetchScenes(): Promise<Scene[]> {
    const resp = await this.hass.callApi("GET", "savant_energy/scenes") as SceneListResponse;
    if (resp?.scenes) {
      return resp.scenes.map(s => ({ id: s.scene_id, name: s.name }));
    }
    return [];
  }

  async fetchSceneBreakers(sceneId: string): Promise<Record<string, boolean>> {
    const resp = await this.hass.callApi("GET", `savant_energy/scene_breakers/${sceneId}`) as any;
    if (resp?.breakers && typeof resp.breakers === 'object') {
      return { ...resp.breakers };
    }
    return {};
  }

  async createScene(name: string, relayStates: Record<string, boolean>): Promise<void> {
    await this.hass.callApi("POST", "savant_energy/scenes", { name, relay_states: relayStates });
  }

  async updateScene(sceneId: string, name: string, relayStates: Record<string, boolean>): Promise<void> {
    await this.hass.callApi("POST", `savant_energy/scenes/${sceneId}`, { name, relay_states: relayStates });
  }

  async deleteScene(sceneId: string): Promise<void> {
    await this.hass.callApi("DELETE", `savant_energy/scenes/${sceneId}`);
  }
}
```

## Task 1C: Energy Calculator (`src/data/scene-energy-calculator.ts`) — NEW FILE

Pure computation functions. No side effects. Takes BreakerStatistics (already imported from types/statistics.ts) and returns derived metrics.

```typescript
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
    if (!relayStates[entityId]) continue; // breaker is OFF in this scene
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
```

## Task 1D: Config Changes

### `src/types/config.ts` — ADD before the file's `export type` lines

Add this interface:
```typescript
export interface ScenesConfig {
  enabled: boolean;
  battery_capacity_kwh?: number;
}
```

Add to `SavantBreakerBoardConfig`:
```typescript
scenes: ScenesConfig;
```

Add to `PartialSavantBreakerBoardConfig` wrapper (it should auto-inherit via Partial/Omit, but add explicitly if needed).

### `src/config/defaults.ts` — ADD to DEFAULT_CONFIG

```typescript
scenes: {
  enabled: true,
  battery_capacity_kwh: undefined,
},
```

### `src/config/normalize-config.ts` — ADD normalization

Read this file first to follow its pattern. Add a function to normalize scenes config:
```typescript
function normalizeScenes(scenes: unknown): ScenesConfig {
  if (!scenes || typeof scenes !== "object") return { enabled: true };
  const raw = scenes as Record<string, unknown>;
  return {
    enabled: raw.enabled !== false,
    battery_capacity_kwh:
      typeof raw.battery_capacity_kwh === "number" && raw.battery_capacity_kwh > 0
        ? raw.battery_capacity_kwh
        : undefined,
  };
}
```
Call it in the main normalizeConfig function and assign to the result.

### `src/config/config-diff.ts` — ADD diff support

Read this file first. Add scenes to the diff function if it uses a pattern that requires it (likely not needed if it just uses spread/compare, but check).
