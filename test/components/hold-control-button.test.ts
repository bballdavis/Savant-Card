import { describe, expect, it, vi } from "vitest";
import "../../src/components/hold-control-button";

describe("hold control button", () => {
  it("does not show a second confirmation after a completed hold", async () => {
    const element = document.createElement("savant-hold-control-button");
    element.breakerId = "breaker-a";
    element.label = "Kitchen";
    element.switchState = "on";
    element.mode = "hold_confirm_off";
    const confirm = vi.spyOn(window, "confirm");
    const toggle = vi.fn();
    element.addEventListener("savant-breaker-toggle", toggle);
    document.body.append(element);
    await element.updateComplete;

    (element as any).requestToggle();

    expect(confirm).not.toHaveBeenCalled();
    expect(toggle).toHaveBeenCalledOnce();
    element.remove();
  });
});
