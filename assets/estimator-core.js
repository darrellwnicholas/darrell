(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.EstimatorCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const PRICING = Object.freeze({
    setupFee: 35,
    minimumDoorPrice: 42,
    basePerSqFt: 17.5,
    profiles: Object.freeze({
      shaker: { label: 'Classic Shaker', multiplier: 1 },
      bevel: { label: 'Beveled Shaker', multiplier: 1.22 }
    }),
    finishes: Object.freeze({
      unfinished: { label: 'Unfinished / paint-ready', multiplier: 0.88 },
      primed: { label: 'Primed', multiplier: 1.05 },
      painted: { label: 'Painted finish', multiplier: 1.32 },
      stained: { label: 'Stained finish', multiplier: 1.42 }
    })
  });

  function assertPoint(point, name) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new TypeError(`${name} must be an object with finite x and y values.`);
    }
  }

  function distancePx(a, b) {
    assertPoint(a, 'a');
    assertPoint(b, 'b');
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function pixelsPerInch(referencePx, referenceInches) {
    if (!Number.isFinite(referencePx) || referencePx <= 0) {
      throw new RangeError('Reference pixel distance must be greater than zero.');
    }
    if (!Number.isFinite(referenceInches) || referenceInches <= 0) {
      throw new RangeError('Reference measurement must be greater than zero inches.');
    }
    return referencePx / referenceInches;
  }

  function lineInches(a, b, pxPerInch) {
    if (!Number.isFinite(pxPerInch) || pxPerInch <= 0) {
      throw new RangeError('Pixels-per-inch scale must be greater than zero.');
    }
    return distancePx(a, b) / pxPerInch;
  }

  function round(value, digits = 2) {
    const factor = Math.pow(10, digits);
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  function squareFeet(widthInches, heightInches) {
    if (!Number.isFinite(widthInches) || widthInches <= 0) {
      throw new RangeError('Width must be greater than zero inches.');
    }
    if (!Number.isFinite(heightInches) || heightInches <= 0) {
      throw new RangeError('Height must be greater than zero inches.');
    }
    return (widthInches * heightInches) / 144;
  }

  function estimateDoor(input) {
    const quantity = Number(input.quantity || 1);
    const profile = PRICING.profiles[input.profile] || PRICING.profiles.shaker;
    const finish = PRICING.finishes[input.finish] || PRICING.finishes.unfinished;
    const widthInches = Number(input.widthInches);
    const heightInches = Number(input.heightInches);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError('Quantity must be a whole number of at least 1.');
    }

    const sqft = squareFeet(widthInches, heightInches);
    const rawDoor = sqft * PRICING.basePerSqFt * profile.multiplier * finish.multiplier;
    const each = Math.max(rawDoor, PRICING.minimumDoorPrice);
    const subtotal = each * quantity;
    const total = subtotal + PRICING.setupFee;

    return {
      widthInches: round(widthInches, 2),
      heightInches: round(heightInches, 2),
      squareFeetEach: round(sqft, 2),
      profile: profile.label,
      finish: finish.label,
      quantity,
      each: round(each, 2),
      setupFee: PRICING.setupFee,
      subtotal: round(subtotal, 2),
      total: round(total, 2),
      disclaimer: 'Photo-based estimates require calibration and are not a final quote until confirmed by the shop.'
    };
  }

  function estimateProject(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return { items: [], subtotal: 0, setupFee: 0, total: 0 };
    }
    const estimated = items.map(estimateDoor);
    const subtotal = estimated.reduce((sum, item) => sum + item.subtotal, 0);
    const setupFee = PRICING.setupFee;
    return {
      items: estimated,
      subtotal: round(subtotal, 2),
      setupFee,
      total: round(subtotal + setupFee, 2),
      disclaimer: 'Use a ruler/tape or a known cabinet opening in the same plane as the door for calibration.'
    };
  }

  return {
    PRICING,
    distancePx,
    pixelsPerInch,
    lineInches,
    squareFeet,
    estimateDoor,
    estimateProject,
    round
  };
});
