import { associateBreakers } from "./entity-association";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant, RegistrySnapshot } from "../types/home-assistant";

export interface DiscoveryProvider {
  discover(hass: HomeAssistant): Promise<DiscoveredBreaker[]>;
}

export class RegistryDiscoveryProvider implements DiscoveryProvider {
  public constructor(private integration: string) {}

  public async discover(hass: HomeAssistant): Promise<DiscoveredBreaker[]> {
    const snapshot = await loadRegistries(hass);
    return associateBreakers({
      ...snapshot,
      states: hass.states,
      integration: this.integration,
    });
  }
}

export async function loadRegistries(hass: HomeAssistant): Promise<RegistrySnapshot> {
  const connection = hass.connection;
  if (!connection?.sendMessagePromise) {
    return { entities: [], devices: [], areas: [] };
  }

  const [entities, devices, areas] = await Promise.all([
    connection.sendMessagePromise({ type: "config/entity_registry/list" }),
    connection.sendMessagePromise({ type: "config/device_registry/list" }),
    connection.sendMessagePromise({ type: "config/area_registry/list" }),
  ]);

  return {
    entities,
    devices,
    areas,
  };
}
