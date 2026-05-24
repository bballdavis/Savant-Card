import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { skeletonStyles } from "../styles/skeleton-styles";

@customElement("savant-breaker-tile-skeleton")
export class SavantBreakerTileSkeleton extends LitElement {
  @property({ type: Boolean, reflect: true }) public stacked = false;

  protected override render() {
    return html`
      <div class="bar skeleton"></div>
      <div class="status skeleton"></div>
      <div class="title skeleton"></div>
      <div class="subtitle skeleton"></div>
      <div class="power skeleton"></div>
      <div class="graph skeleton"></div>
      <div class="avg skeleton"></div>
      <div class="max skeleton"></div>
      <div class="control skeleton"></div>
    `;
  }

  public static override styles = [
    skeletonStyles,
    css`
      :host {
        position: relative;
        display: grid;
        aspect-ratio: 1 / 1;
        min-height: 0;
        padding: 16px;
        border-radius: var(--savant-radius);
        background: var(--savant-tile-bg);
        box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.22));
      }

      .status {
        width: 54px;
        height: 12px;
      }

      .title {
        width: 68%;
        height: 18px;
        margin-top: 16px;
      }

      .subtitle {
        width: 45%;
        height: 14px;
        margin-top: 8px;
      }

      .power {
        width: 44%;
        height: 34px;
        margin-top: 22px;
      }

      .graph {
        width: 100%;
        height: 38px;
        margin-top: 10px;
      }

      .avg,
      .max {
        position: absolute;
        bottom: 18px;
        width: 48px;
        height: 28px;
      }

      .avg {
        left: 16px;
      }

      .max {
        left: 92px;
      }

      .control {
        position: absolute;
        right: 16px;
        bottom: 16px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }

      .bar {
        display: none;
      }

      :host([stacked]) {
        aspect-ratio: auto;
        min-height: 132px;
        padding: 14px 14px 14px 28px;
      }

      :host([stacked]) .bar {
        display: block;
        position: absolute;
        left: 10px;
        top: 14px;
        bottom: 14px;
        width: 8px;
      }

      :host([stacked]) .status {
        width: 28px;
        height: 10px;
      }

      :host([stacked]) .title {
        width: 45%;
        margin-top: 4px;
      }

      :host([stacked]) .subtitle {
        width: 34%;
      }

      :host([stacked]) .power {
        width: 26%;
        margin-top: 14px;
      }

      :host([stacked]) .graph {
        width: 62%;
        height: 30px;
        margin-top: 8px;
      }

      :host([stacked]) .avg,
      :host([stacked]) .max {
        bottom: 18px;
        left: auto;
        width: 46px;
        height: 22px;
      }

      :host([stacked]) .avg {
        right: 92px;
      }

      :host([stacked]) .max {
        right: 34px;
      }

      :host([stacked]) .control {
        right: 16px;
        top: 48px;
        bottom: auto;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-breaker-tile-skeleton": SavantBreakerTileSkeleton;
  }
}
