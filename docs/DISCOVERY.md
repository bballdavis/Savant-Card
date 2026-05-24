# Discovery

The v1 card discovers breakers using standard Home Assistant frontend registry data. It does not require backend changes.

## Entity Association

The registry provider loads:

- `config/entity_registry/list`
- `config/device_registry/list`
- `config/area_registry/list`

It prefers entity registry entries whose `platform` matches the configured integration, defaulting to `savant_energy`. It also treats devices as likely Savant devices when the device manufacturer or identifiers include Savant/Savant Energy hints.

Entities are grouped by `device_id`. Within each device:

- `switch` becomes the breaker control entity.
- `sensor` with `device_class: power` becomes the live wattage sensor.
- `sensor` with `device_class: energy` becomes the accumulated energy sensor.
- `sensor` with `device_class: voltage` or `current` is preserved for future display.

Entity ID matching is only a fallback when registry/device metadata is incomplete.

## Manual Mapping

Users can add manual mappings when current integration metadata is not enough:

```yaml
manual_breakers:
  - id: kitchen_outlets
    name: Kitchen Outlets
    switch_entity: switch.kitchen_outlets_breaker
    power_entity: sensor.kitchen_outlets_power
    energy_entity: sensor.kitchen_outlets_energy
```

Manual breakers are normalized into the same internal shape as discovered breakers.

## Future WebSocket Provider

`future-websocket-discovery-provider.ts` is a stub for a later integration-provided endpoint. A future endpoint should return already-normalized breaker metadata so the card can swap providers without changing tile/editor components.
