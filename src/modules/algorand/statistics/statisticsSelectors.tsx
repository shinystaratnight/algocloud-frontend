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

const selectTopFavorites = createSelector(
  [selectRaw],
  (raw) => raw.topFavorites,
);

const selectTopAssets = createSelector(
  [selectRaw],
  (raw) => raw.topAssets,
);

const selectTopPools = createSelector(
  [selectRaw],
  (raw) => raw.topPools,
);

const statisticsSelectors = {
  selectLoading,
  selectDailyData,
  selectWeeklyData,
  selectTopFavorites,
  selectRaw,
};

export default statisticsSelectors;
