import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.marketCap;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectMarketCapChartData = createSelector(
  [selectRaw],
  (raw) => raw.marketCapChartData,
);

const marketCapChartSelectors = {
  selectLoading,
  selectMarketCapChartData,
  selectRaw,
};

export default marketCapChartSelectors;
