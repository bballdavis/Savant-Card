import { describe, expect, it } from "vitest";
import { associateBreakers, roleForEntity } from "../../src/data/entity-association";
import { areas, devices, entities } from "../fixtures/registries";
import { states } from "../fixtures/hass-states";

describe("entity association", () => {
  it("detects entity roles from domain and device class", () => {
    expect(roleForEntity("switch.kitchen_breaker", states["switch.kitchen_breaker"])).toBe("switch");
    expect(roleForEntity("sensor.kitchen_power", states["sensor.kitchen_power"])).toBe("power");
    expect(roleForEntity("sensor.kitchen_energy", states["sensor.kitchen_energy"])).toBe("energy");
  });

  it("groups Savant entities by device", () => {
    const breakers = associateBreakers({ entities, devices, areas, states, integration: "savant_energy" });
    expect(breakers).toHaveLength(1);
    expect(breakers[0]?.entities.power).toBe("sensor.kitchen_power");
    expect(breakers[0]?.entities.switch).toBe("switch.kitchen_breaker");
    expect(breakers[0]?.circuitNumber).toBe(12);
  });
});
