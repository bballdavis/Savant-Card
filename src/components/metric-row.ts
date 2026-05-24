import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("savant-metric-row")
export class SavantMetricRow extends LitElement {
  @property({ type: String }) public avg = "--";
  @property({ type: String }) public max = "--";

  protected override render() {
    return html`
      <div class="metric">
        <span>AVG</span>
        <strong>${this.avg}</strong>
      </div>
      <div class="metric">
        <span>MAX</span>
        <strong>${this.max}</strong>
      </div>
    `;
  }

  public static override styles = css`
    :host {
      display: flex;
      align-items: end;
      gap: 24px;
      min-width: 0;
    }

    .metric {
      display: grid;
      gap: 3px;
      min-width: 48px;
    }

    span {
      color: var(--savant-muted);
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0.02em;
    }

    strong {
      color: var(--savant-tile-fg);
      font-size: 15px;
      font-weight: 500;
      line-height: 1.1;
      white-space: nowrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-metric-row": SavantMetricRow;
  }
}
