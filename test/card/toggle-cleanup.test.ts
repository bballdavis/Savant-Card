import { describe, expect, it, vi } from "vitest";
import "../../src/card/savant-energy-breaker-board-card";

describe("toggle request cleanup", () => {
  function cardWith(callService: ReturnType<typeof vi.fn>) {
    const card = document.createElement("savant-energy-breaker-board-card") as any;
    card.hass = { states: { "switch.example": { state: "on" } }, callService };
    card.breakers = [{ id: "example", entities: { switch: "switch.example" } }];
    return card;
  }

  it("clears pending/optimistic state on failure without scheduling a reset", async () => {
    const callService = vi.fn().mockRejectedValue(new Error("offline"));
    const card = cardWith(callService);
    await card.handleToggle(new CustomEvent("toggle", { detail: { breakerId: "example" } }));
    expect(card.pendingSwitches.size).toBe(0);
    expect(card.optimisticSwitchStates.size).toBe(0);
    expect(card.optimisticResetTimers.size).toBe(0);
    expect(card.toggleErrors.get("example")).toBe("Failed to toggle");
    expect(callService).toHaveBeenCalledOnce();
  });

  it("clears pending state and schedules the existing fallback only after success", async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const card = cardWith(callService);
    await card.handleToggle(new CustomEvent("toggle", { detail: { breakerId: "example" } }));
    expect(card.pendingSwitches.size).toBe(0);
    expect(card.optimisticSwitchStates.get("example")).toBe("off");
    expect(card.optimisticResetTimers.size).toBe(1);
    expect(callService).toHaveBeenCalledWith("switch", "turn_off", { entity_id: "switch.example" });
    card.disconnectedCallback();
  });
});
