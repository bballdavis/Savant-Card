import type { AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryEntry } from "../../src/types/home-assistant";

export const areas: AreaRegistryEntry[] = [{ area_id: "kitchen", name: "Kitchen" }];

export const devices: DeviceRegistryEntry[] = [
  {
    id: "dev1",
    name: "Kitchen Outlets",
    area_id: "kitchen",
    manufacturer: "Savant",
    identifiers: [["savant_energy", "breaker-1"]],
  },
];

export const entities: EntityRegistryEntry[] = [
  {
    entity_id: "sensor.kitchen_power",
    platform: "savant_energy",
    device_id: "dev1",
    area_id: "kitchen",
    unique_id: "power1",
  },
  {
    entity_id: "sensor.kitchen_energy",
    platform: "savant_energy",
    device_id: "dev1",
    area_id: "kitchen",
    unique_id: "energy1",
  },
  {
    entity_id: "switch.kitchen_breaker",
    platform: "savant_energy",
    device_id: "dev1",
    area_id: "kitchen",
    unique_id: "switch1",
  },
];
