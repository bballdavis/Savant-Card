import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  computeBreakerEnergy,
  formatKwh,
  formatBatteryPercent,
} from "../data/scene-energy-calculator";
import type { BreakerStatistics } from "../types/statistics";
import { fireEvent } from "../utilities/events";

@customElement("savant-scene-breaker-row")
export class SavantSceneBreakerRow extends LitElement {
  @property({ type: String }) name = "";
  @property({ type: String }) entityId = "";
  @property({ type: Boolean }) isOn = false;
  @property({ type: Number }) averageWatts?: number;
  @property({ type: Number }) batteryCapacityKwh?: number;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) controllable = true;

  private handleClick(): void {
    if (!this.controllable) return;
    fireEvent(this, "savant-scene-toggle", {
      entityId: this.entityId,
      newState: !this.isOn,
    });
  }

  protected override render() {
    const energy = this.isOn && this.averageWatts !== undefined
      ? computeBreakerEnergy(
          { averageWatts: this.averageWatts } as BreakerStatistics,
          this.batteryCapacityKwh,
        )
      : undefined;

    return html`
      <button
        class="row ${this.isOn ? "on" : "off"}${!this.controllable ? " locked" : ""}"
        ?disabled=${!this.controllable}
        @click=${this.handleClick}
      >
        <span class="status-bar" aria-hidden="true"></span>
        <span class="body">
          <span class="header">
            <span class="name">${this.name}</span>
            <span class="badge ${this.isOn ? "on" : "off"}">${this.isOn ? "ON" : "OFF"}</span>
          </span>
          ${this.renderStats(energy)}
        </span>
        ${!this.controllable ? this.renderLockIcon() : ""}
      </button>
    `;
  }

  private renderStats(
    energy?: {
      averageKwPerHour?: number;
      batteryDrainPercentPerHour?: number;
    },
  ) {
    if (!this.isOn) return "";

    if (this.loading) {
      return html`<span class="stats"><span class="stats-line muted">Loading…</span></span>`;
    }

    if (this.averageWatts === undefined) {
      return html`<span class="stats"><span class="stats-line muted">No data</span></span>`;
    }

    const parts: string[] = [];
    const kwhPerHour = energy?.averageKwPerHour;
    const batteryPct = energy?.batteryDrainPercentPerHour;

    if (kwhPerHour !== undefined) {
      parts.push(`${formatKwh(kwhPerHour)}/h`);
    }
    if (batteryPct !== undefined) {
      parts.push(formatBatteryPercent(batteryPct));
    }

    return html`
      <span class="stats">
        <span class="stats-line">${parts.join("  ·  ")}</span>
      </span>
    `;
  }

  private renderLockIcon() {
    return html`
      <span class="lock-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M15.1,8H8.9V6A3.1,3.1 0 0,1 12,2.9A3.1,3.1 0 0,1 15.1,6V8Z"
          />
        </svg>
      </span>
    `;
  }

  public static override styles = css`
    :host {
      display: block;
      --status-color: var(--savant-success);
      --savant-text-halo:
        0 0 2px var(--savant-tile-bg),
        0 1px 1px var(--savant-tile-bg),
        1px 0 1px var(--savant-tile-bg),
        0 -1px 1px var(--savant-tile-bg),
        -1px 0 1px var(--savant-tile-bg);
      --savant-text-outline-color: var(--savant-tile-bg);
    }

    .row {
      display: flex;
      align-items: stretch;
      width: 100%;
      min-width: 0;
      padding: 8px 14px;
      text-align: left;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--savant-tile-bg-strong) 60%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
      box-shadow: var(--savant-shadow-sm);
      color: var(--savant-tile-fg);
      font-family: var(--savant-font-family, Inter, "SF Pro Display", "SF Pro Text", Roboto, "Helvetica Neue", Arial, sans-serif);
      font-weight: 400;
      cursor: pointer;
      transition: box-shadow 200ms ease;
      gap: 12px;
    }

    .row:hover {
      filter: brightness(1.04);
    }

    .row.off {
      --status-color: var(--savant-disabled);
    }

    .row.locked {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .status-bar {
      display: block;
      flex: none;
      width: 7px;
      align-self: stretch;
      border-radius: 999px;
      background: var(--status-color);
    }

    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      gap: 2px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .name {
      font-size: 15px;
      font-weight: 500;
      line-height: 1.22;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: var(--savant-text-halo);
      -webkit-text-stroke: 4px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    .badge {
      flex: none;
      width: fit-content;
      min-width: 32px;
      height: 20px;
      padding: 0 8px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      line-height: 1;
    }

    .badge.on {
      background: var(--savant-success);
      color: white;
    }

    .badge.off {
      background: var(--savant-disabled);
      color: var(--savant-muted);
    }

    .stats {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .stats-line {
      font-size: 12px;
      color: var(--savant-muted);
      line-height: 1.2;
    }

    .stats-line.muted {
      font-style: italic;
    }

    .lock-icon {
      flex: none;
      width: 16px;
      height: 16px;
      align-self: center;
      color: var(--savant-muted);
      opacity: 0.6;
    }

    .lock-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-scene-breaker-row": SavantSceneBreakerRow;
  }
}
