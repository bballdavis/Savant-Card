# Scene Dialog Redesign — Visual Language & Page Architecture

## Core Problem
The current scene dialog renders as a transparent overlay on top of the breaker chips, making content hard to read. The breaker rows don't match the visual language of the actual breaker tiles (no gradient, no shadow, no tile structure). The "Create Scene" input is at the bottom, not the top.

## Solution: Page-Based Navigation

Instead of an overlay, clicking the scenes icon **replaces the card content** with the scenes page. The header stays visible.

```
┌──────────────────────────────────┐
│  SAVANT              [🔍][⇅][■] │  ← header stays, scenes btn is active
├──────────────────────────────────┤
│                                  │
│  [Scenes content — list/editor]  │  ← replaces breaker grid area
│                                  │
│                                  │
└──────────────────────────────────┘
```

### How it works in the card

The main card gets a `@state() private activePage: "breakers" | "scenes" = "breakers"` instead of `sceneOpen`. The render method switches between `renderBreakers()` and `renderScenesPage()` based on `activePage`. The scenes button in the toolbar gets an `.active` class when `activePage === "scenes"`.

Clicking the scenes button toggles: `activePage = activePage === "scenes" ? "breakers" : "scenes"`.

The `<savant-scene-dialog>` component is no longer a dialog/overlay — it becomes `<savant-scenes-page>` that renders inline as a page. It receives the same properties but takes up the full content area.

## Visual Language: Scene Breaker Rows → Mini Tiles

Each breaker row in the scene editor should look like a **stacked breaker tile** — same visual language, just smaller:

```
┌──────────────────────────────────────────┐
│ │ Kitchen Lights            ● ON     1.2kW│  ← gradient bg, shadow, rounded
│ │  1.2 kW avg · 0.12 kWh/h              │  ← stats below
│ │  2.0 kWh/wk                           │
└──────────────────────────────────────────┘
```

### Tile styling (matching breaker-tile.ts):

```
background:
  linear-gradient(
    180deg,
    color-mix(in srgb, var(--savant-tile-bg-strong) 60%, var(--savant-surface-tint)),
    var(--savant-tile-bg)
  );
box-shadow: var(--savant-shadow-sm);
border: 1px solid var(--savant-border);
border-radius: var(--savant-radius);
```

### Status bar (matching `.mobile-bar` in breaker-tile stacked):
```
width: 7px;
border-radius: 999px;
background: var(--status-color);
// ON: var(--savant-success)
// OFF: var(--savant-disabled)
```

### ON/OFF badge:
Keep the pill badge — ON: green bg white text, OFF: gray bg muted text.

### Name text (matching breaker-tile):
```
font-size: 16px (or 15px for rows)
font-weight: 500
text-shadow: var(--savant-text-halo)
-webkit-text-stroke: 4px var(--savant-text-outline-color)
paint-order: stroke fill
```

### Stats text:
```
font-size: 12px
color: var(--savant-muted)
```

## Scene List View Redesign

### Scene list rows — also mini tiles:

Each saved scene in the list view gets the same tile styling: gradient background, shadow, rounded corners. Tap to open in editor.

```
┌──────────────────────────────────────────┐
│ │ Evening Mode                     [🗑]  │  ← gradient bg, shadow
│ │  4 breakers · 1.7 kW avg              │  ← summary info
└──────────────────────────────────────────┘
```

### Create scene input — at the TOP:

The input and create button move to the top of the list view, right below the header:

```
┌──────────────────────────────────┐
│ Scenes                    [←]    │  ← header with back-to-breakers
├──────────────────────────────────┤
│ [____________________________]   │  ← input + create at top
│ [+ Create Scene]                 │
├──────────────────────────────────┤
│ ┌─ Evening Mode ────────── [🗑] ┐│
│ ├─ Morning Mode ────────── [🗑] ┤│
│ ├─ Away Mode ──────────── [🗑] ┤│
│ └───────────────────────────────┘│
└──────────────────────────────────┘
```

The back button (←) replaces the close button since this is now a page, not a modal.

## Editor View Redesign

```
┌──────────────────────────────────┐
│ ← Scenes    Edit Scene     [🗑]  │  ← header: back, title, delete scene
├──────────────────────────────────┤
│ [Scene name input]      [Save]   │  ← name editor
├──────────────────────────────────┤
│ Breakers:                        │
│ ┌──────────────────────────────┐ │
│ │ │ Kitchen Lights     ● ON    │ │  ← mini tile rows
│ │ │  1.2 kW avg · 0.12 kWh/h  │ │
│ │ │  2.0 kWh/wk                │ │
│ ├──────────────────────────────┤ │
│ │ │ Living Room        ○ OFF   │ │
│ ├──────────────────────────────┤ │
│ │ │ Outdoor Lights     ● ON    │ │
│ │ │  0.5 kW avg · 0.05 kWh/h  │ │
│ │ │  0.8 kWh/wk                │ │
│ └──────────────────────────────┘ │
├──────────────────────────────────┤
│ ═══════════════════════════════  │
│ ON: 2 / 8 breakers               │
│ Scene load: 1.7 kW avg           │
│ → 17.5 kWh/wk · 1.5%/h battery  │
└──────────────────────────────────┘
```

The delete button moves to the header (trash icon, always visible in editor view), not hidden in the scene list. This is more intuitive — you're editing a scene, deletion is an editor action.

## Light/Dark Mode

The existing card already handles light/dark through Home Assistant's theme CSS variables:
- `--primary-text-color` / `--secondary-text-color`
- `--ha-card-background` / `--card-background-color`
- `--primary-background-color`
- `--divider-color`
- `--success-color` / `--warning-color` / `--error-color` / `--disabled-text-color`

And the Savant-specific tokens in `shared-styles.ts` use `color-mix` on these, which automatically adapts. No changes needed — we just need to make sure all our components consistently use these tokens.

The only risk is CSS `rgba(0,0,0,0.5)` hardcoded values — replace with color-mix:
```
Instead of: background: rgba(0, 0, 0, 0.5);
Use:        background: color-mix(in srgb, var(--savant-app-bg) 50%, black);
```

## Summary of Changes

### Files to modify:

| File | Changes |
|---|---|
| `src/components/scene-dialog.ts` | **Rename to scene-page.ts**. Replace overlay with inline page layout. Redesign rows as mini tiles. Move create input to top. Move delete to editor header. |
| `src/components/scene-breaker-row.ts` | Add gradient background, shadow, tile styling. Match breaker-tile visual language exactly. |
| `src/card/savant-energy-breaker-board-card.ts` | Replace `sceneOpen` boolean with `activePage: "breakers" \| "scenes"`. Toggle active page instead of show/hide dialog. Add `.active` class to scenes toolbar button. |

### Files to create:
| File | From | Change |
|---|---|---|
| `src/components/scene-page.ts` | Rename from scene-dialog.ts | Remove overlay/backdrop. Add page-based layout. Fix create input position. |
| (keep `scene-dialog.ts` for now if you want the rename in a separate commit, or delete) |

Actually, simpler approach: just modify the existing files heavily rather than renaming. The `<savant-scene-dialog>` element becomes an inline page. Rename is unnecessary churn.

### Implementation Order:
1. Update `scene-breaker-row.ts` — tile styling (gradient, shadow, status bar)
2. Update `scene-dialog.ts` — remove overlay/backdrop, page layout, create input at top
3. Update main card — replace `sceneOpen` with `activePage`, add `page` attribute for active state
