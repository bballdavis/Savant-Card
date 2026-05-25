export type GroupBy = "none" | "panel" | "area" | "panel_then_area";
export type SortBy = "circuit_number" | "name" | "current_power_descending" | "highest_usage" | "manual";
export type Density = "comfortable" | "compact";
export type MobileView = "standard" | "ultra_compact";
export type GraphPeriod = "1h" | "6h" | "12h" | "24h" | "7d";
export type ControlMode = "hidden" | "hold" | "hold_confirm_off";

export interface DiscoveryConfig {
  enabled: boolean;
  integration: string;
  include_new_breakers: boolean;
  panel_filter: string | null;
  area_filter: string | null;
}

export interface LayoutConfig {
  group_by: GroupBy;
  sort_by: SortBy;
  density: Density;
  mobile_view: MobileView;
}

export interface DisplayConfig {
  show_title: boolean;
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
}

export interface GraphConfig {
  period: GraphPeriod;
  refresh_interval_seconds: number;
}

export interface ControlsConfig {
  default_mode: ControlMode;
  warning_load_threshold_watts?: number;
  high_load_threshold_watts?: number;
}

export interface BreakerOverrideConfig {
  label?: string;
  show_current_power?: boolean;
  show_average_power?: boolean;
  show_maximum_power?: boolean;
  show_energy?: boolean;
  show_sparkline?: boolean;
  show_icon?: boolean;
  show_controls?: boolean;
  control_mode?: ControlMode;
}

export interface ManualBreakerConfig {
  id: string;
  name: string;
  switch_entity?: string;
  power_entity?: string;
  energy_entity?: string;
  voltage_entity?: string;
  current_entity?: string;
  area_name?: string;
  panel_name?: string;
  circuit_number?: number;
}

export interface SavantBreakerBoardConfig {
  type?: "custom:savant-energy-breaker-board-card";
  title?: string;
  discovery: DiscoveryConfig;
  layout: LayoutConfig;
  display: DisplayConfig;
  graph: GraphConfig;
  controls: ControlsConfig;
  excluded_breakers: string[];
  breaker_overrides: Record<string, BreakerOverrideConfig>;
  manual_breakers: ManualBreakerConfig[];
}

export type PartialSavantBreakerBoardConfig = Partial<
  Omit<SavantBreakerBoardConfig, "discovery" | "layout" | "display" | "graph" | "controls">
> & {
  discovery?: Partial<DiscoveryConfig>;
  layout?: Partial<LayoutConfig>;
  display?: Partial<DisplayConfig>;
  graph?: Partial<GraphConfig>;
  controls?: Partial<ControlsConfig>;
};
