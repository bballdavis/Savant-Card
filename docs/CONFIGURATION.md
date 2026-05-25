# Configuration

The Home Assistant visual card editor is the preferred configuration surface. YAML remains supported as an escape hatch, but new settings should be added to the card's `getConfigForm()` schema so users can configure the card without opening the raw editor.

The visual editor stores:

- Global defaults.
- Hidden breaker IDs in `excluded_breakers`.
- Only customized per-breaker values in `breaker_overrides`.
- Manual mappings only when the user needs a fallback.

It does not store a full allow-list of every discovered breaker by default, so new breakers appear automatically.

See `README.md` for a full YAML example.
