# Scene Integration Plan — Savant-Card

## Overview
Integrate scene management (list/create/edit/delete scenes with breaker relay toggles) into the Savant Energy Breaker Board Card as a modal overlay triggered from the header toolbar. The editor surfaces **historical energy data** and **battery impact estimates** so users can make informed decisions when building scenes.

## Smart Data Layer

Every breaker row in the scene editor shows derived metrics from data the card already fetches. No extra API calls — `StatisticsManager` already loads `averageWatts` from `recorder/statistics_during_period`.

### Computed Metrics per Breaker Row

| Metric | Formula | Example (500W avg) |
|---|---|---|
| Avg hourly energy | `averageWatts / 1000` | 0.50 kWh/h |
| Est weekly energy | `avg_hourly_kwh × 168` | 84 kWh/week |
| Battery drain rate | `avg_hourly_kwh / battery_capacity_kwh × 100` | 3.7%/hour |
| Cost estimate (future) | `avg_hourly_kwh × rate/kWh` | $0.07/h |

### Editor Footer Summary

```
─────────────────────────────────
ON: 4 / 8 breakers
Scene load: 2.1 kW avg  →  0.21 kWh/h  →  1.6%/h of battery
Weekly: 35.3 kWh
─────────────────────────────────
```

The user can toggle breakers on/off and watch the footer update in real-time, showing exactly how much battery a scene would consume.

### Battery Size Config

```typescript
scenes: {
  enabled: true,
  battery_capacity_kwh: 13.5,  // defaults to common size
}
```

The battery drain display gracefully hides if `battery_capacity_kwh` is unset.

### Data Flow

```
BreakerBoardCard.loadStatistics()
  → StatisticsManager.getStatistics(entityId, period="7d")
    → hass.connection.sendMessagePromise({ type: "recorder/statistics_during_period" })
    → caches BreakerStatistics { averageWatts, maximumWatts, points[] }

SceneDialog opens
  → reads cached statistics from the same StatisticsManager
  → computes per-breaker metrics (kWh, battery %)
  → updates footer on every toggle
```

The statistics are already cached from the main view — when the user opens the scene editor, the numbers appear instantly.

### What Happens When Stats Aren't Loaded Yet

If the scene editor opens before the main card finishes loading statistics, the dialog shows a light loading state per breaker. As stats arrive, rows populate. The dialog subscribes to the same stats refresh flow the main card uses.

## REST API (already exists in HASS-Savant-Energy integration)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/savant_energy/scenes` | List all scenes `{scenes: [{scene_id, name}]}` |
| `POST` | `/api/savant_energy/scenes` | Create scene `{name, relay_states}` |
| `GET` | `/api/savant_energy/scene_breakers/{scene_id}` | Get breakers + relay states for scene `{breakers: {entity_id: bool}}` |
| `POST` | `/api/savant_energy/scenes/{scene_id}` | Update scene `{name, relay_states}` |
| `DELETE` | `/api/savant_energy/scenes/{scene_id}` | Delete scene |

All calls via `hass.callApi(method, path, body?)`.

## New Files to Create

| File | Purpose |
|---|---|
| `src/types/scene.ts` | TypeScript types for Scene, SceneBreakerState, SceneEnergyMetrics |
| `src/data/scene-service.ts` | REST API wrapper for all scene operations |
| `src/data/scene-energy-calculator.ts` | Computes kWh, battery %, weekly totals from stats + relay states |
| `src/components/scene-dialog.ts` | Main dialog component — two views (list + editor) with stats |
| `src/components/scene-breaker-row.ts` | Single breaker row with whole-row toggle + energy stats |
| `src/components/scene-dialog-styles.ts` | Shared styles for scene dialog components |

## Files to Modify

| File | Change |
|---|---|
| `src/card/savant-energy-breaker-board-card.ts` | Add scenes icon button to header toolbar, manage dialog open/close, pass StatisticsManager reference |
| `src/types/config.ts` | Add `ScenesConfig` with `enabled` and `battery_capacity_kwh` |
| `src/config/defaults.ts` | Add default scenes config |
| `src/config/normalize-config.ts` | Normalize scenes config |
| `src/config/config-diff.ts` | Diff scenes config |
| `src/styles/shared-styles.ts` | Add any shared scene dialog tokens |
| `src/index.ts` | Register any new custom element if needed (Lit auto-registers with @customElement) |

### Config Schema

```typescript
export interface ScenesConfig {
  enabled: boolean;
  battery_capacity_kwh?: number;
}

// In SavantBreakerBoardConfig:
scenes: ScenesConfig;
```

Default:
```typescript
scenes: {
  enabled: true,
  battery_capacity_kwh: undefined,  // off by default, user sets their battery size
}
```

## Visual Design

### Trigger Button
- Same `chip-tool` style as search/sort icons
- Layout icon (clapperboard / play-box outline) for scenes
- Sits in `board-tools` div alongside search/sort
- Click opens the scene dialog overlay

### Dialog / Modal Overlay
- Renders inside `ha-card` as an absolutely-positioned overlay
- Backdrop: `rgba(0, 0, 0, 0.5)`
- Panel: card-styled surface using `--savant-tile-bg`, `--savant-border`, `--savant-radius`
- **Mobile (stacked):** full-screen overlay (slides up)
- **Desktop (grid):** centered panel, max-width ~520px, with backdrop

### Two Views

**Scene List View (default):**
```
┌──────────────────────────────────┐
│ Scenes                     [✕]   │
├──────────────────────────────────┤
│ [Scene Name 1]              [🗑]  │  ← click scene → editor
│ [Scene Name 2]              [🗑]  │
│ [Scene Name 3]              [🗑]  │
├──────────────────────────────────┤
│ ════════════════════════════════ │
│ [Create new scene...]   [+Add]   │
└──────────────────────────────────┘
```

**Scene Editor View:**
```
┌──────────────────────────────────┐
│ ← Back    Edit Scene      [✕]    │
│ [Scene name input]       [Save]  │
├──────────────────────────────────┤
│ Breakers:                        │
│                                  │
│ ┌─ Kitchen Lights ─── ● ON ──┐   │  ← whole-row toggle
│ │  1.2 kW avg · 0.12 kWh/h   │   │     stats shown below name
│ │  2.0 kWh/wk                 │   │
│ ├─────────────────────────────┤   │
│ │ ─ Living Room ─── ○ OFF ── │   │  ← gray/dim, no stats
│ ├─────────────────────────────┤   │
│ │ ─ Outdoor Lights ─ ● ON ── │   │
│ │  0.5 kW avg · 0.05 kWh/h   │   │
│ │  0.8 kWh/wk                 │   │
│ └─────────────────────────────┘   │
│                                  │
│ ════════════════════════════════ │
│   ON: 2 / 8 breakers             │
│   Scene load: 1.7 kW avg         │
│   → 17.5 kWh/wk · 1.5%/h bat    │
└──────────────────────────────────┘
```

### Breaker Row Design (whole-row toggle + smart stats)

**Structure:**
```
┌─────────────────────────────────┐
│ │ Kitchen Lights        ● ON   │  ← vertical status bar
│ │  1.2 kW avg · 0.12 kWh/h    │     (colored = on, gray = off)
│ │  2.0 kWh/wk                  │     whole row clickable
└─────────────────────────────────┘
```

- **Left:** status bar (8px wide, rounded, same as `mobile-bar` in breaker-tile)
- **Center:** name (truncated, text-shadow like tiles), then stats line (smaller, muted)
- **Right:** ON/OFF badge (pill, green or gray)
- **Entire row is clickable** — no tiny switch to aim at
- **ON state:** subtle green tint on background, green status bar, green badge
- **OFF state:** gray/dim, gray status bar, gray badge — no stats shown (they're off)
- **Hover:** slight brightness shift
- **Transition:** all state changes animate smoothly (200ms)

### Footer Summary
- Shows only the filtered totals for ON breakers
- Battery line only appears if `battery_capacity_kwh` is configured
- Updates live as toggles change (optimistic + real-time derived)

## Implementation Order

1. **Types** (`scene.ts`) — Scene, SceneBreakerState, SceneEnergyMetrics interfaces
2. **Scene service** (`scene-service.ts`) — REST API wrapper
3. **Scene energy calculator** (`scene-energy-calculator.ts`) — computes kWh/battery from stats
4. **Scene breaker row** (`scene-breaker-row.ts`) — the toggle row with smart stats
5. **Scene dialog** (`scene-dialog.ts`) — modal with list + editor views, footer summary
6. **Wire into card** — add button to header, add dialog, pass StatisticsManager
7. **Config** — add ScenesConfig to types/defaults/normalize/diff/config-form
8. **Tests** — service tests, energy calculator tests, component tests

## Component State Machines

### SceneDialog
```
State: 'closed'
  → user clicks scenes button
  → fetch scenes + ensure stats loaded
  → State: 'list'

State: 'list'
  → user clicks scene row
  → fetch scene breakers
  → State: 'editor' (with sceneId)

  → user clicks create
  → create scene via API
  → fetch scene breakers for new scene
  → State: 'editor' (with new sceneId)

  → user clicks delete (with confirm)
  → delete scene via API
  → refresh list
  → State: 'list'

  → user clicks close
  → State: 'closed'

State: 'editor'
  → user toggles breaker
  → update local relayStates optimistically
  → recompute footer totals
  → stay in 'editor'

  → user clicks save
  → update scene via API
  → State: 'list' (refreshed)

  → user clicks back
  → State: 'list' (refreshed)
```

### SceneBreakerRow (controlled component)
```
Properties:
  name: string
  isOn: boolean
  averageWatts?: number     // from StatisticsManager
  batteryCapacityKwh?: number // from config

Events:
  @toggle → { entityId, newState }
```

## Risks & Considerations

1. **hass.callApi** — HA is deprecating this in favor of `callWS` / fetch. The existing integration REST API works fine with it; we match the existing scenes card pattern.

2. **Breaker discovery** — The REST API's `scene_breakers` endpoint returns ALL available breakers with states. We match by `entity_id` from the scene's `relay_states` against the card's discovered breaker list to show rich names and stats.

3. **Statistics timeframe** — Use `7d` period for most stable average (covers full week cycles). The card already supports this period.

4. **Optimistic toggle + math** — When the user toggles a breaker, the footer updates instantly based on the optimistic new state. No API delay for the math.

5. **Scenes loaded from card's breaker list** — The scene editor shows only breakers that the card has discovered (matching by entity_id). This ensures names, areas, and stats are consistent with the main view.

6. **Persistence** — Scene data lives in the HA integration's JSON storage. Always re-fetch scenes list after mutations.
