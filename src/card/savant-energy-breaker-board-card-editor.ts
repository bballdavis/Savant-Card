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
  @state() private loading = true;
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
          ${this.checkbox("Auto-discovery", this.config.discovery.enabled, (value) =>
            this.patch({ discovery: { ...this.config.discovery, enabled: value } }),
          )}
          ${this.select("Group", this.config.layout.group_by, ["none", "panel", "area", "panel_then_area"], (value) =>
            this.patch({ layout: { ...this.config.layout, group_by: value as any } }),
          )}
          ${this.select("Sort", this.config.layout.sort_by, ["circuit_number", "name", "current_power_descending", "manual"], (value) =>
            this.patch({ layout: { ...this.config.layout, sort_by: value as any } }),
          )}
          ${this.select("Density", this.config.layout.density, ["comfortable", "compact"], (value) =>
            this.patch({ layout: { ...this.config.layout, density: value as any } }),
          )}
          ${this.select("Graph period", this.config.graph.period, ["1h", "6h", "24h", "7d"], (value) =>
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
            show_state: "Breaker state",
            show_controls: "Breaker controls",
            show_area: "Area label",
            show_circuit_number: "Circuit number",
          }).map(([key, label]) =>
            this.checkbox(label, (this.config.display as any)[key], (value) =>
              this.patch({ display: { ...this.config.display, [key]: value } }),
            ),
          )}
          ${this.select("Control safety", this.config.controls.default_mode, ["hidden", "hold", "hold_confirm_off"], (value) =>
            this.patch({ controls: { ...this.config.controls, default_mode: value as any } }),
          )}
        </section>

        <section>
          <h3>Discovered breakers</h3>
          ${this.textInput("Search breakers", this.filter, (value) => (this.filter = value), false)}
          ${this.loading ? html`<div class="loading">Loading discovered breakers...</div>` : nothing}
          ${visible.map((breaker) => this.renderBreakerEditor(breaker))}
        </section>
      </div>
    `;
  }

  private renderBreakerEditor(breaker: DiscoveredBreaker) {
    const excluded = this.config.excluded_breakers.includes(breaker.id);
    const override = this.config.breaker_overrides[breaker.id] ?? {};
    const power = breaker.entities.power ? parseNumber(this.hass?.states[breaker.entities.power]?.state) : undefined;
    const entityList = Object.entries(breaker.entities)
      .filter(([, entity]) => entity)
      .map(([role, entity]) => `${role}: ${entity}`)
      .join(", ");
    return html`
      <article class=${excluded ? "breaker excluded" : "breaker"}>
        <div class="breaker-head">
          <div>
            <strong>${override.label || breaker.name}</strong>
            <span>${formatPower(power)} • ${breaker.available ? "available" : "unavailable"}</span>
            <small>${entityList || "No associated entities"}</small>
          </div>
          ${this.checkbox("Shown", !excluded, (shown) => this.setExcluded(breaker.id, !shown))}
        </div>
        ${this.textInput("Custom label", override.label ?? "", (value) =>
          this.setOverride(breaker.id, { ...override, label: value || undefined }),
        )}
        <div class="override-grid">
          ${(["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_controls"] as const).map((key) =>
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
      </article>
    `;
  }

  private async loadBreakers(): Promise<void> {
    if (!this.hass) return;
    this.loading = true;
    this.breakers = await this.discovery.discover(this.hass, this.config);
    this.loading = false;
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

  private textInput(label: string, value: string, onChange: (value: string) => void, commit = true) {
    return html`<label><span>${label}</span><input .value=${value} @input=${(event: Event) => onChange((event.target as HTMLInputElement).value)} @change=${commit ? (event: Event) => onChange((event.target as HTMLInputElement).value) : undefined} /></label>`;
  }

  private checkbox(label: string, checked: boolean, onChange: (checked: boolean) => void) {
    return html`<label class="check"><input type="checkbox" .checked=${checked} @change=${(event: Event) => onChange((event.target as HTMLInputElement).checked)} /> <span>${label}</span></label>`;
  }

  private select(label: string, value: string, options: string[], onChange: (value: string) => void) {
    return html`<label><span>${label}</span><select .value=${value} @change=${(event: Event) => onChange((event.target as HTMLSelectElement).value)}>${options.map((option) => html`<option value=${option}>${option}</option>`)}</select></label>`;
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

    .helper,
    small,
    .breaker span {
      color: var(--secondary-text-color);
    }

    .breaker-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .breaker-head div {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .excluded {
      opacity: 0.62;
    }

    .override-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
    }

    .reset {
      justify-self: start;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-energy-breaker-board-card-editor": SavantEnergyBreakerBoardCardEditor;
  }
}
