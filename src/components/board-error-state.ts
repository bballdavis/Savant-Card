import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("savant-board-error-state")
export class SavantBoardErrorState extends LitElement {
  @property({ type: String }) public message = "Unable to load breaker board.";

  protected override render() {
    return html`<div class="error">${this.message}</div>`;
  }

  public static override styles = css`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
}
