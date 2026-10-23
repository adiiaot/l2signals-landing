// Public performance figures — every number here is a measured engine result.
// Keep the window attached to each figure: a 2-month run and a 4-year study are
// not interchangeable, and mixing them is what makes a landing page misleading.

export const demoStats = {
  initial: 100,
  milestone: 1007.41,
  milestoneDays: 37,
  milestoneDate: '2026-09-04',
  startDate: '2026-07-29',
}

export const propStats = {
  firm: 'Equity Edge',
  accountSize: 10000,
  initial: 10000,
  current: 11215,
  phase: 'p2',
  dailyLossLimit: 500,
  maxLoss: 1000,
}

export const engineStats = {
  // Primary evidence: 4.25-year uncapped run on broker M15/H1/H4/D1 candles
  // (Jul 2022 → Oct 2026), final config (TP 1.3R, SL 1.5× ATR).
  studyYears: 4.25,
  studySignals: 20237,
  studyDecided: 14239,
  studyWR: 64.8,
  studyAvgR: 0.69,

  // Short-window check on the CURRENT config: 2 months (Jun 18 → Aug 18, 2026),
  // hybrid limit + stop-fallback execution, trades held to the 21:00 UTC close.
  hybridWindow: 'Jun 18 – Aug 18, 2026',
  hybridFills: 152,
  hybridWR: 74.2,
  hybridPF: 5.12,
  hybridR: 103,
}
