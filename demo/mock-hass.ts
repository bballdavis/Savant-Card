import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../src/types/home-assistant";

const names = [
  ["Kitchen Outlets", "Kitchen", 346],
  ["Oven", "Kitchen", 4230],
  ["Refrigerator", "Kitchen", 89],
  ["Dishwasher", "Kitchen", 67],
  ["Garage Door", "Garage", 0],
  ["Pool Pump", "Outdoor", NaN],
  ["Network Closet", "Utility", 38],
  ["Living Room Lights", "Living Room", 152],
  ["HVAC", "Utility", 1320],
  ["Water Heater", "Utility", 450],
  ["EV Charger", "Garage", 2910],
  ["Island Outlets", "Kitchen", 102],
] as const;

export const areas: AreaRegistryEntry[] = [
  { area_id: "kitchen", name: "Kitchen" },
  { area_id: "garage", name: "Garage" },
  { area_id: "outdoor", name: "Outdoor" },
  { area_id: "utility", name: "Utility" },
  { area_id: "living_room", name: "Living Room" },
];

export const devices: DeviceRegistryEntry[] = names.map(([name, area], index) => ({
  id: `breaker_${index + 1}`,
  name,
  area_id: slug(area),
  manufacturer: "Savant",
  model: "Main Panel",
  identifiers: [["savant_energy", `breaker-${index + 1}`]],
}));

export const entities: EntityRegistryEntry[] = names.flatMap(([name, area], index) => {
  const id = `breaker_${index + 1}`;
  const base = slug(name);
  const entries: EntityRegistryEntry[] = [
    {
      entity_id: `sensor.${base}_power`,
      platform: "savant_energy",
      device_id: id,
      area_id: slug(area),
      unique_id: `${id}_power`,
    },
    {
      entity_id: `sensor.${base}_energy`,
      platform: "savant_energy",
      device_id: id,
      area_id: slug(area),
      unique_id: `${id}_energy`,
    },
  ];
  if (name !== "Network Closet") {
    entries.push({
      entity_id: `switch.${base}_breaker`,
      platform: "savant_energy",
      device_id: id,
      area_id: slug(area),
      unique_id: `${id}_switch`,
    });
  }
  return entries;
});

export const states: Record<string, HassEntity> = {};
for (const [index, [name, , watts]] of names.entries()) {
  const base = slug(name);
  states[`sensor.${base}_power`] = {
    entity_id: `sensor.${base}_power`,
    state: Number.isNaN(watts) ? "unavailable" : String(watts),
    attributes: {
      friendly_name: `${name} Power`,
      device_class: "power",
      state_class: "measurement",
      unit_of_measurement: "W",
      panel_name: "Main Panel",
      circuit_number: index + 1,
    },
  };
  states[`sensor.${base}_energy`] = {
    entity_id: `sensor.${base}_energy`,
    state: String((index + 1) * 8.31),
    attributes: {
      friendly_name: `${name} Energy`,
      device_class: "energy",
      state_class: "total_increasing",
      unit_of_measurement: "kWh",
    },
  };
  states[`switch.${base}_breaker`] = {
    entity_id: `switch.${base}_breaker`,
    state: watts === 0 ? "off" : Number.isNaN(watts) ? "unavailable" : "on",
    attributes: { friendly_name: `${name} Breaker` },
  };
}

export function createMockHass(): HomeAssistant {
  return {
    states,
    connection: {
      async sendMessagePromise<T = any>(message: Record<string, any>): Promise<T> {
        if (message.type === "config/entity_registry/list") return entities as T;
        if (message.type === "config/device_registry/list") return devices as T;
        if (message.type === "config/area_registry/list") return areas as T;
        if (message.type === "recorder/statistics_during_period") {
          const entityId = message.statistic_ids[0];
          return { [entityId]: makeHistory(entityId).map((point) => ({ start: new Date(point.start).toISOString(), mean: point.value, max: point.value * 1.08 })) } as T;
        }
        if (message.type === "history/history_during_period") {
          return [makeHistory(message.entity_ids[0]).map((point) => ({ last_changed: new Date(point.start).toISOString(), state: String(point.value) }))] as T;
        }
        return [] as T;
      },
    },
    async callService(domain, service, data) {
      console.info("mock service", domain, service, data);
    },
    async callApi<T = any>(method: string, path: string, data?: any): Promise<T> {
      console.info("mock callApi", method, path, data);
      return undefined as T;
    },
  };
}

function makeHistory(entityId: string) {
  if (entityId.includes("network_closet")) return [];
  const current = Number(states[entityId]?.state);
  if (!Number.isFinite(current)) return [];
  return Array.from({ length: 30 }, (_, index) => {
    const wave = Math.sin(index / 3) * current * 0.16;
    const bump = index > 16 ? current * 0.2 : 0;
    return {
      start: Date.now() - (30 - index) * 60 * 60 * 1000,
      value: Math.max(0, current + wave + bump),
    };
  });
}

function slug(value: string): string {
  return value.toLowerCase().replaceAll(" ", "_");
}
