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

// ---- Flat pay ----
// Example: Luka is on a one-time €1,500 flat fee only. Shares are unchanged; the fee shows up front.
assert.strictEqual(r.upfront[3], 1500);
assert.strictEqual(r.totals.flatPerPerson[3], 1500);
assert.strictEqual(r.totals.perPerson[3], 0);
assert.strictEqual(m[7].studio, 2600);                               // August unchanged
assert.strictEqual(r.totals.studio, 22200 - 2220 - 1830 - 3050 - 1500); // months kept by studio minus upfront fee

// Monthly flat pay on top of a share: Marko gets €100 every month plus 15% after recoupment
const mon = E.exampleInput(); mon.team[1].flat = 100; mon.team[1].flatWhen = 'monthly';
const mr = E.compute(mon);
assert.deepStrictEqual(mr.months.map(x => x.payouts[1].total), [100, 100, 100, 340, 490, 325, 295, 880]);
assert.strictEqual(mr.months[0].payouts[1].amount, 0);
assert.strictEqual(mr.months[7].payouts[1].paidSoFar, 1830 + 800);
assert.strictEqual(mr.months[7].studio, 2600 - 100);

// Flat pay doesn't count toward a cap: Ana capped at 1,000 with €50/month still gets her €50
const capFlat = E.exampleInput(); capFlat.team[0].cap = 1000; capFlat.team[0].flat = 50; capFlat.team[0].flatWhen = 'monthly';
const cf = E.compute(capFlat);
assert.deepStrictEqual(cf.months.map(x => x.payouts[0].amount), [420, 310, 250, 20, 0, 0, 0, 0]);
assert.strictEqual(cf.months[7].payouts[0].total, 50);

// Recouping one-time flat fees: €10,000 advance + €1,500 fee = €11,500 to recoup
const rec = E.exampleInput(); rec.recoupFlat = true;
const rr = E.compute(rec);
assert.strictEqual(rr.advance, 11500);
assert.deepStrictEqual(rr.months.map(x => x.recouped), [4200, 3100, 2500, 1700, 0, 0, 0, 0]);
assert.strictEqual(rr.months[3].payouts[1].amount, 15);             // 15% of the €100 left in April

// Flat pay only (0% share, no name of the flat-pay fields set) keeps old saved data working
const old = { advance: 0, team: [{ name: 'A', share: 0.5, starts: 'first' }], revenue: [100] };
assert.strictEqual(E.compute(old).months[0].payouts[0].total, 50);

console.log('flat pay tests: all passed');
