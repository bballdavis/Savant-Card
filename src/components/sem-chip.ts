import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant } from "../types/home-assistant";
import { formatPower, parseNumber } from "../utilities/format-power";
import "./savant-icon";

@customElement("savant-sem-chip")
export class SavantSemChip extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public breaker?: DiscoveredBreaker;

  protected override render() {
    const sem = this.breaker?.semMetrics;
    if (!this.breaker || !sem) return nothing;
    return html`
      <article class="sem-chip">
        <div class="node top">${this.metric("Solar", "flash", sem.solar)}</div>
        <div class="node left">${this.metric("Battery", "power", sem.batteryPower)}</div>
        <div class="node center">${this.metric("Home Load", "power", sem.homeLoad)}</div>
        <div class="node right">${this.metric("Grid", "flash", sem.grid)}</div>
        <div class="node bottom">
          ${sem.batterySoc ? this.percentMetric("Battery SoC", "power", sem.batterySoc) : nothing}
        </div>
      </article>
    `;
  }

  private metric(label: string, icon: string, entityId?: string) {
    const watts = entityId ? parseNumber(this.hass?.states[entityId]?.state) : undefined;
    return html`<div class="metric"><savant-icon .icon=${icon}></savant-icon><span>${label}</span><strong>${formatPower(watts)}</strong></div>`;
  }

  private percentMetric(label: string, icon: string, entityId: string) {
    const pct = parseNumber(this.hass?.states[entityId]?.state);
    return html`<div class="metric"><savant-icon .icon=${icon}></savant-icon><span>${label}</span><strong>${pct === undefined ? "--" : `${Math.round(pct)}%`}</strong></div>`;
  }

  public static override styles = css`
    .sem-chip {
      position: relative;
      min-height: 170px;
      padding: 12px;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background: var(--savant-tile-bg);
      box-shadow: var(--savant-shadow-sm);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto auto auto;
      gap: 8px;
      grid-column: 1 / -1;
    }
    .sem-chip::before,
    .sem-chip::after {
      content: "";
      position: absolute;
      pointer-events: none;
      background: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    }
    .sem-chip::before { left: 50%; top: 42px; width: 1px; height: 84px; transform: translateX(-0.5px); }
    .sem-chip::after { left: 22%; right: 22%; top: 84px; height: 1px; }
    .node.top { grid-column: 2; grid-row: 1; }
    .node.left { grid-column: 1; grid-row: 2; }
    .node.center { grid-column: 2; grid-row: 2; }
    .node.right { grid-column: 3; grid-row: 2; }
    .node.bottom { grid-column: 2; grid-row: 3; }
    .metric {
      position: relative;
      z-index: 1;
      display: grid;
      justify-items: center;
      gap: 2px;
      text-align: center;
      padding: 6px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--savant-card-bg) 88%, var(--savant-app-bg));
    }
    .metric savant-icon { width: 14px; height: 14px; }
    .metric span { font-size: 11px; color: var(--secondary-text-color); }
    .metric strong { font-size: 13px; font-weight: 700; color: var(--primary-text-color); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-sem-chip": SavantSemChip;
  }
}
