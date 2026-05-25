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

  it("renders off breakers red with a muted zero sparkline", async () => {
    const tile = document.createElement("savant-breaker-tile") as any;
    tile.breaker = {
      id: "breaker-a",
      name: "Breaker A",
      controllable: true,
      entities: { power: "sensor.breaker_a_power", switch: "switch.breaker_a" },
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
      show_icon: true,
      show_state: true,
      show_controls: true,
      show_area: false,
      show_circuit_number: false,
      control_mode: "hold",
    };
    tile.statistics = {
      entityId: "sensor.breaker_a_power",
      period: "24h",
      points: [{ start: 1, value: 200 }, { start: 2, value: 500 }],
      averageWatts: 350,
      maximumWatts: 500,
      loading: false,
    };
    tile.hass = {
      states: {
        "sensor.breaker_a_power": { entity_id: "sensor.breaker_a_power", state: "0", attributes: {} },
        "switch.breaker_a": { entity_id: "switch.breaker_a", state: "off", attributes: {} },
      },
    };
    document.body.append(tile);
    await tile.updateComplete;
    const sparkline = tile.shadowRoot?.querySelector("savant-sparkline") as any;
    await sparkline.updateComplete;

    expect(tile.shadowRoot?.querySelector(".tile")?.className).toContain("off");
    expect(sparkline.getAttribute("state")).toBe("muted");
    expect(sparkline.shadowRoot?.querySelector(".line")?.getAttribute("d")).toBe("M 0.00 33.00 L 100.00 33.00");
    tile.remove();
  });

  it("keeps the control status green while high load only colors the chart", async () => {
    const tile = document.createElement("savant-breaker-tile") as any;
    tile.warningLoadThresholdWatts = 1000;
    tile.highLoadThresholdWatts = 2000;
    tile.breaker = {
      id: "breaker-a",
      name: "Breaker A",
      controllable: true,
      entities: { power: "sensor.breaker_a_power", switch: "switch.breaker_a" },
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
      show_icon: true,
      show_state: true,
      show_controls: true,
      show_area: false,
      show_circuit_number: false,
      control_mode: "hold",
    };
    tile.statistics = {
      entityId: "sensor.breaker_a_power",
      period: "24h",
      points: [{ start: 1, value: 2100 }, { start: 2, value: 2500 }],
      averageWatts: 2300,
      maximumWatts: 2500,
      loading: false,
    };
    tile.hass = {
      states: {
        "sensor.breaker_a_power": { entity_id: "sensor.breaker_a_power", state: "2500", attributes: {} },
        "switch.breaker_a": { entity_id: "switch.breaker_a", state: "on", attributes: {} },
      },
    };
    document.body.append(tile);
    await tile.updateComplete;
    const sparkline = tile.shadowRoot?.querySelector("savant-sparkline") as any;

    expect(tile.shadowRoot?.querySelector(".tile")?.className).toContain("on");
    expect(tile.shadowRoot?.querySelector(".tile")?.className).not.toContain("high_load");
    expect(sparkline.getAttribute("state")).toBe("warning");
    tile.remove();
  });
});
