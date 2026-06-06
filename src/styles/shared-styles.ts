import { css } from "lit";

export const sharedStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-card-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --savant-app-bg: var(--primary-background-color, #f4f6f8);
    --savant-tile-bg: color-mix(in srgb, var(--savant-card-bg) 96%, white);
    --savant-tile-bg-strong: color-mix(in srgb, var(--savant-card-bg) 91%, white);
    --savant-surface-tint: color-mix(in srgb, var(--primary-color, #4caf50) 4%, transparent);
    --savant-tile-fg: var(--primary-text-color, #1d2327);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
    --savant-caution: var(--savant-caution-color, #f5cc4d);
    --savant-warning: var(--warning-color, #ff8f22);
    --savant-error: var(--error-color, #f05246);
    --savant-disabled: var(--disabled-text-color, #8d9499);
    --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 30%, transparent);
    --savant-border-strong: color-mix(in srgb, var(--divider-color, #6f767b) 44%, transparent);
    --savant-shadow-sm: 0 8px 18px rgb(15 23 42 / 0.08);
    --savant-shadow-md: 0 12px 28px rgb(15 23 42 / 0.1);
    --savant-radius: var(--savant-breaker-radius, 12px);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    background: var(--savant-card-bg);
  }

  .board-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .board-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    letter-spacing: 0;
  }

  .board-grid {
    container-type: inline-size;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--tile-min-width, 262px), 1fr));
    align-items: start;
    gap: var(--tile-gap, 12px);
  }

  :host([density="compact"]) .board-grid {
    --tile-min-width: 224px;
    --tile-gap: 10px;
  }

  .board-grid.stacked {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .group-title {
    grid-column: 1 / -1;
    margin: 8px 0 0;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 650;
    text-transform: uppercase;
  }
`;
