# Implementation Spec: Scene Breaker Row

## Context
Part of scene integration for Savant-Card. A reusable LitElement component that renders a single breaker row in the scene editor. Used by SceneDialog.

## File: `src/components/scene-breaker-row.ts` — NEW

This is a **controlled component** — it receives all state via properties and emits events for toggles. No internal API calls.

### Props/Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | string (property) | `""` | Breaker display name |
| `entityId` | string (property) | `""` | Entity ID for toggle events |
| `isOn` | boolean (property) | `false` | Whether this breaker is ON in the scene |
| `averageWatts` | number \| undefined | `undefined` | Average power draw from StatisticsManager |
| `batteryCapacityKwh` | number \| undefined | `undefined` | From card config |
| `loading` | boolean (property) | `false` | Show skeleton state if stats not loaded |

### Events

| Event Name | Detail | When |
|---|---|---|
| `savant-scene-toggle` | `{ entityId: string, newState: boolean }` | User clicks the row |

### Visual Layout

```
┌───────────────────────────────────┐
│ │ Kitchen Lights          ● ON    │
│ │  1.2 kW avg · 0.12 kWh/h       │
│ │  2.0 kWh/wk                    │
└───────────────────────────────────┘
```

**Structure (top to bottom):**
1. A `<button>` wrapping the whole row (clickable)
2. Inside: a flex layout with:
   - Left: 8px vertical status bar (`mobile-bar` style)
   - Middle: name (truncated, bold) + stats line (smaller, muted, below)
   - Right: ON/OFF badge (rounded pill)

**Visual states:**

**ON state:**
- Background: subtle green tint (`color-mix(in srgb, var(--savant-tile-bg) 90%, var(--savant-success))`)
- Status bar: `var(--savant-success)` (green)
- Badge: green background, white text "ON"
- Stats shown: "1.2 kW avg · 0.12 kWh/h" + "2.0 kWh/wk"

**OFF state:**
- Background: transparent (normal tile bg)
- Status bar: `var(--savant-disabled)` (gray)
- Badge: gray background, dim text "OFF"
- Stats hidden: only name shown

**Loading state:**
- If `loading=true` and stats not yet available for an ON breaker, show subtle skeleton shimmer on the stats line
- If `loading=false` and no stats, show "No data" in muted text

**Disabled state:**
- If the breaker is not controllable (no switch entity), show a lock icon and don't allow toggle
- Background: slightly more dim
- Cursor: not-allowed

### CSS Design Tokens Used
- `--savant-tile-bg` — row background
- `--savant-border` — row border
- `--savant-radius` — row border-radius
- `--savant-success` — green (ON)
- `--savant-disabled` — gray (OFF)
- `--savant-tile-fg` — text color
- `--savant-muted` — secondary text
- `--primary-text-color` — fallback text

Use the same `mobile-bar` pattern as `breaker-tile.ts`: 8px rounded vertical bar, colored by state.

### Edge Cases
1. No stats data available (avgWatts undefined) → show "No data" in muted text
2. Very long breaker name → truncate with ellipsis, max-width with overflow hidden
3. Rapid clicking → fire event every click, parent handles debounce
4. Zero watts (breaker is on but draws 0W) → show "0 W avg" instead of hiding
5. Unavailable breaker → show as OFF with "(unavailable)" note in muted text

### Interaction
- Click anywhere on the row → fire `savant-scene-toggle`
- The parent (SceneDialog) handles the actual state change and recomputes footer
- Cursor: pointer (unless disabled)
- Transition: background-color 200ms ease, border-color 200ms ease

### Note on component registration
Use `@customElement("savant-scene-breaker-row")` — Lit auto-registers.
