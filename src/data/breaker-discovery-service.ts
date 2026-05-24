import { ManualDiscoveryProvider } from "./manual-discovery-provider";
import { RegistryDiscoveryProvider, type DiscoveryProvider } from "./registry-discovery-provider";
import type { DiscoveredBreaker } from "../types/breaker";
import type { SavantBreakerBoardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";

export class BreakerDiscoveryService {
  public constructor(private providers?: DiscoveryProvider[]) {}

  public async discover(
    hass: HomeAssistant,
    config: SavantBreakerBoardConfig,
  ): Promise<DiscoveredBreaker[]> {
    const providers =
      this.providers ??
      [
        ...(config.discovery.enabled
          ? [new RegistryDiscoveryProvider(config.discovery.integration)]
          : []),
        new ManualDiscoveryProvider(config.manual_breakers),
      ];

    const results = await Promise.all(providers.map((provider) => provider.discover(hass)));
    return mergeBreakers(results.flat());
  }
}

export function mergeBreakers(breakers: DiscoveredBreaker[]): DiscoveredBreaker[] {
  const byId = new Map<string, DiscoveredBreaker>();
  for (const breaker of breakers) {
    const existing = byId.get(breaker.id);
    byId.set(
      breaker.id,
      existing
        ? {
            ...existing,
            ...breaker,
            entities: { ...existing.entities, ...breaker.entities },
            discoveryNotes: [...(existing.discoveryNotes ?? []), ...(breaker.discoveryNotes ?? [])],
          }
        : breaker,
    );
  }
  return [...byId.values()];
}
