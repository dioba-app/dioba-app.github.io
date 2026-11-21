// Run with: node tests/engine.test.js
const assert = require('assert');
const E = require('../calculator/engine.js');

const r = E.compute(E.exampleInput());
const m = r.months;

// Same numbers as the spreadsheet example (checked by hand on Day 1)
assert.deepStrictEqual(m.map(x => x.recouped), [4200, 3100, 2500, 200, 0, 0, 0, 0]);
assert.deepStrictEqual(m.map(x => x.available), [0, 0, 0, 1600, 2600, 1500, 1300, 5200]);
assert.deepStrictEqual(m.map(x => x.payouts[0].amount), [420, 310, 250, 180, 260, 150, 130, 520]); // Ana
assert.deepStrictEqual(m.map(x => x.payouts[1].amount), [0, 0, 0, 240, 390, 225, 195, 780]);     // Marko
assert.deepStrictEqual(m.map(x => x.payouts[2].amount), [0, 0, 0, 400, 650, 375, 325, 1300]);    // Iva
assert.strictEqual(r.totals.perPerson[0], 2220);
assert.strictEqual(r.totals.perPerson[1], 1830);
assert.strictEqual(r.totals.perPerson[2], 3050);
assert.strictEqual(m[7].payouts[0].capLeft, 2780);
assert.strictEqual(m[7].studio, 2600);
assert.strictEqual(m[7].leftToRecoup, 0);

// Cap of 1,000 stops Ana exactly at 1,000 (same as the spreadsheet cap test)
const capped = E.exampleInput(); capped.team[0].cap = 1000;
const c = E.compute(capped);
assert.deepStrictEqual(c.months.map(x => x.payouts[0].amount), [420, 310, 250, 20, 0, 0, 0, 0]);
assert.strictEqual(c.totals.perPerson[0], 1000);

// No advance: "after" behaves like "first"
const noAdv = E.exampleInput(); noAdv.advance = 0;
assert.strictEqual(E.compute(noAdv).months[0].payouts[1].amount, 630);

// Empty names are ignored, blank revenue counts as 0, over-allocation is flagged
const odd = { advance: '', team: [{ name: '', share: 0.5 }, { name: 'A', share: 0.7, starts: 'first' }, { name: 'B', share: 0.5, starts: 'first' }], revenue: ['', '100,50'] };
const o = E.compute(odd);
assert.strictEqual(o.team.length, 2);
assert.strictEqual(o.months[0].revenue, 0);
assert.strictEqual(o.months[1].payouts[0].amount, 70.35);
assert.strictEqual(o.totals.overAllocated, true);

// Floating point: 0.15 * 0.1 type cases round correctly
assert.strictEqual(E.round2(1.005), 1.01);

console.log('engine tests: all passed');
