# HACS Dashboard Distribution

This repository includes `hacs.json` for HACS Dashboard distribution. HACS installs dashboard elements into Home Assistant's `www/community/` folder and serves them through the `/hacsfiles/` endpoint.

Expected installed file:

```text
/config/www/community/Savant-Card/Savant-Card.js
```

Expected Lovelace resource URL:

```text
/hacsfiles/Savant-Card/Savant-Card.js
```

HACS Dashboard repositories are validated against the default branch. The branch must contain a `.js` file under `dist/` or the repository root, and one `.js` file must match the repository name. This repository therefore publishes `dist/Savant-Card.js`.

The module registers `window.customCards` metadata, `getStubConfig()`, and `getConfigForm()`. Once the HACS resource is loaded and the browser is refreshed, Home Assistant should show **Savant Energy Breaker Board** in the add-card picker.

Recommended release steps:

1. Run `npm ci`.
2. Run `npm run check`.
3. Run `npm run build`.
4. Create a GitHub release.
5. Attach `dist/Savant-Card.js`.
6. Install/update through HACS and confirm the resource URL uses `/hacsfiles/Savant-Card/Savant-Card.js`.
7. Refresh Home Assistant and confirm the card appears in the dashboard card picker.

The current `release.yml` workflow is a manual artifact build placeholder.
