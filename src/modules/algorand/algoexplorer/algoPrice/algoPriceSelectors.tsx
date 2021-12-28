import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.algoPrice;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectAlgoPriceChartData = createSelector(
  [selectRaw],
  (raw) => raw.algoPriceChartData,
);

const algoPriceChartSelectors = {
  selectLoading,
  selectAlgoPriceChartData,
  selectRaw,
};

export default algoPriceChartSelectors;
