export function fireEvent<T>(node: Element, type: string, detail?: T): void {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
}
