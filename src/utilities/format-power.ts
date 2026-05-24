export function parseNumber(value: unknown): number | undefined {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : undefined;
}

export function formatPower(watts?: number): string {
  if (watts === undefined || !Number.isFinite(watts)) return "--";
  const abs = Math.abs(watts);
  if (abs >= 1000) {
    return `${trimNumber(watts / 1000, abs >= 10000 ? 1 : 2)} kW`;
  }
  return `${Math.round(watts)} W`;
}

function trimNumber(value: number, maxDecimals: number): string {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  });
}
