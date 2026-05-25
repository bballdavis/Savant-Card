import type { SavantBreakerBoardConfig } from "../types/config";

export const DEFAULT_CONFIG: SavantBreakerBoardConfig = {
  type: "custom:savant-energy-breaker-board-card",
  title: "Electrical Panel",
  discovery: {
    enabled: true,
    integration: "savant_energy",
    include_new_breakers: true,
    panel_filter: null,
    area_filter: null,
  },
  layout: {
    group_by: "none",
    sort_by: "circuit_number",
    density: "comfortable",
    mobile_view: "standard",
  },
  display: {
    show_title: true,
    show_current_power: true,
    show_average_power: true,
    show_maximum_power: true,
    show_energy: false,
    show_sparkline: true,
    show_icon: true,
    show_state: true,
    show_controls: true,
    show_area: true,
    show_circuit_number: true,
  },
  graph: {
    period: "24h",
    refresh_interval_seconds: 300,
  },
  controls: {
    default_mode: "hold_confirm_off",
    warning_load_threshold_watts: 1000,
    high_load_threshold_watts: 2000,
  },
  excluded_breakers: [],
  breaker_overrides: {},
  manual_breakers: [],
};
