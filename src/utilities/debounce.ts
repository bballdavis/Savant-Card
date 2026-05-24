export function debounce<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let timer: number | undefined;
  return ((...args: Parameters<T>) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  }) as T;
}
