# Savant Card Branding Guide

This document defines the visual language used by `custom:savant-energy-breaker-board-card` so design and implementation stay consistent.

## Brand Intent

- Keep the interface clean, calm, and information-forward.
- Make power state and risk state immediately readable.
- Preserve a premium hardware-like feel with subtle depth.

## Visual Personality

- Style: modern utility dashboard with restrained gloss and soft depth.
- Tone: technical, dependable, and minimal.
- Density: compact enough for real dashboards, not cramped.

## Core Tokens

Primary tokens are set in `src/styles/shared-styles.ts` and consumed by card/components.

- Surface and text:
  - `--savant-tile-bg`
  - `--savant-tile-fg`
  - `--savant-muted`
- Status palette:
  - `--savant-success`
  - `--savant-caution`
  - `--savant-warning`
  - `--savant-error`
  - `--savant-disabled`
- Structural:
  - `--savant-border`
  - `--savant-radius`

Use Home Assistant theme variables as source of truth whenever possible (`--primary-text-color`, `--divider-color`, `--card-background-color`, and related tokens).

## Typography

- Wordmark (`SAVANT`) in card header:
  - Weight: 800
  - Size: 26px
  - Purpose: establish product identity without adding decorative assets.
- Breaker tile typography:
  - Name: medium weight for quick scanning
  - Power value: large and high-emphasis
  - Secondary metadata (area, helper text): muted and compact

Avoid introducing additional display fonts. Keep type hierarchy tight and functional.

## Shape and Spacing

- Primary corner radius: `--savant-radius` (default 12px).
- Chip controls and toggles use rounded pills/capsules.
- Typical card spacing rhythm:
  - 16px interior spacing for tiles
  - 8-12px spacing in control/header groups

Maintain consistent corner treatment across tiles, chips, popovers, and inputs.

## Elevation and Borders

- Surfaces use subtle gradients over flat fills for depth.
- Borders should remain visible in both light and dark themes.
- Interactive chips use a clearer edge treatment (primary border + subtle ring) to separate from dark backgrounds while staying clean.

When tuning borders, prefer small contrast increases and avoid heavy glow.

## Color and State Semantics

- On/healthy: success color
- Warning/high load: warning/caution color family
- Off/error: error color family
- Unavailable/disabled: disabled color

Do not repurpose semantic colors for decorative accents.

## Interaction Language

- Hover/focus-visible states increase edge contrast and clarity.
- Active states use primary color emphasis while preserving legibility.
- Motion should stay brief and purposeful (about 120-180ms for control transitions).

## Iconography

- Icons are simple, filled or line shapes via `savant-icon`.
- Keep icon sizing consistent in controls and tile headers.
- Icons support function first; avoid decorative-only icons.

## Responsive Rules

- Wide containers: portrait tile grid.
- Narrow containers: stacked row layout with left status rail.
- Mobile ultra-compact mode is optional and must preserve key state readability.

Layout behavior is container-based, not viewport-only.

## Accessibility Baselines

- Keep control boundaries visible in light and dark themes.
- Preserve readable contrast between labels and tile backgrounds.
- Ensure keyboard focus-visible states are explicit.
- Avoid relying on color alone where text/state labels can reinforce meaning.

## Implementation Notes

- Add or adjust visual tokens first, then component-specific overrides.
- Re-run demo smoke screenshots after visual changes (`npm run demo:capture`).
- Validate dark + light theme behavior before release.

## Non-Goals

- No skeuomorphic effects.
- No aggressive neon effects.
- No theme-breaking fixed colors unless used as guarded fallbacks.
