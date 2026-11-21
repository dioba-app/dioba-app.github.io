/*
 * Dioba calculation engine.
 * Plain JavaScript with no dependencies: runs in the browser, in Node (tests) and in Google Apps Script.
 * Same rules as the Dioba Rev-Share Calculator spreadsheet:
 *  - Each month's revenue first pays back the amount to recoup, until it's fully repaid.
 *  - "first" people get their % of all revenue received; "after" people get their % of what's
 *    left after recoupment (available to split).
 *  - A cap stops a person's payouts once their total reaches it.
 *  - Payouts are rounded to cents each month.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) { module.exports = api; }
  else { root.DiobaEngine = api; }
})(this, function () {
  function round2(x) {
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }

  function num(x) {
    var n = typeof x === 'number' ? x : parseFloat(String(x == null ? '' : x).replace(',', '.'));
    return isFinite(n) ? n : 0;
  }

  /**
   * @param {object} input
   *   advance: number (amount to recoup first)
   *   team: [{name, role, share (0.10 = 10%), starts: 'first'|'after', cap: number|null}]
   *   revenue: [number, ...] one value per month
   * @returns {object} { months: [...], totals: {...} }
   */
  function compute(input) {
    var advance = Math.max(0, num(input.advance));
    var team = (input.team || []).filter(function (p) { return p && String(p.name || '').trim(); });
    var revenue = (input.revenue || []).map(num);
    var paidSoFar = team.map(function () { return 0; });
    var cumulative = 0;
    var months = [];

    for (var m = 0; m < revenue.length; m++) {
      var rev = revenue[m];
      var before = cumulative;
      cumulative = round2(cumulative + rev);
      var recouped = Math.min(rev, Math.max(0, advance - before));
      var leftToRecoup = Math.max(0, round2(advance - cumulative));
      var available = round2(rev - recouped);
      var payouts = [];
      for (var i = 0; i < team.length; i++) {
        var p = team[i];
        var base = p.starts === 'after' ? available : rev;
        var raw = round2(num(p.share) * base);
        var cap = p.cap === null || p.cap === undefined || p.cap === '' ? null : num(p.cap);
        var pay = cap === null ? raw : Math.max(0, Math.min(raw, round2(cap - paidSoFar[i])));
        pay = round2(pay);
        paidSoFar[i] = round2(paidSoFar[i] + pay);
        payouts.push({ amount: pay, base: base, paidSoFar: paidSoFar[i],
                       capLeft: cap === null ? null : Math.max(0, round2(cap - paidSoFar[i])) });
      }
      var totalPaid = round2(payouts.reduce(function (s, x) { return s + x.amount; }, 0));
      months.push({
        index: m, revenue: rev, cumulative: cumulative, recouped: round2(recouped),
        leftToRecoup: leftToRecoup, available: available, payouts: payouts,
        totalPaid: totalPaid, studio: round2(rev - totalPaid)
      });
    }

    var shareTotal = team.reduce(function (s, p) { return s + num(p.share); }, 0);
    return {
      team: team,
      months: months,
      totals: {
        revenue: round2(revenue.reduce(function (s, x) { return s + x; }, 0)),
        perPerson: paidSoFar.slice(),
        studio: round2(months.reduce(function (s, x) { return s + x.studio; }, 0)),
        shareTotal: shareTotal,
        overAllocated: shareTotal > 1 + 1e-9
      }
    };
  }

  function exampleInput() {
    return {
      advance: 10000,
      startMonth: '2026-01',
      currency: '€',
      team: [
        { name: 'Ana', role: 'Composer', share: 0.10, starts: 'first', cap: 5000 },
        { name: 'Marko', role: 'Artist', share: 0.15, starts: 'after', cap: null },
        { name: 'Iva', role: 'Co-developer', share: 0.25, starts: 'after', cap: null }
      ],
      revenue: [4200, 3100, 2500, 1800, 2600, 1500, 1300, 5200]
    };
  }

  return { compute: compute, round2: round2, exampleInput: exampleInput };
});
