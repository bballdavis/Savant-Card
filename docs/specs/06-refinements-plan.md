# Scene Dialog Refinements — Implementation Plan

## Changes

### 1. Search Context-Switching
**Files:** `src/card/savant-energy-breaker-board-card.ts`, `src/components/scene-dialog.ts`

The search bar in the header currently filters breakers. When on the scenes page, it should filter the scene list instead.

- Pass `searchQuery` property to `<savant-scene-dialog>`
- Scene dialog filters its scene list by `searchQuery` (name match) in list view
- In editor view, filter breaker rows by name
- Card's existing search mechanism stays — just the target switches

### 2. Delete Button Inside Chip
**Files:** `src/components/scene-dialog.ts`

Delete button is already in the scene tile but verify positioning. Keep the `window.confirm` safety check.

### 3. Mobile Toolbar Reorder
**Files:** `src/card/savant-energy-breaker-board-card.ts`

Move the compact/normal view button to the far left in `board-tools` when stacked:
```
[Mobile toggle] [Search] [Sort] [Scenes]
```
Currently the mobile toggle is rendered after sort. Move it before search in the DOM order.

### 4. Breaker Row Compactness + Stats Simplification
**Files:** `src/components/scene-breaker-row.ts`

- Combine stats to ONE line: `X.XX kWh/h  ·  X.X%/h battery`
- Remove "X W avg" (redundant — kWh/h is avg watts/1000, same info)
- Remove weekly kWh ("not super helpful")
- Keep battery %/h only if batteryCapacityKwh configured
- Reduce vertical padding (12px → 8px top/bottom, or tighter)
- Reduce gap between name and stats line

### 5. Desktop Columns for Breaker List
**Files:** `src/components/scene-dialog.ts`

Change breaker list from a single-column flex to a CSS grid:
```css
.breaker-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 6px;
}
```
- 3 columns on wide desktop (>840px)
- 2 columns on medium (560-840px)
- 1 column on mobile/stacked (<560px)

### 6. Scene Budget Chip
**Files:** `src/components/scene-dialog.ts`

In the editor header, after the scene name, add a small chip showing:
```
Budget: 1.7 kWh/h · 1.5%/h
```

Styled as a pill/badge with:
- `background: var(--savant-tile-bg)`
- `border: 1px solid var(--savant-border)`
- Small font, muted color
- Right side of the name, before the header actions

### 7. Name Editing Toggle
**Files:** `src/components/scene-dialog.ts`

The scene name is displayed as text by default, not an input field. Next to it:
- A small pencil/edit icon button
- Clicking the edit icon replaces the text with an input field
- The edit state toggles: `@state() private editingName = false`
- Save button becomes a save icon (floppy disk SVG) instead of text "Save"

In the editor header:
```
← Scenes  |  Evening Mode  [✏️]  [💰 Budget Chip]  [💾]
```

## Implementation Order

1. **Task 1:** Breaker row compactness + stats simplification (`scene-breaker-row.ts`)
2. **Task 2:** Scene dialog changes — budget chip, name editing, save icon, desktop grid, search filtering (`scene-dialog.ts`)
3. **Task 3:** Card changes — search context-switch, mobile toolbar reorder (`savant-energy-breaker-board-card.ts`)
