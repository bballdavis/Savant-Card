import { describe, expect, it } from "vitest";
import "../../src/components/breaker-tile";

describe("breaker tile component", () => {
  it("registers the custom element", () => {
    expect(customElements.get("savant-breaker-tile")).toBeTruthy();
  });
});
