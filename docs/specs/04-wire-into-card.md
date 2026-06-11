# Implementation Spec: Wire Into Main Card

## Context
Modify the existing `savant-energy-breaker-board-card.ts` to add the scenes button to the header toolbar and manage the scene dialog lifecycle.

## File to Modify: `src/card/savant-energy-breaker-board-card.ts`

### Changes Needed

**1. Import the new components at the top:**
```typescript
import "../components/scene-dialog";
import type { ScenesConfig } from "../types/scene";
```

**2. Add new state properties to the class:**
```typescript
@state() private sceneOpen = false;
```

**3. Add a computed getter for scenes config:**
```typescript
private get scenesConfig(): ScenesConfig {
  return (this.config as any).scenes ?? { enabled: true };
}
```

**4. Add scenes button to renderHeader(), in board-tools div:**

After the mobile view toggle button (or after sort button if stacked), add:
```typescript
${this.scenesConfig.enabled !== false
  ? html`<div class="tool-wrap">
      <button
        class="chip-tool scene-tool"
        type="button"
        @click=${this.openSceneDialog}
        aria-label="Scenes"
      >
        <savant-icon icon="layout_dashboard" aria-hidden="true"></savant-icon>
        <span class="sr-only">Scenes</span>
      </button>
    </div>`
  : nothing}
```

**5. Add scene dialog to render() output:**

At the end of the ha-card content, after the breakers/empty/error block:
```typescript
${this.renderSceneDialog()}
```

Add the render method:
```typescript
private renderSceneDialog() {
  if (!this.sceneOpen) return nothing;
  return html`
    <savant-scene-dialog
      .hass=${this.hass}
      .breakers=${this.breakers}
      .stats=${this.stats}
      .batteryCapacityKwh=${this.scenesConfig.battery_capacity_kwh}
      .open=${this.sceneOpen}
      .stacked=${this.stacked}
      @savant-scene-close=${this.closeSceneDialog}
    ></savant-scene-dialog>
  `;
}
```

**6. Add open/close handlers:**
```typescript
private openSceneDialog = (event: Event): void => {
  event.stopPropagation();
  this.sceneOpen = true;
};

private closeSceneDialog = (): void => {
  this.sceneOpen = false;
};
```

**7. Add Escape key handler to close dialog:**

Override `keydown` or add a document-level listener:
```typescript
private handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && this.sceneOpen) {
    this.sceneOpen = false;
  }
};
```

In `connectedCallback`:
```typescript
public override connectedCallback(): void {
  super.connectedCallback();
  document.addEventListener("keydown", this.handleKeyDown);
}
```

In `disconnectedCallback`:
```typescript
public override disconnectedCallback(): void {
  super.disconnectedCallback();
  document.removeEventListener("keydown", this.handleKeyDown);
  // existing cleanup...
}
```

**8. Add icon to savant-icon.ts:**

In `ICONS` map, add:
```typescript
layout_dashboard:
  "M4 3h7v7H4V3m0 11h7v7H4v-7m9-11h7v7h-7V3m0 11h7v7h-7v-7Z",
```

This is a 4-panel grid icon that hints at "scenes" / dashboards.

### Integration Notes

- The scene dialog renders **inside ha-card** as an absolutely-positioned overlay
- When sceneOpen is true, the dialog covers the card content
- The dialog has its own z-index (10) within the card
- The backdrop prevents interaction with breakers underneath
- StatisticsManager data is passed via `this.stats` — already fetched by `loadStatistics()`
- Opening the dialog doesn't trigger any new API calls for stats (they're cached)
- The dialog fetches its own scene data from the REST API on open
