# Smart Budget Scenes — v2 Concept: Category-Based Energy Management

## The Core Idea
Instead of a flat priority list, breakers are organized into **categories** that encode how they *behave* — not just how important they are. The algorithm understands that a fridge can be off for 20 minutes but not 2 hours, while AC cycles naturally and bedroom lights can just stay off.

## Category System

| Category | Behavior | Example Loads | Max Off Time |
|---|---|---|---|
| `critical` | Never shed | Fridge, freezer, network core, medical | N/A |
| `thermal_cyclable` | Can be off, but has a thermal budget | Fridge, freezer | ~1 hour (default, configurable) |
| `hvac` | Cyclic by nature, big power draw | AC units | ~15 min (duty cycle protection) |
| `deferrable` | Can be off for hours with no impact | Water heater, EV charger, pool pump | Hours |
| `sheddable` | Easy shed, minor inconvenience | Bedrooms, guest bath, outdoor lights | Indefinite |
| `network_managed` | Has sub-breakers via external integration | Network rack (via Wattbox) | Per sub-breaker |

### What Categories Buy You

1. **Fridge doesn't stay off forever** — the algorithm knows `thermal_cyclable` must be restored after N minutes, even if over budget
2. **AC coordination** — when AC is running, shed more aggressively elsewhere; when AC is off, relax
3. **Wattbox sub-breaker awareness** — `network_managed` loads can be partially shed (guest wifi off, core router stays on)
4. **Smart defaults** — you assign category, the system knows roughly how to treat it without you setting timers

## Budget Definition (Historical-Influenced)

Instead of a hard number, the budget can be:

```
budget_mode: "historical_percentile" | "hard_cap" | "battery_based"

// Historical percentile (recommended default):
// "Keep load at or below the 70th percentile of this time of day"
{
  mode: "historical_percentile",
  percentile: 0.70,        // 70th percentile
  lookback_days: 14,        // of the last 14 days
  min_cap_kw: 3,            // floor
  max_cap_kw: 10,           // ceiling
}

// Hard cap:
// "Never exceed 5kW total"
{
  mode: "hard_cap",
  cap_kw: 5,
}

// Battery-based:
// "Drain battery at max X%/hour"
{
  mode: "battery_based",
  max_drain_percent_per_hour: 5,
  battery_capacity_kwh: 13.5,
}
```

### How Historical Percentile Works

```
For each hour of the day (0-23):
  Look at power readings for that hour over the last 14 days
  Sort them, pick the Nth percentile value
  Budget for current hour = that value

Example — Tuesday 3pm:
  Last 14 days at 3pm: [3.2, 3.5, 4.1, 4.8, 5.2, 5.5, 3.8, 4.0, 4.5, 5.0, 3.1, 4.2, 4.9, 5.1] kW
  Sorted: [3.1, 3.2, 3.5, 3.8, 4.0, 4.1, 4.2, 4.5, 4.8, 4.9, 5.0, 5.1, 5.2, 5.5]
  70th percentile (index ~10): 5.0 kW
  Budget = 5.0 kW
```

This means: "stay within what's normal for this time of day." It adapts to your actual usage patterns — weekday vs weekend, seasonal changes.

## Shedding Algorithm (Category-Aware)

```python
Every N minutes (default 5):
  1. Get current budget (historical percentile or hard cap)
  2. Get current power for all ON breakers
  3. Total = sum of ON breakers' power (excluding critical/essential)

  4. If total > budget * 1.0 → SHED MODE:
     shed_list = sort ON breakers by category priority:
       [sheddable, deferrable, thermal_cyclable, hvac, network_managed]
     
     for breaker in shed_list:
       if total <= budget * 0.9: break  # restored buffer
       if category == 'thermal_cyclable' and off_time >= max_off:
         skip (can't shed more, safety)
       turn_off(breaker)
       total -= breaker.power
       
  5. If total < budget * 0.7 → RESTORE MODE:
     restore_list = sort OFF breakers by reverse priority:
       [network_managed, hvac, thermal_cyclable, deferrable, sheddable]
     
     for breaker in restore_list:
       if category == 'thermal_cyclable' and off_time < min_off_recovery:
         skip (must rest)
       if total + breaker.power > budget * 0.85:
         skip (would exceed budget with hysteresis)
       turn_on(breaker)
       total += breaker.power
  
  6. THERMAL OVERRIDE (safety):
     for breaker in category == 'thermal_cyclable' where off_time > max_off:
       if not already on: force turn_on(breaker)  # protect food
       # This may exceed budget temporarily — thermal safety > budget
```

### Hysteresis Zones
```
Budget: 5.0 kW
├── 0% ── 70% ── 85% ── 100% ────>
         ↑restore  ↑shed    ↑must shed
         zone      threshold  threshold
```

## Wattbox Integration

The `hass-wattbox` integration provides switch entities for individual ports on a managed PDU. In our system:

```
Network Rack (breaker)  ← single breaker in Savant
  ├── 🔌 Core Router     [ESSENTIAL]  ← Wattbox port 1
  ├── 🔌 Core Switch     [ESSENTIAL]  ← Wattbox port 2
  ├── 🔌 Server          [ESSENTIAL]  ← Wattbox port 3
  ├── 🔌 Guest WiFi AP   [NON-ESSENTIAL]  ← Wattbox port 4
  ├── 🔌 Office Switch   [NON-ESSENTIAL]  ← Wattbox port 5
  └── 🔌 Media Room      [NON-ESSENTIAL]  ← Wattbox port 6
```

When shedding hits the `network_managed` category:
- Non-essential ports are shed first (guest wifi, media room)
- Essential ports stay on (router, switch, server)
- This is basically free savings — shedding 50-100W of network gear with zero impact

### How This Works Technically

The smart scene stores sub-breaker mappings:
```json
{
  "scene_id": "savant_smart_off_grid_scene",
  "type": "smart_budget",
  "budget": { "mode": "historical_percentile", "percentile": 0.70 },
  "categories": {
    "critical": ["switch.kitchen_fridge", "switch.network_core"],
    "thermal_cyclable": ["switch.basement_fridge"],
    "hvac": ["switch.upstairs_ac", "switch.downstairs_ac"],
    "sheddable": ["switch.bedroom_lights", "switch.outdoor_lights"],
    "network_managed": {
      "parent": "switch.network_rack",
      "sub_breakers": {
        "essential": ["switch.router", "switch.core_switch", "switch.server"],
        "non_essential": ["switch.guest_wifi", "switch.office_switch", "switch.media_room"]
      }
    }
  }
}
```

## v2 vs v1 — Phased Approach

### Phase 1 (Core Scene Integration — do first)
- Scene CRUD with whole-row toggle
- Smart stats (kWh, battery %)
- This gives the foundation

### Phase 2 (Basic Smart Scenes)
- Power cap budget (hard number)
- Simple priority list (drag to reorder)
- Manual activate/deactivate
- Shed/restore logic runs in integration

### Phase 3 (Category System)
- Categories: critical, sheddable, deferrable, hvac, thermal_cyclable
- Category-aware shedding (thermal safety, AC coordination)
- Category assignment UI in the scene editor

### Phase 4 (Historical Budgeting)
- Historical percentile budget mode
- Reads from HA recorder statistics
- Self-adapting budgets

### Phase 5 (Wattbox Integration)
- Discover Wattbox sub-breakers
- Mark essential vs non-essential per scene
- Sub-breaker shedding during budget enforcement

## Open Questions

1. **Thermal budget for fridges** — Default 1 hour for `thermal_cyclable` (configurable). Timer-based by default, with optional temp sensor integration as a future enhancement.

2. **Historical percentile default** — 70th percentile is conservative (you stay in normal range most of the time). Too aggressive or not aggressive enough?

3. **AC coordination** — When AC cycles off naturally, we have a ~15-20 min window of low draw. Should we be more aggressive with other shedding during AC runtime, or focus on just keeping the AC on?

4. **Wattbox discovery** — Do we auto-discover which switch entities belong to the Wattbox integration, or do you manually map them in the UI?
