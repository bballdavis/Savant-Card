export function formatEnergy(value?: number, unit = "kWh"): string {
  if (value === undefined || !Number.isFinite(value)) return "--";
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`;
}
