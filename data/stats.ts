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
  // 5.4-year run on broker M15/H1/H4/D1 candles (Jul 2021 → Nov 2026), current
  // config (TP 1.3R, SL 1.5× ATR, mean-reversion book on, fallback leg off),
  // scored the way the live ledger scores it: a full win pays the trade's own
  // target rather than a fixed figure, and spread + slippage are deducted.
  // Derived by `l2signal_web/scripts/pooled-study-stats.cjs`.
  studyYears: 5.4,
  studyTrades: 5810,
  studyWR: 50.2,
  studyAvgR: 0.13,
  studyNetR: 763.5,
  studyPF: 1.26,
}
