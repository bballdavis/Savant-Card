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
              ${graph.fillPath ? svg`<path class="fill-base" d=${graph.fillPath}></path>` : ""}
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
  if (values.every((value) => Math.max(0, value) === 0)) return zeroLine(values.length);
  if (values.length === 1) {
    const y = yForValue(values[0]!, domainMax(values));
    const value = Math.max(0, values[0]!);
    return {
      path: `M 0 ${y} L 100 ${y}`,
      fillPath: value > 0 ? `M 0 ${y} L 100 ${y} L 100 36 L 0 36 Z` : "",
    };
  }
  const max = domainMax(values);
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const normalizedValue = Math.max(0, value);
    return [x, normalizedValue === 0 ? ZERO_Y : yForValue(value, max), normalizedValue] as const;
  });
  const path = linePath(coords);
  return {
    path,
    fillPath: fillSegments(coords),
  };
}

function yForValue(value: number, max: number): number {
  return ZERO_Y - (Math.max(0, value) / max) * (ZERO_Y - TOP_Y);
}

function domainMax(values: number[]): number {
  return Math.max(1, ...values) * 1.25;
}

function flatline() {
  return {
    path: `M 0 ${ZERO_Y} L 100 ${ZERO_Y}`,
    fillPath: "",
  };
}

function zeroLine(count: number) {
  if (count <= 1) {
    return {
      path: `M 0 ${ZERO_Y} L 100 ${ZERO_Y}`,
      fillPath: "",
    };
  }
  const path = Array.from({ length: count }, (_, index) => {
    const x = (index / (count - 1)) * 100;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${ZERO_Y.toFixed(2)}`;
  }).join(" ");
  return { path, fillPath: "" };
}

const TOP_Y = 6;
const ZERO_Y = 29;

function linePath(coords: Array<readonly [number, number, number]>): string {
  if (coords.every(([, , value]) => value === 0)) {
    return coords.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  }

  const segments: string[] = [];
  for (let index = 1; index < coords.length; index += 1) {
    const previous = coords[index - 1]!;
    const current = coords[index]!;
    segments.push(`M ${previous[0].toFixed(2)} ${previous[1].toFixed(2)} L ${current[0].toFixed(2)} ${current[1].toFixed(2)}`);
  }
  return segments.join(" ");
}

function fillSegments(coords: Array<readonly [number, number, number]>): string {
  const segments: string[] = [];
  for (let index = 1; index < coords.length; index += 1) {
    const previous = coords[index - 1]!;
    const current = coords[index]!;
    if (previous[2] === 0 && current[2] === 0) continue;
    segments.push(
      [
        `M ${previous[0].toFixed(2)} ${previous[1].toFixed(2)}`,
        `L ${current[0].toFixed(2)} ${current[1].toFixed(2)}`,
        `L ${current[0].toFixed(2)} 36`,
        `L ${previous[0].toFixed(2)} 36`,
        "Z",
      ].join(" "),
    );
  }
  return segments.join(" ");
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-sparkline": SavantSparkline;
  }
}
