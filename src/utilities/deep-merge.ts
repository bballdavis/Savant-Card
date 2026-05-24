export function deepMerge<T extends Record<string, any>>(base: T, override?: Partial<T>): T {
  const result: Record<string, any> = { ...base };
  if (!override) return result as T;

  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) {
      result[key] = [...value];
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] ?? {}, value as Record<string, any>);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as T;
}
