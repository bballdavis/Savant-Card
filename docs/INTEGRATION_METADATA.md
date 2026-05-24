# Recommended HASS-Savant-Energy Metadata Improvements

The card works without backend changes, but discovery becomes much more reliable if the `savant_energy` integration exposes richer Home Assistant metadata.

Recommended improvements:

- Represent each breaker/load as one Home Assistant device.
- Use stable unique IDs for breaker switch, power, energy, voltage, and current entities.
- Associate every breaker entity with the correct device registry device.
- Set `device_class: power`, `state_class: measurement`, and watts for live power sensors.
- Set `device_class: energy`, `state_class: total_increasing`, and kWh/Wh for energy sensors.
- Expose circuit number and panel name as stable entity attributes or device metadata.
- Expose controllability metadata so frontend cards know when controls should be hidden.
- Preserve area assignment at the device or entity level.
- Optionally add a future WebSocket command that returns normalized breaker metadata:

```json
{
  "type": "savant_energy/breaker_board",
  "breakers": [
    {
      "id": "main_panel_12",
      "name": "Kitchen Outlets",
      "panelName": "Main Panel",
      "circuitNumber": 12,
      "controllable": true,
      "entities": {
        "switch": "switch.kitchen_outlets_breaker",
        "power": "sensor.kitchen_outlets_power",
        "energy": "sensor.kitchen_outlets_energy"
      }
    }
  ]
}
```
