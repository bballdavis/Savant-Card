import { DEFAULT_CONFIG } from "./defaults";
import { normalizeConfig } from "./normalize-config";
import type { PartialSavantBreakerBoardConfig, SavantBreakerBoardConfig } from "../types/config";

function diffValue(value: any, base: any): any {
  if (Array.isArray(value)) {
    return value.length ? value : undefined;
  }
  if (value && typeof value === "object") {
    const result: Record<string, any> = {};
    for (const [key, child] of Object.entries(value)) {
      const diffed = diffValue(child, base?.[key]);
      if (diffed !== undefined) result[key] = diffed;
    }
    return Object.keys(result).length ? result : undefined;
  }
  return value === base ? undefined : value;
}

export function minimalConfig(
  config: PartialSavantBreakerBoardConfig,
): PartialSavantBreakerBoardConfig {
  const normalized = normalizeConfig(config);
  const result = diffValue(normalized, DEFAULT_CONFIG) as PartialSavantBreakerBoardConfig | undefined;
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...(result ?? {}),
  };
}

export function withoutBreakerOverride(
  config: SavantBreakerBoardConfig,
  breakerId: string,
): PartialSavantBreakerBoardConfig {
  const next = structuredClone(config) as SavantBreakerBoardConfig;
  delete next.breaker_overrides[breakerId];
  return minimalConfig(next);
}
