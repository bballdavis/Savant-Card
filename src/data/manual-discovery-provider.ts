import type { DiscoveryProvider } from "./registry-discovery-provider";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant } from "../types/home-assistant";
import type { ManualBreakerConfig } from "../types/config";

export class ManualDiscoveryProvider implements DiscoveryProvider {
  public constructor(private manualBreakers: ManualBreakerConfig[]) {}

  public async discover(hass: HomeAssistant): Promise<DiscoveredBreaker[]> {
    return this.manualBreakers.map((item) => {
      const entities = {
        switch: item.switch_entity,
        power: item.power_entity,
        energy: item.energy_entity,
        voltage: item.voltage_entity,
        current: item.current_entity,
      };
      return {
        id: `manual:${item.id}`,
        name: item.name,
        areaName: item.area_name,
        panelName: item.panel_name,
        circuitNumber: item.circuit_number,
        controllable: Boolean(item.switch_entity),
        entities,
        available: Object.values(entities).some(
          (entityId) => entityId && hass.states[entityId]?.state !== "unavailable",
        ),
        discoveryConfidence: "manual",
      };
    });
  }
}
