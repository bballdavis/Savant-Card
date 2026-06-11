import { DEFAULT_CONFIG } from "./defaults";
import { deepMerge } from "../utilities/deep-merge";
import type {
  BreakerOverrideConfig,
  PartialSavantBreakerBoardConfig,
  SavantBreakerBoardConfig,
  ScenesConfig,
} from "../types/config";
import type { DiscoveredBreaker, ResolvedBreakerDisplay } from "../types/breaker";

const PERIODS = new Set(["1h", "6h", "12h", "24h", "7d"]);
const MOBILE_VIEWS = new Set(["standard", "ultra_compact"]);

export function normalizeConfig(
  raw?: PartialSavantBreakerBoardConfig,
): SavantBreakerBoardConfig {
  const merged = deepMerge(DEFAULT_CONFIG, (raw ?? {}) as Partial<SavantBreakerBoardConfig>);
  merged.discovery.enabled = merged.discovery.enabled !== false;
  merged.discovery.integration = merged.discovery.integration || DEFAULT_CONFIG.discovery.integration;
  merged.discovery.include_new_breakers = merged.discovery.include_new_breakers !== false;
  if (!MOBILE_VIEWS.has(merged.layout.mobile_view)) {
    merged.layout.mobile_view = DEFAULT_CONFIG.layout.mobile_view;
  }
  merged.display.show_title = merged.display.show_title !== false;
  if (!PERIODS.has(merged.graph.period)) merged.graph.period = DEFAULT_CONFIG.graph.period;
  merged.graph.refresh_interval_seconds = Math.max(30, Number(merged.graph.refresh_interval_seconds) || 300);
  const warningLoadThreshold = Number(merged.controls.warning_load_threshold_watts);
  merged.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(warningLoadThreshold)
      ? warningLoadThreshold
      : DEFAULT_CONFIG.controls.warning_load_threshold_watts || 1000,
  );
  const highLoadThreshold = Number(merged.controls.high_load_threshold_watts);
  merged.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(highLoadThreshold)
      ? highLoadThreshold
      : DEFAULT_CONFIG.controls.high_load_threshold_watts || 2000,
  );
  merged.excluded_breakers = Array.isArray(merged.excluded_breakers)
    ? [...new Set(merged.excluded_breakers)]
    : [];
  merged.breaker_overrides = merged.breaker_overrides ?? {};
  merged.scenes = merged.scenes ?? { enabled: true } as ScenesConfig;
  merged.scenes.enabled = merged.scenes.enabled !== false;
  if (typeof merged.scenes.battery_capacity_kwh !== 'number' || merged.scenes.battery_capacity_kwh <= 0) {
    merged.scenes.battery_capacity_kwh = undefined;
  }
  merged.manual_breakers = Array.isArray(merged.manual_breakers) ? merged.manual_breakers : [];
  return merged;
}

export function resolveBreakerDisplay(
  config: SavantBreakerBoardConfig,
  breaker: DiscoveredBreaker,
): ResolvedBreakerDisplay {
  const override: BreakerOverrideConfig = config.breaker_overrides[breaker.id] ?? {};
  return {
    label: override.label || breaker.name,
    show_current_power:
      override.show_current_power ?? config.display.show_current_power,
    show_average_power:
      override.show_average_power ?? config.display.show_average_power,
    show_maximum_power:
      override.show_maximum_power ?? config.display.show_maximum_power,
    show_energy: override.show_energy ?? config.display.show_energy,
    show_sparkline: override.show_sparkline ?? config.display.show_sparkline,
    show_icon: override.show_icon ?? config.display.show_icon,
    show_state: config.display.show_state,
    show_controls: override.show_controls ?? config.display.show_controls,
    show_area: config.display.show_area,
    show_circuit_number: config.display.show_circuit_number,
    control_mode: override.control_mode ?? config.controls.default_mode,
  };
}
