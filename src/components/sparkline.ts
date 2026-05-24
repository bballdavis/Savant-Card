import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { SparklinePoint } from "../types/statistics";

@customElement("savant-sparkline")
export class SavantSparkline extends LitElement {
  @property({ attribute: false }) public points: SparklinePoint[] = [];
  @property({ type: String }) public state: "normal" | "warning" | "muted" = "normal";

  protected override render() {
    const normalized = normalizePoints(this.points);
    if (!normalized) return html`<div class="empty">No history available</div>`;
    const { path, fillPath } = normalized;
    return html`
      <svg viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
        <path class="fill" d=${fillPath}></path>
        <path class="line" d=${path}></path>
      </svg>
    `;
  }

  public static override styles = css`
    :host {
      display: block;
      min-height: 32px;
      color: var(--savant-success);
      opacity: 0.78;
    }

    :host([state="warning"]) {
      color: var(--savant-warning);
    }

    :host([state="muted"]) {
      color: var(--savant-disabled);
    }

    svg {
      width: 100%;
      height: 100%;
      min-height: 32px;
      overflow: visible;
    }

    .line {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      vector-effect: non-scaling-stroke;
      filter: drop-shadow(0 0 8px currentColor);
    }

    .fill {
      fill: currentColor;
      opacity: 0.15;
    }

    .empty {
      color: var(--secondary-text-color);
      font-size: 13px;
      padding-top: 8px;
    }
  `;
}

export function normalizePoints(points: SparklinePoint[]):
  | {
      path: string;
      fillPath: string;
    }
  | undefined {
  const values = points.map((point) => point.value).filter(Number.isFinite);
  if (!values.length) return undefined;
  if (values.length === 1) {
    const y = 18;
    return {
      path: `M 0 ${y} L 100 ${y}`,
      fillPath: `M 0 ${y} L 100 ${y} L 100 36 L 0 36 Z`,
    };
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 32 - ((value - min) / range) * 26;
    return [x, max === min ? 24 : y] as const;
  });
  const path = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const first = coords[0]!;
  const last = coords[coords.length - 1]!;
  return {
    path,
    fillPath: `${path} L ${last[0].toFixed(2)} 36 L ${first[0].toFixed(2)} 36 Z`,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-sparkline": SavantSparkline;
  }
}
