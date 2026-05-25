import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./sparkline";
import "./metric-row";
import "./hold-control-button";
import "./savant-icon";
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
    const subtitle = this.display.show_area ? this.breaker.areaName : undefined;
    const hasHistory = Boolean(this.statistics?.points.length);
    const hasStats =
      hasHistory &&
      (this.statistics?.averageWatts !== undefined || this.statistics?.maximumWatts !== undefined);
    const controlVisible =
      this.display.show_controls &&
      this.display.control_mode !== "hidden" &&
      this.breaker.controllable &&
      Boolean(this.breaker.entities.switch);

    return html`
      <button class=${`tile ${visual} ${this.pending ? "pending" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state
            ? html`<span class="state-text">${stateLabel(visual, state.switchState)}</span>`
            : ""}
          ${this.renderEntityIcon()}
        </span>
        <span class="name">${this.display.label}</span>
        ${subtitle ? html`<span class="subtitle">${subtitle}</span>` : ""}
        <span class="power">${this.display.show_current_power ? formatPower(state.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading
            ? this.renderGraphSkeleton()
            : this.display.show_sparkline
              ? html`<savant-sparkline
                  .points=${this.statistics?.points ?? []}
                  .state=${!hasHistory || visual === "off" || visual === "unavailable"
                      ? "muted"
                      : visual === "high_load"
                        ? "warning"
                        : "normal"}
                ></savant-sparkline>`
              : ""}
        </span>
        <span class="metrics">
          ${hasStats && (this.display.show_average_power || this.display.show_maximum_power)
              ? html`<savant-metric-row
                .avg=${this.display.show_average_power
                  ? formatPower(this.statistics?.averageWatts)
                  : "--"}
                .max=${this.display.show_maximum_power
                  ? formatPower(this.statistics?.maximumWatts)
                  : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>`
            : ""}
          ${this.display.show_energy
            ? html`<span class="energy">${formatEnergy(state.energyValue)}</span>`
            : ""}
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

  private renderEntityIcon() {
    const powerEntity = this.breaker.entities.power;
    const icon = powerEntity ? this.hass?.states[powerEntity]?.attributes.icon : undefined;
    if (typeof icon === "string" && icon && customElements.get("ha-icon")) {
      return html`<ha-icon class="entity-icon" .icon=${icon}></ha-icon>`;
    }
    return html`<savant-icon class="entity-icon" icon="flash"></savant-icon>`;
  }

  private renderGraphSkeleton() {
    return html`
      <span class="graph-skeleton" aria-hidden="true">
        <svg viewBox="0 0 100 36" preserveAspectRatio="none">
          <path class="graph-skeleton-fill" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18 L 100 36 L 0 36 Z"></path>
          <path class="graph-skeleton-baseline" d="M 0 34 L 100 34"></path>
          <path class="graph-skeleton-line" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18"></path>
        </svg>
      </span>
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
    const entity =
      this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
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
      aspect-ratio: 1 / 1;
      --status-color: var(--savant-success);
      --control-color: var(--status-color);
      --savant-text-halo:
        0 0 2px var(--savant-tile-bg),
        0 1px 1px var(--savant-tile-bg),
        1px 0 1px var(--savant-tile-bg),
        0 -1px 1px var(--savant-tile-bg),
        -1px 0 1px var(--savant-tile-bg);
      --savant-text-outline-color: var(--savant-tile-bg);
      --savant-font-family:
        Inter, "SF Pro Display", "SF Pro Text", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .tile {
      position: relative;
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      width: 100%;
      height: 100%;
      min-height: 0;
      padding: 16px;
      overflow: hidden;
      text-align: left;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background:
        linear-gradient(
          145deg,
          color-mix(in srgb, var(--savant-tile-bg) 94%, white),
          var(--savant-tile-bg)
        );
      color: var(--savant-tile-fg);
      box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.24));
      font-family: var(--savant-breaker-font-family, var(--savant-font-family));
      font-weight: 400;
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
      line-height: 1.2;
      font-weight: 500;
      text-transform: uppercase;
      position: relative;
      z-index: 1;
    }

    .state-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--status-color);
      flex: none;
    }

    .entity-icon {
      margin-left: auto;
      width: 24px;
      height: 24px;
      color: var(--primary-text-color);
      font-size: 24px;
      line-height: 1;
    }

    .name {
      display: block;
      margin-top: 10px;
      font-size: 17px;
      font-weight: 500;
      line-height: 1.22;
      min-height: 1.22em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      z-index: 1;
    }

    .subtitle {
      color: var(--savant-muted);
      font-size: 14px;
      line-height: 1.25;
      font-weight: 400;
      min-height: 1.25em;
      margin-top: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      -webkit-text-stroke: 3px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    .power {
      margin-top: 15px;
      font-size: 31px;
      font-weight: 500;
      color: var(--status-color);
      letter-spacing: 0;
      line-height: 1.12;
      white-space: nowrap;
      position: relative;
      z-index: 1;
    }

    .tile.on .power,
    .tile.off .power {
      color: var(--savant-tile-fg);
    }

    .graph {
      align-self: end;
      min-height: 58px;
      margin: 2px -16px 52px;
      pointer-events: none;
      position: relative;
      z-index: 0;
    }

    .metrics {
      position: absolute;
      left: 16px;
      right: 74px;
      bottom: 15px;
      display: flex;
      align-items: end;
      gap: 12px;
      min-width: 0;
      z-index: 1;
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
      width: 100%;
      height: 100%;
      min-height: 32px;
      color: var(--status-color);
      opacity: 0.62;
    }

    .graph-skeleton svg {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 32px;
    }

    .graph-skeleton-fill {
      fill: currentColor;
      opacity: 0.18;
    }

    .graph-skeleton-baseline,
    .graph-skeleton-line {
      fill: none;
      stroke: currentColor;
      vector-effect: non-scaling-stroke;
    }

    .graph-skeleton-baseline {
      stroke-width: 1;
      opacity: 0.34;
    }

    .graph-skeleton-line {
      stroke-width: 1.45;
      opacity: 0.72;
    }

    :host-context([density="compact"]) .tile {
      padding: 12px;
    }

    :host-context([density="compact"]) .power {
      margin-top: 8px;
      font-size: 25px;
    }

    :host-context([density="compact"]) .graph {
      min-height: 32px;
      margin-bottom: 50px;
    }

    :host([stacked]) {
      aspect-ratio: auto;
    }

    :host([stacked]) .tile {
      min-height: 128px;
      height: auto;
      display: block;
      padding: 12px 142px 12px 32px;
    }

    :host([stacked]) .mobile-bar {
      display: block;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 8px;
      width: 7px;
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
      display: contents;
      gap: 0;
    }

    :host([stacked]) .state-dot {
      display: none;
    }

    :host([stacked]) .state-text {
      display: none;
    }

    :host([stacked]) .name {
      position: absolute;
      top: 14px;
      left: 58px;
      right: 136px;
      margin: 0;
      font-size: 16px;
      line-height: 1.15;
      min-height: 0;
    }

    :host([stacked]) .subtitle {
      position: absolute;
      top: 32px;
      left: 58px;
      right: 136px;
      margin: 0;
      min-height: 0;
      font-size: 12px;
      line-height: 1.15;
    }

    :host([stacked]) .power {
      position: absolute;
      top: 50px;
      left: 32px;
      right: 136px;
      margin: 0;
      font-size: 27px;
      line-height: 1;
    }

    :host([stacked]) .graph {
      position: absolute;
      left: 32px;
      right: 136px;
      bottom: 12px;
      height: 68px;
      min-height: 68px;
      margin: 0;
    }

    :host([stacked]) .metrics {
      left: auto;
      right: 21px;
      top: 22px;
      bottom: 22px;
      width: 86px;
      justify-content: center;
      align-items: stretch;
    }

    :host([stacked]) .control {
      right: 21px;
      top: 50%;
      bottom: auto;
      transform: translateY(-50%);
    }

    :host([stacked]) .entity-icon {
      position: absolute;
      left: 32px;
      top: 13px;
      width: 20px;
      height: 20px;
      font-size: 20px;
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
