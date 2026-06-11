import type { HomeAssistant } from "../types/home-assistant";
import type { Scene, SceneListResponse } from "../types/scene";

export class SceneService {
  constructor(private hass: HomeAssistant) {}

  async fetchScenes(): Promise<Scene[]> {
    const resp = await this.hass.callApi("GET", "savant_energy/scenes") as SceneListResponse;
    if (resp?.scenes) {
      return resp.scenes.map(s => ({ id: s.scene_id, name: s.name }));
    }
    return [];
  }

  async fetchSceneBreakers(sceneId: string): Promise<Record<string, boolean>> {
    const resp = await this.hass.callApi("GET", `savant_energy/scene_breakers/${sceneId}`) as any;
    if (resp?.breakers && typeof resp.breakers === 'object') {
      return { ...resp.breakers };
    }
    return {};
  }

  async createScene(name: string, relayStates: Record<string, boolean>): Promise<void> {
    await this.hass.callApi("POST", "savant_energy/scenes", { name, relay_states: relayStates });
  }

  async updateScene(sceneId: string, name: string, relayStates: Record<string, boolean>): Promise<void> {
    await this.hass.callApi("POST", `savant_energy/scenes/${sceneId}`, { name, relay_states: relayStates });
  }

  async deleteScene(sceneId: string): Promise<void> {
    await this.hass.callApi("DELETE", `savant_energy/scenes/${sceneId}`);
  }
}
