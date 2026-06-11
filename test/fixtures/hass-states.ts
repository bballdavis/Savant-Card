import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";
import { areas, devices, entities } from "./registries";

export const states: Record<string, HassEntity> = {
  "sensor.kitchen_power": {
    entity_id: "sensor.kitchen_power",
    state: "346",
    attributes: {
      friendly_name: "Kitchen Power",
      device_class: "power",
      state_class: "measurement",
      unit_of_measurement: "W",
      panel_name: "Main",
      circuit_number: 12,
    },
  },
  "sensor.kitchen_energy": {
    entity_id: "sensor.kitchen_energy",
    state: "12.3",
    attributes: { device_class: "energy", unit_of_measurement: "kWh" },
  },
  "switch.kitchen_breaker": {
    entity_id: "switch.kitchen_breaker",
    state: "on",
    attributes: {},
  },
};

export function createHass(): HomeAssistant {
  return {
    states,
    connection: {
      async sendMessagePromise<T = any>(message: Record<string, any>): Promise<T> {
        if (message.type === "config/entity_registry/list") return entities as T;
        if (message.type === "config/device_registry/list") return devices as T;
        if (message.type === "config/area_registry/list") return areas as T;
        if (message.type === "recorder/statistics_during_period") {
          return {
            [message.statistic_ids[0]]: [
              { start: new Date().toISOString(), mean: 100, max: 120 },
              { start: new Date().toISOString(), mean: 200, max: 240 },
            ],
          } as T;
        }
        return [] as T;
      },
    },
    async callService() {},
    async callApi<T = any>(_method: string, _path: string, _data?: any): Promise<T> { return undefined as T; },
  };
}
