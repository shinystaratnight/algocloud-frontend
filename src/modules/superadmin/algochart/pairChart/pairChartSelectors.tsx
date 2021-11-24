import { createSelector } from 'reselect';

const selectRaw = (state) => state.superadmin.algochart.pairChart;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectPairChartData = createSelector(
  [selectRaw],
  (raw) => raw.pairChartData,
);

const pairChartSelectors = {
  selectLoading,
  selectPairChartData,
  selectRaw,
};

export default pairChartSelectors;
