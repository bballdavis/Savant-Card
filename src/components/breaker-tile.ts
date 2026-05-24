import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./sparkline";
import "./metric-row";
import "./hold-control-button";
import type { DiscoveredBreaker, ResolvedBreakerDisplay } from "../types/breaker";
import type { BreakerStatistics } from "../types/statistics";
import type { HomeAssistant } from "../types/home-assistant";
import { formatPower, parseNumber } from "../utilities/format-power";
import { formatEnergy } from "../utilities/format-energy";
import { fireEvent } from "../utilities/events";

@customElement("savant-breaker-tile")
export class SavantBreakerTile extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public breaker!: DiscoveredBreaker;
  @property({ attribute: false }) public display!: ResolvedBreakerDisplay;
  @property({ attribute: false }) public statistics?: BreakerStatistics;
  @property({ type: Number }) public highLoadThresholdWatts = 3500;
  @property({ type: Boolean }) public graphLoading = false;
  @property({ type: Boolean }) public pending = false;
  @property({ type: Boolean, reflect: true }) public stacked = false;
  @property({ type: String }) public error = "";

  protected override render() {
    const state = this.runtimeState();
    const visual = this.visualState(state.powerWatts, state.switchState, state.available);
    const subtitle = [this.display.show_area ? this.breaker.areaName : undefined, this.breaker.panelName, this.display.show_circuit_number && this.breaker.circuitNumber ? `Circuit ${this.breaker.circuitNumber}` : undefined]
      .filter(Boolean)
      .join(" • ");
    const controlVisible =
      this.display.show_controls &&
      this.display.control_mode !== "hidden" &&
      this.breaker.controllable &&
      Boolean(this.breaker.entities.switch);

    return html`
      <button class=${`tile ${visual} ${this.pending ? "pending" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot"></span>
          ${this.display.show_state ? html`<span class="state-text">${stateLabel(visual, state.switchState)}</span>` : ""}
          <span class="bolt" aria-hidden="true">ϟ</span>
        </span>
        <span class="name">${this.display.label}</span>
        ${subtitle ? html`<span class="subtitle">${subtitle}</span>` : ""}
        <span class="power">${this.display.show_current_power ? formatPower(state.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading
            ? html`<span class="graph-skeleton"></span>`
            : this.display.show_sparkline
              ? html`<savant-sparkline
                  .points=${this.statistics?.points ?? []}
                  .state=${visual === "high_load" ? "warning" : visual === "off" || visual === "unavailable" ? "muted" : "normal"}
                ></savant-sparkline>`
              : ""}
        </span>
        <span class="metrics">
          ${this.display.show_average_power || this.display.show_maximum_power
            ? html`<savant-metric-row
                .avg=${this.display.show_average_power ? formatPower(this.statistics?.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? formatPower(this.statistics?.maximumWatts) : "--"}
              ></savant-metric-row>`
            : ""}
          ${this.display.show_energy ? html`<span class="energy">${formatEnergy(state.energyValue)}</span>` : ""}
        </span>
        ${this.error ? html`<span class="feedback">${this.error}</span>` : ""}
        ${controlVisible
          ? html`<savant-hold-control-button
              class="control"
              .breakerId=${this.breaker.id}
              .label=${this.display.label}
              .mode=${this.display.control_mode === "hold" ? "hold" : "hold_confirm_off"}
              .switchState=${state.switchState ?? "off"}
              .pending=${this.pending}
              ?disabled=${!state.available}
            ></savant-hold-control-button>`
          : ""}
      </button>
    `;
  }

  private runtimeState() {
    const powerEntity = this.breaker.entities.power;
    const energyEntity = this.breaker.entities.energy;
    const switchEntity = this.breaker.entities.switch;
    const power = powerEntity ? parseNumber(this.hass?.states[powerEntity]?.state) : undefined;
    const energy = energyEntity ? parseNumber(this.hass?.states[energyEntity]?.state) : undefined;
    const switchState = switchEntity ? this.hass?.states[switchEntity]?.state : undefined;
    const available =
      this.breaker.available &&
      (!powerEntity || this.hass?.states[powerEntity]?.state !== "unavailable") &&
      (!switchEntity || this.hass?.states[switchEntity]?.state !== "unavailable");
    return { powerWatts: power, energyValue: energy, switchState, available };
  }

  private visualState(power?: number, switchState?: string, available = true): string {
    if (this.error) return "error";
    if (this.pending) return "pending";
    if (!available) return "unavailable";
    if (switchState === "off" || power === 0) return "off";
    if (power !== undefined && power >= this.highLoadThresholdWatts) return "high_load";
    return "on";
  }

  private openMoreInfo(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest("savant-hold-control-button")) return;
    const entity = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    if (!entity) return;
    fireEvent(this, "hass-action", {
      config: {
        entity,
        tap_action: { action: "more-info" },
      },
      action: "tap",
    });
  }

  public static override styles = css`
    :host {
      display: block;
      min-width: 0;
      --status-color: var(--savant-success);
      --control-color: var(--status-color);
    }

    .tile {
      position: relative;
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      width: 100%;
      min-height: var(--tile-height, 206px);
      padding: 16px;
      overflow: hidden;
      text-align: left;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background:
        radial-gradient(circle at 72% 78%, color-mix(in srgb, var(--status-color) 14%, transparent), transparent 38%),
        linear-gradient(145deg, color-mix(in srgb, var(--savant-tile-bg) 94%, white), var(--savant-tile-bg));
      color: var(--savant-tile-fg);
      box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.24));
      font: inherit;
      cursor: pointer;
    }

    .tile.high_load {
      --status-color: var(--savant-warning);
    }

    .tile.off,
    .tile.unavailable {
      --status-color: var(--savant-disabled);
    }

    .tile.error {
      --status-color: var(--savant-error);
    }

    .topline {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
      color: var(--status-color);
      font-size: 12px;
      text-transform: uppercase;
    }

    .state-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--status-color);
      flex: none;
    }

    .bolt {
      margin-left: auto;
      color: var(--primary-text-color);
      font-size: 25px;
      line-height: 1;
    }

    .name {
      display: block;
      margin-top: 12px;
      font-size: 17px;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .subtitle {
      color: var(--savant-muted);
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .power {
      margin-top: 18px;
      font-size: 31px;
      font-weight: 720;
      color: var(--status-color);
      letter-spacing: 0;
      white-space: nowrap;
    }

    .tile.on .power,
    .tile.off .power {
      color: var(--savant-tile-fg);
    }

    .graph {
      align-self: end;
      min-height: 40px;
      margin: 2px 0 44px;
      pointer-events: none;
    }

    .metrics {
      position: absolute;
      left: 16px;
      right: 74px;
      bottom: 17px;
      display: flex;
      align-items: end;
      gap: 12px;
      min-width: 0;
    }

    .energy,
    .feedback {
      color: var(--savant-muted);
      font-size: 12px;
    }

    .feedback {
      position: absolute;
      left: 16px;
      bottom: 58px;
      color: var(--savant-error);
    }

    .control {
      position: absolute;
      right: 14px;
      bottom: 14px;
      z-index: 1;
    }

    .mobile-bar {
      display: none;
    }

    .graph-skeleton {
      display: block;
      height: 36px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--savant-muted) 18%, transparent);
    }

    :host-context([density="compact"]) .tile {
      min-height: 158px;
      padding: 12px;
    }

    :host-context([density="compact"]) .power {
      margin-top: 8px;
      font-size: 25px;
    }

    :host-context([density="compact"]) .graph {
      min-height: 32px;
      margin-bottom: 36px;
    }

    :host([stacked]) .tile {
      min-height: 132px;
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-rows: auto auto auto 1fr;
      padding: 14px 68px 14px 34px;
    }

    :host([stacked]) .mobile-bar {
      display: block;
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: 10px;
      width: 8px;
      border-radius: 999px;
      background: var(--status-color);
    }

    :host([stacked]) .tile.unavailable .mobile-bar {
      background: repeating-linear-gradient(
        to bottom,
        var(--status-color) 0 12px,
        transparent 12px 19px
      );
    }

    :host([stacked]) .topline {
      grid-column: 1 / 3;
    }

    :host([stacked]) .state-text {
      display: none;
    }

    :host([stacked]) .name {
      margin-top: 4px;
    }

    :host([stacked]) .power {
      margin-top: 10px;
    }

    :host([stacked]) .graph {
      grid-column: 1 / 2;
      min-height: 28px;
      margin: 0 0 0;
    }

    :host([stacked]) .metrics {
      left: auto;
      right: 14px;
      bottom: 16px;
    }

    :host([stacked]) .control {
      right: 14px;
      top: 48px;
      bottom: auto;
    }

    :host([stacked]) .bolt {
      position: absolute;
      right: 20px;
      top: 14px;
    }

  `;
}

function stateLabel(visual: string, switchState?: string): string {
  if (visual === "unavailable") return "Unavailable";
  if (switchState === "off" || visual === "off") return "Off";
  return "On";
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-breaker-tile": SavantBreakerTile;
  }
}
