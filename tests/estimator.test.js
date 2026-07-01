const assert = require('assert');
const core = require('../assets/estimator-core.js');

function close(actual, expected, tolerance = 0.001) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be within ${tolerance} of ${expected}`);
}

close(core.distancePx({ x: 0, y: 0 }, { x: 3, y: 4 }), 5);
close(core.pixelsPerInch(240, 12), 20);
close(core.lineInches({ x: 10, y: 10 }, { x: 110, y: 10 }, 20), 5);
close(core.squareFeet(18, 30), 3.75);

const shaker = core.estimateDoor({ widthInches: 18, heightInches: 30, profile: 'shaker', finish: 'unfinished', quantity: 2 });
assert.equal(shaker.quantity, 2);
assert.equal(shaker.profile, 'Classic Shaker');
assert.equal(shaker.finish, 'Unfinished / paint-ready');
assert.ok(shaker.each >= 42, 'minimum door price should apply to smaller doors');
assert.equal(shaker.total, shaker.subtotal + shaker.setupFee);

const bevel = core.estimateDoor({ widthInches: 24, heightInches: 42, profile: 'bevel', finish: 'painted', quantity: 1 });
assert.equal(bevel.profile, 'Beveled Shaker');
assert.equal(bevel.finish, 'Painted finish');
assert.ok(bevel.total > shaker.each, 'larger painted bevel door should cost more than one minimum-price door');

const project = core.estimateProject([
  { widthInches: 18, heightInches: 30, profile: 'shaker', finish: 'unfinished', quantity: 2 },
  { widthInches: 24, heightInches: 42, profile: 'bevel', finish: 'painted', quantity: 1 }
]);
assert.equal(project.items.length, 2);
assert.equal(project.total, core.round(project.subtotal + project.setupFee, 2));

assert.throws(() => core.pixelsPerInch(0, 12), /greater than zero/);
assert.throws(() => core.estimateDoor({ widthInches: 0, heightInches: 30, quantity: 1 }), /Width/);
assert.throws(() => core.estimateDoor({ widthInches: 10, heightInches: 30, quantity: 1.5 }), /Quantity/);

console.log('Estimator core tests passed.');
