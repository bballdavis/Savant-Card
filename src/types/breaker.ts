export type BreakerEntityRole = "switch" | "power" | "energy" | "voltage" | "current";

export interface DiscoveredBreaker {
  id: string;
  deviceId?: string;
  name: string;
  areaId?: string;
  areaName?: string;
  panelName?: string;
  circuitNumber?: number;
  controllable: boolean;
  entities: Partial<Record<BreakerEntityRole, string>>;
  available: boolean;
  discoveryConfidence: "high" | "medium" | "manual";
  discoveryNotes?: string[];
}

export interface ResolvedBreakerDisplay {
  label: string;
  show_current_power: boolean;
  show_average_power: boolean;
  show_maximum_power: boolean;
  show_energy: boolean;
  show_sparkline: boolean;
  show_icon: boolean;
  show_state: boolean;
  show_controls: boolean;
  show_area: boolean;
  show_circuit_number: boolean;
  control_mode: "hidden" | "hold" | "hold_confirm_off";
}

export interface BreakerRuntimeState {
  switchState?: string;
  powerWatts?: number;
  energyValue?: number;
  available: boolean;
}

export type BreakerVisualState =
  | "on"
  | "off"
  | "high_load"
  | "unavailable"
  | "pending"
  | "error";
