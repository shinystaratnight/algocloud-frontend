import { createSelector } from 'reselect';

const selectRaw = (state) => state.algorand.stats;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectHistoryData = createSelector(
  [selectRaw],
  (raw) => raw.historyData,
);

const statsSelectors = {
  selectLoading,
  selectHistoryData,
  selectRaw,
};

export default statsSelectors;
