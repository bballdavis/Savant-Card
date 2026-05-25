import { LitElement, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { SparklinePoint } from "../types/statistics";

@customElement("savant-sparkline")
export class SavantSparkline extends LitElement {
  @property({ attribute: false }) public points: SparklinePoint[] = [];
  @property({ type: String, reflect: true }) public state: "normal" | "warning" | "muted" = "normal";

  protected override render() {
    const normalized = normalizePoints(this.points);
    const graph = normalized ?? flatline();
    const noHistory = !normalized;
    return svg`
      <svg
        data-no-history=${noHistory ? "true" : "false"}
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="savant-sparkline-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.44"></stop>
            <stop offset="50%" stop-color="currentColor" stop-opacity="0.16"></stop>
            <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${noHistory
          ? ""
          : svg`
              <path class="fill-floor" d=${graph.fillPath}></path>
              <path class="fill-base" d=${graph.fillPath}></path>
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
      opacity: 1;
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
      opacity: 0.9;
    }

    .fill-floor {
      fill: currentColor;
      opacity: 0.04;
    }

    .fill-base {
      fill: url("#savant-sparkline-area");
      opacity: 1;
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
    const y = yForValue(values[0]!, Math.max(1, values[0]!));
    return {
      path: `M 0 ${y} L 100 ${y}`,
      fillPath: `M 0 ${y} L 100 ${y} L 100 36 L 0 36 Z`,
    };
  }
  const max = Math.max(1, ...values);
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    return [x, yForValue(value, max)] as const;
  });
  const path = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const first = coords[0]!;
  const last = coords[coords.length - 1]!;
  return {
    path,
    fillPath: `${path} L ${last[0].toFixed(2)} 36 L ${first[0].toFixed(2)} 36 Z`,
  };
}

function yForValue(value: number, max: number): number {
  return 35 - (Math.max(0, value) / max) * 30;
}

function flatline() {
  return {
    path: "M 0 35 L 100 35",
    fillPath: "M 0 35 L 100 35 L 100 36 L 0 36 Z",
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-sparkline": SavantSparkline;
  }
}
