import { describe, expect, it } from "vitest";
import "../../src/index";

describe("card picker registration", () => {
  it("registers the card with Home Assistant's custom card picker metadata", () => {
    expect(window.customCards).toContainEqual(
      expect.objectContaining({
        type: "savant-energy-breaker-board-card",
        name: "Savant Energy Breaker Board",
        preview: true,
      }),
    );
  });
});
