import { describe, expect, it } from "vitest";
import "../../src/components/breaker-tile";
import "../../src/components/breaker-tile-skeleton";

describe("breaker tile component", () => {
  it("registers the custom element", () => {
    expect(customElements.get("savant-breaker-tile")).toBeTruthy();
  });

  it("uses a chart-shaped skeleton for the sparkline placeholder", async () => {
    const skeleton = document.createElement("savant-breaker-tile-skeleton");
    document.body.append(skeleton);
    await skeleton.updateComplete;

    expect(skeleton.shadowRoot?.querySelector(".graph svg")).toBeTruthy();
    expect(skeleton.shadowRoot?.querySelector(".graph-line")).toBeTruthy();
    expect(skeleton.shadowRoot?.querySelector(".graph-fill")).toBeTruthy();
    skeleton.remove();
  });
});
