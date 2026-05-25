import type { PartialSavantBreakerBoardConfig } from "../types/config";

type FormSchema = Record<string, any>;

export interface LovelaceCardConfigForm {
  schema: FormSchema[];
  computeLabel: (schema: FormSchema) => string | undefined;
  computeHelper: (schema: FormSchema) => string | undefined;
  assertConfig: (config: PartialSavantBreakerBoardConfig) => void;
}

const LABELS: Record<string, string> = {
  title: "Title",
  discovery: "Discovery",
  enabled: "Auto-discovery",
  integration: "Integration domain",
  include_new_breakers: "Show new breakers automatically",
  panel_filter: "Panel filter",
  area_filter: "Area filter",
  layout: "Layout",
  group_by: "Group by",
  sort_by: "Sort by",
  density: "Density",
  display: "Default tile details",
  show_current_power: "Current power",
  show_average_power: "Average power",
  show_maximum_power: "Maximum power",
  show_energy: "Energy",
  show_sparkline: "Sparkline",
  show_state: "Breaker state",
  show_controls: "Breaker controls",
  show_area: "Area label",
  show_circuit_number: "Circuit number",
  graph: "Graph",
  period: "History period",
  refresh_interval_seconds: "Refresh interval",
  controls: "Controls",
  default_mode: "Default safety mode",
  high_load_threshold_watts: "High-load threshold",
  manual_breakers: "Manual breaker mappings",
  id: "Breaker ID",
  name: "Name",
  switch_entity: "Switch entity",
  power_entity: "Power entity",
  energy_entity: "Energy entity",
  voltage_entity: "Voltage entity",
  current_entity: "Current entity",
  area_name: "Area name",
  panel_name: "Panel name",
  circuit_number: "Circuit number",
};

const HELPERS: Record<string, string> = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  high_load_threshold_watts: "Watts shown as a high-load warning on breaker tiles.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12.",
};

export function getSavantBreakerBoardConfigForm(): LovelaceCardConfigForm {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "discovery",
        title: "Discovery",
        schema: [
          { name: "enabled", selector: { boolean: {} } },
          { name: "integration", selector: { text: {} } },
          { name: "include_new_breakers", selector: { boolean: {} } },
          { name: "panel_filter", selector: { text: {} } },
          { name: "area_filter", selector: { text: {} } },
        ],
      },
      {
        type: "expandable",
        name: "layout",
        title: "Layout",
        schema: [
          select("group_by", ["none", "panel", "area", "panel_then_area"]),
          select("sort_by", ["circuit_number", "name", "current_power_descending", "manual"]),
          select("density", ["comfortable", "compact"]),
        ],
      },
      {
        type: "expandable",
        name: "display",
        title: "Default Tile Details",
        schema: [
          { name: "show_current_power", selector: { boolean: {} } },
          { name: "show_average_power", selector: { boolean: {} } },
          { name: "show_maximum_power", selector: { boolean: {} } },
          { name: "show_energy", selector: { boolean: {} } },
          { name: "show_sparkline", selector: { boolean: {} } },
          { name: "show_state", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
          { name: "show_area", selector: { boolean: {} } },
          { name: "show_circuit_number", selector: { boolean: {} } },
        ],
      },
      {
        type: "expandable",
        name: "graph",
        title: "Graph",
        schema: [
          select("period", ["1h", "6h", "24h", "7d"]),
          {
            name: "refresh_interval_seconds",
            selector: { number: { min: 30, step: 30, mode: "box", unit_of_measurement: "s" } },
          },
        ],
      },
      {
        type: "expandable",
        name: "controls",
        title: "Controls",
        schema: [
          select("default_mode", ["hidden", "hold", "hold_confirm_off"]),
          {
            name: "high_load_threshold_watts",
            selector: { number: { min: 0, step: 100, mode: "box", unit_of_measurement: "W" } },
          },
        ],
      },
      {
        type: "expandable",
        name: "manual",
        title: "Manual Breaker Mappings",
        flatten: true,
        schema: [
          {
            name: "manual_breakers",
            selector: {
              object: {
                multiple: true,
                label_field: "name",
                description_field: "id",
                fields: {
                  id: { required: true, selector: { text: {} } },
                  name: { required: true, selector: { text: {} } },
                  switch_entity: entitySelector("switch"),
                  power_entity: entitySelector("sensor"),
                  energy_entity: entitySelector("sensor"),
                  voltage_entity: entitySelector("sensor"),
                  current_entity: entitySelector("sensor"),
                  area_name: { selector: { text: {} } },
                  panel_name: { selector: { text: {} } },
                  circuit_number: {
                    selector: { number: { min: 0, step: 1, mode: "box" } },
                  },
                },
              },
            },
          },
        ],
      },
    ],
    computeLabel: (schema) => LABELS[schema.name],
    computeHelper: (schema) => HELPERS[schema.name],
    assertConfig: assertVisualEditorConfig,
  };
}

function entitySelector(domain: string): FormSchema {
  return {
    selector: {
      entity: {
        filter: { domain },
      },
    },
  };
}

function select(name: string, options: string[]): FormSchema {
  return {
    name,
    selector: {
      select: {
        mode: "dropdown",
        options: options.map((value) => ({ value, label: LABELS[value] ?? humanize(value) })),
      },
    },
  };
}

function humanize(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function assertVisualEditorConfig(config: PartialSavantBreakerBoardConfig): void {
  assertObject("discovery", config.discovery);
  assertObject("layout", config.layout);
  assertObject("display", config.display);
  assertObject("graph", config.graph);
  assertObject("controls", config.controls);
  if (config.excluded_breakers !== undefined && !Array.isArray(config.excluded_breakers)) {
    throw new Error("excluded_breakers must be a list.");
  }
  if (config.manual_breakers !== undefined && !Array.isArray(config.manual_breakers)) {
    throw new Error("manual_breakers must be a list.");
  }
  assertObject("breaker_overrides", config.breaker_overrides);
}

function assertObject(key: keyof PartialSavantBreakerBoardConfig, value: unknown): void {
  if (value !== undefined && (value === null || Array.isArray(value) || typeof value !== "object")) {
    throw new Error(`${key} must be an object.`);
  }
}
