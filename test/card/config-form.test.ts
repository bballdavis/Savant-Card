import { describe, expect, it } from "vitest";
import { SavantEnergyBreakerBoardCard } from "../../src/card/savant-energy-breaker-board-card";

describe("SavantEnergyBreakerBoardCard.getConfigForm", () => {
  it("exposes Home Assistant's built-in visual editor form", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();

    expect(form.schema.map((entry) => entry.name)).toEqual([
      "title",
      "battery_capacity_kwh",
      "discovery",
      "layout",
      "display",
      "graph",
      "controls",
      "manual",
    ]);
    expect(form.computeLabel({ name: "high_load_threshold_watts" })).toBe("Orange chart threshold");
    expect(form.computeHelper({ name: "refresh_interval_seconds" })).toBe("Minimum 30 seconds.");
  });

  it("covers configurable global settings in the visual form schema", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();
    const fieldNames = collectFieldNames(form.schema);

    expect(fieldNames).toEqual(
      expect.arrayContaining([
        "title",
        "enabled",
        "integration",
        "include_new_breakers",
        "panel_filter",
        "area_filter",
        "group_by",
        "sort_by",
        "density",
        "mobile_view",
        "show_title",
        "hide_sem_chip",
        "show_current_power",
        "show_average_power",
        "show_maximum_power",
        "show_energy",
        "show_sparkline",
        "show_icon",
        "show_state",
        "show_controls",
        "show_area",
        "show_circuit_number",
        "period",
        "refresh_interval_seconds",
        "default_mode",
        "warning_load_threshold_watts",
        "high_load_threshold_watts",
        "manual_breakers",
      ]),
    );
  });

  it("includes highest usage in the sort selector", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();
    const sortBy = collectSchema(form.schema).find((entry) => entry.name === "sort_by");
    const values = sortBy?.selector.select.options.map((option: { value: string }) => option.value);

    expect(values).toContain("highest_usage");
  });

  it("includes 12h in the graph period selector", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();
    const period = collectSchema(form.schema).find((entry) => entry.name === "period");
    const values = period?.selector.select.options.map((option: { value: string }) => option.value);

    expect(values).toEqual(["1h", "6h", "12h", "24h", "7d"]);
  });

  it("makes manual fallback mappings editable without YAML", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();
    const manualBreakers = collectSchema(form.schema).find((entry) => entry.name === "manual_breakers");

    expect(manualBreakers?.selector.object.multiple).toBe(true);
    expect(Object.keys(manualBreakers?.selector.object.fields ?? {})).toEqual([
      "id",
      "name",
      "switch_entity",
      "power_entity",
      "energy_entity",
      "voltage_entity",
      "current_entity",
      "area_name",
      "panel_name",
      "circuit_number",
    ]);
  });

  it("rejects YAML shapes the built-in form cannot safely edit", () => {
    const form = SavantEnergyBreakerBoardCard.getConfigForm();

    expect(() => form.assertConfig({ layout: "compact" as any })).toThrow("layout must be an object.");
    expect(() => form.assertConfig({ excluded_breakers: "breaker-a" as any })).toThrow(
      "excluded_breakers must be a list.",
    );
  });
});

function collectFieldNames(schema: Array<Record<string, any>>): string[] {
  return schema.flatMap((entry) => [entry.name, ...collectFieldNames(entry.schema ?? [])]);
}

function collectSchema(schema: Array<Record<string, any>>): Array<Record<string, any>> {
  return schema.flatMap((entry) => [entry, ...collectSchema(entry.schema ?? [])]);
}
