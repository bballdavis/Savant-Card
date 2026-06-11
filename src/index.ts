import "./card/savant-energy-breaker-board-card";
import "./card/savant-energy-breaker-board-card-editor";

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "savant-energy-breaker-board-card",
  name: "Savant Energy Card",
  description: "Discover and control Savant Energy breaker/circuit power data.",
  preview: true,
  documentationURL: "https://github.com/brett/savant-energy-breaker-board-card",
});
