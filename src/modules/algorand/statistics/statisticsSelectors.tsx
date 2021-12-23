import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.statistics;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectDailyData = createSelector(
  [selectRaw],
  (raw) => raw.dailyData,
);

const selectWeeklyData = createSelector(
  [selectRaw],
  (raw) => raw.weeklyData,
);

const statsSelectors = {
  selectLoading,
  selectDailyData,
  selectWeeklyData,
  selectRaw,
};

export default statsSelectors;
