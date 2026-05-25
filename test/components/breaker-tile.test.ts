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

  it("uses a chart-shaped placeholder while tile statistics are loading", async () => {
    const tile = document.createElement("savant-breaker-tile") as any;
    tile.graphLoading = true;
    tile.breaker = {
      id: "breaker-a",
      name: "Breaker A",
      controllable: false,
      entities: { power: "sensor.breaker_a_power" },
      available: true,
      discoveryConfidence: "high",
    };
    tile.display = {
      label: "Breaker A",
      show_current_power: true,
      show_average_power: true,
      show_maximum_power: true,
      show_energy: false,
      show_sparkline: true,
      show_state: true,
      show_controls: false,
      show_area: false,
      show_circuit_number: false,
      control_mode: "hold",
    };
    tile.hass = {
      states: {
        "sensor.breaker_a_power": { entity_id: "sensor.breaker_a_power", state: "12", attributes: {} },
      },
    };
    document.body.append(tile);
    await tile.updateComplete;

    expect(tile.shadowRoot?.querySelector(".graph-skeleton svg")).toBeTruthy();
    expect(tile.shadowRoot?.querySelector(".graph-skeleton-line")).toBeTruthy();
    expect(tile.shadowRoot?.querySelector(".graph-skeleton-baseline")).toBeNull();
    tile.remove();
  });
});
