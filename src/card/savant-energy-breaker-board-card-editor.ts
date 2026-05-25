import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BreakerDiscoveryService } from "../data/breaker-discovery-service";
import { minimalConfig, withoutBreakerOverride } from "../config/config-diff";
import { normalizeConfig } from "../config/normalize-config";
import { DEFAULT_CONFIG } from "../config/defaults";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant } from "../types/home-assistant";
import type { PartialSavantBreakerBoardConfig, SavantBreakerBoardConfig } from "../types/config";
import { fireEvent } from "../utilities/events";
import { formatPower, parseNumber } from "../utilities/format-power";

@customElement("savant-energy-breaker-board-card-editor")
export class SavantEnergyBreakerBoardCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config: SavantBreakerBoardConfig = DEFAULT_CONFIG;
  @state() private breakers: DiscoveredBreaker[] = [];
  @state() private filter = "";
  @state() private loading = false;
  @state() private discoveryError = "";
  @state() private expandedBreakers = new Set<string>();
  private discoveryLoaded = false;
  private discovery = new BreakerDiscoveryService();

  public setConfig(config: PartialSavantBreakerBoardConfig): void {
    this.config = normalizeConfig(config);
    void this.loadBreakers();
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has("hass")) void this.loadBreakers();
  }

  protected override render() {
    const visible = this.breakers.filter((breaker) =>
      breaker.name.toLowerCase().includes(this.filter.toLowerCase()),
    );
    return html`
      <div class="editor">
        <section>
          <h3>Board</h3>
          ${this.textInput("Title", this.config.title ?? "", (value) => this.patch({ title: value || undefined }))}
          ${this.switch("Show title section", this.config.display.show_title, (value) =>
            this.patch({ display: { ...this.config.display, show_title: value } }),
          )}
          ${this.switch("Auto-discovery", this.config.discovery.enabled, (value) =>
            this.patch({ discovery: { ...this.config.discovery, enabled: value } }),
          )}
          ${this.switch("Ultra-compact mobile view", this.config.layout.mobile_view === "ultra_compact", (enabled) =>
            this.patch({ layout: { ...this.config.layout, mobile_view: enabled ? "ultra_compact" : "standard" } }),
          )}
          ${this.switch("Group by breaker type", this.config.layout.group_by !== "none", (enabled) =>
            this.patch({ layout: { ...this.config.layout, group_by: enabled ? "panel" : "none" } }),
          )}
          ${this.select("Sort", this.config.layout.sort_by, ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"], (value) =>
            this.patch({ layout: { ...this.config.layout, sort_by: value as any } }),
          )}
          ${this.select("Density", this.config.layout.density, ["comfortable", "compact"], (value) =>
            this.patch({ layout: { ...this.config.layout, density: value as any } }),
          )}
          ${this.select("Graph period", this.config.graph.period, ["1h", "6h", "12h", "24h", "7d"], (value) =>
            this.patch({ graph: { ...this.config.graph, period: value as any } }),
          )}
          <p class="helper">Tiles automatically switch to a horizontal stacked layout in narrow dashboard columns.</p>
        </section>

        <section>
          <h3>Defaults</h3>
          ${Object.entries({
            show_current_power: "Current power",
            show_average_power: "Average power",
            show_maximum_power: "Maximum power",
            show_energy: "Energy",
            show_sparkline: "Sparkline",
            show_icon: "Icon",
            show_state: "Breaker state",
            show_controls: "Breaker controls",
            show_area: "Area label",
            show_circuit_number: "Circuit number",
          }).map(([key, label]) =>
            this.switch(label, (this.config.display as any)[key], (value) =>
              this.patch({ display: { ...this.config.display, [key]: value } }),
            ),
          )}
          ${this.select("Control safety", this.config.controls.default_mode, ["hidden", "hold", "hold_confirm_off"], (value) =>
            this.patch({ controls: { ...this.config.controls, default_mode: value as any } }),
          )}
          ${this.numberInput("High-load threshold (W)", this.config.controls.high_load_threshold_watts ?? 3500, (value) =>
            this.patch({ controls: { ...this.config.controls, high_load_threshold_watts: value } }),
          )}
        </section>

        <section>
          <div class="section-head">
            <h3>Discovered breakers</h3>
            <button class="refresh" ?disabled=${this.loading || !this.hass} @click=${() => this.loadBreakers(true)}>
              ${this.loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          ${this.textInput("Search breakers", this.filter, (value) => (this.filter = value), false)}
          ${this.discoveryError ? html`<div class="error">${this.discoveryError}</div>` : nothing}
          ${this.loading ? html`<div class="loading">Loading discovered breakers...</div>` : nothing}
          ${!this.loading && !visible.length
            ? html`<div class="loading">${this.discoveryLoaded ? "No discovered breakers found." : "Discovery will run once when Home Assistant is ready."}</div>`
            : nothing}
          ${visible.map((breaker) => this.renderBreakerEditor(breaker))}
        </section>
      </div>
    `;
  }

  private renderBreakerEditor(breaker: DiscoveredBreaker) {
    const excluded = this.config.excluded_breakers.includes(breaker.id);
    const override = this.config.breaker_overrides[breaker.id] ?? {};
    const expanded = this.expandedBreakers.has(breaker.id);
    const power = breaker.entities.power ? parseNumber(this.hass?.states[breaker.entities.power]?.state) : undefined;
    const entityList = Object.entries(breaker.entities)
      .filter(([, entity]) => entity)
      .map(([role, entity]) => `${role}: ${entity}`)
      .join(", ");
    return html`
      <article class=${excluded ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(breaker.id)}>
          <div>
            <strong>${override.label || breaker.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !excluded, (shown) => this.setExcluded(breaker.id, !shown))}
            <span class="chevron">${expanded ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${expanded
          ? html`
              <div class="breaker-details">
                <span>${formatPower(power)} - ${breaker.available ? "available" : "unavailable"}</span>
                <small>${entityList || "No associated entities"}</small>
              </div>
              ${this.textInput("Custom label", override.label ?? "", (value) =>
                this.setOverride(breaker.id, { ...override, label: value || undefined }),
              )}
              <div class="override-grid">
                ${(["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"] as const).map((key) =>
                  this.tristate(key.replaceAll("_", " "), override[key], (value) =>
                    this.setOverride(breaker.id, { ...override, [key]: value }),
                  ),
                )}
              </div>
              ${this.select("Control mode", override.control_mode ?? "default", ["default", "hidden", "hold", "hold_confirm_off"], (value) =>
                this.setOverride(breaker.id, {
                  ...override,
                  control_mode: value === "default" ? undefined : (value as any),
                }),
              )}
              <button class="reset" @click=${() => this.resetOverride(breaker.id)}>Reset to defaults</button>
            `
          : nothing}
      </article>
    `;
  }

  private async loadBreakers(force = false): Promise<void> {
    if (!this.hass || (!force && (this.discoveryLoaded || this.loading))) return;
    this.loading = true;
    this.discoveryError = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config);
      this.discoveryLoaded = true;
    } catch (error) {
      this.discoveryError = error instanceof Error ? error.message : "Discovery failed";
    } finally {
      this.loading = false;
    }
  }

  private patch(partial: PartialSavantBreakerBoardConfig): void {
    this.config = normalizeConfig({ ...this.config, ...partial });
    fireEvent(this, "config-changed", { config: minimalConfig(this.config) });
  }

  private setExcluded(id: string, excluded: boolean): void {
    const set = new Set(this.config.excluded_breakers);
    if (excluded) set.add(id);
    else set.delete(id);
    this.patch({ excluded_breakers: [...set] });
  }

  private setOverride(id: string, value: Record<string, any>): void {
    const cleaned = Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [id]: cleaned } });
  }

  private resetOverride(id: string): void {
    const minimal = withoutBreakerOverride(this.config, id);
    this.config = normalizeConfig(minimal);
    fireEvent(this, "config-changed", { config: minimal });
  }

  private toggleExpanded(id: string): void {
    const next = new Set(this.expandedBreakers);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedBreakers = next;
  }

  private textInput(label: string, value: string, onChange: (value: string) => void, commit = true) {
    return html`<label><span>${label}</span><input .value=${value} @input=${(event: Event) => onChange((event.target as HTMLInputElement).value)} @change=${commit ? (event: Event) => onChange((event.target as HTMLInputElement).value) : undefined} /></label>`;
  }

  private checkbox(label: string, checked: boolean, onChange: (checked: boolean) => void) {
    return html`<label class="check"><input type="checkbox" .checked=${checked} @change=${(event: Event) => onChange((event.target as HTMLInputElement).checked)} /> <span>${label}</span></label>`;
  }

  private switch(label: string, checked: boolean, onChange: (checked: boolean) => void) {
    return html`
      <label class="switch" @click=${(event: Event) => event.stopPropagation()}>
        <input type="checkbox" .checked=${checked} @change=${(event: Event) => onChange((event.target as HTMLInputElement).checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${label}</span>
      </label>
    `;
  }

  private select(label: string, value: string, options: string[], onChange: (value: string) => void) {
    return html`<label><span>${label}</span><select .value=${value} @change=${(event: Event) => onChange((event.target as HTMLSelectElement).value)}>${options.map((option) => html`<option value=${option}>${option}</option>`)}</select></label>`;
  }

  private numberInput(label: string, value: number, onChange: (value: number) => void) {
    return html`<label><span>${label}</span><input type="number" min="0" step="100" .value=${String(value)} @change=${(event: Event) => onChange(Number((event.target as HTMLInputElement).value) || 0)} /></label>`;
  }

  private tristate(label: string, value: boolean | undefined, onChange: (value: boolean | undefined) => void) {
    const current = value === undefined ? "default" : String(value);
    return this.select(label, current, ["default", "true", "false"], (next) =>
      onChange(next === "default" ? undefined : next === "true"),
    );
  }

  public static override styles = css`
    .editor {
      display: grid;
      gap: 18px;
    }

    section,
    .breaker {
      display: grid;
      gap: 10px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }

    h3 {
      margin: 0;
      font-size: 16px;
    }

    label {
      display: grid;
      gap: 4px;
      font-size: 13px;
    }

    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 8px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
    }

    .check {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .check input {
      width: auto;
    }

    .switch {
      display: flex;
      align-items: center;
      gap: 9px;
      width: max-content;
      max-width: 100%;
      cursor: pointer;
    }

    .switch input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .switch-track {
      position: relative;
      flex: none;
      width: 36px;
      height: 20px;
      border-radius: 999px;
      background: var(--disabled-text-color);
      transition: background 150ms ease;
    }

    .switch-track::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--card-background-color, white);
      transition: transform 150ms ease;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
    }

    .switch input:checked + .switch-track {
      background: var(--primary-color);
    }

    .switch input:checked + .switch-track::after {
      transform: translateX(16px);
    }

    .helper,
    .loading,
    small,
    .breaker span {
      color: var(--secondary-text-color);
    }

    .error {
      color: var(--error-color);
      font-size: 13px;
    }

    .section-head,
    .breaker-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .breaker-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
    }

    .breaker-head div {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .breaker-details {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .chevron {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .excluded {
      opacity: 0.62;
    }

    .override-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
    }

    .reset,
    .refresh {
      justify-self: start;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }

    .refresh {
      justify-self: end;
      padding: 6px 10px;
    }

    .refresh:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-energy-breaker-board-card-editor": SavantEnergyBreakerBoardCardEditor;
  }
}

