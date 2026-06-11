export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface EntityRegistryEntry {
  entity_id: string;
  unique_id?: string;
  platform?: string;
  device_id?: string;
  area_id?: string;
  name?: string | null;
  original_name?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  area_id?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  identifiers?: Array<[string, string]>;
  connections?: Array<[string, string]>;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connection?: {
    sendMessagePromise<T = any>(message: Record<string, any>): Promise<T>;
  };
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  callApi<T = any>(method: string, path: string, data?: any): Promise<T>;
  localize?: (key: string, ...args: any[]) => string;
}

export interface RegistrySnapshot {
  entities: EntityRegistryEntry[];
  devices: DeviceRegistryEntry[];
  areas: AreaRegistryEntry[];
}
