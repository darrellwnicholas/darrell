# Agent Work Plan

These are the intended agent lanes for iterative development. Each agent should work in its own branch, run tests, fix bugs, and open a pull request only after the prototype works locally.

## Agent 1 — ShakerCabinetDoors.com

Goal: turn `shakercabinetdoors.html` into the strongest broad-market landing page.

Responsibilities:
- Improve copy for homeowners replacing old doors.
- Add FAQs for measuring, hinge boring, overlay/inset, wood choice, and painting.
- Improve CTA path to the photo estimator.
- Confirm layout on iPhone, Android, tablet, and desktop widths.
- Add SEO metadata and schema markup where appropriate.

Definition of done:
- Page loads with no console errors.
- CTA buttons all work.
- Mobile layout has no horizontal scroll.
- Quote form gives clear feedback.
- `npm test` passes.

## Agent 2 — BevelShakerCabinetDoors.com

Goal: position beveled Shaker doors as a premium product.

Responsibilities:
- Improve design language for a higher-end buyer.
- Add comparison section: classic Shaker vs beveled Shaker.
- Add product-detail visuals or SVG diagrams showing bevel profile.
- Tune estimate defaults toward bevel profile.
- Validate accessibility and keyboard navigation.

Definition of done:
- Page visually differs from the classic Shaker page.
- Premium positioning is obvious without sounding fake.
- All links and forms work.
- `npm test` passes.

## Agent 3 — UnfinishedShakerCabinetDoors.com

Goal: make the DIY/contractor unfinished-door page practical and conversion-focused.

Responsibilities:
- Add prep/finishing guidance for paint and stain.
- Add contractor/bulk-order messaging.
- Include warnings about final sanding, sealing, and storage before finishing.
- Improve the quote form for unfinished orders.
- Add FAQ copy aimed at customers who want to finish doors themselves.

Definition of done:
- Page answers the obvious DIY questions.
- Customer understands unfinished means final finish is their responsibility.
- No broken links or console errors.
- `npm test` passes.

## Agent 4 — UnfinishedBevelShakerCabinetDoors.com

Goal: make the long-tail niche domain feel useful instead of awkward.

Responsibilities:
- Explain who this product is for.
- Improve SEO around unfinished beveled Shaker cabinet doors.
- Add comparison to unfinished flat Shaker doors.
- Keep the page concise despite the long domain name.
- Route customers into the estimator with bevel + unfinished defaults.

Definition of done:
- Page is readable on small phones despite the long name.
- Search intent is clear.
- CTAs work.
- `npm test` passes.

## Shared Estimator Agent

Goal: keep improving `estimate.html`, `assets/estimator-core.js`, and `assets/estimator-ui.js` until the customer measurement workflow is dependable.

Responsibilities:
- Preserve the calibration requirement unless AR/depth capture is added.
- Add image rotation support for phone photos if needed.
- Add draggable measurement handles.
- Add multiple doors/openings per photo.
- Add save/load estimate data.
- Add customer contact fields and backend submission when backend is chosen.
- Expand unit tests for pricing and measurement edge cases.

Definition of done:
- Customer can upload/take a photo.
- Customer can calibrate from a known measurement.
- Customer can measure width and height.
- Estimate updates when quantity/profile/finish changes.
- Bad inputs are rejected with clear messages.
- Unit tests pass.
