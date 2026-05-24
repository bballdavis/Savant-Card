import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { SparklinePoint } from "../types/statistics";

@customElement("savant-sparkline")
export class SavantSparkline extends LitElement {
  @property({ attribute: false }) public points: SparklinePoint[] = [];
  @property({ type: String }) public state: "normal" | "warning" | "muted" = "normal";

  protected override render() {
    const normalized = normalizePoints(this.points);
    const graph = normalized ?? flatline();
    const noHistory = !normalized;
    return html`
      <svg
        data-no-history=${noHistory ? "true" : "false"}
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="savant-sparkline-fill" x1="0" x2="0" y1="0" y2="1">
            <stop class="fill-stop-strong" offset="0%"></stop>
            <stop class="fill-stop-soft" offset="62%"></stop>
            <stop class="fill-stop-clear" offset="100%"></stop>
          </linearGradient>
        </defs>
        ${noHistory
          ? ""
          : html`
              <path class="fill-base" d=${graph.fillPath}></path>
              <path class="fill" fill="url(#savant-sparkline-fill)" d=${graph.fillPath}></path>
            `}
        <path class="line" d=${graph.path}></path>
      </svg>
    `;
  }

  public static override styles = css`
    :host {
      display: block;
      min-height: 32px;
      color: var(--savant-success);
      --sparkline-fill-color: var(--savant-success);
      opacity: 0.82;
    }

    :host([state="warning"]) {
      color: var(--savant-warning);
      --sparkline-fill-color: var(--savant-warning);
    }

    :host([state="muted"]) {
      color: var(--savant-disabled);
      --sparkline-fill-color: var(--savant-disabled);
    }

    svg {
      width: 100%;
      height: 100%;
      min-height: 32px;
      color: currentColor;
      overflow: hidden;
    }

    .line {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.45;
      vector-effect: non-scaling-stroke;
    }

    .fill {
      opacity: 1;
    }

    .fill-base {
      fill: currentColor;
      opacity: 0.26;
    }

    .fill-stop-strong {
      stop-color: var(--sparkline-fill-color);
      stop-opacity: 0.36;
    }

    .fill-stop-soft {
      stop-color: var(--sparkline-fill-color);
      stop-opacity: 0.17;
    }

    .fill-stop-clear {
      stop-color: var(--sparkline-fill-color);
      stop-opacity: 0;
    }

    svg[data-no-history="true"] .line {
      stroke-width: 1.1;
      opacity: 0.82;
      filter: none;
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
    const y = 23 - ((value - min) / range) * 18;
    return [x, max === min ? 20 : y] as const;
  });
  const path = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const first = coords[0]!;
  const last = coords[coords.length - 1]!;
  return {
    path,
    fillPath: `${path} L ${last[0].toFixed(2)} 36 L ${first[0].toFixed(2)} 36 Z`,
  };
}

function flatline() {
  return {
    path: "M 0 20 L 100 20",
    fillPath: "M 0 20 L 100 20 L 100 36 L 0 36 Z",
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-sparkline": SavantSparkline;
  }
}
