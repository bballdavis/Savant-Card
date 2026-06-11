import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { HomeAssistant } from "../types/home-assistant";
import type { DiscoveredBreaker } from "../types/breaker";
import type { BreakerStatistics } from "../types/statistics";
import type { Scene, SceneFooterSummary } from "../types/scene";
import { SceneService } from "../data/scene-service";
import {
  computeSceneFooter,
  formatKwh,
  formatBatteryPercent,
} from "../data/scene-energy-calculator";
import { sharedStyles } from "../styles/shared-styles";
import "./scene-breaker-row";

@customElement("savant-scene-dialog")
export class SavantSceneDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) breakers: DiscoveredBreaker[] = [];
  @property({ attribute: false }) stats: Map<string, BreakerStatistics> = new Map();
  @property({ type: Number }) batteryCapacityKwh?: number;
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private view: "list" | "editor" = "list";
  @state() private scenes: Scene[] = [];
  @state() private selectedSceneId = "";
  @state() private selectedSceneName = "";
  @state() private relayStates: Record<string, boolean> = {};
  @state() private newSceneName = "";
  @state() private loading = false;
  @state() private saving = false;
  @state() private editingName = false;
  @state() private errorMessage = "";
  @property({ type: String }) searchQuery = "";

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has("open") && this.open) {
      void this.openDialog();
    }
  }

  private async openDialog(): Promise<void> {
    this.loading = true;
    this.errorMessage = "";
    this.view = "list";
    this.selectedSceneId = "";
    this.selectedSceneName = "";
    this.relayStates = {};
    this.newSceneName = "";
    try {
      const service = new SceneService(this.hass!);
      this.scenes = await service.fetchScenes();
    } catch {
      this.errorMessage = "Failed to load scenes.";
    } finally {
      this.loading = false;
    }
  }

  private async openEditor(sceneId: string): Promise<void> {
    this.selectedSceneId = sceneId;
    this.loading = true;
    this.errorMessage = "";
    const scene = this.scenes.find((s) => s.id === sceneId);
    this.selectedSceneName = scene?.name ?? "";
    try {
      const service = new SceneService(this.hass!);
      this.relayStates = await service.fetchSceneBreakers(sceneId);
      this.view = "editor";
    } catch {
      this.errorMessage = "Failed to load scene breakers.";
    } finally {
      this.loading = false;
    }
  }

  private async createScene(): Promise<void> {
    const name = this.newSceneName.trim();
    if (!name) return;
    this.errorMessage = "";
    try {
      const service = new SceneService(this.hass!);
      await service.createScene(name, {});
      // Refresh the scenes list
      this.scenes = await service.fetchScenes();
      // Find the newly created scene by name
      const newScene = this.scenes.find((s) => s.name === name);
      if (newScene) {
        this.selectedSceneId = newScene.id;
        this.selectedSceneName = newScene.name;
        this.relayStates = await service.fetchSceneBreakers(newScene.id);
        this.view = "editor";
      }
      this.newSceneName = "";
    } catch {
      this.errorMessage = "Failed to create scene.";
    }
  }

  private async deleteScene(sceneId: string): Promise<void> {
    if (!window.confirm("Delete this scene?")) return;
    this.errorMessage = "";
    try {
      const service = new SceneService(this.hass!);
      await service.deleteScene(sceneId);
      if (this.selectedSceneId === sceneId) {
        this.selectedSceneId = "";
        this.selectedSceneName = "";
        this.relayStates = {};
        this.view = "list";
      }
      this.scenes = await service.fetchScenes();
    } catch {
      this.errorMessage = "Failed to delete scene.";
    }
  }

  private handleToggle(event: CustomEvent<{ entityId: string; newState: boolean }>): void {
    event.stopPropagation();
    this.relayStates = { ...this.relayStates, [event.detail.entityId]: event.detail.newState };
  }

  private async saveScene(): Promise<void> {
    if (!this.selectedSceneId || !this.selectedSceneName.trim()) return;
    this.saving = true;
    this.errorMessage = "";
    try {
      const service = new SceneService(this.hass!);
      await service.updateScene(this.selectedSceneId, this.selectedSceneName.trim(), this.relayStates);
      this.scenes = await service.fetchScenes();
      this.view = "list";
    } catch {
      this.errorMessage = "Failed to save scene.";
    } finally {
      this.saving = false;
    }
  }

  private async goBack(): Promise<void> {
    this.errorMessage = "";
    try {
      const service = new SceneService(this.hass!);
      this.scenes = await service.fetchScenes();
    } catch {
      // Silently refresh — error is non-critical for back navigation
    }
    this.view = "list";
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent("savant-scene-close", {}));
  }

  private onNewSceneNameInput(event: Event): void {
    this.newSceneName = (event.target as HTMLInputElement).value;
  }

  private onEditorNameInput(event: Event): void {
    this.selectedSceneName = (event.target as HTMLInputElement).value;
  }

  get filteredScenes(): Scene[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.scenes;
    return this.scenes.filter((s) => s.name.toLowerCase().includes(q));
  }

  get breakerRows() {
    const entityIds = Object.keys(this.relayStates);
    return entityIds
      .map((entityId) => {
        const breaker = this.breakers.find(
          (b) => b.entities.switch === entityId || b.entities.power === entityId,
        );
        const powerEntity = breaker?.entities.power;
        const stats = powerEntity ? this.stats.get(powerEntity) : undefined;
        return {
          entityId,
          name: breaker?.name ?? entityId,
          isOn: this.relayStates[entityId] ?? false,
          averageWatts: stats?.averageWatts,
          loading: stats?.loading ?? false,
          controllable: breaker?.controllable ?? false,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  get footer(): SceneFooterSummary {
    const statsMap = new Map<string, BreakerStatistics | undefined>();
    for (const entityId of Object.keys(this.relayStates)) {
      const breaker = this.breakers.find(
        (b) => b.entities.switch === entityId || b.entities.power === entityId,
      );
      const powerEntity = breaker?.entities.power;
      if (powerEntity) {
        statsMap.set(entityId, this.stats.get(powerEntity));
      }
    }
    return computeSceneFooter(this.relayStates, statsMap, this.batteryCapacityKwh);
  }

  protected override render() {
    if (!this.open) return nothing;
    return html`
      <div class="scenes-page">
        ${this.view === "list" ? this.renderList() : this.renderEditor()}
      </div>
    `;
  }

  private renderList() {
    return html`
      <div class="page-header">
        <span class="page-title">Scenes</span>
        <button class="chip-tool page-close" @click=${this.close} aria-label="Back to breakers">✕</button>
      </div>
      <div class="create-row">
        <input
          class="scene-input"
          type="text"
          placeholder="New scene name..."
          .value=${this.newSceneName}
          @input=${this.onNewSceneNameInput}
          @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.createScene()}
        />
        <button
          class="scene-action-btn create-btn"
          ?disabled=${!this.newSceneName.trim()}
          @click=${this.createScene}
        >+ Create</button>
      </div>

      ${this.loading
        ? html`<div class="page-loading">Loading scenes...</div>`
        : this.filteredScenes.length === 0
          ? html`<div class="page-empty"><p>No scenes yet. Create one above.</p></div>`
          : html`
              <div class="scene-list">
                ${this.filteredScenes.map(
                  (s) => html`
                    <div class="scene-tile" role="button" tabindex="0" @click=${() => this.openEditor(s.id)} @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.openEditor(s.id)}>
                      <span class="scene-tile-bar" aria-hidden="true"></span>
                      <span class="scene-tile-body">
                        <span class="scene-tile-name">${s.name}</span>
                      </span>
                      <button
                        class="scene-delete-btn tile-delete"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this.deleteScene(s.id);
                        }}
                        aria-label="Delete ${s.name}"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                        </svg>
                      </button>
                    </div>
                  `,
                )}
              </div>
            `}
      ${this.errorMessage ? html`<div class="page-error">${this.errorMessage}</div>` : ""}
    `;
  }

  private renderBudgetChip() {
    const f = this.footer;
    if (f.totalOnBreakers === 0) {
      return html`<span class="budget-chip"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11C11.17,11 10.5,10.33 10.5,9.5C10.5,8.67 11.17,8 12,8C12.83,8 13.5,8.67 13.5,9.5C13.5,10.33 12.83,11 12,11Z"/></svg> ${f.totalOnBreakers}/${f.totalBreakers} on</span>`;
    }
    const parts: string[] = [];
    parts.push(`${f.totalOnBreakers}/${f.totalBreakers}`);
    if (f.totalKwhPerHour > 0) {
      parts.push(`${formatKwh(f.totalKwhPerHour)}/h`);
    }
    if (f.batteryDrainPercentPerHour !== undefined) {
      parts.push(formatBatteryPercent(f.batteryDrainPercentPerHour));
    }
    return html`
      <span class="budget-chip">
        <svg class="chip-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11C11.17,11 10.5,10.33 10.5,9.5C10.5,8.67 11.17,8 12,8C12.83,8 13.5,8.67 13.5,9.5C13.5,10.33 12.83,11 12,11Z"/>
        </svg>
        ${parts.join(" · ")}
      </span>
    `;
  }

  private renderEditor() {
    return html`
      <div class="editor-scroll">
      <div class="page-header">
        <button class="chip-tool page-back" @click=${this.goBack} aria-label="Back to scenes">←</button>
        <span class="page-title">Edit Scene</span>
        <button
          class="scene-delete-btn header-delete"
          @click=${() => this.deleteScene(this.selectedSceneId)}
          aria-label="Delete scene"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
          </svg>
        </button>
      </div>
      <div class="editor-name-row">
        ${this.editingName
          ? html`
            <input class="scene-input" type="text" .value=${this.selectedSceneName} @input=${this.onEditorNameInput} @keydown=${(e: KeyboardEvent) => e.key === "Enter" && (this.editingName = false)} />
            <button class="icon-btn" @click=${() => (this.editingName = false)} aria-label="Done editing">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
              </svg>
            </button>
          `
          : html`
            <div class="name-group">
              <span class="editor-name-text">${this.selectedSceneName}</span>
              <button class="icon-btn edit-btn" @click=${() => (this.editingName = true)} aria-label="Edit scene name">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                </svg>
              </button>
            </div>
          `}
        
        ${this.renderBudgetChip()}
        
        <button class="icon-btn save-icon-btn" ?disabled=${this.saving} @click=${this.saveScene} aria-label="Save scene" title="Save">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
          </svg>
        </button>
      </div>
      <div class="breaker-list">
        ${this.loading
          ? html`<div class="page-loading">Loading breakers...</div>`
          : this.breakerRows.length === 0
            ? html`<div class="page-empty"><p>No breakers found.</p></div>`
            : this.breakerRows.map(
                (row) => html`
                  <savant-scene-breaker-row
                    .name=${row.name}
                    .entityId=${row.entityId}
                    .isOn=${row.isOn}
                    .averageWatts=${row.averageWatts}
                    .batteryCapacityKwh=${this.batteryCapacityKwh}
                    .loading=${row.loading}
                    .controllable=${row.controllable}
                    @savant-scene-toggle=${this.handleToggle}
                  ></savant-scene-breaker-row>
                `,
              )}
      </div>
      ${this.errorMessage ? html`<div class="page-error">${this.errorMessage}</div>` : ""}
      </div>
    `;
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      /* ── Page layout ── */
      .scenes-page {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0;
      }

      /* ── Page header ── */
      .page-header {
        display: flex;
        align-items: center;
        padding: 0;
        gap: 8px;
      }

      .page-title {
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }

      .chip-tool {
        flex: none;
        height: 28px;
        width: 28px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 70%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background: linear-gradient(
          145deg,
          color-mix(in srgb, var(--savant-tile-bg) 84%, white),
          var(--savant-tile-bg)
        );
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.14),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent),
          0 0 0 1px color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 56%, white),
          0 2px 5px rgb(0 0 0 / 0.26);
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        background-color: var(--savant-tile-bg);
      }

      .chip-tool:hover,
      .chip-tool:focus-visible {
        border-color: color-mix(in srgb, var(--primary-text-color) 82%, white);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.2),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 30%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 36%, transparent),
          0 3px 6px rgb(0 0 0 / 0.3);
      }

      /* ── Create row (at top) ── */
      .create-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .scene-input {
        flex: 1;
        background: var(--savant-tile-bg);
        border: 1px solid var(--savant-border);
        border-radius: 8px;
        padding: 8px 12px;
        color: var(--primary-text-color);
        font-size: 14px;
        outline: none;
        font-family: inherit;
      }

      .scene-input:focus {
        border-color: var(--primary-color);
      }

      /* ── Scene action buttons (Create / Save) ── */
      .scene-action-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        flex: none;
        transition: opacity 200ms ease;
      }

      .create-btn,
      .save-btn {
        background: var(--savant-success);
        color: white;
      }

      .create-btn[disabled],
      .save-btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .create-btn:not([disabled]):hover,
      .save-btn:not([disabled]):hover {
        opacity: 0.9;
      }

      /* ── Scene list tiles ── */
      .scene-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .scene-tile {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        padding: 12px 14px;
        text-align: left;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        background: linear-gradient(180deg, color-mix(in srgb, var(--savant-tile-bg-strong) 60%, var(--savant-surface-tint)), var(--savant-tile-bg));
        box-shadow: var(--savant-shadow-sm);
        color: var(--savant-tile-fg);
        cursor: pointer;
        gap: 10px;
        transition: box-shadow 200ms ease;
        font-family: inherit;
        font-size: inherit;
      }

      .scene-tile:hover {
        filter: brightness(1.04);
      }

      .scene-tile-bar {
        display: block;
        flex: none;
        width: 7px;
        align-self: stretch;
        border-radius: 999px;
        background: var(--savant-muted);
      }

      .scene-tile-body {
        flex: 1;
        min-width: 0;
      }

      .scene-tile-name {
        font-size: 15px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: var(--savant-text-halo);
        -webkit-text-stroke: 4px var(--savant-text-outline-color);
        paint-order: stroke fill;
      }

      /* ── Delete button ── */
      .scene-delete-btn {
        color: var(--savant-error);
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: grid;
        place-items: center;
        flex: none;
        border-radius: 4px;
      }

      .scene-delete-btn:hover {
        opacity: 0.8;
      }

      .tile-delete {
        /* specific context within tiles — inherits from .scene-delete-btn */
        width: 28px;
        height: 28px;
        padding: 0;
      }

      .header-delete {
        padding: 6px;
        border-radius: 6px;
        border: 1px solid color-mix(in srgb, var(--savant-error) 50%, transparent);
        background: color-mix(in srgb, var(--savant-error) 8%, transparent);
      }

      .header-delete:hover {
        background: color-mix(in srgb, var(--savant-error) 16%, transparent);
      }

      /* ── Editor scroll container (for sticky header) ── */
      .editor-scroll {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        flex: 1;
        max-height: 100%;
      }

      /* ── Editor name row (sticky header) ── */
      .editor-name-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-bottom: 1px solid var(--savant-border);
        min-height: 44px;
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--savant-card-bg);
      }
      .name-group {
        display: flex;
        align-items: center;
        gap: 4px;
        flex: none;
        max-width: 40%;
        min-width: 0;
      }
      .editor-name-text {
        font-size: 15px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
      }

      .budget-chip {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 70%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--savant-tile-fg);
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--savant-tile-bg-strong) 60%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
        box-shadow: var(--savant-shadow-sm);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chip-icon {
        flex: none;
        opacity: 0.7;
      }

      .icon-btn {
        flex: none;
        width: 28px;
        height: 28px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid transparent;
        border-radius: var(--savant-radius);
        background: transparent;
        color: var(--savant-muted);
        cursor: pointer;
        transition: color 200ms ease, border-color 200ms ease;
      }
      .icon-btn:hover {
        color: var(--primary-text-color);
        border-color: var(--savant-border);
      }
      .save-icon-btn {
        background: var(--savant-success);
        color: white;
        border: 1px solid var(--savant-success);
        border-radius: var(--savant-radius);
        width: 32px;
        height: 32px;
      }
      .save-icon-btn:hover {
        background: color-mix(in srgb, var(--savant-success) 80%, black);
        color: white;
        border-color: var(--savant-success);
      }
      .save-icon-btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--savant-disabled);
        border-color: var(--savant-disabled);
      }
      .edit-btn {
        color: var(--savant-muted);
      }

      /* ── Breaker list ── */
      .breaker-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 6px;
        flex: 1;
        padding: 8px 12px;
      }

      /* ── Info / error states ── */
      .page-loading,
      .page-empty {
        padding: 32px 16px;
        text-align: center;
        color: var(--savant-muted);
      }

      .page-error {
        padding: 8px 0;
        color: var(--savant-error);
        font-size: 12px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-scene-dialog": SavantSceneDialog;
  }
}
