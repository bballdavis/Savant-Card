# Savant Energy Breaker Board Card

`custom:savant-energy-breaker-board-card` is a standalone Home Assistant Lovelace card for displaying and safely controlling Savant Energy breaker and circuit data exposed by the existing `savant_energy` integration.

It discovers related switch, power, energy, voltage, and current entities from Home Assistant registry data, renders a responsive breaker board, and provides a graphical card editor so users do not need to define every breaker by hand.

## Screenshots

Reference screenshots and final release screenshots can be placed in `docs/design/`. The current demo harness shows the desktop portrait grid, narrow stacked layout, empty state, compact density, and light/dark theme approximations.

## Features

- Automatic Savant breaker discovery from entity, device, and area registries.
- Manual fallback mappings for incomplete integrations.
- Responsive portrait tiles on wide dashboards and stacked horizontal tiles in narrow card containers.
- Live wattage, breaker state, AVG/MAX statistics, optional energy, and SVG sparkline backgrounds.
- Skeleton loading that reserves the final tile geometry.
- Graphical Home Assistant card editor with global defaults, exclusions, and per-breaker overrides.
- Safe breaker controls with long-press behavior and optional confirmation before turning off.
- Card picker registration through `window.customCards`.
- Sections dashboard sizing with `getGridOptions()` and masonry sizing with `getCardSize()`.

## HACS Installation

Install this repository in HACS as a **Dashboard** repository. HACS stores dashboard elements under:

```text
/config/www/community/Savant-Card/Savant-Card.js
```

Home Assistant should load the card with the HACS resource URL:

```text
/hacsfiles/Savant-Card/Savant-Card.js
```

After HACS adds or updates that resource, refresh Home Assistant and open the dashboard editor. The card registers itself with Home Assistant's custom card picker as **Savant Energy Breaker Board**, so it should appear when you add a new card instead of requiring manual YAML.

## Manual Installation

1. Build the card:

   ```bash
   npm ci
   npm run build
   ```

2. Copy `dist/savant-energy-breaker-board-card.js` to Home Assistant:

   ```text
   /config/www/savant-energy-breaker-board-card.js
   ```

3. Add a dashboard resource:

   ```yaml
   url: /local/savant-energy-breaker-board-card.js
   type: module
   ```

4. Refresh Home Assistant. The card should appear in the Home Assistant UI card picker as **Savant Energy Breaker Board**.

## YAML Example

```yaml
type: custom:savant-energy-breaker-board-card
title: Electrical Panel
discovery:
  enabled: true
  integration: savant_energy
  include_new_breakers: true
layout:
  group_by: panel
  sort_by: circuit_number
  density: comfortable
display:
  show_current_power: true
  show_average_power: true
  show_maximum_power: true
  show_energy: false
  show_sparkline: true
  show_state: true
  show_controls: true
  show_area: false
  show_circuit_number: true
graph:
  period: 24h
  refresh_interval_seconds: 300
controls:
  default_mode: hold_confirm_off
excluded_breakers:
  - device:legacy_hidden_breaker
breaker_overrides:
  device:network_closet:
    label: Network Closet
    show_controls: false
manual_breakers:
  - id: kitchen_outlets
    name: Kitchen Outlets
    switch_entity: switch.kitchen_outlets_breaker
    power_entity: sensor.kitchen_outlets_power
    energy_entity: sensor.kitchen_outlets_energy
```

## Auto-discovery

The card reads Home Assistant entity, device, and area registries through frontend WebSocket calls. It prefers entities from the configured integration platform, defaults to `savant_energy`, and groups entities by Home Assistant device. Sensors with `device_class: power` become live wattage sources, sensors with `device_class: energy` become accumulated energy sources, and `switch` entities become breaker control candidates.

Newly discovered breakers appear automatically unless explicitly hidden. The editor stores exclusions and overrides instead of serializing every discovered breaker.

## Safe Controls

Breaker controls are intentionally conservative. A tap on a tile opens Home Assistant more-info. The circular control requires a hold gesture before it emits a toggle request. In `hold_confirm_off` mode, turning a breaker off also prompts for confirmation.

The card only calls standard Home Assistant `switch.turn_on` and `switch.turn_off` services.

## Development

```bash
npm ci
npm run demo
npm test
npm run build
```

Open the Vite URL and use `demo/index.html` to inspect wide, tablet, phone, compact, and empty states. The demo starts in dark mode and has a top-right toggle for light mode.

To regenerate visual smoke images for both themes:

```bash
npm run demo:capture
```

## HACS

`hacs.json` is configured for HACS Dashboard distribution. The repository keeps `dist/Savant-Card.js` on the default branch because HACS requires one Dashboard `.js` file to match the repository name. A release should attach the same `dist/Savant-Card.js`; HACS installs it under `www/community/` and serves it via `/hacsfiles/`.

## Known Limitations

- Reliable association depends on the `savant_energy` integration exposing one HA device per breaker/load, stable IDs, and correct device/state classes.
- Circuit number and panel name are read from entity attributes when present; otherwise they may be unavailable.
- The future integration-specific WebSocket discovery endpoint is represented as a stub provider only.
- Drag-and-drop manual ordering is not implemented in v1; `manual` sorting is a placeholder.
