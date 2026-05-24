import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("savant-breaker-group")
export class SavantBreakerGroup extends LitElement {
  @property({ type: String }) public override title = "";

  protected override render() {
    return html`<slot></slot>`;
  }
}
