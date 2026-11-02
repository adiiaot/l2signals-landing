// Public performance figures — R, win/loss counts and study windows only.
//
// Rules for this file:
//  - No money amounts (account balances, profit in currency units). Results are
//    published as wins, losses, unfilled setups and R.
//  - Keep the study window attached to the figure: a back-test is not a live
//    result, and mixing windows is what makes a set of numbers misleading.
//  - Numbers here are currently not rendered anywhere. The live ledger comes
//    from `/api/ledger`; the back-tested study is `components/BacktestStudy.tsx`.

/** Live operator execution ledger (demo account) — counts are read at runtime. */
export const demoStats = {
  label: 'LIVE',
  account: 'demo',
  note: 'Balances and currency profit are not published. See /api/ledger for the recorded trades.',
}

/** Live operator execution ledger (prop-firm account). */
export const propStats = {
  label: 'LIVE',
  account: 'prop',
  firm: 'Equity Edge',
  phase: 'p2',
  note: 'Balances and currency profit are not published. See /api/ledger for the recorded trades.',
}

/** Back-tested study — the primary evidence. Never mixed with live figures. */
export const engineStats = {
  label: 'BACK-TESTED',
  // 4.25-year uncapped run on broker M15/H1/H4/D1 candles (Jul 2022 → Oct 2026),
  // final config (TP 1.3R, SL 1.5× ATR).
  studyYears: 4.25,
  studySignals: 20237,
  studyDecided: 14239,
  studyWR: 64.8,
  studyAvgR: 0.69,
}
