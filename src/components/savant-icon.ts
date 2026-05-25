import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

const ICONS: Record<string, string> = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power:
    "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search:
    "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down:
    "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z",
  minimize_2: "",
};

@customElement("savant-icon")
export class SavantIcon extends LitElement {
  @property({ type: String }) public icon = "flash";

  protected override render() {
    if (this.icon === "minimize_2") {
      return svg`
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 10h-4v-4" />
          <path d="M20 4l-6 6" />
          <path d="M6 14h4v4" />
          <path d="M10 14l-6 6" />
        </svg>
      `;
    }
    return html`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${svg`<path d=${ICONS[this.icon] ?? ICONS.flash}></path>`}
      </svg>
    `;
  }

  public static override styles = css`
    :host {
      display: inline-grid;
      place-items: center;
      width: 100%;
      height: 100%;
      line-height: 1;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "savant-icon": SavantIcon;
  }
}
