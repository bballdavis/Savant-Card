# Configuration

The Home Assistant visual card editor is the preferred configuration surface. YAML remains supported for the full exposed schema, including the settings that are easiest to express directly in raw config.

For a complete YAML example, including panel-view setup, see [`README.md`](../README.md). The defaults live in [`src/config/defaults.ts`](../src/config/defaults.ts), and normalization happens in [`src/config/normalize-config.ts`](../src/config/normalize-config.ts).

## Top-Level Settings

- `type`: `custom:savant-energy-breaker-board-card`.
- `title`: Optional card title shown above the board.

## Discovery

- `enabled`: Turns auto-discovery on or off.
- `integration`: Home Assistant integration domain to match. Defaults to `savant_energy`.
- `include_new_breakers`: When true, new discovered breakers are shown automatically.
- `panel_filter`: Optional exact panel name filter.
- `area_filter`: Optional exact area name filter.

## Layout

- `group_by`: `none`, `panel`, `area`, or `panel_then_area`.
- `sort_by`: `circuit_number`, `name`, `current_power_descending`, `highest_usage`, or `manual`.
- `density`: `comfortable` or `compact`.
- `mobile_view`: `standard` or `ultra_compact`.

## Display

- `show_title`: Show or hide the title section.
- `hide_sem_chip`: Hide the SEM chip by default.
- `show_current_power`, `show_average_power`, `show_maximum_power`, `show_energy`, `show_sparkline`, `show_icon`, `show_state`, `show_controls`, `show_area`, `show_circuit_number`: Default tile details that can be overridden per breaker.

## Graph

- `period`: `1h`, `6h`, `12h`, `24h`, or `7d`.
- `refresh_interval_seconds`: Graph refresh interval in seconds. Minimum 30.

## Controls

- `default_mode`: `hidden`, `hold`, or `hold_confirm_off`.
- `warning_load_threshold_watts`: Yellow chart threshold.
- `high_load_threshold_watts`: Orange chart threshold.

## Breaker Lists

- `excluded_breakers`: Breaker IDs to hide from the board.
- `breaker_overrides`: Per-breaker label, detail, and control overrides.
- `manual_breakers`: Fallback breaker mappings when discovery cannot resolve a breaker from registry data.

## Scenes

- `enabled`: Show or hide the built-in scene editor.
- `battery_capacity_kwh`: Optional battery size used to convert scene load into `%/h` battery drain. Leave unset to show watt and kWh/h totals only.
