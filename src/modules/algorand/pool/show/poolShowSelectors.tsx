import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.pool.show;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectData = createSelector(
  [selectRaw],
  (raw) => raw.data,
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

const poolShowSelectors = {
  selectLoading,
  selectData,
  selectDailyOneRates,
  selectDailyTwoRates,
  selectHourlyOneRates,
  selectHourlyTwoRates,
  selectDailyPoolData,
  selectRaw,
};

export default poolShowSelectors;
