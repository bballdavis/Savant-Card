import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  HassEntity,
} from "../types/home-assistant";
import type { BreakerEntityRole, DiscoveredBreaker } from "../types/breaker";

export interface AssociationInput {
  entities: EntityRegistryEntry[];
  devices: DeviceRegistryEntry[];
  areas: AreaRegistryEntry[];
  states: Record<string, HassEntity>;
  integration: string;
}

export function roleForEntity(entityId: string, state?: HassEntity): BreakerEntityRole | undefined {
  const domain = entityId.split(".")[0];
  const deviceClass = state?.attributes.device_class;
  if (domain === "switch") return "switch";
  if (domain !== "sensor") return undefined;
  if (deviceClass === "power") return "power";
  if (deviceClass === "energy") return "energy";
  if (deviceClass === "voltage") return "voltage";
  if (deviceClass === "current") return "current";
  return undefined;
}

export function associateBreakers(input: AssociationInput): DiscoveredBreaker[] {
  const devices = new Map(input.devices.map((device) => [device.id, device]));
  const areas = new Map(input.areas.map((area) => [area.area_id, area.name]));
  const byDevice = new Map<string, EntityRegistryEntry[]>();
  const fallbackEntities: EntityRegistryEntry[] = [];

  for (const entry of input.entities) {
    if (entry.disabled_by || entry.hidden_by) continue;
    if (!isLikelySavantEntry(entry, devices.get(entry.device_id ?? ""), input.integration)) continue;
    if (entry.device_id) {
      const list = byDevice.get(entry.device_id) ?? [];
      list.push(entry);
      byDevice.set(entry.device_id, list);
    } else {
      fallbackEntities.push(entry);
    }
  }

  const breakers: DiscoveredBreaker[] = [];
  for (const [deviceId, entries] of byDevice) {
    const breaker = buildBreakerFromEntries(deviceId, entries, devices.get(deviceId), areas, input.states);
    if (breaker) breakers.push(breaker);
  }

  for (const entry of fallbackEntities) {
    const role = roleForEntity(entry.entity_id, input.states[entry.entity_id]);
    if (!role) continue;
    breakers.push({
      id: stableFallbackId(entry),
      name: friendlyName(entry, input.states[entry.entity_id]),
      areaId: entry.area_id,
      areaName: entry.area_id ? areas.get(entry.area_id) : undefined,
      controllable: role === "switch",
      entities: { [role]: entry.entity_id },
      available: input.states[entry.entity_id]?.state !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."],
    });
  }

  return breakers;
}

function isLikelySavantEntry(
  entry: EntityRegistryEntry,
  device: DeviceRegistryEntry | undefined,
  integration: string,
): boolean {
  if (entry.platform === integration) return true;
  const manufacturer = (device?.manufacturer ?? "").toLowerCase();
  const identifiers = device?.identifiers?.flat().join(" ").toLowerCase() ?? "";
  return manufacturer.includes("savant") || identifiers.includes(integration.toLowerCase());
}

function buildBreakerFromEntries(
  deviceId: string,
  entries: EntityRegistryEntry[],
  device: DeviceRegistryEntry | undefined,
  areas: Map<string, string>,
  states: Record<string, HassEntity>,
): DiscoveredBreaker | undefined {
  const mapped: DiscoveredBreaker["entities"] = {};
  const notes: string[] = [];

  for (const entry of entries) {
    const role = roleForEntity(entry.entity_id, states[entry.entity_id]);
    if (!role || mapped[role]) continue;
    mapped[role] = entry.entity_id;
  }

  if (!Object.keys(mapped).length) return undefined;
  const representative = entries.find((entry) => entry.entity_id === mapped.power) ?? entries[0];
  const areaId = representative?.area_id ?? device?.area_id ?? undefined;
  const attrs = representative ? states[representative.entity_id]?.attributes : {};
  const circuitNumber = parseCircuitNumber(attrs?.circuit_number ?? attrs?.circuit);
  const panelName = firstString(attrs?.panel_name, attrs?.panel, device?.model);

  if (!mapped.power) notes.push("No power sensor with device_class: power was found.");
  if (!mapped.switch) notes.push("No switch entity was found for breaker control.");

  return {
    id: `device:${deviceId}`,
    deviceId,
    name: device?.name_by_user || device?.name || friendlyName(representative, representative ? states[representative.entity_id] : undefined),
    areaId,
    areaName: areaId ? areas.get(areaId) : undefined,
    panelName,
    circuitNumber,
    controllable: Boolean(mapped.switch),
    entities: mapped,
    available: Object.values(mapped).some((entityId) => states[entityId]?.state !== "unavailable"),
    discoveryConfidence: mapped.power && mapped.switch ? "high" : "medium",
    discoveryNotes: notes.length ? notes : undefined,
  };
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === "string" && value.length > 0);
}

function parseCircuitNumber(value: unknown): number | undefined {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function stableFallbackId(entry: EntityRegistryEntry): string {
  return entry.unique_id ? `entity:${entry.unique_id}` : `entity:${entry.entity_id}`;
}

function friendlyName(entry?: EntityRegistryEntry, state?: HassEntity): string {
  return (
    entry?.name ||
    entry?.original_name ||
    state?.attributes.friendly_name ||
    entry?.entity_id ||
    "Savant breaker"
  );
}
