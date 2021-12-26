import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.pools;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectPools = createSelector(
  [selectRaw],
  (raw) => raw.pools,
);

const selectDailyOneRates = createSelector(
  [selectRaw],
  (raw) => raw.dailyOneRates,
);

const selectDailyTwoRates = createSelector(
  [selectRaw],
  (raw) => raw.dailyTwoRates,
);

const selectHourlyOneRates = createSelector(
  [selectRaw],
  (raw) => raw.hourlyOneRates,
);

const selectHourlyTwoRates = createSelector(
  [selectRaw],
  (raw) => raw.hourlyTwoRates,
);

const selectDailyPoolData = createSelector(
  [selectRaw],
  (raw) => raw.dailyPoolData,
);

const poolsSelectors = {
  selectLoading,
  selectPools,
  selectDailyOneRates,
  selectDailyTwoRates,
  selectHourlyOneRates,
  selectHourlyTwoRates,
  selectDailyPoolData,
  selectRaw,
};

export default poolsSelectors;
