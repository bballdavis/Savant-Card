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
  @property({ type: Boolean, reflect: true }) stacked = false;

  @state() private view: "list" | "editor" = "list";
  @state() private scenes: Scene[] = [];
  @state() private selectedSceneId = "";
  @state() private selectedSceneName = "";
  @state() private relayStates: Record<string, boolean> = {};
  @state() private newSceneName = "";
  @state() private loading = false;
  @state() private saving = false;
  @state() private errorMessage = "";

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
    return html`
      <div class="dialog-overlay">
        <div class="dialog-backdrop" @click=${this.close}></div>
        <div class="dialog-panel">
          ${this.renderList()}
          ${this.renderEditor()}
        </div>
      </div>
    `;
  }

  private renderList() {
    if (this.view !== "list") return nothing;
    return html`
      <div class="dialog-header">
        <span class="dialog-title">Scenes</span>
        <button class="dialog-close" @click=${this.close} aria-label="Close">✕</button>
      </div>
      ${this.loading
        ? html`<div class="dialog-loading">Loading scenes...</div>`
        : html`
            ${this.scenes.length === 0
              ? html`<div class="dialog-empty"><p>No scenes yet. Create one below.</p></div>`
              : html`
                  <div class="scene-list">
                    ${this.scenes.map(
                      (s) => html`
                        <div class="scene-list-row" @click=${() => this.openEditor(s.id)}>
                          <span class="scene-name">${s.name}</span>
                          <button
                            class="scene-delete-btn"
                            @click=${(e: Event) => {
                              e.stopPropagation();
                              this.deleteScene(s.id);
                            }}
                            aria-label="Delete ${s.name}"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                              <path
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                              />
                            </svg>
                          </button>
                        </div>
                      `,
                    )}
                  </div>
                `}
            <div class="dialog-footer">
              <input
                class="scene-input"
                type="text"
                placeholder="Create new scene..."
                .value=${this.newSceneName}
                @input=${this.onNewSceneNameInput}
                @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.createScene()}
              />
              <button
                class="scene-create-btn"
                ?disabled=${!this.newSceneName.trim()}
                @click=${this.createScene}
              >
                + Add
              </button>
            </div>
          `}
      ${this.errorMessage ? html`<div class="dialog-error">${this.errorMessage}</div>` : ""}
    `;
  }

  private renderEditor() {
    if (this.view !== "editor") return nothing;
    return html`
      <div class="dialog-header">
        <button class="dialog-back" @click=${this.goBack} aria-label="Back">← Back</button>
        <span class="dialog-title">Edit Scene</span>
        <button class="dialog-close" @click=${this.close} aria-label="Close">✕</button>
      </div>
      <div class="editor-name-row">
        <input
          class="scene-input editor-name-input"
          type="text"
          .value=${this.selectedSceneName}
          @input=${this.onEditorNameInput}
        />
        <button
          class="scene-save-btn"
          ?disabled=${this.saving || !this.selectedSceneName.trim()}
          @click=${this.saveScene}
        >
          ${this.saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div class="breaker-list">
        ${this.loading
          ? html`<div class="dialog-loading">Loading breakers...</div>`
          : this.breakerRows.length === 0
            ? html`<div class="dialog-empty"><p>No breakers found.</p></div>`
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
      ${this.errorMessage ? html`<div class="dialog-error">${this.errorMessage}</div>` : ""}
      <div class="dialog-footer-summary">
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

      .dialog-overlay {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
      }

      .dialog-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
      }

      .dialog-panel {
        position: relative;
        max-width: 520px;
        margin: auto;
        max-height: 90%;
        background: var(--ha-card-background);
        border-radius: var(--savant-radius);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      :host([stacked]) .dialog-panel {
        position: absolute;
        inset: 0;
        border-radius: 0;
        max-width: none;
        max-height: none;
        margin: 0;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        border-bottom: 1px solid var(--savant-border);
        gap: 8px;
      }

      .dialog-title {
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }

      .dialog-close,
      .dialog-back {
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

      .dialog-close:hover,
      .dialog-back:hover,
      .dialog-close:focus-visible,
      .dialog-back:focus-visible {
        border-color: color-mix(in srgb, var(--primary-text-color) 82%, white);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.2),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 30%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 36%, transparent),
          0 3px 6px rgb(0 0 0 / 0.3);
      }

      .scene-list {
        overflow-y: auto;
        flex: 1;
      }

      .scene-list-row {
        display: flex;
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid var(--savant-border);
        align-items: center;
        gap: 8px;
      }

      .scene-list-row:hover {
        background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      }

      .scene-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .scene-delete-btn {
        color: var(--savant-error);
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: grid;
        place-items: center;
        flex: none;
      }

      .scene-delete-btn:hover {
        opacity: 0.8;
      }

      .editor-name-row {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--savant-border);
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

      .scene-create-btn,
      .scene-save-btn {
        background: var(--savant-success);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        font-family: inherit;
        flex: none;
        transition: opacity 200ms ease;
      }

      .scene-create-btn[disabled],
      .scene-save-btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .scene-create-btn:not([disabled]):hover,
      .scene-save-btn:not([disabled]):hover {
        opacity: 0.9;
      }

      .breaker-list {
        overflow-y: auto;
        flex: 1;
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .dialog-footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--savant-border);
      }

      .dialog-footer-summary {
        padding: 12px 16px;
        border-top: 1px solid var(--savant-border);
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

      .dialog-loading,
      .dialog-empty {
        padding: 32px 16px;
        text-align: center;
        color: var(--savant-muted);
      }

      .dialog-error {
        padding: 8px 16px;
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
