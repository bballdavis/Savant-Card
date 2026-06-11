# Implementation Spec: Scene Dialog

## Context
Part of scene integration for Savant-Card. The main modal overlay component that manages scene list and editor views. Renders inside `ha-card` as an absolutely-positioned overlay.

## File: `src/components/scene-dialog.ts` — NEW

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `hass` | HomeAssistant | required | HA instance |
| `breakers` | DiscoveredBreaker[] | `[]` | Card's discovered breakers (for matching entity_id → name) |
| `stats` | Map<string, BreakerStatistics> | `new Map()` | From the main card's StatisticsManager |
| `batteryCapacityKwh` | number \| undefined | `undefined` | From card config |
| `open` | boolean | `false` | Whether the dialog is visible |
| `stacked` | boolean | `false` | Passed from card's stacked state for responsive layout |

### Events

| Event | Detail | When |
|---|---|---|
| `savant-scene-close` | `{}` | User clicks close/backdrop or presses Escape |

### State Machine

```
State: 'closed'
  → open=true → fetch scenes via SceneService → State: 'list'

State: 'list'
  → user clicks scene row → fetch scene breakers → State: 'editor'
  → user types name + clicks create → create scene → fetch breakers for new scene → State: 'editor'
  → user clicks delete → confirm → delete scene → refresh list → State: 'list'
  → user clicks close → State: 'closed'

State: 'editor'
  → user toggles breaker → update local relayStates → recompute footer → stay in 'editor'
  → user changes name input → update local name → stay in 'editor'
  → user clicks save → update scene via API → State: 'list'
  → user clicks back → State: 'list'
```

### Internal State

```
@state() private view: "list" | "editor" = "list";
@state() private scenes: Scene[] = [];
@state() private selectedSceneId: string = "";
@state() private selectedSceneName: string = "";
@state() private relayStates: Record<string, boolean> = {};
@state() private newSceneName: string = "";
@state() private loadingScenes: boolean = false;
@state() private saving: boolean = false;
@state() private errorMessage: string = "";
```

### Visual Layout: List View

```
┌──────────────────────────────────┐
│ Scenes                     [✕]   │  ← header row
├──────────────────────────────────┤
│ (if no scenes)                   │
│   No scenes yet. Create one      │
│   below.                         │
│                                  │
│ (if scenes exist)                │
│ ┌─ Scene Name 1 ────────── [🗑] ┐│  ← scene rows
│ ├─ Scene Name 2 ────────── [🗑] ┤│
│ ├─ Scene Name 3 ────────── [🗑] ┤│
│ └─────────────────────────────── ┘│
├──────────────────────────────────┤
│ ════════════════════════════════ │  ← separator
│ [____________________________]  │  ← input for new scene name
│ [+ Create Scene]                │  ← button, disabled if empty
└──────────────────────────────────┘
```

Scene rows in list view:
- Each is a `<button>` covering the full row
- Left: scene name (truncated)
- Right: trash icon button (stops propagation so clicking delete doesn't navigate)
- Clicking the name area → open editor for that scene
- Clicking trash → delete with confirmation

### Visual Layout: Editor View

```
┌──────────────────────────────────┐
│ ← Back           [✕]             │  ← header with back button
├──────────────────────────────────┤
│ Scene Name                       │  ← title
│ [________________]  [Save]       │  ← name input + save button
├──────────────────────────────────┤
│ Breakers                         │
│                                  │
│ <savant-scene-breaker-row>       │  ← one per breaker
│ <savant-scene-breaker-row>       │
│ <savant-scene-breaker-row>       │
│ ...                              │
│                                  │
├──────────────────────────────────┤
│ ════════════════════════════════ │
│ ON: 2 / 8 breakers               │  ← footer summary
│ Scene load: 1.7 kW avg           │
│ → 17.5 kWh/wk                    │
│ → 1.5%/h battery drain           │
└──────────────────────────────────┘
```

### Responsive Behavior

When `stacked=true` (mobile, narrow width):
- Dialog fills the entire `ha-card` area (position: absolute, inset: 0)
- No backdrop (full-screen experience)
- Scene rows in single column

When `stacked=false` (desktop, wide width):
- Centered panel with dark backdrop
- Max-width: 520px
- Centered horizontally and vertically within the card
- Backdrop click closes dialog

### Logic Details

**Opening (open=true):**
1. Set loadingScenes = true
2. Create SceneService from this.hass
3. Call fetchScenes()
4. Set view = "list", scenes = result, loadingScenes = false

**Scene click → editor:**
1. Set selectedSceneId, loadingScenes = true
2. Call fetchSceneBreakers(sceneId)
3. Set relayStates = result, selectedSceneName = scene name
4. Set view = "editor", loadingScenes = false

**Create scene:**
1. Validate name is non-empty
2. Create SceneService, call createScene(name, current_relay_states or {})
3. Fetch updated scenes list
4. Auto-open the new scene in editor (find it by name)
5. Clear newSceneName input

**Delete scene:**
1. Show confirmation (window.confirm is fine for v1)
2. If confirmed, call deleteScene(sceneId)
3. If the deleted scene was selectedSceneId, reset selected
4. Refresh scenes list

**Toggle breaker (editor view):**
1. Fired from scene-breaker-row's `savant-scene-toggle` event
2. Update this.relayStates: flip the entityId's value
3. Footer recomputes automatically via derived computation

**Save editor:**
1. Validate selectedSceneId and name
2. Set saving = true
3. Call updateScene(selectedSceneId, selectedSceneName, relayStates)
4. Refresh scenes list
5. Set view = "list", saving = false

**Back button:**
- Save current state (no auto-save), just go back to list with refreshed scenes

**Close:**
1. Fire `savant-scene-close` event
2. Parent (BreakerBoardCard) sets open=false which hides the dialog

### Breaker Filtering / Matching

The REST API's `scene_breakers` endpoint returns `{ entity_id: bool }` for ALL available breakers. We need to match these against the card's `DiscoveredBreaker[]` to show friendly names and stats.

```typescript
// Build a list of scene breaker rows by matching entity_id
get breakerRows(): Array<{
  entityId: string;
  name: string;
  isOn: boolean;
  averageWatts?: number;
  controllable: boolean;
}> {
  const breakerEntities = Object.keys(this.relayStates);
  return breakerEntities.map(entityId => {
    const breaker = this.breakers.find(b => 
      b.entities.switch === entityId || b.entities.power === entityId
    );
    const stats = breaker?.entities.power 
      ? this.stats.get(breaker.entities.power) 
      : undefined;
    return {
      entityId,
      name: breaker?.name ?? entityId,
      isOn: this.relayStates[entityId] ?? false,
      averageWatts: stats?.averageWatts,
      controllable: breaker?.controllable ?? false,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}
```

### Footer Computation

Import `computeSceneFooter` from `scene-energy-calculator.ts`. Create a computed getter:

```typescript
get footer(): SceneFooterSummary {
  const statsMap = new Map<string, BreakerStatistics | undefined>();
  for (const entityId of Object.keys(this.relayStates)) {
    const breaker = this.breakers.find(b => 
      b.entities.switch === entityId || b.entities.power === entityId
    );
    const powerEntity = breaker?.entities.power;
    if (powerEntity) {
      statsMap.set(entityId, this.stats.get(powerEntity));
    }
  }
  return computeSceneFooter(this.relayStates, statsMap, this.batteryCapacityKwh);
}
```

### Styles

Import shared styles. The dialog uses:
- Position: absolute, inset: 0 for mobile (stacked)
- Position: fixed (or absolute) centered for desktop
- z-index: 10 (above card content)
- Backdrop: position: fixed, inset: 0, background: rgba(0,0,0,0.5)
- Panel: same card background/tokens as ha-card
- Scrollable breaker list (overflow-y: auto, max-height for desktop)
- Separator: thin border using `var(--savant-border)`
- All interactive elements: same font family, consistent border-radius
- Back button: style like a link/icon, not a full button
- Close button: same as chip-tool but smaller (just "✕" or X icon)

### Error Handling

1. API errors: catch in each async method, set `errorMessage`, show in a toast or inline error area
2. Loading state: show spinner or skeleton text while fetching
3. Empty state: friendly message when no scenes exist yet
4. Network failure: show error with retry option
