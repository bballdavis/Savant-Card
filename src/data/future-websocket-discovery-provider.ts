import type { DiscoveryProvider } from "./registry-discovery-provider";
import type { DiscoveredBreaker } from "../types/breaker";
import type { HomeAssistant } from "../types/home-assistant";

export class FutureWebSocketDiscoveryProvider implements DiscoveryProvider {
  public async discover(_hass: HomeAssistant): Promise<DiscoveredBreaker[]> {
    return [];
  }
}
