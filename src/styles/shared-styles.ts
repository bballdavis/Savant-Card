import { css } from "lit";

export const sharedStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-tile-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #1f2528)) 88%, black);
    --savant-tile-fg: var(--primary-text-color, #f5f7f8);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
    --savant-warning: var(--warning-color, #ff8f22);
    --savant-error: var(--error-color, #f05246);
    --savant-disabled: var(--disabled-text-color, #8d9499);
    --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 35%, transparent);
    --savant-radius: var(--ha-card-border-radius, 14px);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color));
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
    grid-template-columns: repeat(auto-fit, minmax(var(--tile-min-width, 184px), 1fr));
    gap: var(--tile-gap, 12px);
  }

  :host([density="compact"]) .board-grid {
    --tile-min-width: 160px;
    --tile-gap: 10px;
  }

  @container (max-width: 540px) {
    .board-grid {
      grid-template-columns: 1fr;
    }
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
