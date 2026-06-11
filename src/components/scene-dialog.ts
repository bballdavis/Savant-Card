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
  formatWatts,
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

  private renderFooter() {
    const f = this.footer;
    if (f.totalOnBreakers === 0) {
      return html`<div class="footer-summary">No breakers ON — scene will turn everything off.</div>`;
    }
    return html`
      <div class="footer-summary">
        <div class="footer-row">ON: ${f.totalOnBreakers} / ${f.totalBreakers} breakers</div>
        <div class="footer-row">Scene load: ${formatWatts(f.totalAverageWatts)} avg</div>
        <div class="footer-row">→ ${formatKwh(f.totalKwhPerHour)}/h · ${formatKwh(f.totalWeeklyKwh)}/wk</div>
        ${f.batteryDrainPercentPerHour !== undefined
          ? html`<div class="footer-row battery">→ ${formatBatteryPercent(f.batteryDrainPercentPerHour)} battery drain</div>`
          : ""}
      </div>
    `;
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
      <div class="search-row">
        <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
        </svg>
        <input
          class="search-input"
          type="text"
          placeholder="Search scenes..."
          .value=${this.searchQuery}
          @input=${(e: InputEvent) => (this.searchQuery = (e.target as HTMLInputElement).value)}
        />
      </div>
      ${this.loading
        ? html`<div class="page-loading">Loading scenes...</div>`
        : this.filteredScenes.length === 0
          ? html`<div class="page-empty"><p>No scenes yet. Create one above.</p></div>`
          : html`
              <div class="scene-list">
                ${this.filteredScenes.map(
                  (s) => html`
                    <button class="scene-tile" @click=${() => this.openEditor(s.id)}>
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
                    </button>
                  `,
                )}
              </div>
            `}
      ${this.errorMessage ? html`<div class="page-error">${this.errorMessage}</div>` : ""}
    `;
  }

  private renderBudgetChip() {
    const f = this.footer;
    if (f.totalOnBreakers === 0) return nothing;
    const parts: string[] = [];
    if (f.totalKwhPerHour > 0) {
      parts.push(`${formatKwh(f.totalKwhPerHour)}/h`);
    }
    if (f.batteryDrainPercentPerHour !== undefined) {
      parts.push(formatBatteryPercent(f.batteryDrainPercentPerHour));
    }
    if (!parts.length) return nothing;
    return html`
      <span class="budget-chip">${parts.join(" · ")}</span>
    `;
  }

  private renderEditor() {
    return html`
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
            <span class="editor-name-text">${this.selectedSceneName}</span>
            <button class="icon-btn edit-btn" @click=${() => (this.editingName = true)} aria-label="Edit scene name">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
              </svg>
            </button>
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
      <div class="footer-summary-wrap">
        ${this.renderFooter()}
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

      /* ── Search row ── */
      .search-row {
        display: flex;
        align-items: center;
        gap: 6px;
        background: var(--savant-tile-bg);
        border: 1px solid var(--savant-border);
        border-radius: 8px;
        padding: 0 10px;
      }
      .search-row:focus-within {
        border-color: var(--primary-color);
      }
      .search-icon {
        flex: none;
        color: var(--savant-muted);
        opacity: 0.6;
      }
      .search-input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 8px 0;
        color: var(--primary-text-color);
        font-size: 13px;
        outline: none;
        font-family: inherit;
      }
      .search-input::placeholder {
        color: var(--savant-muted);
        opacity: 0.6;
      }

      /* ── Scene input ── */
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

      /* ── Editor name row ── */
      .editor-name-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-bottom: 1px solid var(--savant-border);
        min-height: 44px;
      }
      .editor-name-text {
        font-size: 15px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;
      }

      .budget-chip {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        background: var(--savant-tile-bg);
        border: 1px solid var(--savant-border);
        border-radius: 999px;
        color: var(--savant-muted);
        white-space: nowrap;
        flex: none;
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
        color: var(--savant-success);
      }
      .save-icon-btn:hover {
        color: var(--savant-success);
        border-color: var(--savant-success);
      }
      .save-icon-btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .edit-btn {
        color: var(--savant-muted);
      }

      /* ── Breaker list ── */
      .breaker-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 6px;
        overflow-y: auto;
        flex: 1;
        padding: 8px 12px;
      }

      /* ── Footer summary ── */
      .footer-summary-wrap {
        border-top: 1px solid var(--savant-border);
        padding-top: 12px;
      }

      .footer-summary {
        font-size: 12px;
        color: var(--savant-muted);
      }

      .footer-row {
        margin: 2px 0;
      }

      .footer-row.battery {
        color: var(--savant-caution);
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
