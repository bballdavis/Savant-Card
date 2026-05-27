# Development Architecture

This repository is a frontend-only Home Assistant Lovelace custom card. It builds one browser-loadable ES module with Vite library mode and registers `custom:savant-energy-breaker-board-card`.

## Main Layers

- `src/card/` contains the Lovelace card container and graphical editor.
- `src/components/` contains reusable Lit presentation components: tiles, skeletons, sparklines, metric rows, empty/error states, and hold controls.
- `src/data/` contains discovery and history/statistics fetching. Tiles never fetch Home Assistant data directly.
- `src/config/` owns defaults, normalization, override resolution, and minimal config diffing.
- `src/types/` keeps Home Assistant, breaker, config, and statistics contracts explicit.
- `demo/` provides a Vite mock Home Assistant harness and does not leak into production.

## Home Assistant APIs

The card follows current custom card conventions:

- `setConfig(config)` receives user configuration.
- `static getConfigForm()` exposes the built-in Home Assistant form editor for global card settings.
- `static getConfigElement()` returns the custom editor element.
- `static getStubConfig()` returns a starter config for the card picker.
- `window.customCards` registers the card picker metadata.
- `getGridOptions()` supports Sections dashboards.
- `getCardSize()` supports masonry dashboards.
- Tile taps dispatch `hass-action` for Home Assistant more-info.
- Breaker toggles call standard `switch.turn_on` and `switch.turn_off` services.

## Responsive Design

The board uses CSS grid and container queries. Wide containers render portrait breaker tiles. Narrow containers render horizontal stacked tiles with a slim vertical status indicator on the left. This is container-based because a card can be narrow even on a wide browser.

## Branding

Visual and brand system decisions are documented in `docs/design/BRANDING.md`, including color/state semantics, token usage, chip and tile edge treatment, typography hierarchy, spacing rhythm, and responsive behavior expectations.

## Data Flow

1. The card normalizes configuration.
2. `BreakerDiscoveryService` runs registry and manual providers.
3. Discovered breakers are filtered, sorted, grouped, and rendered.
4. `StatisticsManager` fetches and caches graph/statistical data by entity and period.
5. Live state values are read from `hass.states` during rendering.
6. The built-in form editor handles global settings from `getConfigForm()`.
7. The custom editor uses the same discovery service and emits minimal `config-changed` payloads for breaker-specific exclusions and overrides.

## Release Build

`npm run build` writes `dist/Savant-Card.js`. Copy that file to `/config/www/` for manual Home Assistant use or attach it to a GitHub release for HACS. HACS Dashboard installs should land under `/config/www/community/Savant-Card/` and be referenced through `/hacsfiles/Savant-Card/Savant-Card.js`.
