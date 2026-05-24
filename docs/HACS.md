# HACS Preparation

This repository includes `hacs.json` for future Lovelace plugin distribution.

Recommended release steps:

1. Run `npm ci`.
2. Run `npm run check`.
3. Run `npm run build`.
4. Create a GitHub release.
5. Attach `dist/savant-energy-breaker-board-card.js`.
6. Confirm HACS installs the release artifact and adds the Lovelace resource.

The current `release.yml` workflow is a manual artifact build placeholder.
