# Cabinet Door Domain Prototypes

This repo contains four sample cabinet-door websites plus a working vanilla JavaScript prototype for a photo-calibrated cabinet estimate app.

## Domain prototypes

- `shakercabinetdoors.html` — broad classic Shaker replacement-door site.
- `bevelshakercabinetdoors.html` — premium beveled Shaker positioning.
- `unfinishedshakercabinetdoors.html` — DIY/contractor unfinished Shaker positioning.
- `unfinishedbevelshakercabinetdoors.html` — niche unfinished beveled Shaker positioning.
- `estimate.html` — customer photo measurement and starter estimate app.

## Measurement reality check

A normal single photo does **not** contain reliable real-world scale by itself. The estimate app requires the customer to calibrate the image by clicking a known measurement in the same flat plane as the door/opening. That can be a ruler, tape measure, or a cabinet opening with a confirmed size.

That workflow makes the app useful now without lying about what computer vision can safely do from one flat image.

## Run locally

```bash
npm test
npm run serve
```

Then open:

```text
http://localhost:4173
```

## Current test coverage

`npm test` runs unit tests for:

- pixel distance calculation
- pixels-per-inch calibration
- inch conversion
- square-foot calculation
- per-door estimate calculation
- project estimate totals
- invalid input handling

## Next build steps

1. Wire the quote forms to email, a CRM, or a simple backend.
2. Add customer submission storage.
3. Add shop-side review/approval before a quote becomes final.
4. Add ARKit/ARCore/depth capture for a mobile app version.
5. Add automated browser tests with Playwright once a build/deploy target is selected.
