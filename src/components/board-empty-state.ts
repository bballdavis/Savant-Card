import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("savant-board-empty-state")
export class SavantBoardEmptyState extends LitElement {
  protected override render() {
    return html`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }

  public static override styles = css`
    .empty {
      display: grid;
      gap: 6px;
      padding: 22px;
      border-radius: var(--savant-radius);
      background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
      color: var(--primary-text-color);
    }

    span {
      color: var(--secondary-text-color);
    }
  `;
}
